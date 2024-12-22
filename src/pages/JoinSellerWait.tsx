import React from 'react';
import { Toolbar, AppBar, IconButton, Typography, Box } from '@mui/material';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSearchbar, IonIcon, IonCard, IonCardContent, IonButton, IonFooter, IonTabBar, IonTabButton, IonCardHeader, IonCardSubtitle, IonCardTitle, IonLabel } from '@ionic/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useHistory } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
const RegisterSellerWait: React.FC = () => {
  const theme = createTheme({
    typography: {
      fontFamily: '"Poppins"',
    },
  });

  const history = useHistory();
  
  const handleBack = () => history.goBack();

  return (
    <ThemeProvider theme={theme}>
      <IonPage>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: 'white',
          borderBottomLeftRadius: '30px',
          borderBottomRightRadius: '30px',
          height: '82px',
          paddingTop: '25px',
          zIndex: 1201, // Pastikan hanya melayang di atas konten
        }}
      >
        <Toolbar>
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <IconButton onClick={handleBack} color="primary">
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" sx={{ color: '#838383', textAlign: 'left', flexGrow: 1 }}>
              Register as Seller
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      
      <IonContent>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh', // Tinggi penuh viewport
          textAlign: 'center',
          backgroundColor: '#0094FF', // Warna latar opsional
        }}
      >
        <div
          style={{
            position: 'relative',
            width: '500px',
            height: '500px',
            border: 'none',
            boxShadow: 'none',
          }}
        >
          {/* Gambar pertama (lapisan bawah) */}
          <img
            src="public/Ellipse 8.png"
            style={{
              position: 'absolute',
              top: 0,
              left: 60,
              width: '400px',
              height: '400px',
              objectFit: 'cover',
              border: 'none',
              borderRadius: '0',
            }}
          />
          {/* Gambar kedua (lapisan atas) */}
          <img
            src="public/SkillXLogo.png"
            alt="Foreground"
            style={{
              position: 'absolute',
              top: '70px',
              left: '130px',
              width: '250px',
              height: '250px',
              objectFit: 'contain',
              border: 'none',
              zIndex: 2, // Gambar tetap di atas
            }}
          />
        </div>

        {/* Teks yang diposisikan lebih tinggi */}
        <h6
          style={{
            position: 'absolute',
            top: '460px', // Posisi vertikal untuk mengangkat teks
            color: 'white',
            marginLeft: '10px',
            marginRight: '10px',
            marginBottom: '20px',
            zIndex: 5, // Teks tetap di bawah gambar
          }}
        >
          You are now registered as a seller. Please allow up to 24 hours for us to complete your verification.
        </h6>

        <button
  onClick={() => console.log('Back to Home Clicked')}
  style={{
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#007BFF',
    color: 'white',
    cursor: 'pointer',
    fontSize: '16px',
    display: 'flex', // Use flexbox to align the icon and text
    alignItems: 'center', // Align them vertically centered
  }}
>
  Back to Home
  <HomeIcon style={{ marginLeft: '10px' }} /> {/* Add space between text and icon */}
</button>

      </div>
      </IonContent>
      </IonPage>
    </ThemeProvider>
  );
};

export default RegisterSellerWait;
