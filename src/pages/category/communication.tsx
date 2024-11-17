import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar ,IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonItem, IonLabel, IonIcon, IonList, IonThumbnail,IonSearchbar} from '@ionic/react';
import { AppBar, Toolbar, IconButton, Card, CardContent, CardMedia, Typography, Box, Button, InputBase, Select, MenuItem, FormControl, CardHeader, Avatar, CardActions } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MailIcon from '@mui/icons-material/Mail';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import React, { useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CssBaseline, GlobalStyles } from '@mui/material';
import '@fontsource/poppins';  // Import the font
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useHistory } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { Height } from '@mui/icons-material';


const Communication: React.FC = () => {
  const [isModalOpen] = useState(false);
  const history = useHistory();
  const isLoggedIn = !!localStorage.getItem('userToken'); // Misalnya token disimpan di localStorage
  const handleBack = () => history.goBack();
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

    // Data untuk layanan (services)
    const services = [
        {
          id: 1,
          icon: '🌐',
          title: 'Corporate Communication',
          subcategories: ['Internal Communication Strategy', 'Stakeholder Communication', 'Corporate Newsletter Design'],
        },
        {
          id: 2,
          icon: '📱',
          title: 'Social Media Management',
          subcategories: ['Social Media Content Strategy', 'Social Media Campaigns', 'Analytics and Reporting'],
        },
        {
          id: 3,
          icon: '🔍',
          title: 'Public Speaking and Traininy',
          subcategories: ['Corporate Training Sessions', 'Presentation Coaching', 'Public Speaking Workshops'],
        },
        {
          id: 4,
          icon: '🛡️',
          title: 'Build Prototype for Communication',
          subcategories: ['Presentation Prototyping', 'Social Media Content Prototyping', 'Internal Communication Tools Prototyping'],
        },
      ];

  const toggleCard = (id: number) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

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


  const handleMessageButtonClick = () => {
    if (isLoggedIn) {
      history.push('/message'); // Redirect ke halaman message
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
        <AppBar position="fixed" style={{ backgroundColor: 'white', borderBottomLeftRadius: '30px', borderBottomRightRadius: '30px', height: '82px', paddingTop: '25px' }}>
          <Toolbar style={{ height: '100%', alignItems: 'flex-end', paddingBottom: '10px' }}>
            <Box display="flex" alignItems="center" sx={{ width: '100%' }}>
            <IconButton onClick={handleBack} color="primary">
                        <ArrowBackIcon />
                    </IconButton>
              {/* Search bar with search icon */}
              <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', width: '80%', border: '1px solid #ABABAB', borderRadius: '15px', padding: '5px', height:'40px' }}>
                  <IconButton color="primary" sx={{ padding: '0', marginRight: '2px' }}>
                    <SearchIcon />
                  </IconButton>
                  <InputBase
                    placeholder="Search the right services"
                    sx={{ flex: 1, color: '#333', padding: '10px', fontSize: '11px' }}
                    inputProps={{ 'aria-label': 'search the right services' }}
                  />
                </Box>
              </Box>
              <IconButton color="primary" onClick={handleCartButtonClick}>
                <ShoppingCartIcon />
              </IconButton>
              <IconButton color="primary" onClick={handleMessageButtonClick}>
                <MailIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
      <IonContent fullscreen className={`${isModalOpen ? 'blurred-content' : ''} `}>
      <Box sx={{ padding: '10px', marginTop: '90px' }}>
          {/* Header Section */}
          <Box
            sx={{
              backgroundColor: '#9C27B0',
              borderRadius: '20px',
              padding: '15px',
              marginBottom: '20px',
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
              Communication
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

          {/* Service List */}
          <IonList>
            {services.map((service) => (
              <IonCard
                key={service.id}
                style={{
                  marginBottom: '20px',
                  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                }}
              >
                {/* Card Header */}
                <IonCardHeader
                  onClick={() => toggleCard(service.id)}
                  style={{
                    height: '100px',
                    maxHeight: '200px',
                    paddingTop: '0px',
                    alignItems: 'flex',
                    alignContent: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'inline', // Pastikan logo dan judul di sebelah kiri
                      alignContent: 'center',
                      marginTop: '-20px',
                    }}
                  >
                    {/* Logo dengan background biru */}
                    <Box
                      sx={{
                        backgroundColor: '#9C27B0',
                        color: '#fff',
                        width: '80px',
                        height: '40px',
                        borderRadius: '10px',
                        display: 'flex',
                        alignContent: 'center',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontSize: '40px',
                        marginRight: '15px',
                      }}
                    >
                      {service.icon}
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: '22px',
                        fontWeight: 'bold',
                        flex: 1
                      }}
                    >
                      {service.title}
                    </Typography>
                  </Box>
                  {/* Icon Expand */}
                  <IconButton
                    sx={{
                        marginLeft: 'auto', // Memastikan tombol berada di ujung kanan
                        display: 'flex', // Membuat tombol berada di tengah vertikal
                        alignContent:'center',
                        justifyContent: 'center',
                        alignItems: 'center', // Menjaga tombol sejajar vertikal dengan logo dan judul
                        paddingTop: '20px'
                      }}
                  >
                    {expandedCard === service.id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </IconButton>
                </IonCardHeader>

                {/* Card Content (Dropdown) */}
                {expandedCard === service.id && (
                  <IonCardContent
                  style={{
                    paddingTop: '0px', // Atur jarak bagian atas
                    paddingBottom: '10px', // Atur jarak bagian bawah
                    margin: 0, // Hilangkan margin jika ada
                  }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start', // Konten diarahkan ke atas
                        marginBottom: '10px',
                      }}
                    >
                    </Box>
                    <IonList>
                      {service.subcategories.map((subcategory, index) => (
                        <IonItem key={index} lines="none">
                          <IonLabel>{subcategory}</IonLabel>
                        </IonItem>
                      ))}
                    </IonList>
                  </IonCardContent>
                )}
              </IonCard>
            ))}
          </IonList>
        </Box>
      </IonContent>
      {/* Render the modal and pass the required props */}
    
    </IonPage>
    </ThemeProvider>
  );
};


export default Communication;
