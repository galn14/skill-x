import React, { useState } from 'react';
import {
    IonPage,
    IonContent,
} from '@ionic/react';
import { Box, TextField, Button, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useHistory } from 'react-router-dom';
import { navigate } from 'ionicons/icons';

type Message = {
    id: number;
    sender: 'user' | 'other'; // Adjusted to make sender values clearer
    text: string;
    timestamp: string;
};

type ChatRoomProps = {
    userName: string;
    userId: string;
    profileImage: string;
    initialMessages: Message[];
};

const ChatRoom: React.FC<ChatRoomProps> = ({ userName, userId, profileImage, initialMessages }) => {
    const [chatMessages, setChatMessages] = useState<Message[]>(initialMessages);
    const [newMessage, setNewMessage] = useState<string>('');
    const navigate = useHistory();

    const handleBack = () => navigate.goBack();

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            setChatMessages((prevMessages) => [
                ...prevMessages,
                {
                    id: prevMessages.length + 1,
                    sender: 'user',
                    text: newMessage,
                    timestamp: new Date().toLocaleString(),
                },
            ]);
            setNewMessage('');
        }
    };

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
                    style={{
                        flexGrow: 1,
                        padding: '16px',
                        overflowY: 'auto',
                        backgroundColor: '#F5F5F5',
                    }}
                >
                    {chatMessages.map((msg) => (
                        <Box
                            key={msg.id}
                            style={{
                                display: 'flex',
                                justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                                marginBottom: '8px',
                            }}
                        >
                            <Box
                                style={{
                                    maxWidth: '70%',
                                    padding: '10px',
                                    borderRadius: '8px',
                                    backgroundColor: msg.sender === 'user' ? '#0094FF' : '#E0E0E0',
                                    color: msg.sender === 'user' ? 'white' : 'black',
                                    wordWrap: 'break-word',
                                }}
                            >
                                {msg.text}
                            </Box>
                        </Box>
                    ))}
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
