import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSearchbar, IonIcon, IonCard, IonCardContent, IonButton, IonFooter, IonTabBar, IonTabButton, IonCardHeader, IonCardSubtitle, IonCardTitle, IonLabel } from '@ionic/react';
import { notificationsOutline, mailOutline, menuOutline, desktopOutline, colorPaletteOutline, constructOutline, videocamOutline, brushOutline, globeOutline } from 'ionicons/icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import { AppBar, Toolbar, IconButton, Card, CardContent, CardMedia, Typography, Box, Button, InputBase, Avatar, CardActionArea} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MailIcon from '@mui/icons-material/Mail';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import SearchIcon from '@mui/icons-material/Search';
import ComputerIcon from '@mui/icons-material/Computer';
import BrushIcon from '@mui/icons-material/Brush';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import { Autoplay, Grid, Keyboard, Pagination, Scrollbar, Zoom } from 'swiper/modules';
import './Tab1.css';
import '@fontsource/poppins';
import { CssBaseline, GlobalStyles } from '@mui/material';
import '@fontsource/poppins';  // Import the font
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useHistory } from 'react-router';


const Tab1: React.FC = () => {
  const [setIsLoggedIn] = useState<boolean>(false);
  const history = useHistory();
  const [categories, setCategories] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const isLoggedIn = !!localStorage.getItem('userToken'); // Misalnya token disimpan di localStorage
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


  useEffect(() => {
    // Fetch categories from the database
    setCategories([
      { id: 1, name: 'Computer Science', icon: '../public/icon/computer_science.png', link: '/category/computer-science' },
      { id: 2, name: 'Visual Communication Design', icon: '../public/icon/vcd.png', link: '/category/visual-communication-design' },
      { id: 3, name: 'Interior Design', icon: '../public/icon/di.png', link: '/category/interior-design' },
      { id: 4, name: 'Digital Business Innovation', icon: '../public/icon/computer_science.png', link: '/category/dbi' },
      { id: 5, name: 'Interactive Design and Technology', icon: '../public/icon/vcd.png', link: '/category/idt' },
      { id: 6, name: 'Public Relation', icon: '../public/icon/di.png', link: '/category/pr' },
      { id: 7, name: 'Communications', icon: '../public/icon/computer_science.png', link: '/category/communication' },
      { id: 8, name: 'Entrepenurship Business Creation', icon: '../public/icon/di.png', link: '/category/ebc' },
    ]);

    // Fetch popular services from the database
    setServices([
      { id: 1, name: 'Editing Video', icon: '../public/icon/edit_video.png', link: '/service/editing-video' },
      { id: 2, name: 'Logo Design', icon: '../public/icon/logo_design.png', link: '/service/logo-design' },
      { id: 3, name: 'Build Website', icon: '../public/icon/building_website.png', link: '/service/build-website' },
      { id: 4, name: 'Build Prototype', icon: "../public/icon/edit_video.png", link: '/service/build-prototype' }
    ]);
  }, []);

  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <IonPage>
      <Box
        sx={{
          backgroundColor: '#007bff', // Warna biru
          height: '10vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
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
              <IconButton color="primary" onClick={handleMessageButtonClick}>
                <MailIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>

      <IonContent
        style={{
          backgroundColor: '#007bff', // Biru di luar AppBar
        }}
      >
        <Box
          sx={{
            backgroundColor: '#007bff', // Warna biru
          }}
          >
          <Box 
            display="flex" 
            flexDirection="column" 
            alignItems="center"
            justifyContent="center" 
            sx={{
              backgroundColor: '#007bff',
              color: '#fff',
              padding: '10px 20px',
              borderRadius: '20px',
              margin: '0px 10px',
              textAlign: 'center',
            }}
          >
            <Typography variant="h5" component="h3">
              Hi Ailin, what are you looking for?
            </Typography>
          </Box>

          {/* Search Bar */}
          <Box 
            display="flex" 
            alignItems="center" 
            sx={{
              backgroundColor: 'white',
              borderRadius: '10px',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
              padding: '5px 10px',
              width: '95%',
              maxWidth: '100%',
              margin: '5px auto'
            }}
          >
            <SearchIcon sx={{ color: '#007bff', marginRight: '10px' }} />
            <InputBase
              placeholder="Search the right services"
              sx={{ flex: 1, color: '#333' }}
              inputProps={{ 'aria-label': 'search the right services' }}
            />
          </Box>
          
          <Box
            sx={{ backgroundColor: 'white', borderTopLeftRadius: '30px', borderBottomLeftRadius:'30px', marginLeft:'10px', marginTop:'20px'}}
            >
            <div className="categories">
              <Swiper slidesPerView={3} freeMode={true} spaceBetween={10}>
                {categories.map((category) => (
                  <SwiperSlide key={category.id} style={{ width: 'auto', flexShrink: 0 }}>
                    <Card sx={{ width: '100%', height: 200, margin: '10px', borderRadius: '10px', border: '1px solid #007bff', '&:hover': {
                      backgroundColor: '#f0f0f0', // Warna latar belakang berubah saat hover
                      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', // Efek bayangan saat hover
                    }, }}>
                      <CardActionArea href={category.link} style={{ height: '100%' }}>
                        <CardContent
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: '10px',
                            height: '100%'
                          }}
                        >
                          <img src={category.icon} alt={category.name} style={{ width: '80px', height: '70px', marginBottom: '30px' }} />
                          <Typography variant="body2" component="div" sx={{ marginTop: '10px', textAlign: 'center' }}>
                            {category.name}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </Box>
        </Box>
          
        <Box
          sx={{
            backgroundColor: '#FF99D0', // Warna merah muda
            paddingBottom: '20px', // Tambahkan padding bawah agar nyaman
          }}
          >
        <div className="popular-services">
            <Typography
              variant="h6"
              sx={{
                fontFamily: 'Poppins, sans-serif', // Font Poppins
                fontWeight: 900, // Tebal
                color: 'white', // Warna putih
                fontSize: '20px', // Ukuran font
                textAlign: 'left', // Rata tengah
                marginLeft: 1
              }}
            >
              Popular Services
        </Typography>
            <Swiper slidesPerView={3} freeMode={true} spaceBetween={10}>
              {services.map((service) => (
                <SwiperSlide key={service.id} style={{ width: 'auto', flexShrink: 0 }}>
                  <Card sx={{ width: '100%', height: 200, margin: '10px', borderRadius: '10px',  }}>
                    <CardActionArea href={service.link} style={{ height: '100%' }}>
                      <CardContent
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          height: '100%',
                          backgroundColor: '#FFB3E0', // Warna pink untuk kartu
                          '&:hover': {
                            backgroundColor: '#ff7cb7', // Warna latar belakang berubah saat hover
                            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', // Efek bayangan saat hover
                          },
                        }}
                      >
                          <img src={service.icon} alt={service.name} style={{ width: '80px', height: '70px', marginBottom: '30px' }} />
                          <Typography variant="body2" component="div" sx={{ marginTop: '10px', textAlign: 'center', color:'white', 
                            fontWeight: 600, fontFamily: 'Inter, sans-serif' }}>
                          {service.name}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </Box>
          

        <div className="promotion-card">
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 2 }}>
            <Card
              sx={{
                width: '100%',
                maxWidth: '100%',
                backgroundColor: '#FFD600',
                borderRadius: '15px',
                boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                alignItems: 'center',
                height: '150px', // Tinggi kartu lebih rendah
              }}
            >
              {/* Emoticon di sebelah kiri */}
              <CardMedia
                component="span"
                sx={{
                  fontSize: '80px', // Ukuran lebih besar
                  marginLeft: '20px', // Jarak dari sisi kiri
                  flexShrink: 0, // Memastikan ukurannya tetap
                }}
              >
                👋
              </CardMedia>

              {/* Konten di sebelah kanan */}
              <CardContent
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  padding: '10px 20px',
                  textAlign: 'left',
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 900,
                    fontSize: '14px',
                    color: '#807450',
                    marginBottom: '0px',
                    marginTop: '5px'
                  }}
                >
                  Become a Part of Our Team
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: '12px',
                    color: '#807450',
                    marginBottom: '8px',
                  }}
                >
                  Enhance your skills, unlock more opportunities
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    fontSize: '20px',
                    color: '#0094FF',
                    marginBottom: '10px',
                  }}
                >
                  Professional Freelancer
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: '#FFFFFF',
                    color: '#397BAA',
                    borderRadius: '30px',
                    padding: '8px 16px',
                    fontWeight: 800,
                    textTransform: 'none',
                    fontSize: '10px',
                    alignSelf: 'start', // Tombol rata kiri
                    '&:hover': {
                      backgroundColor: '#FFFFFF',
                    },
                  }}
                >
                  REGISTER NOW
                </Button>
              </CardContent>
            </Card>
          </Box>
        </div>
      </IonContent>
    </IonPage>
    </ThemeProvider>
  );
};

export default Tab1;