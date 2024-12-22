import React, { useEffect, useState, useRef } from 'react';
import { IonPage, IonContent } from '@ionic/react';
import { Box, TextField, Button, IconButton, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useHistory } from 'react-router-dom';
import { fetchMessages, fetchConversations, sendMessage, fetchUserDetails } from '../api.service';

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
    participants: string[];
};

const ChatRoom: React.FC<ChatRoomProps> = ({ conversationID, userName, profileImage, initialMessages, participants }) => {
    const [messages, setMessages] = useState<Message[]>(initialMessages || []);
    const [newMessage, setNewMessage] = useState<string>('');
    const history = useHistory();
    const currentUserId = JSON.parse(localStorage.getItem('userInfo') || '{}').uid || '';

    // Receiver ID derived from participants
    const receiverID = participants.find((id) => id !== currentUserId) || '';

    // Ref to track the chat container
    const chatContainerRef = useRef<HTMLDivElement>(null);

    // Scroll to the bottom of the chat container
    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    };

    // Scroll to the bottom on message updates
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Fetch all messages for the conversation
    useEffect(() => {
        const loadConversation = async () => {
            try {
                const response = await fetchConversations();
    
                if (response.success && Array.isArray(response.data)) {
                    const conversation = response.data.find(
                        (conv: any) => conv.id === conversationID
                    );
    
                    if (!conversation) {
                        console.warn('Conversation not found:', conversationID);
                        return;
                    }
    
                    if (!Array.isArray(conversation.participants)) {
                        console.error('Invalid participants in conversation:', conversation);
                    }
                } else {
                    console.error('Failed to fetch conversations or invalid response format:', response);
                }
            } catch (error) {
                console.error('Error fetching conversation:', error);
            }
        };
    
        loadConversation();
    }, [conversationID]);
    
    

    const handleSendMessage = async () => {
        if (newMessage.trim()) {
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
                <IonContent style={{ backgroundColor: '#F5F5F5' }}>
                    <Box
                        ref={chatContainerRef}
                        style={{
                            flexGrow: 1,
                            padding: '16px',
                            overflowY: 'auto',
                            height: '100%',
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
                    </Box>
                </IonContent>

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
