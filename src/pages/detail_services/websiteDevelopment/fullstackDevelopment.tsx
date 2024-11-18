import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  InputBase,
  CssBaseline,
  GlobalStyles,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MailIcon from '@mui/icons-material/Mail';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import { IonPage, IonContent } from '@ionic/react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '@fontsource/poppins';
import { useHistory, Link } from 'react-router-dom';

const FullstackDevelopment: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const history = useHistory();
  const isLoggedIn = !!localStorage.getItem('userToken');

  const sponsoredContent = [
    {
      id: 1,
      image: 'https://ionicframework.com/docs/img/demos/thumbnail.svg',
      name: 'Full Stack Development',
      price: 'Rp. 1.500.000',
      seller: 'John Doe',
    },
    {
      id: 2,
      image: 'https://ionicframework.com/docs/img/demos/thumbnail.svg',
      name: 'UI/UX Design',
      price: 'Rp. 1.000.000',
      seller: 'Jane Smith',
    },
  ];

  const nonSponsoredContent = [
    {
      id: 1,
      image: 'https://ionicframework.com/docs/img/demos/thumbnail.svg',
      name: 'Frontend Development',
      price: 'Rp. 800.000',
      seller: 'Mike Brown',
    },
    {
      id: 2,
      image: 'https://ionicframework.com/docs/img/demos/thumbnail.svg',
      name: 'Backend Development',
      price: 'Rp. 900.000',
      seller: 'Emily White',
    },
    {
      id: 3,
      image: 'https://ionicframework.com/docs/img/demos/thumbnail.svg',
      name: 'Digital Marketing',
      price: 'Rp. 700.000',
      seller: 'Chris Green',
    },
  ];

  const theme = createTheme({
    typography: {
      fontFamily: '"Poppins"',
    },
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
          
        </IonContent>
      </IonPage>
    </ThemeProvider>
  );
};

export default FullstackDevelopment;
