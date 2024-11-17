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
    Checkbox,
    Button,
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
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
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

    const [cartItems, setCartItems] = useState([
        {
          id: 1,
          logo: '🌐',
          seller: 'AileenLiexiulai',
          serviceName: 'Building Website',
          productImage: 'https://via.placeholder.com/80',
          productName: 'Package Portfolio Website',
          category: 'Computer Science',
          price: 500000,
          quantity: 1,
        },
        {
          id: 2,
          logo: '📊',
          seller: 'Data Analyst Co.',
          serviceName: 'Data Analysis',
          productImage: 'https://via.placeholder.com/80',
          productName: 'Data Analysis Course',
          category: 'Data Science',
          price: 500000,
          quantity: 1,
        },
        {
          id: 3,
          logo: '🎨',
          seller: 'Creative Minds',
          serviceName: 'Graphic Design',
          productImage: 'https://via.placeholder.com/80',
          productName: 'Graphic Design Package',
          category: 'Design',
          price: 500000,
          quantity: 1,
        },
      ]);
    
      const [selectAll, setSelectAll] = useState(false);
      const [selectedItems, setSelectedItems] = useState<number[]>([]);
    
      const handleQuantityChange = (id: number, change: number) => {
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item.id === id
              ? { ...item, quantity: Math.max(1, item.quantity + change) }
              : item
          )
        );
      };
    
      const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = event.target.checked;
        setSelectAll(isChecked);
        setSelectedItems(isChecked ? cartItems.map((item) => item.id) : []);
      };
    
      const handleSelectItem = (id: number) => {
        setSelectedItems((prevSelected) =>
          prevSelected.includes(id)
            ? prevSelected.filter((itemId) => itemId !== id)
            : [...prevSelected, id]
        );
      };
    
      const totalPrice = cartItems
        .filter((item) => selectedItems.includes(item.id))
        .reduce((acc, item) => acc + item.price * item.quantity, 0);

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
                    <Box sx={{ padding: '16px', marginTop: '100px' }}>
                    {cartItems.map((item) => (
                    <Card key={item.id} sx={{ marginBottom: '16px', borderRadius: '12px' }}>
                        <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography variant="h5" sx={{ fontSize: '32px', marginRight: '16px' }}>
                                {item.logo}
                            </Typography>
                            <Box sx={{ flex: 1 }}>
                                <Typography variant="subtitle1" fontWeight="bold">
                                {item.serviceName}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                {item.seller}
                                </Typography>
                            </Box>
                            </CardContent>
                            <Box
                            sx={{
                                borderTop: '1px solid #ddd',
                                display: 'flex',
                                alignItems: 'center',
                                padding: '16px',
                            }}
                            >
                            <CardMedia
                                component="img"
                                image={item.productImage}
                                sx={{ width: '80px', height: '80px', borderRadius: '8px', marginRight: '16px' }}
                            />
                            <Box sx={{ flex: 1 }}>
                                <Typography fontWeight="bold">{item.productName}</Typography>
                                <Typography variant="body2" color="textSecondary">
                                {item.category}
                                </Typography>
                                <Typography variant="body2" sx={{ marginTop: '8px' }}>
                                Total Order
                                </Typography>
                                <Typography variant="h6" color="primary">
                                Rp {item.price.toLocaleString('id-ID')}
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <IconButton onClick={() => handleQuantityChange(item.id, -1)}>
                                <RemoveIcon />
                                </IconButton>
                                <Typography>{item.quantity}</Typography>
                                <IconButton onClick={() => handleQuantityChange(item.id, 1)}>
                                <AddIcon />
                                </IconButton>
                                <Checkbox
                                checked={selectedItems.includes(item.id)}
                                onChange={() => handleSelectItem(item.id)}
                                />
                            </Box>
                            </Box>
                        </Card>
                        ))}
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginTop: '16px',
                                padding: '16px',
                                borderTop: '1px solid #ddd',
                            }}
                            >
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Checkbox checked={selectAll} onChange={handleSelectAll} />
                                <Typography>All</Typography>
                            </Box>
                            <Box sx={{ textAlign: 'right', marginRight: '1px', alignItems:'right' }}> {/* Rata kanan */}
                                <Typography>Total</Typography>
                                <Typography variant="h6" color="primary">
                                Rp {totalPrice.toLocaleString('id-ID')}
                                </Typography>
                            </Box>
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{
                                borderRadius: '8px',
                                width: '80px',
                                fontSize: '16px', // Membesarkan teks
                                }}
                            >
                                Buy
                            </Button>
                            </Box>
                    </Box>
                </IonContent>
            </IonPage>
        </ThemeProvider>
    );
};

export default CartPage;
