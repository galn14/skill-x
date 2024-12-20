import React, { useEffect, useState } from 'react';
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Box,
    Button,
    Menu,
    MenuItem,
    Grid,
    Card,
    CardContent,
    TextField,
} from '@mui/material';
import StarRatings from 'react-star-ratings';
import {
    IonPage,
    IonContent,
} from '@ionic/react';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MailIcon from '@mui/icons-material/Mail';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ChatIcon from '@mui/icons-material/Chat';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useHistory } from 'react-router-dom';

import {  fetchConversations, fetchMessages, fetchUserDetails } from '../api.service';  // Adjust path to where the fetchConvo function is defined





const MessagePage: React.FC = () => {

    const history = useHistory();
    const handleBack = () => history.goBack();
    const isLoggedIn = !!localStorage.getItem('userToken'); // Misalnya token disimpan di localStorage
    const [anchorElSeller, setAnchorElSeller] = React.useState<null | HTMLElement>(null);
    const [anchorElBuyer, setAnchorElBuyer] = React.useState<null | HTMLElement>(null);
    const [anchorElReview, setAnchorElReview] = React.useState<null | HTMLElement>(null);
    const [conversations, setConversations] = useState([]);
    const openReview = Boolean(anchorElReview);
    const openSeller = Boolean(anchorElSeller);
    const openBuyer = Boolean(anchorElBuyer);
    const navigate = useHistory();
    const [participants, setParticipants] = useState<string[]>([]);
    
    const handleClickReview = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElReview(anchorElReview ? null : event.currentTarget);
    };

    const handleClose = () => {
        setAnchorElSeller(null);
        setAnchorElBuyer(null);
    };
    
    type LastMessage = {
        id: string;
        isRead: boolean;
        messageContent: string;
        receiverID: string;
        senderID: string;
        timestamp: string;
      };
      
      type Conversation = {
        id: string;
        participants: string[];
        lastMessage?: LastMessage;
      };
      
      type ParticipantDetails = {
        name: string;
        photo_url: string;
      };
      type Seller = {
        id: number;
        name: string;
        slogan: string;
        profileImage: string;
        unreadMessages: number;
      };
      
      const [sellers, setSellers] = useState<Seller[]>([]);
      

      useEffect(() => {
        const getConversationsAndParticipants = async () => {
          const userInfoString = localStorage.getItem('userInfo');
          if (!userInfoString) {
            console.error('User info is not available in localStorage.');
            return;
          }
      
          try {
            const userInfo = JSON.parse(userInfoString);
            const userId: string = userInfo.uid;
      
            if (!userId) {
              console.error('User ID is missing in userInfo.');
              return;
            }
      
            const conversationData = await fetchConversations(userId);
            const conversationList: Conversation[] = conversationData.data; // Explicitly type this as Conversation[]
      
            // Prepare sellers array
            const sellerPromises = conversationList.map(async (conversation: Conversation, index: number) => {
              const participantId = conversation.participants.find(
                (participant: string) => participant !== userId
              );
      
              if (!participantId) return null;
      
              // Fetch participant details
              const participantDetails: ParticipantDetails = await fetchUserDetails(participantId);
      
              return {
                id: index + 1, // Or use conversation.id for a unique identifier
                name: participantDetails.name || 'Unknown',
                slogan: conversation.lastMessage?.messageContent || 'No slogan available',
                profileImage: participantDetails.photo_url || 'https://ionicframework.com/docs/img/demos/thumbnail.svg',
                unreadMessages: conversation.lastMessage?.isRead ? 0 : 1, // Example calculation
              };
            });
      
            const sellersData = await Promise.all(sellerPromises);
            setSellers(sellersData.filter((seller) => seller !== null) as Seller[]); // Remove null entries and cast as Seller[]
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
      
        getConversationsAndParticipants();
      }, []);
      
    
    
    const handleNotificationButtonClick = () => {
        if (isLoggedIn) {
          history.push('/notification'); // Redirect ke halaman message
        } else {
          history.push('/login'); // Redirect ke halaman login
        }
    };

    const handleCartButtonClick = () => {
        if (isLoggedIn) {
          history.push('/cart'); // Redirect ke halaman message
        } else {
            history.push('/login'); // Redirect ke halaman login
        }
      };

      const navigateToChatRoom = async (conversationID: string, id?: number, name?: string, profileImage?: string) => {
        try {
          // Fetch messages for the conversation
          const response = await fetchMessages(conversationID);
      
          if (response && response.data) {
            // Pass the messages and other data to ChatRoom
            history.push('/chatroom', {
              state: {
                messages: response.data,
                conversationID,
                userName: "Recipient Name", // Replace with the actual name
                profileImage: "Recipient Image URL", // Replace with the actual image URL
              },
            });
          }
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      };

    
    const buyers = [
        {
            id: 1,
            name: 'John Doe',
            slogan: 'I want to place a bulk order.',
            profileImage: 'https://ionicframework.com/docs/img/demos/thumbnail.svg',
            unreadMessages: 4,
        },
        
    ];
    
    return (
        <IonPage>
            {/* AppBar for header */}
            <AppBar
                position="fixed"
                style={{
                    backgroundColor: 'white',
                    borderBottomLeftRadius: '30px',
                    borderBottomRightRadius: '30px',
                    height: '82px',
                    paddingTop: '25px',
                }}
            >
                <Toolbar
                    style={{
                        height: '100%',
                        display: 'flex',
                        alignItems: 'flex-end',
                        paddingBottom: '10px',
                    }}
                >
                    <Box display="flex" alignItems="center" sx={{ width: '100%' }}>
                        <IconButton onClick={handleBack} color="primary">
                            <ArrowBackIcon />
                        </IconButton>
                        <Typography
                            variant="h6"
                            component="div"
                            color='black'
                            fontSize='16px'
                            style={{
                                fontWeight: 200,
                                marginRight: 'auto',
                                paddingLeft: '16px',
                            }}
                        >
                            Messages
                        </Typography>
                        <IconButton color="primary" onClick={handleCartButtonClick}>
                            <ShoppingCartIcon />
                        </IconButton>
                        <IconButton color="primary" onClick={handleNotificationButtonClick}>
                            <NotificationsIcon />
                        </IconButton>
                        <IconButton color="primary">
                            <MailIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* IonContent for page content */}
            <IonContent style={{ padding: '0', backgroundColor: '#0094FF' }}>
                <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" marginTop="80px">
                    {/* Button for Chat with the Seller */}
                    <Button
                        variant="contained"
                        style={{
                            backgroundColor: '#0094FF',
                            color: 'white',
                            textTransform: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            borderRadius: '5px',
                            width: '100vw',
                            height: '5vh',
                            maxWidth: '100%',
                            padding: '5px 16px',
                            marginTop: '10px',
                        }}
                    >
                        <Box display="flex" alignItems="center">
                            <ChatIcon style={{ marginRight: '8px' }} />
                            Chat with the Seller
                        </Box>
                    </Button>

                   {/* Seller List (Replaces Dropdown Menu) */}
                    <Box
                        style={{
                            width: '100%',
                            backgroundColor: '#FFFFFF',
                            borderRadius: '8px',
                            marginTop: '10px',
                            padding: '0',
                        }}
                    >
                        {sellers.map((seller, index) => (
                            <Box
                                key={index}
                                onClick={() => navigateToChatRoom('seller', seller.id, seller.name, seller.profileImage, )} // Navigasi ke chatroom seller
                                display="flex"
                                alignItems="center"
                                justifyContent="space-between"
                                style={{
                                    height: '62px',
                                    padding: '8px 16px',
                                    backgroundColor: 'white',
                                    borderBottom: index === sellers.length - 1 ? 'none' : '1px solid #E0E0E0',
                                }}
                            >
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
                                <Box style={{ flexGrow: 1 }}>
                                    <Box
                                        style={{
                                            fontWeight: 600,
                                            fontSize: '14px',
                                            color: '#000',
                                            marginBottom: '4px',
                                        }}
                                    >
                                        {seller.name}
                                    </Box>
                                    <Box
                                        style={{
                                            fontSize: '9px',
                                            color: '#666',
                                            wordWrap: 'break-word',
                                            lineHeight: '14px',
                                        }}
                                    >
                                        {seller.slogan}
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

                    {/* Button for Chat with the Buyer */}
                    <Button
                        variant="contained"
                        style={{
                            backgroundColor: '#0094FF',
                            color: 'white',
                            textTransform: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            borderRadius: '5px',
                            width: '100vw',
                            height: '5vh',
                            maxWidth: '100%',
                            padding: '5px 16px',
                            marginTop: openSeller ? `${62 * sellers.length + 16}px` : '10px', // Dinamis berdasarkan seller
                        }}
                    >
                        <Box display="flex" alignItems="center">
                            <ChatIcon style={{ marginRight: '8px' }} />
                            Chat with the Buyer
                        </Box>
                    </Button>

                    {/* Buyer List (Replaces Dropdown Menu) */}
                    <Box
                        style={{
                            width: '100%',
                            backgroundColor: '#FFFFFF',
                            borderRadius: '8px',
                            marginTop: '10px',
                            padding: '0',
                        }}
                    >
                        {buyers.map((buyer, index) => (
                            <Box
                                key={index}
                                onClick={() => navigateToChatRoom('buyer', buyer.id, buyer.name, buyer.profileImage)} // Navigasi ke chatroom buyer
                                display="flex"
                                alignItems="center"
                                justifyContent="space-between"
                                style={{
                                    height: '62px',
                                    padding: '8px 16px',
                                    backgroundColor: 'white',
                                    borderBottom: index === buyers.length - 1 ? 'none' : '1px solid #E0E0E0',
                                }}
                            >
                                <Box
                                    component="img"
                                    src={buyer.profileImage}
                                    alt={buyer.name}
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '50%',
                                        marginRight: '12px',
                                    }}
                                />
                                <Box style={{ flexGrow: 1 }}>
                                    <Box
                                        style={{
                                            fontWeight: 600,
                                            fontSize: '14px',
                                            color: '#000',
                                            marginBottom: '4px',
                                        }}
                                    >
                                        {buyer.name}
                                    </Box>
                                    <Box
                                        style={{
                                            fontSize: '9px',
                                            color: '#666',
                                            wordWrap: 'break-word',
                                            lineHeight: '14px',
                                        }}
                                    >
                                        {buyer.slogan}
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
                                    {buyer.unreadMessages}
                                </Box>
                            </Box>
                        ))}
                    </Box>   
                </Box>
            </IonContent>
        </IonPage>
    );
};

export default MessagePage;
