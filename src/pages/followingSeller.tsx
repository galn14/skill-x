import React, { useState } from 'react';
import {
  Grid,
  InputBase,
  Typography,
  IconButton,
  Button,
  Card,
  AppBar,
  Toolbar,
  Box,
} from '@mui/material';
import { IonPage, IonContent } from '@ionic/react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MailIcon from '@mui/icons-material/Mail';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import { useHistory } from 'react-router-dom';
import { CssBaseline, GlobalStyles } from '@mui/material';
import '@fontsource/poppins';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  Avatar,
  CardMedia,
  CardContent,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
const theme = createTheme({
  typography: {
    fontFamily: '"Poppins"',
  },
});

const FollowingSeller: React.FC = () => {
  const history = useHistory();
  const [searchQuery, setSearchQuery] = useState('');
  const [sellers, setSellers] = useState([
    {
      id: 1,
      name: 'John Doe',
      image: 'https://via.placeholder.com/150',
      description: 'Specialist in graphic design and branding.',
    },
    {
      id: 2,
      name: 'Jane Smith',
      image: 'https://via.placeholder.com/150',
      description: 'Experienced photographer and videographer.',
    },
  ]);

  const products = [
    { id: 1, title: "Package Portfolio Website", image: "https://via.placeholder.com/300" },
    { id: 2, title: "Product Photography", image: "https://via.placeholder.com/300" },
    { id: 3, title: "Package Script Video", image: "https://via.placeholder.com/300" },
    { id: 4, title: "Package Script Video", image: "https://via.placeholder.com/300" },
    { id: 5, title: "Extra Product", image: "https://via.placeholder.com/300" },
  ];
  const handleBack = () => history.goBack();

  const handleRemove = (id: number) =>
    setSellers((prev) => prev.filter((seller) => seller.id !== id));

  const filteredSellers = sellers.filter((seller) =>
    seller.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          <Toolbar>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <IconButton onClick={handleBack} color="primary">
                <ArrowBackIcon />
              </IconButton>
              <Typography
                variant="h6"
                sx={{ color: '#838383', textAlign: 'left', flexGrow: 1 }}
              >
                Following Seller
              </Typography>
              <Box>
                <IconButton color="primary">
                  <ShoppingCartIcon />
                </IconButton>
                <IconButton color="primary">
                  <NotificationsIcon />
                </IconButton>
                <IconButton color="primary">
                  <MailIcon />
                </IconButton>
              </Box>
            </Box>
          </Toolbar>
        </AppBar>

        <IonContent fullscreen>
        <Box
      sx={{
        border: "1px solid #ddd",
        borderRadius: "10px",
        p: 2,
        maxWidth: "600px",
        margin: "auto",
        marginTop:"100px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        marginLeft:"20px",
        marginRight:"20px"     
      }}
    >
      {/* Header */}
      <Box display="flex" alignItems="center" gap={2}>
        <Avatar
          src="https://via.placeholder.com/80" // URL Avatar
          alt="Seller Avatar"
          sx={{ width: 80, height: 80 }}
        />
        <Box flexGrow={1}>
          <Typography variant="h6" fontWeight="bold">
            AileenLiexiulai
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{fontSize:'0.8rem'}}>
            Computer Science | <br></br> 
            Binus University
          </Typography>
          <Box display="flex" alignItems="center" gap={0.5} mt={1}>
            <StarIcon fontSize="small" color="warning" />
            <Typography variant="body2" fontWeight="bold">
              4.9
            </Typography>
          </Box>
        </Box>
        <Button 
         variant="contained"
         color="primary"
         size="medium" // Mengatur ukuran tombol menjadi kecil
         sx={{
           padding: '4px 8px', // Mengatur padding tombol
           fontSize: '0.8rem', // Ukuran teks lebih kecil
           minWidth: 'auto', // Menghapus lebar minimum default
           textTransform: 'none', // Mengatur huruf agar tidak semua kapital
           flexShrink: 0, // Menjaga tombol agar tidak memanjang
          }}>
          Visit Seller
        </Button>
      </Box>

      {/* Card List */}
      <CardContent>
    <div className="scrollable-grid" 
    style={{ 
      display: 'flex', // Mengatur item dalam baris
      overflowX: 'auto', // Memungkinkan scroll horizontal
      gap: 2, // Memberikan jarak antar card
      whiteSpace: 'nowrap', // Mencegah item membungkus ke baris berikutnya
      paddingBottom: 2,}}>
        
      {products.slice(0, 4).map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <Card  sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              borderRadius: '12px',
              overflow: 'hidden',
              margin: '8px',
              width: '125px', // Adjust the card width to fit in the scrollable container
              height: '200px',
              padding: '10px',
              borderColor: '#ABABAB',
              backgroundColor: 'white',
              flexShrink: 0, // Prevent shrinking in the scrollable flex container
            }}>
               <Box
              className="image-wrapper"
              sx={{
                width: '100%',
                height: '120px',
                marginBottom: '10px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
                borderRadius: '8px',
              }}
            >
               <img
                src={product.image}
                alt={product.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
                          </Box>

           
              <CardContent sx={{  padding: '0',
                textAlign: 'left',
                paddingBottom: '0', }}>
                <Typography variant="h6" 
                sx={{
                  textAlign: 'left',
                  wordBreak: 'break-word',
                  whiteSpace: 'normal',
                  fontSize: '14px',
                  fontWeight: 'bold',
                }}>
                  {product.title}
                </Typography>
                <Typography 
                variant="body2"
                sx={{
                  textAlign: 'left',
                  fontSize: '12px',
                  color: 'textSecondary',
                }}>
                  AileenLiexiulai
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </div>
      </CardContent>
    </Box>
    </IonContent>
      </IonPage>
    </ThemeProvider>
  );
};

export default FollowingSeller;
