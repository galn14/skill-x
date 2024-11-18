import React, { useState }from 'react';
import {
  IonPage,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonCardSubtitle,
} from '@ionic/react';
import {   Button,  Toolbar, AppBar, IconButton, Box, Typography, Card, CardContent, Grid, Avatar, Chip } from '@mui/material';
import { notificationsOutline } from 'ionicons/icons';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from "@mui/lab";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { useHistory } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MailIcon from '@mui/icons-material/Mail';

const profileSeller: React.FC = () => {
  const [isAboutMeOpen, setAboutMeIsOpen] = useState(false);
  const [isSkillOpen, setSkillIsOpen] = useState(false);

  const AboutmetoggleCard = () => {
    setAboutMeIsOpen(!isAboutMeOpen); // Toggle state untuk buka/tutup konten
  };
  const SkilltoggleCard = () => {
    setSkillIsOpen(!isSkillOpen); // Toggle state untuk buka/tutup konten
  };

  const [isPortoOpen, setPortoIsOpen] = useState(true);

  const PortotoggleCard = () => {
    setPortoIsOpen((prevState) => !prevState);
  };
  const portfolioData = [
    {
      title: "Individual Portfolio Website",
      description:
        "This mid-project for the Web Programming course involves creating a personal portfolio website using Laravel and MySQL. The site includes integrated database functionality and features an admin page that allows for the easy addition and management of new portfolio entries without the need to modify HTML code directly.",
      tools: "Laravel | Oktober 2024",
    },
    {
      title: 'Frontend Website "byLeens"',
      description:
        "This mini-project for the Web Programming course involves creating a front-end website using React. The site includes integrated database functionality and features an admin page that allows for the easy addition and management of new portfolio entries without the need to modify HTML code directly.",
      tools: "React | Oktober 2024",
    },
  ];

  const products = [
    {
      id: 1,
      title: "PACKAGE PHOTO PRODUCTS - 100 PHOTOS",
      price: "Rp500.000",
      author: "AileenLiexiuxai",
      certified: true,
    },
    {
      id: 2,
      title: "PACKAGE PHOTO PRODUCTS - 100 PHOTOS",
      price: "Rp500.000",
      author: "AileenLiexiuxai",
      certified: true,
    },
    {
      id: 3,
      title: "PACKAGE PHOTO PRODUCTS - 100 PHOTOS",
      price: "Rp500.000",
      author: "AileenLiexiuxai",
      certified: true,
    },
  ];
  const isLoggedIn = !!localStorage.getItem('userToken'); // Misalnya token disimpan di localStorage
  const history = useHistory();

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
  }
  const handleBack = () => history.goBack();
  const theme = createTheme({
    typography: {
      fontFamily: '"Poppins"',
    },
  });
  return (
    <ThemeProvider theme={theme}>

    <IonPage>
      {/* Header */}
       <AppBar position="fixed" style={{ backgroundColor: 'white', borderBottomLeftRadius: '30px', borderBottomRightRadius: '30px', height: '82px', paddingTop: '25px' }}>
        <Toolbar style={{ height: '100%', alignItems: 'flex-end', paddingBottom: '10px' }}>
          <Box display="flex" alignItems="center" sx={{ width: '100%' }}>
            <img src="../public/SkillXLogo.png" alt="SkillEx Logo" className="logo" style={{ marginRight: 'auto' ,height: '40px'}} />
              <IconButton color="primary" onClick={handleNotificationButtonClick}>
              <NotificationsIcon />
            </IconButton>
            <IconButton color="primary" onClick={handleMessageButtonClick}>
              <MailIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>


      {/* Content */}
      
     <IonContent>
    <div style={{ padding: '16px', marginTop: '90px', position: 'relative' }}>
    <Grid container spacing={2} alignItems="center">
      {/* Avatar */}
      <Grid item xs="auto">
        <Avatar
          src="/assets/avatar.png" // Ganti dengan path gambar avatar Anda
          alt="Avatar"
          style={{ width: '80px', height: '80px' }}
        />
      </Grid>

      {/* Info */}
      <Grid item xs>
        <Typography variant="h6" fontWeight="bold">
          Aileen Liexiulai
        </Typography>
        <Typography variant="body2" color="textSecondary">
          BINUS University, Computer Science
        </Typography>
        <Typography variant="body2" color="textSecondary">
          🌍 Indonesia, English, Chinese
        </Typography>
      </Grid>
    </Grid>

    {/* Edit Button in Top-right Corner */}
    <IconButton
      // onClick={handleOpenEdit}
      sx={{
        position: 'absolute',
        top: '10px', // Positioning from the top of the card
        right: '10px', // Positioning from the right of the card
        zIndex: 2, // Ensure the button is above other elements
      }}
      size="small"
    >
      <EditIcon />
    </IconButton>


       

<br></br>
          {/* Stats Section */}
          <Grid container spacing={2} style={{ textAlign: 'center', marginBottom: '16px' }}>
            <Grid item xs={3}>
              <Typography variant="body2" color="textSecondary">
                ⭐ Rating
              </Typography>
              <Typography variant="h6">4.9</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="body2" color="textSecondary">
                📅 Since
              </Typography>
              <Typography variant="h6">2019</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="body2" color="textSecondary">
                📦 Orders
              </Typography>
              <Typography variant="h6">46</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="body2" color="textSecondary">
                🎓 Level
              </Typography>
              <Typography variant="h6">2</Typography>
            </Grid>
          </Grid>

        
          <IonCard onClick={AboutmetoggleCard} style={{ cursor: 'pointer' }}>
            {/* Header Card */}
           
            <IonCardHeader>
            <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
              <IonCardTitle>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  About Me
                </Typography>
              </IonCardTitle>
              {isAboutMeOpen ? (
                  <ArrowDropUpIcon sx={{ color: 'gray' }} />
                ) : (
                  <ArrowDropDownIcon sx={{ color: 'gray' }} />
                )}
            </Box>
            </IonCardHeader>

            {/* Konten Card (Hanya tampil jika isOpen true) */}
            {isAboutMeOpen && (
              <IonCardContent>
                <Box>
                  <Typography variant="body1" sx={{ marginBottom: '10px' }}>
                  As a BINUS University Computer Science major graduating in 2026, I am a highly motivated
                  individual with a keen interest in exploring new opportunities, particularly in the realms of
                  personal development and relationships.
                  </Typography>
                </Box>
              </IonCardContent>
            )}
          </IonCard>
          
          <IonCard style={{
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', cursor: 'pointer'}} onClick={SkilltoggleCard} >
  {/* Header Card */}
        <IonCardHeader>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            {/* Judul Card */}
            <IonCardTitle>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Skills
              </Typography>
            </IonCardTitle>

            {/* Ikon Panah */}
            {isSkillOpen ? (
              <ArrowDropUpIcon sx={{ color: 'gray' }} />
            ) : (
              <ArrowDropDownIcon sx={{ color: 'gray' }} />
            )}
          </Box>
        </IonCardHeader>

        {/* Konten Card (Hanya tampil jika isOpen true) */}
        {isSkillOpen && (
          <IonCardContent>
            <Box>
              {/* Chips Konten */}
              <Chip
                label="Database Design"
                style={{ marginRight: '8px', marginBottom: '8px' }}
              />
              <Chip label="Software Engineering" style={{ marginBottom: '8px' }} />
            </Box>
          </IonCardContent>
        )}
      </IonCard>

{/*portfolio*/}
<IonCard style={{ cursor: "pointer"}}>
      {/* Header Card */}
      <IonCardHeader
        style={{
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Shadow untuk header
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Title */}
          <IonCardTitle>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Portfolio
            </Typography>
          </IonCardTitle>

          {/* Icons */}
          <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <AddIcon sx={{ color: "gray", cursor: "pointer" }} />
            <EditIcon sx={{ color: "gray", cursor: "pointer" }} />
            {isPortoOpen ? (
              <ArrowDropUpIcon sx={{ color: "gray" }} onClick={PortotoggleCard} />
            ) : (
              <ArrowDropDownIcon sx={{ color: "gray" }} onClick={PortotoggleCard} />
            )}
          </Box>
        </Box>
      </IonCardHeader>

      {/* Content (Hanya muncul jika isOpen true) */}
      {isPortoOpen && (
        <IonCardContent>
          <Timeline sx={{ marginLeft: '-150px' }}>
            {portfolioData.map((item, index) => (
              <TimelineItem key={index} sx={{ marginLeft: '-20px' }}>
                <TimelineSeparator sx={{ marginLeft: '-20px' }}>
                <TimelineDot sx={{ marginLeft: '-20px' }} color="primary" />
                {index < portfolioData.length - 1 && <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent>
                  <Typography variant="h3" fontWeight="bold">
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.tools}
                  </Typography>
                  <Typography variant="body2" sx={{ marginTop: "8px" }}>
                    {item.description}
                  </Typography>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </IonCardContent>
      )}
    </IonCard>

    <IonCard style={{ padding:'15px',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', cursor: 'pointer'
        }}>
        <IonCardTitle>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            About Me
          </Typography>
        </IonCardTitle>
        
        <Box sx={{  display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Grid container spacing={2}>
            {products.map((product) => (
              <Grid item xs={6} key={product.id}> {/* Selalu dua kolom */}
                <Card sx={{ height: "100%", padding:'10px' }}>
                  <Box
                    sx={{
                      width: "100%",
                      height: "150px",
                      backgroundColor: "#e0e0e0",
                    }}
                  />
                  <CardContent>
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold", fontSize:'0.89rem' }}>
                      {product.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ fontSize:'0.75rem' }}>
                      {product.price}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
        <IconButton
          //    onClick={() => alert(`Added ${product.title} to cart`)} // Add functionality here
              sx={{
                position: 'absolute',
                bottom: '10px',
                right: '10px',
                backgroundColor: '#ff4081', // Customize the button color
                color: 'white',
                '&:hover': {
                  backgroundColor: '#e33575', // Hover effect
                },
              }}
            >
              <AddIcon />
            </IconButton>
      </IonCard>


        </div>
      </IonContent>
    </IonPage>
    </ThemeProvider>
  );
};

export default profileSeller;
