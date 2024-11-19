import React, { useState } from 'react';
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
import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PersonIcon from '@mui/icons-material/Person';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IonPage, IonContent } from '@ionic/react';
import '@fontsource/poppins';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const FullstackDevelopment: React.FC = () => {
  const [isFavorited, setIsFavorited] = useState(false);
  const { state } = useLocation<any>();
  const { product } = state || {};
  const history = useHistory();
  const handleBack = () => history.goBack();


  const productData = product || {
    image: 'https://ionicframework.com/docs/img/demos/thumbnail.svg',
    name: 'Full Stack Development',
    priceRange: 'Rp. 1.000.000 - Rp. 1.500.000',
    sold: 10,
    rating: 4.5,
    totalRatings: 20,
  };

  const handleFavoriteToggle = () => {
    setIsFavorited(!isFavorited);
  };

  const theme = createTheme({
    typography: {
      fontFamily: '"Poppins"',
    },
  });


  const [userInfo, setUserInfo] = React.useState(() => {
    return JSON.parse(localStorage.getItem('userInfo') || '{}');
  });

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
              <IconButton color="primary">
                <ShoppingCartIcon />
              </IconButton>
              <IconButton color="primary">
                <MailIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>

        <IonContent>
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
            {/* Fullscreen Image */}
            <Box
              component="img"
              src={productData.image}
              alt={productData.name}
              sx={{
                width: '100%',
                height: '70vw',
                borderRadius: '15px',
                objectFit: 'cover',
                marginBottom: '16px',
              }}
            />

            {/* Price Range */}
            <Typography
              variant="h6"
              sx={{
                fontWeight: 'bold',
                marginBottom: '8px',
                color: '#333',
                fontSize: '18px',
                alignItems: 'flex-start',
                borderBottom: '1px solid black',
              }}
            >
              {productData.priceRange}
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
                  {productData.name}
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
                  Sold: {productData.sold}
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
                  <Typography variant="body2" sx={{ fontSize: '14px', color: '#333' }}>
                    {productData.rating} ({productData.totalRatings})
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Border */}
            <Box
              sx={{
                width: '100%',
                height: '1px',
                backgroundColor: 'black',
                marginY: '16px',
              }}
            />

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

            {/* Border */}
            <Box
              sx={{
                width: '100%',
                height: '1px',
                backgroundColor: 'black',
                marginY: '16px',
              }}
            />

            <Grid
              container
              spacing={3}
              sx={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {/* Avatar Section */}
              <Grid
                item
                xs="auto"
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: '16px', // Margin kiri untuk keselarasan
                }}
              >
                <Box
                  component="img"
                  src="https://via.placeholder.com/80" // Placeholder untuk gambar profil
                  alt="Profile Picture"
                  sx={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%', // Membuat gambar bulat
                    objectFit: 'cover',
                  }}
                />
              </Grid>

              {/* Profil Informasi */}
              <Grid
                item
                xs
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  textAlign: 'left',
                  marginLeft: '16px', // Memberi ruang dari avatar
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 'bold',
                    marginBottom: '2px',
                    fontSize: { xs: '12px', sm: '14px', md: '16px' }, // Responsif berdasarkan layar
                  }}
                >
                  {userInfo.name || 'Nama Pengguna'}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{
                    marginBottom: '6px',
                    fontSize: { xs: '11px', sm: '13px', md: '14px' }, // Responsif berdasarkan layar
                  }}
                >
                  {userInfo.organization || 'Universitas'} | {userInfo.major || 'Major'}
                </Typography>

                {/* Negara dan Informasi Tambahan */}
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '2px' }}>
                    <LanguageIcon fontSize="small" sx={{ marginRight: 0.5 }} />
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{
                        fontSize: { xs: '11px', sm: '12px', md: '14px' }, // Responsif berdasarkan layar
                      }}
                    >
                      {userInfo.language || 'Indonesia'}
                    </Typography>
                  </Box>

                  {/* Informasi Tambahan */}
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{
                      fontSize: { xs: '11px', sm: '12px', md: '14px' }, // Responsif berdasarkan layar
                    }}
                  >
                    Rating: {userInfo.rating || '4.8'} | Products: {userInfo.products || '12'} | Total Orders:{' '}
                    {userInfo.orders || '150'}
                  </Typography>
                </Box>
              </Grid>

              {/* Tombol Follow dan Message */}
              <Grid
                item
                xs="auto"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginRight: '16px', // Memberi ruang di kanan
                  height: '80px', // Menyesuaikan tinggi keseluruhan
                }}
              >
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    width: '80px',
                    maxWidth: '100px',
                    borderRadius: '10px',
                    textTransform: 'none',
                    fontSize: { xs: '10px', sm: '12px', md: '14px' }, // Responsif berdasarkan layar
                    marginBottom: '10px',
                    backgroundColor: '#FF4081', // Warna background kustom
                    color: '#FFFFFF', // Warna teks (putih agar kontras)
                    '&:hover': {
                      backgroundColor: '#E73370', // Warna saat tombol di-hover
                    },
                  }}
                >
                  Follow
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    width: '80px',
                    maxWidth: '100px',
                    borderRadius: '10px',
                    textTransform: 'none',
                    fontSize: { xs: '10px', sm: '12px', md: '14px' }, // Responsif berdasarkan layar
                    backgroundColor: '#43A047', // Warna border untuk tombol outlined
                    color: '#FFFFFF', // Warna teks
                    '&:hover': {
                      borderColor: '#388E3C', // Warna border saat di-hover
                      color: '#388E3C', // Warna teks saat di-hover
                    },
                  }}
                >
                  Message
                </Button>
              </Grid>
            </Grid>
          </Box>

          <AppBar
            position="fixed"
            sx={{
              top: 'auto',
              bottom: 0,
              backgroundColor: 'white',
              boxShadow: '0px -1px 5px rgba(0,0,0,0.1)', // Bayangan di bagian atas untuk transisi
              height: '80px',
              zIndex: 1300, // Pastikan AppBar berada di atas konten lain
            }}
          >
            <Toolbar
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingX: '16px',
              }}
            >
              {/* Tombol Buy Now */}
              <Button
                variant="contained"
                size="large"
                sx={{
                  width: '50%',
                  marginRight: '20px',
                  borderRadius: '10px',
                  backgroundColor: '#43A047',
                  color: 'white',
                  textTransform: 'none',
                  fontWeight: 'bold',
                  fontSize: { xs: '14px', sm: '16px' }, // Responsif untuk layar kecil
                  '&:hover': {
                    backgroundColor: '#388E3C', // Warna hover
                  },
                }}
              >
                Buy Now
              </Button>

              {/* Tombol Add to Cart */}
              <Button
                variant="contained"
                size="large"
                sx={{
                  width: '50%',
                  backgroundColor: '#0094FF',
                  borderRadius: '10px',
                  color: 'white',
                  textTransform: 'none',
                  fontWeight: 'bold',
                  fontSize: { xs: '14px', sm: '16px' }, // Responsif untuk layar kecil
                  '&:hover': {
                    backgroundColor: '#0077CC', // Warna hover
                  },
                }}
              >
                Add to Cart
              </Button>
            </Toolbar>
          </AppBar>

          {/* Konten Utama */}
          <Box
            sx={{
              paddingBottom: '80px', // Memberikan ruang di bawah agar tidak tertutup AppBar
              overflowY: 'auto', // Pastikan konten bisa discroll
            }}
          >
            {/* Konten lainnya */}
          </Box>

        </IonContent>
      </IonPage>
    </ThemeProvider>
  );
};

export default FullstackDevelopment;
