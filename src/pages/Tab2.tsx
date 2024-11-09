import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Card, CardContent, Typography, Box, Button } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { IonPage, IonContent } from '@ionic/react';
import './Tab2.css';

const Tab2: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState<any[]>([]);

  useEffect(() => {
    // Set data subscription
    setSubscriptions([
      { id: 1, name: 'Monthly', price: 'Rp. 50.000 / month', background: '#397BAA', link: '/subscribe/monthly' },
      { id: 2, name: 'Yearly', price: 'Rp. 450.000 / year', background: '#0094FF', link: '/subscribe/yearly' }
    ]);
  }, []);

  return (
    <IonPage>
      {/* Header */}
      <AppBar position="fixed" style={{ backgroundColor: 'white', borderBottomLeftRadius: '30px', borderBottomRightRadius: '30px', height: '82px', paddingTop: '25px' }}>
        <Toolbar style={{ height: '100%', alignItems: 'flex-end', paddingBottom: '10px' }}>
          <Box display="flex" alignItems="center" sx={{ width: '100%' }}>
            <img src="../public/SkillXLogo.png" alt="SkillEx Logo" className="logo" style={{ marginRight: 'auto' }} />
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
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <IonContent>
        <Box display="flex" flexDirection="column" alignItems="center" pt={{ xs:10, md:10, lg:10, xl:20 }} className="custom-content" >
          <Typography variant="h6" fontWeight="bold" color="white" align="center" mt={{ xs:1, md:2, lg:10, xl:20 }} marginBottom="17vh">
            Experience the different with pro
          </Typography>

          <Box className="logo-container" mt={{xs: 13, md:13, lg:25, xl:25}}>
            <img src="../public/SubscribeLogo2.png" alt="Logo" className="blur-logo" />
          </Box>

          {/* Subscription Cards */}
          <Box className="subscriptions">
            {subscriptions.map((subscription) => (
              <Card
                key={subscription.id}
                onClick={() => window.location.href = subscription.link}
                sx={{
                  backgroundColor: subscription.background,
                  width: '100%',
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
          <div className='subscribe-button-container'>
            <Button
              variant="contained"
              sx={{
                width: '100%',
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
          </div>

          {/* Terms Text */}
          <Typography variant="body2" color="#406580" align="center" mt={2}>
            Terms Apply | Cancel Anytime
          </Typography>

          {/* Footer */}
          <Box 
            className="footer-rectangle" 
            sx={{ 
              marginTop: '10vh',
              position: 'absolute', 
              bottom: 0, 
              width: '100%', 
              height: {
                xs: '44vh',
                sm: '50vh',
                md: '47vh',
                lg: '40vh',
              },
              borderTopLeftRadius: '24.946px', // Hanya bagian atas yang memiliki border-radius
              borderTopRightRadius: '24.946px', // Hanya bagian atas yang memiliki border-radius
              background: 'linear-gradient(180deg, #FFF 43.6%, #FFF 99.89%)' 
            }} 
          />
        </Box>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
