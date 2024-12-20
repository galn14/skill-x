import React, { useEffect, useState } from 'react';
import { IonPage, IonContent } from '@ionic/react';
import { AppBar, Toolbar, IconButton, Typography, Box } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useHistory } from 'react-router-dom';
import { fetchConversations, fetchUserDetails } from '../api.service';

type Conversation = {
    id: string;
    lastMessage: {
        messageContent: string;
        senderID: string;
        timestamp: string;
        isRead: boolean;
    };
    participants: string[];
    updatedAt: string;
};

type ParticipantDetails = {
    name: string;
    photo_url: string;
};

type ConversationDisplay = {
    id: string;
    participantName: string;
    participantPhoto: string;
    lastMessageContent: string;
    unreadMessages: number;
    updatedAt: string;
};

const MessagePage: React.FC = () => {
    const history = useHistory();
    const [conversations, setConversations] = useState<ConversationDisplay[]>([]);
    const userId = JSON.parse(localStorage.getItem('userInfo') || '{}').uid || '';

    const handleBack = () => history.goBack();

    useEffect(() => {
        const loadConversations = async () => {
            try {
                const response = await fetchConversations();

                if (response.success && Array.isArray(response.data)) {
                    const processedConversations = await Promise.all(
                        response.data.map(async (conversation: Conversation) => {
                            try {
                                const otherParticipantId = conversation.participants.find(
                                    (participant) => participant !== userId
                                );

                                if (!otherParticipantId) {
                                    console.warn(
                                        `No other participant found for conversation ${conversation.id}`
                                    );
                                    return null;
                                }

                                const participantDetails: ParticipantDetails = await fetchUserDetails(
                                    otherParticipantId
                                );

                                return {
                                    id: conversation.id,
                                    participantName: participantDetails.name || 'Unknown',
                                    participantPhoto:
                                        participantDetails.photo_url ||
                                        'https://ionicframework.com/docs/img/demos/thumbnail.svg',
                                    lastMessageContent:
                                        conversation.lastMessage?.messageContent || 'No message available',
                                    unreadMessages:
                                        conversation.lastMessage.senderID !== userId &&
                                        !conversation.lastMessage.isRead
                                            ? 1
                                            : 0,
                                    updatedAt: conversation.updatedAt,
                                };
                            } catch (error) {
                                console.error(
                                    `Error processing conversation ${conversation.id}:`,
                                    error
                                );
                                return null;
                            }
                        })
                    );

                    setConversations(
                        processedConversations.filter(
                            (conversation) => conversation !== null
                        ) as ConversationDisplay[]
                    );
                } else {
                    console.error('Invalid response format from fetchConversations');
                }
            } catch (error) {
                console.error('Error loading conversations:', error);
            }
        };

        loadConversations();
    }, [userId]);

    const navigateToChatRoom = (conversationID: string, participantName: string, participantPhoto: string) => {
        history.push(`/chat/${conversationID}`, {
            userName: participantName,
            profileImage: participantPhoto,
            initialMessages: [],
        });
    };

    return (
        <IonPage>
            <AppBar position="fixed" style={{ backgroundColor: '#fff', height: '82px' }}>
                <Toolbar>
                    <IconButton onClick={handleBack} color="primary">
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" style={{ marginLeft: 16, fontWeight: 600 }}>
                        Messages
                    </Typography>
                </Toolbar>
            </AppBar>

            <IonContent style={{ marginTop: '90px' }}>
                <Box style={{ marginTop: '120px'}} display="flex" flexDirection="column" alignItems="center">
                    {conversations.length === 0 ? (
                        <Typography style={{ marginTop: '20px', color: '#666' }}>No conversations available</Typography>
                    ) : (
                        conversations.map((conversation) => (
                            <Box
                                key={conversation.id}
                                onClick={() =>
                                    navigateToChatRoom(
                                        conversation.id,
                                        conversation.participantName,
                                        conversation.participantPhoto
                                    )
                                }
                                display="flex"
                                alignItems="center"
                                justifyContent="space-between"
                                style={{
                                    padding: '16px',
                                    backgroundColor: '#fff',
                                    borderBottom: '1px solid #E0E0E0',
                                    cursor: 'pointer',
                                    width: '100%',
                                }}
                            >
                                <Box display="flex" alignItems="center">
                                    <Box
                                        component="img"
                                        src={conversation.participantPhoto}
                                        alt={conversation.participantName}
                                        style={{
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: '50%',
                                            marginRight: '12px',
                                        }}
                                    />
                                    <Box>
                                        <Typography style={{ fontWeight: 600 }}>
                                            {conversation.participantName}
                                        </Typography>
                                        <Typography style={{ fontSize: '12px', color: '#666' }}>
                                            {conversation.lastMessageContent}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box
                                    style={{
                                        backgroundColor: '#0094FF',
                                        color: 'white',
                                        borderRadius: '50%',
                                        width: '24px',
                                        height: '24px',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        fontSize: '12px',
                                        fontWeight: 600,
                                    }}
                                >
                                    {conversation.unreadMessages}
                                </Box>
                            </Box>
                        ))
                    )}
                </Box>
            </IonContent>
        </IonPage>
    );
};

export default MessagePage;
