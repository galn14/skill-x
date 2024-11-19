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
import EditProfileModal from './EditProfileModal'; // import modal yang baru dibuat
import { Route, BrowserRouter } from "react-router-dom";
import EditAboutMe from './EditAboutMe';
import EditPortoModal from './EditPortoModal';
import AddPortoModal from './AddPortoModal';

import AddProduct from './AddProduct';
import AddSkill from './AddSkill';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Dialog, DialogTitle, DialogContent, DialogActions} from '@mui/material';
import { Preferences } from '@capacitor/preferences';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect } from 'react';

const profileSeller: React.FC = () => {
  const [isAboutMeOpen, setAboutMeIsOpen] = useState(false);
  const [isSkillOpen, setSkillIsOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string | undefined | null>(null);

  const openModal = () => {
    history.push('/EditProfileModal'); // Rute untuk modal
  };

  useEffect(() => {
    const loadImage = async () => {
      const { value } = await Preferences.get({ key: 'profileImage' });
      if (value) {
        setImage(value);
        setPreviewImage(value); 
      }
    };
    loadImage();
  }, []);
  const [image, setImage] = useState<string | undefined>(undefined);

  const captureImage = () => {
    setModalOpen(true);
  };

  const handleCamera  = async () => {
    try {
      setModalOpen(false); // Close the modal immediately before opening the camera
  
      const photo = await Camera.getPhoto({
        quality: 100,
        allowEditing: false,
        source: CameraSource.Camera,
        resultType: CameraResultType.DataUrl,
      });
  
      const imageUrl = photo.dataUrl;
      setPreviewImage(imageUrl); // Set the preview image for validation
      setModalOpen(true); // Reopen modal to show the preview
    } catch (error) {
      console.error('Error capturing image', error);
    }
  };

  const handleGallery = async () => {
    try {
      const photo = await Camera.getPhoto({
        quality: 100,
        allowEditing: false,
        source: CameraSource.Photos,
        resultType: CameraResultType.DataUrl,
      });

      const imageUrl = photo.dataUrl;
      setPreviewImage(imageUrl); // Set the preview image for validation
      setModalOpen(true); // Open modal to show the preview
    } catch (error) {
      console.error('Error selecting image from gallery', error);
    }
  };

  const confirmImage = async () => {
    if (previewImage) {
      setImage(previewImage); // Set the confirmed image as the profile image
  
      // Save to preferences
      await Preferences.set({
        key: 'profileImage',
        value: previewImage,
      });
  
      setModalOpen(false); // Close modal after confirming
    }
  };

  const openAboutMeModal = () => {
    history.push('/EditAboutMe'); // Rute untuk modal
  };
  const openPortoMeModal = () => {
    history.push('/EditPortoModal'); // Rute untuk modal
  };
  const openAddPortoModal = () => {
    history.push('/AddPortoModal'); // Rute untuk modal
  };
  const openAddProduct = () => {
    history.push('/AddProduct'); // Rute untuk modal
  };

  const openAddSkill = () => {
    history.push('/AddSkill'); // Rute untuk modal
  };

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
          src={image || '/path_to_profile_image'}// Ganti dengan path gambar avatar Anda
          alt="Avatar"
          style={{ width: '80px', height: '80px' }}
          onClick={captureImage}

        />
      </Grid>
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)} fullWidth>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <DialogTitle>Select Image Source</DialogTitle>
        <IconButton edge="end" color="inherit" onClick={() => setModalOpen(false)} aria-label="close">
          <CloseIcon />
        </IconButton>
      </Toolbar>
      
      <DialogContent dividers>
        {previewImage && (
          <img
            src={previewImage}
            alt="Preview"
            style={{ width: '100%', height: 'auto', marginBottom: '16px' }}
          />
        )}
        <Button variant="contained" fullWidth onClick={handleCamera} sx={{ mb: 2 }}>
          Take Photo with Camera
        </Button>
        <Button variant="contained" fullWidth onClick={handleGallery} sx={{ mb: 2 }}>
          Upload from Gallery
        </Button>
        {previewImage && (
          <Button variant="contained" color="success" fullWidth onClick={confirmImage}>
            Confirm Profile Picture
          </Button>
        )}
      </DialogContent>
    </Dialog>


      {/* Info */}
      <Grid item xs>
        <Typography variant="h6" fontWeight="bold">
          AileenLiexiuai
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
    <div>
      <IconButton
        onClick={openModal}
        sx={{
          marginRight: '5px',
          position: 'absolute',
          top: '10px',
          right: '10px',
          zIndex: 2,
        }}
        size="small"
      >
        <EditIcon />
      </IconButton>

      {/* Menyusun Routes */}
      <Route path="/EditProfileModal" component={EditProfileModal}/>
      </div>

       

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

        
          <IonCard  style={{ cursor: 'pointer' }}>
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

              <Box sx={{ display: "flex", alignItems: "center", gap: "8px", position: "relative" }}>
              <div>
              <IconButton
               onClick={openAboutMeModal}
              sx={{
                marginLeft:'1px',
              
              }}
              size="small"
            >
              <EditIcon />
            </IconButton>
            <Route path="/EditAboutMe" component={EditAboutMe}/>
          </div>

            
              {isAboutMeOpen ? (
                  <ArrowDropUpIcon sx={{ color: 'gray' }} onClick={AboutmetoggleCard}/>
                ) : (
                  <ArrowDropDownIcon sx={{ color: 'gray' }} onClick={AboutmetoggleCard} />
                )}
            </Box>
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

    <IonCard
      style={{
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        cursor: 'pointer',
      }}
    >
      {/* Header Card */}
      <IonCardHeader>
        <Box sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
          {/* Judul Card */}
          <IonCardTitle>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Skills
            </Typography>
          </IonCardTitle>

          {/* Box containing the Add Icon and Arrow */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* Add Icon */}
              <div>
            <IconButton
              onClick={openAddSkill}

              sx={{
                marginLeft: '1px',
              }}
              size="small"
            >
              <AddIcon />
            </IconButton>
            <Route path="/AddSkill" component={AddSkill}/>
            </div>

            {/* Arrow Icon based on state */}
            {isSkillOpen ? (
              <ArrowDropUpIcon sx={{ color: 'gray' }}  onClick={SkilltoggleCard}/>
            ) : (
              <ArrowDropDownIcon sx={{ color: 'gray' }} onClick={SkilltoggleCard} />
            )}
          </Box>
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
      <IonCardHeader>
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
          <Box sx={{ display: "flex", alignItems: "center", gap: "8px", position: "relative" }}>
            <div>
            <IconButton
             onClick={openAddPortoModal}
              sx={{
                marginLeft:'1px',
              
              }}
              size="small"
            >
              <AddIcon />
            </IconButton>
            <Route path="/AddPortoModal" component={AddPortoModal}/>
            </div>

            {/* The Edit Button positioned at the top-right corner */}
            <div>
              <IconButton
               onClick={openPortoMeModal}
              sx={{
                marginLeft:'1px',
              
              }}
              size="small"
            >
              <EditIcon />
            </IconButton>
            <Route path="/EditPortoModal" component={EditPortoModal}/>
          </div>
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
                  {index < portfolioData.length - 1 && (
                    <TimelineConnector sx={{ marginLeft: '-23px' }} /> // Adjust only the line's position
                  )}
                </TimelineSeparator>
                <TimelineContent>
                <Typography variant="h3" sx={{ fontWeight: 700 }}>
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
            Products
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
       <div>
        <IconButton
              onClick={ openAddProduct}
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
              <Route path="/AddProduct" component={AddProduct}/>

            </IconButton>
            </div>
      </IonCard>


        </div>
      </IonContent>
    </IonPage>
    </ThemeProvider>
  );
};

export default profileSeller;
