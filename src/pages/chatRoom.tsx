import React, { useEffect, useRef, useState } from 'react';
import { IonPage } from '@ionic/react';
import { Box, TextField, Button, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useHistory } from 'react-router-dom';
import { fetchMessages, fetchConversations, sendMessage } from '../api.service';

type Message = {
    id: string;
    senderID: string;
    receiverID: string;
    messageContent: string;
    timestamp: string;
    isRead: boolean;
};

type ChatRoomProps = {
    conversationID: string;
    userName: string;
    profileImage: string;
    initialMessages: Message[];
};

const ChatRoom: React.FC<ChatRoomProps> = ({ conversationID, userName, profileImage, initialMessages }) => {
    const [messages, setMessages] = useState<Message[]>(initialMessages || []);
    const [newMessage, setNewMessage] = useState<string>('');
    const [receiverID, setReceiverID] = useState<string>('');
    const history = useHistory();
    const currentUserId = JSON.parse(localStorage.getItem('userInfo') || '{}').uid || '';
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    // Scroll to the bottom of the messages container
    const scrollToBottom = (smooth: boolean = true) => {
        messagesEndRef.current?.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' });
    };

    // Check if the user is near the bottom of the chat
    const isNearBottom = () => {
        if (!chatContainerRef.current) return true;
        const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
        return scrollHeight - scrollTop <= clientHeight + 50; // Allow 50px tolerance
    };

    // Scroll to the bottom instantly on component mount
    useEffect(() => {
        scrollToBottom(false); // Instant scroll
    }, []);

    // Fetch participants and determine receiverID
    useEffect(() => {
        const loadConversation = async () => {
            try {
                const response = await fetchConversations();
                if (response.success && response.data) {
                    const conversation = response.data.find(
                        (conv: any) => conv.id === conversationID
                    );

                    if (conversation && conversation.participants && Array.isArray(conversation.participants)) {
                        const foundReceiverID = conversation.participants.find(
                            (p: string) => p !== currentUserId
                        );
                        if (foundReceiverID) {
                            setReceiverID(foundReceiverID);
                        } else {
                            console.error('Receiver ID not found in participants');
                        }
                    } else {
                        console.error('Conversation not found or invalid');
                    }
                } else {
                    console.error('Failed to fetch conversations');
                }
            } catch (error) {
                console.error('Error fetching conversation:', error);
            }
        };

        loadConversation();
    }, [conversationID, currentUserId]);

    // Fetch all messages for the conversation with interval
    useEffect(() => {
        const loadMessages = async () => {
            try {
                const response = await fetchMessages(conversationID);
                if (response.success && response.data) {
                    const parsedMessages: Message[] = Object.entries(response.data).map(([key, value]: [string, any]) => ({
                        id: key,
                        senderID: value.senderID,
                        receiverID: value.receiverID,
                        messageContent: value.messageContent,
                        timestamp: value.timestamp,
                        isRead: value.isRead,
                    }));

                    // Sort messages by timestamp
                    parsedMessages.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

                    // Update messages only if they are different
                    if (JSON.stringify(parsedMessages) !== JSON.stringify(messages)) {
                        setMessages(parsedMessages);

                        // Scroll to bottom only if user is near the bottom
                        if (isNearBottom()) {
                            scrollToBottom(false); // Instant scroll for new messages
                        }
                    }
                }
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        // Initial load and set interval
        loadMessages();
        const interval = setInterval(loadMessages, 3000); // Refresh every 3 seconds

        // Clear interval on component unmount
        return () => clearInterval(interval);
    }, [conversationID, messages]);

    const handleSendMessage = async () => {
        if (newMessage.trim()) {
            if (!receiverID) {
                console.error('Receiver ID is missing. Please ensure participants are loaded.');
                return;
            }

            try {
                const messageData = {
                    receiverID,
                    messageContent: newMessage,
                };

                const response = await sendMessage(messageData);
                if (response.success && response.data?.id) {
                    const newMsg: Message = {
                        id: response.data.id,
                        senderID: currentUserId,
                        receiverID,
                        messageContent: newMessage,
                        timestamp: new Date().toISOString(),
                        isRead: false,
                    };

                    setMessages((prevMessages) => [...prevMessages, newMsg]);
                    setNewMessage('');
                    scrollToBottom(false); // Instant scroll after sending a message
                } else {
                    console.error('Invalid response from server:', response);
                }
            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
    };

    const handleBack = () => history.goBack();

    return (
        <IonPage>
            <Box style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
                {/* Header */}
                <Box
                    style={{
                        backgroundColor: '#0094FF',
                        color: 'white',
                        padding: '10px 16px',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <IconButton onClick={handleBack} style={{ color: 'white', marginRight: '8px' }}>
                        <ArrowBackIcon />
                    </IconButton>
                    <img
                        src={profileImage}
                        alt={userName}
                        style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            marginRight: '12px',
                        }}
                    />
                    <span style={{ fontWeight: 600, fontSize: '16px' }}>{userName}</span>
                </Box>

                {/* Messages Display */}
                <Box
                    ref={chatContainerRef}
                    style={{
                        flexGrow: 1,
                        padding: '16px',
                        overflowY: 'auto',
                        backgroundColor: '#F5F5F5',
                    }}
                >
                    {messages.map((msg) => (
                        <Box
                            key={msg.id}
                            style={{
                                display: 'flex',
                                justifyContent: msg.senderID === currentUserId ? 'flex-end' : 'flex-start',
                                marginBottom: '8px',
                            }}
                        >
                            <Box
                                style={{
                                    maxWidth: '70%',
                                    padding: '10px',
                                    borderRadius: '8px',
                                    backgroundColor: msg.senderID === currentUserId ? '#0094FF' : '#E0E0E0',
                                    color: msg.senderID === currentUserId ? 'white' : 'black',
                                    wordWrap: 'break-word',
                                }}
                            >
                                {msg.messageContent}
                            </Box>
                        </Box>
                    ))}
                    <div ref={messagesEndRef} />
                </Box>

                {/* Input Section */}
                <Box
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '10px',
                        borderTop: '1px solid #E0E0E0',
                    }}
                >
                    <TextField
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message"
                        style={{ marginRight: '8px' }}
                    />
                    <Button
                        variant="contained"
                        style={{ backgroundColor: '#0094FF', color: 'white' }}
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                    >
                        Send
                    </Button>
                </Box>
            </Box>
        </IonPage>
    );
};

export default ChatRoom;
