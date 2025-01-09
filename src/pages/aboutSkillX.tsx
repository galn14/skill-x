import React from 'react';
import { IonContent, IonHeader, IonPage, IonToolbar, IonTitle } from '@ionic/react';
import { AppBar, Box, Typography, Card, CardContent, Grid, Avatar, Toolbar, IconButton } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MailIcon from '@mui/icons-material/Mail';
import { useHistory } from 'react-router-dom';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import InstagramIcon from '@mui/icons-material/Instagram';

const AboutSkillX: React.FC = () => {
    const handleBack = () => history.goBack();
    const isLoggedIn = !!localStorage.getItem('userToken'); // Misalnya token disimpan di localStorage

    const history = useHistory();
    const handleMessageButtonClick = () => {
        if (isLoggedIn) {
          history.push('/messages'); // Redirect ke halaman message
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

  return (
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
                    <Toolbar sx={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '10px' }}>
                        <Box display="flex" alignItems="center" sx={{ width: '100%' }}>
                            <IconButton onClick={handleBack} color="primary">
                                <ArrowBackIcon />
                            </IconButton>
                            <Typography
                                variant="h6"
                                sx={{
                                    color: 'black',
                                    fontSize: '16px',
                                    fontWeight: 200,
                                    marginRight: 'auto',
                                    paddingLeft: '16px',
                                }}
                            >
                                About SkillX
                            </Typography>
                            <IconButton color="primary">
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

    
      <IonContent>
      <Box   sx={{ paddingTop: '100px' }} // Properti harus di dalam objek dengan tanda kutip untuk nilai CSS
 mt={3} display="flex" alignItems="center" justifyContent="center">
          <Typography variant="h6" fontWeight="bold">About</Typography>
            <Avatar
                src="public/SkillXLogo.png"
                alt="SkillX"
                sx={{
                    width: 'auto', // Sesuai dengan dimensi asli
                    height: 'auto',
                    maxWidth: 100, // Maksimal 100px
                borderRadius: 0, // Membuat avatar tidak bulat
                mr: 2, // Memberikan margin ke kanan
                }}
            />
      </Box>

          {/* Vision Section */}
          
    <Box
      sx={{
        background: "linear-gradient(to left, #69C0FF , #0094FF 95%)", // Gradien biru
        borderRadius: "16px", // Membuat sudut melengkung
        margin: "24px", 
        marginTop: "30px", // Margin atas lebih besar
        padding: "24px", // Padding untuk konten
        color: "white", // Warna teks putih
        position: "relative", // Untuk memposisikan label
        textAlign: "center",
      }}
    >
      <Box
        sx={{
          background: "#0094FF", // Warna biru solid untuk label
          padding: "8px 16px",
          borderRadius: "16px",
          position: "absolute",
          top: "-16px", // Mengangkat label di atas kotak utama
          left: "60%", // Memposisikan di tengah horizontal
          transform: "translateX(-50%)", // Memperbaiki posisi agar benar-benar di tengah
          fontWeight: "bold", // Membuat teks tebal
          color: "white",
          fontSize: "15px",
          width: "181.65px", // Menyesuaikan lebar dengan isi
        }}
      >
        Our Vision
      </Box>
      <Typography align="justify" variant="body1" sx={{ marginTop: "9px", fontSize: "10px" }}>
        To establish a premier platform for students to exchange skills, gain practical experience, 
        and build professional credibility, while fostering an ecosystem that promotes career development 
        and future collaboration.
      </Typography>
    </Box>

 {/* Mission Section */}
 <Box
      sx={{
        background: "linear-gradient(to right, #6BC563 20% , #3CB232 80%)", 
        borderRadius: "16px", // Membuat sudut melengkung
        margin: "24px", 
        marginTop: "30px", // Margin atas lebih besar
        padding: "24px", // Padding untuk konten
        color: "white", // Warna teks putih
        position: "relative", // Untuk memposisikan label
        textAlign: "center",
      }}
    >

<Box
        sx={{
            background: "linear-gradient(to right, #3CB232 20% , #1A4C15 80%)", 
            padding: "8px 16px",
          borderRadius: "16px",
          position: "absolute",
          top: "-16px", // Mengangkat label di atas kotak utama
          left: "40%", // Memposisikan di tengah horizontal
          transform: "translateX(-50%)", // Memperbaiki posisi agar benar-benar di tengah
          fontWeight: "bold", // Membuat teks tebal
          color: "white",
          fontSize: "15px",
          width: "181.65px", // Menyesuaikan lebar dengan isi
        }}
      >
         Our Mission

      </Box>

      <Typography  variant="body1" sx={{ marginTop: "9px", fontSize: "9px" }} align="justify">
        1.  Provide an exclusive platform for students <br />
        2.  Enable students to build a strong reputation and portfolio <br />
        3.  Support student skill enhancement and growth <br />
        4.  Cultivate a collaborative community among students <br />
        5.  Provide access to high-quality, affordable services
      </Typography>
    </Box>

<Typography   display="flex" alignItems="center" justifyContent="center"variant="body1" sx={{ marginBottom:'0px', marginTop: "9px", fontSize: "12px" }} align="justify">
    Stay connected to our journey by keeping up with us on
</Typography>

<Box
  sx={{
    marginLeft: { xs: '10px', sm: '20px', md: '50px' }, // Margin kiri responsif lebih kecil di xs
    marginRight: { xs: '10px', sm: '20px', md: '50px' }, // Margin kanan responsif lebih kecil di xs
    marginTop: '9px',
    paddingLeft: { xs: '10px', sm: '20px', md: '50px' }, // Padding kiri lebih kecil di xs
    paddingRight: { xs: '10px', sm: '20px', md: '50px' }, // Padding kanan lebih kecil di xs
  }}
  display="flex"
  justifyContent="center"
  alignItems="center"
  mt={3}
  flexDirection="row" // Tetap horizontal
>
  <Box mx={2} sx={{ width: '100%' }}>
    <Typography
      variant="body2"
      sx={{
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        gap: { xs: '3px', sm: '5px' }, // Gap lebih kecil di perangkat kecil
        backgroundColor: '#2D2D2D',
        p: 1,
        borderRadius: 5,
        width: '100%', // Agar tetap responsif pada perangkat kecil
      }}
    >
      <MailOutlineIcon />
      skillx.butterinc@gmail.com
    </Typography>
  </Box>
  <Box mx={2} sx={{ width: '100%' }}>
    <Typography
      variant="body2"
      sx={{
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        gap: { xs: '3px', sm: '5px' }, // Gap lebih kecil di perangkat kecil
        backgroundColor: '#2D2D2D',
        p: 1,
        borderRadius: 5,
        width: '100%', // Agar tetap responsif pada perangkat kecil
      }}
    >
      <InstagramIcon />
      skillx.butterinc
    </Typography>
  </Box>
</Box>





    {/* Team Section */}
<Box
  sx={{
    marginTop: '40px', // Jarak atas
    width: '93%', // Lebar penuh
    borderTop: '1px solid black', // Garis tepi hitam hanya di bagian atas
    borderRadius: '25px 25px 0px 0px', // Melengkung di bagian atas
    padding: '16px', // Jarak dalam
    display: 'flex', // Flexbox untuk layout horizontal
    alignItems: 'center', // Selaraskan elemen secara vertikal
    justifyContent: 'center', // Ruang di antara teks dan gambar
  }}
>
  {/* Teks Meet Team */}
  <Box sx={{     marginTop: '40px', // Jarak atas
textAlign: 'left', marginRight: '15px' }}>
    <Typography variant="h6" sx={{ margin: 0, lineHeight: 1.2 }}>
      meet
    </Typography>
    <Typography variant="h6" sx={{ margin: 0, lineHeight: 1.2 }}>
      team
    </Typography>
  </Box>

  {/* Gambar Butterscotch */}
  <Box sx={{     marginTop: '40px'}}>
    <img
      src="public/butterscotch.png" // Pastikan path file benar
      alt="Butterscotch Logo"
      style={{
        width: '150px', // Sesuaikan ukuran gambar
        height: '50px', // Sesuaikan ukuran gambar
        objectFit: 'contain', // Pastikan gambar tetap proporsional
      }}
    />
  </Box>
</Box>


<Box mt={3}>
  <Grid container spacing={2}>
    {[
      {
        name: 'Galeno Filberto Arellano',
        role: 'Project Manager',
        avatar: 'public/Group 233.png',
        contact: '2602196366   - galeno.areliano@binus.ac.id',
        color: '#FFD600',
        tinggi: '250px',
        lebar: '170px',
      },
      {
        name: 'Aileen Angelica Lee',
        role: 'Front-End Developer',
        avatar: 'public/Group 236.png',
        contact: '2602067810 - aileen.lee@binus.ac.id',
        color: '#97D3FF',
        tinggi: '270px',
        lebar: '150px',
      },
      {
        name: 'Ananta Mahardika Rachmat',
        role: 'Back-End Developer',
        avatar: 'public/Group 240.png',
        contact: '2602180821   - ananta.rachmat@binus.ac.id',
        color: '#97D3FF',
        tinggi: '250px',
        lebar: '170px',
      },
      {
        name: 'Richard Wijaya Harianto',
        role: 'Front-End Developer',
        avatar: 'public/Group 238.png',
        contact: '2602154930  - richard.harianto@binus.ac.id',
        color: '#FFD600',
        tinggi: '250px',
        lebar: '190px',
      },
    ].map((member, index) => (
<Grid item xs={12} sm={6} md={4} key={index}>
{/* Card container */}
        <Box
          sx={{
            margin: '16px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: '16px',
            overflow: 'hidden', // Supaya bagian gambar dan card rapi
            backgroundColor: 'transparent',
          }}
        >
          {/* Gambar */}
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              height: '250px', // Tinggi gambar
              display: 'flex',
        alignItems: 'flex-end', // Untuk menempatkan role di sebelah gambar
       // backgroundColor: member.color, 
            }}
          >
            <Box
              sx={{
                borderRadius: '25px 25px 0px 0px', // Melengkung di bagian atas
                position: 'absolute',
                top: '15%',
                left: 0,
                right: 0,
                height: '80%',
                backgroundColor: member.color,
                zIndex: 1,
                justifyContent: 'left',
                alignItems: 'left'
              }}
            />
            <img
              src={member.avatar}
              alt={member.name}
              style={{
                position: 'absolute',
                top: 0,
                left: '30%',
                transform: 'translateX(-50%)',
                width: member.lebar,
                height: member.tinggi,
                objectFit: 'contain',
                zIndex: 2,
              }}
            />
            
          <Typography variant="subtitle1" 
          fontWeight="bold"
          sx={{
            position: 'relative',
            zIndex: 13,
          //  fontSize: '15px',
            top: 0,
            left: '15%',
            marginLeft: '140px',
            marginBottom: '20px',
            whiteSpace: 'normal', // Memastikan teks bisa membungkus
            wordWrap: 'break-word', // Memastikan kata panjang akan terputus dan dibungkus
            lineHeight: '1.5', // Memberikan jarak antar baris teks
            textAlign: 'center', // Jarak ke bawah dari kotak
            fontSize: {
                xs: '15px',  // Untuk ukuran layar kecil (extra small)
                sm: '17px',  // Untuk ukuran layar menengah (small)
                md: '17px',  // Untuk ukuran layar besar (medium)
                lg: '18px',  // Untuk layar lebih besar (large)
              },
              }}>
              {member.role}
            </Typography> 
          </Box>
        
        </Box>
        <Box
            sx={{
              textAlign: 'center',
              padding: '8px',
              width: '100%',
              marginBottom: '16px',
            }}
          >
          
            <Typography variant="h6" fontWeight="bold" mb={1}>
              {member.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {member.contact}
            </Typography>
          </Box>
      </Grid>
    ))}
  </Grid>
</Box>


      </IonContent>
    </IonPage>
  );
};

export default AboutSkillX;
