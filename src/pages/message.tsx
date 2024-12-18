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
import {  fetchConversations } from '../api.service';  // Adjust path to where the fetchConvo function is defined


const sellers = [
    {
        id: 1,
        name: 'AileenLiexiuai',
        slogan: 'Interested in creating a portfolio website',
        profileImage: 'https://ionicframework.com/docs/img/demos/thumbnail.svg',
        unreadMessages: 3,
    },

];

const buyers = [
    {
        id: 1,
        name: 'John Doe',
        slogan: 'I want to place a bulk order.',
        profileImage: 'https://ionicframework.com/docs/img/demos/thumbnail.svg',
        unreadMessages: 4,
    },
    
];



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

    const handleClickReview = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElReview(anchorElReview ? null : event.currentTarget);
    };

    const handleClose = () => {
        setAnchorElSeller(null);
        setAnchorElBuyer(null);
    };
    
    useEffect(() => {
        const getConversations = async () => {
            const userInfoString = localStorage.getItem('userInfo');
            if (!userInfoString) {
                console.error('User info is not available in localStorage.');
                return;
            }
    
            try {
                const userInfo = JSON.parse(userInfoString);
                const userId: string | undefined = userInfo.uid;
    
                if (!userId) {
                    console.error('User ID is missing in userinfo.');
                    return;
                }
    
                console.log('Fetching conversations for user ID:', userId);
    
                const data = await fetchConversations(userId); // userId is guaranteed to be valid here
                setConversations(data);
                console.log('Fetched conversations:', data);
            } catch (error) {
                console.error('Failed to parse userinfo or fetch conversations:', error);
            }
        };
    
        getConversations();
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

      const navigateToChatRoom = (type: 'seller' | 'buyer', id: number, name: string, profileImage: string) => {
        history.push({
            pathname: `/chatroom/${type}/${id}`,
            state: { userName: name, userId: id, profileImage: profileImage }, // huruf kecil untuk profileImage
        });
    };
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
                                onClick={() => navigateToChatRoom('seller', seller.id, seller.name, seller.profileImage)} // Navigasi ke chatroom seller
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
