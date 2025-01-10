import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  CssBaseline,
  createTheme,
  ThemeProvider,
  Button,
  Grid,
} from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MailIcon from '@mui/icons-material/Mail';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PersonIcon from '@mui/icons-material/Person';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IonPage, IonContent } from '@ionic/react';
import '@fontsource/poppins';
import { useHistory, useParams } from 'react-router-dom';
import { fetchUserDetails, getUserAndSellerData, searchProducts, fetchProductDetails } from '../../api.service';

interface DetailProductProps {
  id: string; // `id` passed from the route
  productId : string;
}
  
const DetailProduct: React.FC<DetailProductProps> = ({id, productId}) => {
  const { username, productName } = useParams<{ username: string; productName: string }>();
  const [isFavorited, setIsFavorited] = useState(false);
  const [productData, setProductData] = useState<any>(null);
  const [sellerData, setSellerData] = useState<any>(null);
  const history = useHistory();
  const isLoggedIn = !!localStorage.getItem('userToken');
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');

  const handleBack = () => history.goBack();

  const handleAddToCart = () => {
    // Logic untuk menambahkan produk ke keranjang (jika ada)
    isLoggedIn ? history.push('/cart') : history.push('/login');
  };

  const handleFavoriteToggle = () => {
    setIsFavorited(!isFavorited);
  };

  useEffect(() => {
  
    const fetchSellerData = async () => {
      try {
        console.log("Fetching data for user ID:", id);
        const sellerData = await fetchUserDetails(id);

        setSellerData(sellerData);
      } catch (error) {
        console.error("Error fetching seller data:", error);
      }
    };
    console.log(sellerData);
    fetchSellerData();
  
    return () => {
    };
  }, [id, productId]);

  useEffect(() => {
  
    const fetchProductData = async () => {
      try {
        const productsData = await fetchProductDetails(id, productId);
        setProductData(productsData);
      } catch (error) {
        console.error("Error fetching seller data:", error);
      }
    };
    console.log(productData);
    fetchProductData();
  
    return () => {
    };
  }, [id, productId]);

  const theme = createTheme({
    typography: {
      fontFamily: '"Poppins"',
    },
  });

  const handleMessageButtonClick = () => {
    isLoggedIn ? history.push('/messages') : history.push('/login');
  };

  const handleCartButtonClick = () => {
    isLoggedIn ? history.push('/cart') : history.push('/login');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <IonPage>
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
          <Toolbar style={{ height: '100%', alignItems: 'flex-end', paddingBottom: '10px' }}>
            <Box display="flex" alignItems="center" sx={{ width: '100%' }}>
              <IconButton onClick={handleBack} color="primary">
                <ArrowBackIcon />
              </IconButton>
              <img
                src="../public/SkillXLogo.png"
                alt="SkillEx Logo"
                className="logo"
                style={{ marginRight: 'auto', height: '40px' }}
              />
              <IconButton color="primary">
                <SearchIcon />
              </IconButton>
              <IconButton color="primary" onClick={handleCartButtonClick}>
                <ShoppingCartIcon />
              </IconButton>
              <IconButton color="primary" onClick={handleMessageButtonClick}>
                <MailIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>

        <IonContent>
          <Box
            sx={{
              marginTop: '120px',
              paddingX: '15px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'left',
              justifyContent: 'center',
            }}
          >
            {/* Fullscreen Image */}
            <Box
              component="img"
              src={productData?.photo_url?.[0] || 'https://via.placeholder.com/150'}
              alt={productData?.nameProduct || 'Product Image'}
              sx={{
                width: '100%',
                height: '70vw',
                borderRadius: '15px',
                objectFit: 'cover',
                marginBottom: '35px',
              }}
            />

            {/* Price Range */}
            <Typography
              variant="h6"
              sx={{
                fontWeight: 'bold',
                marginBottom: '8px',
                color: '#0072CC',
                fontSize: '30px',
                alignItems: 'flex-start',
                borderBottom: '1px solid black',
              }}
            >
              Rp. {productData?.price || 'Price not available'}
            </Typography>

            {/* Title, Favorite Icon, Sold, and Rating */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                alignItems: 'flex-start',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                  alignItems: 'center',
                }}
              >
                {/* Product Title */}
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 'bold',
                    fontSize: '20px',
                  }}
                >
                  {productData?.nameProduct || 'Unknown Product'}
                </Typography>

                {/* Favorite Icon */}
                <IconButton onClick={handleFavoriteToggle}>
                  {isFavorited ? (
                    <FavoriteIcon sx={{ color: 'red' }} />
                  ) : (
                    <FavoriteBorderIcon sx={{ color: 'black' }} />
                  )}
                </IconButton>
              </Box>

              {/* Sold and Rating */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  gap: '16px',
                  marginTop: '8px',
                }}
              >
                <Typography variant="body2" sx={{ fontSize: '14px', color: 'gray' }}>
                  Sold: {productData?.sold || 'N/A'}
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    border: '1px solid gray',
                    padding: '4px 8px',
                    borderRadius: '8px',
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ fontSize: '14px', color: '#FFD700', marginRight: '4px' }}
                  >
                    ★
                  </Typography>
                  <Typography variant="body2">
                    {productData?.rating || 'N/A'} ({productData?.totalRatings || '0'})
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Additional Info */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <LocalShippingIcon sx={{ color: '#333' }} />
              <Typography variant="body2" sx={{ fontSize: '14px' }}>
                Average order is completed within{' '}
                <Typography
                  component="span"
                  variant="body2"
                  sx={{ fontSize: '14px', color: '#0094FF', fontWeight: 'bold' }}
                >
                  3 days
                </Typography>
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <PersonIcon sx={{ color: '#333' }} />
              <Typography variant="body2" sx={{ fontSize: '14px' }}>
                Average user satisfaction{' '}
                <Typography
                  component="span"
                  variant="body2"
                  sx={{ fontSize: '14px', color: 'green', fontWeight: 'bold' }}
                >
                  99% 🔥
                </Typography>
              </Typography>
            </Box>

            {/* Profile Info */}
            <Grid
              container
              spacing={3}
              sx={{
                marginTop: '10px',
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Grid item xs="auto">
                <Box
                  component="img"
                  src={sellerData?.photoURL || 'https://via.placeholder.com/80'}
                  alt="Profile Picture"
                  sx={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                  }}
                />
              </Grid>

              <Grid item xs>
                <Typography variant="body2" sx={{ fontWeight: 'bold', marginBottom: '2px' }}>
                  {sellerData?.name || 'User Name'}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {sellerData?.organization || 'Organization'} | {sellerData?.major || 'Major'}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          
          <Box
    sx={{
      marginTop: '90px',
      paddingX: '15px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'left',
      justifyContent: 'center',
    }}
  >
    {/* Komponen lainnya */}
    
    {/* Tombol Add to Cart */}
    <Button
      variant="contained"
      startIcon={<ShoppingCartCheckoutIcon />}
      onClick={handleAddToCart}
      sx={{
        backgroundColor: '#0072CC', // Warna biru lebih tua
        color: '#fff',
        fontWeight: 'bold',
        paddingX: '16px',
        paddingY: '8px',
        fontSize: '14px',
        borderRadius: '8px',
        marginTop: '16px',
        ':hover': {
          backgroundColor: '#005BBB', // Warna biru lebih gelap untuk efek hover
        },
      }}
    >
      Add to Cart
    </Button>
  </Box>
          
        </IonContent>
      </IonPage>
    </ThemeProvider>
  );
};

export default DetailProduct;