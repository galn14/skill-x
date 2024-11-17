import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Box,
    FormControl,
    Select,
    MenuItem,
    CssBaseline,
    Card,
    CardContent,
    CardMedia,
    createTheme,
    ThemeProvider,
} from '@mui/material';
import { IonPage, IonContent } from '@ionic/react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MailIcon from '@mui/icons-material/Mail';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useHistory } from 'react-router-dom';
import '@fontsource/poppins'; // Font Import

const CartPage: React.FC = () => {
    const history = useHistory();
    const [openModal, setOpenModal] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [onGoingTrans, setOnGoingTrans] = useState<string>('Ongoing Transaction');
    const [waitingPayment, setWaitingPayment] = useState<string>('Waiting Payment');
    const [promo, setPromo] = useState<string>('Promo');
    const isLoggedIn = !!localStorage.getItem('userToken'); // Misalnya token disimpan di localStorage

    const closeModal = () => {
      setIsModalOpen(false);
    };
  
    const handleOpenModal = () => {
      setOpenModal(true);
      // Add your modal open logic here
    };
  

    const handleMessageButtonClick = () => {
      if (isLoggedIn) {
        history.push('/message'); // Redirect ke halaman message
      } else {
        history.push('/login'); // Redirect ke halaman login
      }
    };

    const handleBack = () => history.goBack();

    const theme = createTheme({
        typography: {
            fontFamily: '"Poppins"',
        },
    });

    const handleNotificationButtonClick = () => {
        if (isLoggedIn) {
          history.push('/notification'); // Redirect ke halaman message
        } else {
          history.push('/login'); // Redirect ke halaman login
        }
    };

    const notifications = [
      {
          id: 1,
          type: 'Promo',
          time: '2 hours ago',
          description: 'Exclusive promo for today only!',
          product: {
              image: 'https://via.placeholder.com/60',
              title: 'Product A',
              seller: 'Seller A',
              originalPrice: 'Rp 150,000',
              discountedPrice: 'Rp 120,000',
          },
          isRead: false, // Card belum ditekan
      },
      {
          id: 2,
          type: 'Waiting Payment',
          time: '5 hours ago',
          description: 'Please complete your payment for Product B.',
          product: {
              image: 'https://via.placeholder.com/60',
              title: 'Product B',
              seller: 'Seller B',
              originalPrice: 'Rp 200,000',
              discountedPrice: 'Rp 170,000',
          },
          isRead: true, // Card sudah ditekan
      },
  ];

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <IonPage>
                <AppBar
                    position="fixed"
                    sx={{
                        backgroundColor: 'white',
                        borderBottomLeftRadius: '30px',
                        borderBottomRightRadius: '30px',
                        height: '82px',
                        paddingTop: '25px',
                    }}
                >
                    <Toolbar sx={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '10px' }}>
                        <Box display="flex" alignItems="center" sx={{ width: '100%' }}>
                            <IconButton onClick={handleBack} color="primary">
                                <ArrowBackIcon />
                            </IconButton>
                            <Typography
                                variant="h6"
                                sx={{
                                    color: 'black',
                                    fontSize: '16px',
                                    fontWeight: 200,
                                    marginRight: 'auto',
                                    paddingLeft: '16px',
                                }}
                            >
                                Cart
                            </Typography>
                            <IconButton color="primary">
                                <ShoppingCartIcon />
                            </IconButton>
                            <IconButton color="primary" onClick={handleNotificationButtonClick}>
                                <NotificationsIcon />
                            </IconButton>
                            <IconButton color="primary" onClick={handleMessageButtonClick}>
                                <MailIcon />
                            </IconButton>
                        </Box>
                    </Toolbar>
                </AppBar>

                <IonContent fullscreen className={`${isModalOpen ? 'blurred-content' : ''} `}>
                    
                </IonContent>
            </IonPage>
        </ThemeProvider>
    );
};

export default CartPage;
