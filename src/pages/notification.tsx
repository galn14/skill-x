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

const NotificationPage: React.FC = () => {
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
        history.push('/messages'); // Redirect ke halaman message
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

    

    const handleBack = () => history.goBack();

    const theme = createTheme({
        typography: {
            fontFamily: '"Poppins"',
        },
    });

    const [notifications, setNotifications] = useState([
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
            isRead: false,
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
            isRead: true,
        },
    ]);
    

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
                                Notification
                            </Typography>
                            <IconButton color="primary" onClick={handleCartButtonClick}>
                                <ShoppingCartIcon />
                            </IconButton>
                            <IconButton color="primary">
                                <NotificationsIcon />
                            </IconButton>
                            <IconButton color="primary" onClick={handleMessageButtonClick}>
                                <MailIcon />
                            </IconButton>
                        </Box>
                    </Toolbar>
                </AppBar>

                <IonContent fullscreen className={`${isModalOpen ? 'blurred-content' : ''} `}>
                    <Box
                        sx={{
                            backgroundColor: '#007bff', // Warna biru
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-around',
                                alignItems: 'center',
                                marginTop: '90px',
                                padding: '10px',
                                width: '95%',
                                maxWidth: '800px',
                                gap: '16px',
                                flexWrap: 'wrap',
                            }}
                        >
                            {/* Filter: On Going Transaction */}
                            <FormControl sx={{ flex: '1 1 30%' }}>
                                <Select
                                    value={onGoingTrans}
                                    onChange={(e) => setOnGoingTrans(e.target.value)}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Ongoing Transaction' }}
                                    sx={{
                                        backgroundColor: '#FFFFFF',
                                        borderRadius: '20px',
                                        '& .MuiSelect-select': {
                                            padding: '8px',
                                            fontSize: '12px',
                                        },
                                    }}
                                >
                                    <MenuItem value="Ongoing Transaction">Ongoing Transaction</MenuItem>
                                </Select>
                            </FormControl>

                            {/* Filter: Waiting for Payment */}
                            <FormControl sx={{ flex: '1 1 30%' }}>
                                <Select
                                    value={waitingPayment}
                                    onChange={(e) => setWaitingPayment(e.target.value)}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Waiting for Payment' }}
                                    sx={{
                                        backgroundColor: '#FFFFFF',
                                        borderRadius: '20px',
                                        '& .MuiSelect-select': {
                                            padding: '8px',
                                            fontSize: '12px',
                                        },
                                    }}
                                >
                                    <MenuItem value="Waiting Payment">Waiting For Payment</MenuItem>
                                </Select>
                            </FormControl>

                            {/* Filter: Promo */}
                            <FormControl sx={{ flex: '1 1 30%' }}>
                                <Select
                                    value={promo}
                                    onChange={(e) => setPromo(e.target.value)}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Promo' }}
                                    sx={{
                                        backgroundColor: '#FFFFFF',
                                        borderRadius: '20px',
                                        '& .MuiSelect-select': {
                                            padding: '8px',
                                            fontSize: '12px',
                                        },
                                    }}
                                >
                                    <MenuItem value="Promo">Promo</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Box>

                    <Box sx={{ padding: '20px', backgroundColor: '#F4F4F4' }}>
                        {notifications.map((notification, index) => (
                            <Card
                                key={notification.id}
                                onClick={() => {
                                    const updatedNotifications = [...notifications];
                                    updatedNotifications[index].isRead = true; // Ubah status isRead menjadi true
                                    setNotifications(updatedNotifications); // Update state
                                }}
                                sx={{
                                    backgroundColor: notification.isRead ? '#3CB23257' : '#FFFFFF',
                                    borderRadius: '16px',
                                    marginBottom: '10px',
                                    padding: '16px',
                                    border: notification.isRead ? '2px solid #3CB232' : '2px solid transparent',
                                    cursor: 'pointer', // Tunjukkan bahwa card bisa diklik
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        marginBottom: '8px',
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            backgroundColor: '#3CB232',
                                            color: 'white',
                                            borderRadius: '15px',
                                            padding: '4px 8px',
                                            fontSize: '12px',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        {notification.type}
                                    </Typography>
                                    <Typography sx={{ fontSize: '12px', color: '#666' }}>
                                        {notification.time}
                                    </Typography>
                                </Box>
                                <Typography sx={{ fontSize: '14px', color: '#000', marginBottom: '8px' }}>
                                    {notification.description}
                                </Typography>
                                <Card
                                    sx={{
                                        display: 'flex',
                                        backgroundColor: notification.isRead ? '#EAF7E9' : '#3CB23257',
                                        borderRadius: '12px',
                                        padding: '6px',
                                        height: '60px',
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        image={notification.product.image}
                                        alt="Product Image"
                                        sx={{
                                            width: '60px',
                                            height: '60px',
                                            borderRadius: '8px',
                                        }}
                                    />
                                    <CardContent
                                        sx={{
                                            flex: 1,
                                            padding: '8px 16px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between',
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <Typography sx={{ fontSize: '14px', fontWeight: 'bold', color: '#000' }}>
                                                {notification.product.title}
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    fontSize: '14px',
                                                    color: '#0094FF',
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                {notification.product.originalPrice}
                                            </Typography>
                                        </Box>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                marginTop: '4px',
                                            }}
                                        >
                                            <Typography sx={{ fontSize: '12px', color: '#666' }}>
                                                {notification.product.seller}
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    fontSize: '12px',
                                                    color: 'red',
                                                    textDecoration: 'line-through',
                                                }}
                                            >
                                                {notification.product.discountedPrice}
                                            </Typography>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Card>
                        ))}
                    </Box>
                </IonContent>
            </IonPage>
        </ThemeProvider>
    );
};

export default NotificationPage;
