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
          <Box sx={{ paddingTop: '110px', paddingX: '20px' }}>
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
                marginBottom: '20px',
              }}
            >
              <IconButton color="primary" sx={{ padding: 0 }}>
                <SearchIcon />
              </IconButton>
              <InputBase
                placeholder="Search sellers"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{
                  flex: 1,
                  color: '#333',
                  fontSize: '11px',
                }}
              />
            </Box>

            <Box sx={{ paddingX: '20px' }}>
              {filteredSellers.length > 0 ? (
                <Grid container spacing={2}>
                  {filteredSellers.map((seller) => (
                    <Grid item xs={12} sm={6} md={4} key={seller.id}>
                      <Card
                        sx={{
                          border: '2px solid #ABABAB',
                          borderRadius: '5.44px',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          padding: '10px',
                        }}
                      >
                        <img
                          src={seller.image}
                          alt={seller.name}
                          style={{
                            borderRadius: '10px',
                            width: '100px',
                            height: '100px',
                            objectFit: 'cover',
                          }}
                        />
                        <Typography
                          variant="h6"
                          sx={{ marginTop: '10px', textAlign: 'center' }}
                        >
                          {seller.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          sx={{ textAlign: 'center', marginBottom: '10px' }}
                        >
                          {seller.description}
                        </Typography>
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => handleRemove(seller.id)}
                        >
                          Unfollow
                        </Button>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Typography variant="body1">
                  No sellers found. Try searching for another seller.
                </Typography>
              )}
            </Box>
          </Box>
        </IonContent>
      </IonPage>
    </ThemeProvider>
  );
};

export default FollowingSeller;
