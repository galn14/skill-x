import React, { useState, useEffect } from 'react';
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Box,
    CssBaseline,
    Checkbox,
    Button,
    TextField,
    createTheme,
    ThemeProvider,
    Radio,
    RadioGroup,
    Divider,
    Avatar,
    FormControlLabel,
    Card
} from '@mui/material';
import { IonPage, IonContent } from '@ionic/react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MailIcon from '@mui/icons-material/Mail';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useHistory } from 'react-router-dom';
import '@fontsource/poppins';

const PaymentPage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const isLoggedIn = !!localStorage.getItem('userToken');
    const history = useHistory();

    const handleBack = () => history.goBack();

    const theme = createTheme({
        typography: {
            fontFamily: '"Poppins"',
        },
    });

    const handleNotificationButtonClick = () => {
        if (isLoggedIn) {
            history.push('/notification');
        } else {
            history.push('/login');
        }
    };

    const handleCartButtonClick = () => {
        if (isLoggedIn) {
            history.push('/cart');
        } else {
            history.push('/login');
        }
    };

    const handleMessageButtonClick = () => {
        if (isLoggedIn) {
            history.push('/messages');
        } else {
            history.push('/login');
        }
    };

    const [selectedProducts, setSelectedProducts] = useState<any[]>([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const storedProducts = localStorage.getItem('selectedProducts');
        if (storedProducts) {
            const parsedProducts = JSON.parse(storedProducts);
            setSelectedProducts(parsedProducts);

            // Hitung total harga
            const calculatedTotal = parsedProducts.reduce(
                (acc: number, product: any) => acc + product.price * product.quantity,
                0
            );
            setTotalPrice(calculatedTotal);
        }
    }, []);


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
                                Payment
                            </Typography>
                            <IconButton color="primary" onClick={handleCartButtonClick}>
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

                <IonContent>
                    <Box sx={{ padding: '16px', marginTop: '100px' }}>
                        {/* User Info */}
                        <Box display="flex" alignItems="center" gap="16px" marginBottom="16px">
                            <Avatar src="/path/to/avatar.png" alt="User Avatar" />
                            <Box>
                                <Typography fontWeight="bold">Aileen Liexiui</Typography>
                                <Typography variant="body2" color="textSecondary">
                                    <span role="img" aria-label="badge">
                                        🌸
                                    </span>{" "}
                                    Package Database Website
                                </Typography>
                            </Box>
                        </Box>

                        {/* Product Details */}
                        <Box>
                            {selectedProducts.map((product, index) => (
                                <Card
                                    key={index}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        marginBottom: '16px',
                                        padding: '16px',
                                        backgroundColor: '#f9f9f9',
                                        boxShadow: 'none',
                                        border: '1px solid #ddd',
                                        borderRadius: '8px',
                                    }}
                                >
                                    <Box display="flex" alignItems="center" gap="16px">
                                        <Avatar
                                            src={product.productImage || 'https://via.placeholder.com/80'}
                                            alt={product.productName}
                                            sx={{ width: 56, height: 56 }}
                                        />
                                        <Box>
                                            <Typography fontWeight="bold">{product.productName}</Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                {product.category}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                Quantity: {product.quantity}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Typography fontWeight="bold">{`Rp${product.price * product.quantity}`}</Typography>
                                </Card>
                            ))}
                        </Box>



                        {/* Payment Method */}
                        <Box marginTop="32px">
                            <Typography fontWeight="bold">Payment Method</Typography>
                            <RadioGroup defaultValue="gopay">
                                <FormControlLabel
                                    value="gopay"
                                    control={<Radio color="primary" />}
                                    label={
                                        <Box display="flex" alignItems="center" gap="8px">
                                            <Avatar
                                                src="https://upload.wikimedia.org/wikipedia/commons/9/99/Gojek_logo_2021.svg"
                                                alt="Gopay"
                                                sx={{ width: "24px", height: "24px" }}
                                            />
                                            <Typography>Gopay</Typography>
                                        </Box>
                                    }
                                />
                                <FormControlLabel
                                    value="bca"
                                    control={<Radio color="primary" />}
                                    label={
                                        <Box display="flex" alignItems="center" gap="8px">
                                            <Avatar
                                                src="https://upload.wikimedia.org/wikipedia/commons/c/cf/BCA_logo.svg"
                                                alt="BCA"
                                                sx={{ width: "24px", height: "24px" }}
                                            />
                                            <Typography>BCA Virtual Account</Typography>
                                        </Box>
                                    }
                                />
                            </RadioGroup>
                        </Box>

                        <Divider sx={{ marginY: "16px" }} />

                        {/* Total and Pay Button */}
                        <Box>
                            <Typography fontWeight="bold" fontSize="16px">Check Your Transaction Summary</Typography>
                            <Box display="flex" justifyContent="space-between" marginTop="8px">
                                <Typography>Total Price</Typography>
                                <Typography>{`Rp${totalPrice}`}</Typography>
                            </Box>
                            <Box display="flex" justifyContent="space-between" marginTop="8px">
                                <Typography>Tax and Services Fee (2%)</Typography>
                                <Typography>{`Rp${(totalPrice * 0.02).toFixed(0)}`}</Typography>
                            </Box>
                            <Divider sx={{ marginY: "16px" }} />
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Typography fontWeight="bold" fontSize="20px">
                                    Total: <span style={{ color: "#0094FF" }}>{`Rp${(totalPrice * 1.02).toFixed(0)}`}</span>
                                </Typography>
                                <Button
                                    variant="contained"
                                    sx={{
                                        backgroundColor: "#0094FF",
                                        color: "#fff",
                                        borderRadius: "20px",
                                        padding: "12px 24px",
                                        textTransform: "none",
                                        fontSize: "16px",
                                    }}
                                >
                                    Pay Now
                                </Button>
                            </Box>
                        </Box>

                    </Box>
                </IonContent>
            </IonPage>
        </ThemeProvider>
    );
};

export default PaymentPage;

