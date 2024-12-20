import React, { useEffect, useState } from 'react';
import { IonPage, IonContent } from '@ionic/react';
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Box,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useHistory } from 'react-router-dom';
import { fetchConversations, fetchUserDetails } from '../api.service';

type Conversation = {
    id: string;
    participants: string[];
    lastMessage: {
        messageContent: string;
        isRead: boolean;
    };
};

type Seller = {
    id: string;
    name: string;
    profileImage: string;
    lastMessage: string;
    unreadMessages: number;
};

const MessagePage: React.FC = () => {
    const history = useHistory();
    const [sellers, setSellers] = useState<Seller[]>([]);
    const userId = JSON.parse(localStorage.getItem('userInfo') || '{}').uid || '';

    const handleBack = () => history.goBack();

    useEffect(() => {
        const fetchConversationsAndParticipants = async () => {
            try {
                const conversations = await fetchConversations();
                const sellerData = await Promise.all(
                    conversations.data.map(async (conversation: Conversation) => {
                        const otherParticipant = conversation.participants.find((p) => p !== userId);

                        // Periksa apakah `otherParticipant` ada
                        if (!otherParticipant) return null;

                        const userDetails = await fetchUserDetails(otherParticipant);

                        return {
                            id: conversation.id,
                            name: userDetails.name || 'Unknown',
                            profileImage: userDetails.photo_url || 'https://ionicframework.com/docs/img/demos/thumbnail.svg',
                            lastMessage: conversation.lastMessage.messageContent || 'No message available',
                            unreadMessages: conversation.lastMessage.isRead ? 0 : 1,
                        };
                    })
                );

                setSellers(sellerData.filter((seller) => seller !== null) as Seller[]);
            } catch (error) {
                console.error('Error fetching conversations:', error);
            }
        };

        fetchConversationsAndParticipants();
    }, [userId]);

    const navigateToChatRoom = (conversationID: string, userName: string, profileImage: string) => {
        history.push(`/chat/${conversationID}`, {
            userName,
            profileImage,
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
                <Box display="flex" flexDirection="column" alignItems="center">
                    {sellers.map((seller) => (
                        <Box
                            key={seller.id}
                            onClick={() => navigateToChatRoom(seller.id, seller.name, seller.profileImage)}
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
                                    src={seller.profileImage}
                                    alt={seller.name}
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '50%',
                                        marginRight: '12px',
                                    }}
                                />
                                <Box>
                                    <Typography style={{ fontWeight: 600 }}>{seller.name}</Typography>
                                    <Typography style={{ fontSize: '12px', color: '#666' }}>{seller.lastMessage}</Typography>
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
                                {seller.unreadMessages}
                            </Box>
                        </Box>
                    ))}
                </Box>
            </IonContent>
        </IonPage>
    );
};

export default MessagePage;
