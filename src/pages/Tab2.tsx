import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Card, CardContent, Typography, Box, Button } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { IonPage, IonContent } from '@ionic/react';
import './Tab2.css';
import { CssBaseline, GlobalStyles } from '@mui/material';
import '@fontsource/poppins';  // Import the font
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useHistory } from 'react-router';


const Tab2: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [setIsLoggedIn] = useState<boolean>(false);
  const history = useHistory();
  const isLoggedIn = !!localStorage.getItem('userToken'); // Misalnya token disimpan di localStorage


  useEffect(() => {
    // Set data subscription
    setSubscriptions([
      { id: 1, name: 'Monthly', price: 'Rp. 50.000 / month', background: '#397BAA', link: '/subscribe/monthly' },
      { id: 2, name: 'Yearly', price: 'Rp. 450.000 / year', background: '#0094FF', link: '/subscribe/yearly' }
    ]);
  }, []);
  const globalStyles = {
    '*': {
      fontFamily: 'Poppins',
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
    },
    ':root': {
      '--ion-font-family': 'Poppins',
    },
  };
  const theme = createTheme({
    typography: {
      fontFamily: '"Poppins"',  // Set font di tema
    },
  });

  const handleMessageClick = () => {
    if (isLoggedIn) {
      history.push('/message'); // Arahkan ke halaman Message jika login
    } else {
      history.push('/login'); // Arahkan ke halaman Login jika belum login
    }
  };

  const handleMessageButtonClick = () => {
    if (isLoggedIn) {
      history.push('/message'); // Redirect ke halaman message
    } else {
      history.push('/login'); // Redirect ke halaman login
    }
  };

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


  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <IonPage>
      {/* Header */}
      <AppBar position="fixed" style={{ backgroundColor: 'white', borderBottomLeftRadius: '30px', borderBottomRightRadius: '30px', height: '82px', paddingTop: '25px' }}>
          <Toolbar style={{ height: '100%', alignItems: 'flex-end', paddingBottom: '10px' }}>
            <Box display="flex" alignItems="center" sx={{ width: '100%' }}>
              <img src="../public/SkillXLogo.png" alt="SkillEx Logo" className="logo" style={{ marginRight: 'auto', height: '40px'}} />
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

      {/* Main Content */}
      <IonContent>
        <Box display="flex" flexDirection="column" alignItems="center" pt={15} className="custom-content" >
          <Typography variant="h6" fontWeight="bold" color="white" align="center" mt={1} marginBottom="150px">
            Experience the different with pro
          </Typography>

          <Box className="logo-container" mt={20}>
            <img src="../public/SubscribeLogo2.png" alt="Logo" className="blur-logo" />
          </Box>

          {/* Subscription Cards */}
          <Box className="subscriptions" mt={25}>
            {subscriptions.map((subscription) => (
              <Card
                key={subscription.id}
                onClick={() => window.location.href = subscription.link}
                sx={{
                  backgroundColor: subscription.background,
                  width: '348px',
                  height: '82px',
                  borderRadius: '18px',
                  marginBottom: '16px',
                  color: 'white',
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                  },
                }}
              >
                <CardContent sx={{ paddingLeft: '16px' }}>
                  <Typography variant="h5" fontWeight="bold">
                    {subscription.name}
                  </Typography>
                  <Typography variant="body2">
                    {subscription.price}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>

          {/* Subscribe Button */}
          <Button
            variant="contained"
            sx={{
              width: '348px',
              height: '59px',
              borderRadius: '18px',
              marginTop: '8px',
              backgroundColor: '#FFD600',
              transition: 'background-color 0.3s ease, transform 0.3s ease',
              '&:hover': {
                backgroundColor: '#ffc107',
                transform: 'scale(1.05)',
              },
            }}
          >
            <Typography fontWeight="bold">Subscribe</Typography>
          </Button>

          {/* Terms Text */}
          <Typography variant="body2" color="#406580" align="center" mt={2}>
            Terms Apply | Cancel Anytime
          </Typography>

          {/* Footer */}
          <Box 
            className="footer-rectangle" 
            style={{ 
              position: 'absolute', 
              bottom: 0, 
              width: '100%', 
              height: '450px', 
              borderTopLeftRadius: '24.946px', // Hanya bagian atas yang memiliki border-radius
              borderTopRightRadius: '24.946px', // Hanya bagian atas yang memiliki border-radius
              background: 'linear-gradient(180deg, #FFF 43.6%, #FFF 99.89%)' 
            }} 
          />
        </Box>
      </IonContent>
    </IonPage>
    </ThemeProvider>
  );
};

export default Tab2;