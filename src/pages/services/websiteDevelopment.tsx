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
import { useHistory } from 'react-router';

const WebsiteDevelopment: React.FC = () => {
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

        <IonContent>
          <Box sx={{ paddingTop: '110px', paddingX: '30px' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                border: '2px solid #ABABAB',
                borderRadius: '15px',
                padding: '0 10px',
                height: '40px',
                boxSizing: 'border-box',
                marginBottom: '10px',
              }}
            >
              <IconButton color="primary" sx={{ padding: 0 }}>
                <SearchIcon />
              </IconButton>
              <InputBase
                placeholder="Search the right services"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{
                  flex: 1,
                  color: '#333',
                  fontSize: '11px',
                }}
              />
            </Box>
          </Box>

          <Box sx={{ padding: '10px', marginTop: '5px', display: 'flex', justifyContent: 'center' }}>
            <Box
              sx={{
                backgroundColor: '#0094FF',
                borderTopLeftRadius: '30px',
                borderTopRightRadius: '30px',
                padding: '15px',
                marginBottom: '20px',
                width: '80%',
                textAlign: 'center',
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#fff',
                }}
              >
                Computer Science
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: '#fff',
                  fontSize: '14px',
                  marginTop: '5px',
                }}
              >
                Find any opportunities in related major!
              </Typography>
            </Box>
          </Box>

          {/* Sponsored Section */}
          <Typography variant="h6" sx={{ fontWeight: 'bold', marginTop: '20px', marginLeft: '30px' }}>
            Sponsored
          </Typography>
          <Box
            sx={{
              overflowX: 'auto',
              display: 'flex',
              gap: '10px',
              paddingBottom: '10px',
            }}
          >
            {sponsoredContent.map((item) => (
              <Box
                key={item.id}
                sx={{
                  border: '1px solid black',
                  margin: '5px',
                  padding: '10px',
                  borderRadius: '10px',
                  width: '80%',
                  flexShrink: 0,
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: '100%',
                    borderRadius: '10px',
                    marginBottom: '10px',
                  }}
                />
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  {item.name}
                </Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#0094FF' }}>
                  {item.price}
                </Typography>
                <Typography variant="caption" sx={{ color: '#555' }}>
                  {item.seller}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Non-Sponsored Content */}
          <Typography variant="h6" sx={{ fontWeight: 'bold', marginTop: '20px', marginLeft: '30px' }}>
            Other Services
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '10px',
            }}
          >
            {nonSponsoredContent.map((item) => (
              <Box
                key={item.id}
                sx={{
                  border: '1px solid lightgray',
                  borderRadius: '10px',
                  padding: '10px',
                  textAlign: 'center',
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: '100%',
                    borderRadius: '10px',
                    marginBottom: '10px',
                  }}
                />
                <Typography variant="h6" sx={{ fontSize: '14px', fontWeight: 'bold' }}>
                  {item.name}
                </Typography>
                <Typography variant="body2" sx={{ fontSize: '12px', color: 'gray' }}>
                  {item.price}
                </Typography>
                <Typography variant="body2" sx={{ fontSize: '12px', color: 'black' }}>
                  {item.seller}
                </Typography>
              </Box>
            ))}
          </Box>
        </IonContent>
      </IonPage>
    </ThemeProvider>
  );
};

export default WebsiteDevelopment;
