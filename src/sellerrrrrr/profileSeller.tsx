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
import {   Button,  Toolbar, AppBar, IconButton, Box, Typography, Card, CardContent, Grid, Avatar, Chip, Icon } from '@mui/material';
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
import { getUserAndSellerData, changeUserRole, getUserPortfolios, addPortfolio, editPortfolio, deletePortfolio  } from '../api.service';
import AddProduct from './AddProduct';
import AddSkill from './AddSkill';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Dialog, DialogTitle, DialogContent, DialogActions} from '@mui/material';
import { Preferences } from '@capacitor/preferences';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect } from 'react';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '../firebaseConfig'; // Sesuaikan path dengan file konfigurasi Firebase Anda

const profileSeller: React.FC = () => {
  const [isChangingRole, setIsChangingRole] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [sellerData, setSellerData] = useState<any>(null);
  const [image, setImage] = useState<string | undefined>(undefined); 
  const [isAboutMeOpen, setAboutMeIsOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [portfolios, setPortfolios] = useState<any[]>([]); // Pastikan ini array kosong
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | undefined | null>(null);

  const history = useHistory();

  const handleBackToBuyer = async () => {
    try {
      setIsChangingRole(true);
      const userToken = localStorage.getItem('userToken');
      if (!userToken) {
        alert('User is not logged in.');
        return;
      }

      const response = await changeUserRole(userToken, 'buyer');
      alert(response.message || 'Role changed to Buyer successfully!');
      history.push('/tab4'); // Redirect ke halaman utama Buyer
    } catch (error: any) {
      alert(error.message || 'Failed to change role.');
    } finally {
      setIsChangingRole(false);
    }
  };

  const fetchPortfolios = async () => {
    try {
      const userToken = localStorage.getItem('userToken');
      if (!userToken) {
        alert('You are not logged in!');
        history.push('/login');
        return;
      }
  
      const data = await getUserPortfolios(userToken);
      console.log('Portfolios fetched:', data);
  
      // Pastikan state selalu berupa array
      setPortfolios(data || []);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error fetching portfolios:', error.message);
      } else {
        console.error('Error fetching portfolios:', error);
      }
      alert('Failed to fetch portfolios.');
      setPortfolios([]); // Set array kosong jika terjadi error
    }
  };
  

  useEffect(() => {
    fetchPortfolios();
  }, []);
  
  // Tambah portofolio baru
  const handleAddPortfolio = async (newPortfolio: any) => {
    try {
      const userToken = localStorage.getItem('userToken');
      if (!userToken) {
        alert('You are not logged in!');
        return;
      }
      const addedPortfolio = await addPortfolio(userToken, newPortfolio);
      setPortfolios((prev) => [...prev, addedPortfolio]); // Update state dengan portofolio baru
      alert('Portfolio added successfully!');
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error adding portfolio:', error.message);
      } else {
        console.error('Error adding portfolio:', error);
      }
      alert('Failed to add portfolio.');
    }
  };
  
  // Edit portofolio
  const handleEditPortfolio = async (updatedPortfolio: any) => {
    try {
      const userToken = localStorage.getItem('userToken');
      if (!userToken) {
        alert('You are not logged in!');
        return;
      }
      const editedPortfolio = await editPortfolio(userToken, updatedPortfolio);
      setPortfolios((prev) =>
        prev.map((portfolio) => (portfolio.id === editedPortfolio.id ? editedPortfolio : portfolio))
      );
      alert('Portfolio updated successfully!');
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error editing portfolio:', error.message);
      } else {
        console.error('Error editing portfolio:', error);
      }
      alert('Failed to update portfolio.');
    }
  };
  

  useEffect(() => {
    const fetchData = async () => {
      const userToken = localStorage.getItem('userToken');
      if (!userToken) {
        history.push('/login'); // Redirect ke login jika token tidak ada
        return;
      }
  
      try {
        const { user, registerSeller } = await getUserAndSellerData(userToken);
        setUserData(user);
        setSellerData(registerSeller);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };
  
    fetchData();
  }, [history]);


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

  const handleMessageButtonClick = () => {
    if (isLoggedIn) {
      history.push('/message'); // Redirect ke halaman message
    } else {
      history.push('/login'); // Redirect ke halaman login
    }
  };

  const initialSkills = [
    "Database Design",
    "Software Engineering",
    "Problem Solving",
    "Web Development",
    "Data Science",
    "Machine Learning",
    "Mobile Development",
    "AI Research",
    "Cybersecurity",
    "Cloud Computing",
    "Game Development",
    "UI/UX Design"
  ];

  const [skills, setSkills] = useState(initialSkills);
  const [isSkillOpen, setIsSkillOpen] = useState(true);

  // Fungsi untuk membuka/menutup card
  const SkilltoggleCard = () => {
    setIsSkillOpen(!isSkillOpen);
  };

  // Fungsi untuk menghapus skill
  const handleDeleteSkill = (skillLabel: string) => {
    const updatedSkills = skills.filter((skill) => skill !== skillLabel);
    setSkills(updatedSkills);
  };
  

  // Fungsi untuk menambah skill baru
  const handleAddSkill = () => {
    if (skills.length < 12) {
      // Navigate to the AddSkill page if there are less than 12 skills
      history.push('/AddSkill'); // Navigate to the AddSkill page
    } else {
      // Show an alert if there are already 12 skills
      alert("You can only add up to 12 skills.");
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

  const handleCartButtonClick = () => {
    if (isLoggedIn) {
      history.push('/'); // Redirect ke halaman message
    } else {
      history.push('/login'); // Redirect ke halaman login
    }
  };

  const handleLogout = () => {
    localStorage.clear(); // Bersihkan semua data localStorage (opsional)
    history.push('/login'); // Redirect ke halaman login
  };

  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [skillName, setSkillName] = useState("");
  const [skillLevel, setSkillLevel] = useState("");

  // Open modal
  const openEditSkill = () => {
    setEditModalOpen(true);
  };

  const fetchProfileImage = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
      const userId = userInfo.uid;

      if (!userId) {
        console.error('User ID not found');
        setProfileImage('/default-profile-image.png');
        return;
      }

      // Cek di localStorage untuk cache
      const cachedImage = localStorage.getItem('profileImage');
      if (cachedImage) {
        setProfileImage(cachedImage);
        return;
      }

      // Ambil URL dari Firebase Storage
      const storageRef = ref(storage, `profile_photos/${userId}/profile_photo.jpg`);
      const downloadURL = await getDownloadURL(storageRef);
      setProfileImage(downloadURL);
      localStorage.setItem('profileImage', downloadURL); // Simpan URL untuk caching
    } catch (error) {
      console.error('Error fetching profile image:', error);
      setProfileImage('/default-profile-image.png');
    }
  };
  
  useEffect(() => {
    fetchProfileImage(); // Panggil saat komponen dimuat
  }, []);

  const handleProfileImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const validFormats = ['image/jpeg', 'image/png'];
    const maxSizeInMB = 2;

    if (!validFormats.includes(file.type)) {
      alert('Please upload a JPEG or PNG image.');
      return;
    }
    if (file.size > maxSizeInMB * 1024 * 1024) {
      alert('File size must not exceed 2MB.');
      return;
    }

    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
      const userId = userInfo.uid;

      if (!userId) {
        alert('User ID not found in userInfo. Please log in again.');
        return;
      }

      const storageRef = ref(storage, `profile_photos/${userId}/profile_photo.jpg`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);

      setProfileImage(downloadURL);
      localStorage.setItem('profileImage', downloadURL);

      const updatedUserData = { ...userInfo, photo_url: downloadURL };
      localStorage.setItem('userInfo', JSON.stringify(updatedUserData));

      alert('Profile image uploaded successfully!');
    } catch (error: any) {
      console.error('Error uploading file:', error.message);
      alert(`Failed to upload the file: ${error.message}`);
    }
  };

  const handleProfileImageDelete = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
      const userId = userInfo.uid;

      if (!userId) {
        alert('User ID not found in userInfo. Please log in again.');
        return;
      }

      const storageRef = ref(storage, `profile_photos/${userId}/profile_photo.jpg`);
      await deleteObject(storageRef);

      setProfileImage('/default-profile-image.png');
      localStorage.removeItem('profileImage');

      alert('Profile image deleted successfully!');
    } catch (error: any) {
      console.error('Error deleting profile image:', error.message);
      alert(`Failed to delete the profile image: ${error.message}`);
    }
  };

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
          src={profileImage || '/default-profile-image.png'}
          alt={userData?.name || 'User Avatar'}
          sx={{ width: 85, height: 85, cursor: 'pointer' }}
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
    <input
      type="file"
      accept="image/*"
      onChange={handleProfileImageUpload}
      style={{ display: 'none' }}
      id="profile-image-input"
    />
    <label htmlFor="profile-image-input">
      <Button variant="outlined" color="secondary" component="span" fullWidth>
        Choose File
      </Button>
    </label>
    <Button variant="contained" fullWidth onClick={handleCamera} sx={{ mb: 2 }}>
      Take Photo with Camera
    </Button>
    <Button variant="contained" fullWidth onClick={handleGallery} sx={{ mb: 2 }}>
      Upload from Gallery
    </Button>
    <Button variant="contained" fullWidth onClick={handleProfileImageDelete} sx={{ mb: 2 }}>
      Delete Profile Image
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
          {sellerData?.name || 'Nama Pengguna'}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {sellerData?.organization || 'Organisasi'} | {sellerData?.major || 'Jurusan'}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          🌍 {userData?.language || 'Bahasa'}
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
              <Typography variant="h6">{sellerData?.rating || 'N/A'}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="body2" color="textSecondary">
                📅 Since
              </Typography>
              <Typography variant="h6">
              {new Date(sellerData?.created_at).getFullYear() || 'N/A'}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="body2" color="textSecondary">
                📦 Orders
              </Typography>
              <Typography variant="h6">
              {sellerData?.orders || '0'}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="body2" color="textSecondary">
                🎓 Level
              </Typography>
              <Typography variant="h6">
              {sellerData?.level || 'N/A'}
              </Typography>
            </Grid>
          </Grid>

           <IonCard style={{ cursor: "pointer" }}>
      {/* Header Card */}
      <IonCardHeader>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Judul Card */}
          <IonCardTitle>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Skills
            </Typography>
          </IonCardTitle>

          {/* Box containing Add Icon, Edit Icon, and Arrow */}
          <Box sx={{ display: "flex", alignItems: "center", gap: "8px", position: "relative" }}>
            <div>
              {/* Add Icon */}
              <IconButton onClick={handleAddSkill} sx={{ marginLeft: '1px' }} size="small">
                <AddIcon />
              </IconButton>

              {/* Edit Icon */}
              <IconButton onClick={() => alert("Edit skill functionality")} sx={{ marginLeft: "1px" }} size="small">
                <EditIcon />
              </IconButton>

              {/* Arrow Icon based on state */}
              {isSkillOpen ? (
                <ArrowDropUpIcon sx={{ color: "gray" }} onClick={SkilltoggleCard} />
              ) : (
                <ArrowDropDownIcon sx={{ color: "gray" }} onClick={SkilltoggleCard} />
              )}
            </div>
          </Box>
        </Box>
      </IonCardHeader>

      {/* Konten Card (Hanya tampil jika isOpen true) */}
      {isSkillOpen && (
        <IonCardContent>
          <Box>
            {/* Chips Konten dengan tombol Hapus */}
            {skills.map((skill, index) => (
              <Chip
                key={index}
                label={skill}
                onDelete={() => handleDeleteSkill(skill)}
                style={{ marginRight: "8px", marginBottom: "8px" }}
                deleteIcon={<CloseIcon />}
              />
            ))}
          </Box>
        </IonCardContent>
      )}
    </IonCard>



        
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
    <Timeline sx={{ marginLeft: "-150px" }}>
      {portfolios && portfolios.length > 0 ? (
        portfolios.map((portfolio, index) => (
          <TimelineItem key={portfolio.id} sx={{ marginLeft: "-20px" }}>
            <TimelineSeparator>
              <TimelineDot color="primary" />
              {index < portfolios.length - 1 && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent>
              {/* Header dengan Judul dan Tombol Edit */}
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h3" sx={{ fontWeight: 700 }}>
                  {portfolio.title || "Untitled"}
                </Typography>
                <Box>
                  <IconButton
                    onClick={() =>
                      history.push(`/EditPortoModal?id=${portfolio.id}`)
                    }
                  >
                    <EditIcon />
                  </IconButton>
                </Box>
              </Box>

              {/* Status */}
              <Typography variant="body2" color="text.secondary">
                Status: {portfolio.status || "No status available"}
              </Typography>

              {/* Description */}
              <Typography variant="body2" sx={{ marginTop: "8px" }}>
                Description: {portfolio.description || "No description available"}
              </Typography>

              {/* Link */}
              <Typography variant="body2" sx={{ marginTop: "8px" }}>
                Link:{" "}
                {portfolio.link ? (
                  <a
                    href={portfolio.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {portfolio.link}
                  </a>
                ) : (
                  "No link provided"
                )}
              </Typography>

              {/* Dates */}
              <Typography variant="body2" sx={{ marginTop: "8px" }}>
                Date Created: {portfolio.DateCreated || "N/A"}
              </Typography>
              <Typography variant="body2">
                Date End:{" "}
                {portfolio.DateEnd || (portfolio.isPresent ? "Present" : "N/A")}
              </Typography>

              {/* Gambar */}
              {portfolio.image && (
                <Box sx={{ marginTop: "16px", textAlign: "center" }}>
                  <img
                    src={portfolio.image}
                    alt={portfolio.title || "Portfolio Image"}
                    style={{
                      maxWidth: "100%",
                      height: "auto",
                      borderRadius: "8px",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                </Box>
              )}
            </TimelineContent>
          </TimelineItem>
        ))
      ) : (
        <Typography>No portfolios available. Add one to get started!</Typography>
      )}
    </Timeline>
  

<IonCardContent>
</IonCardContent>

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
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleBackToBuyer}
          disabled={isChangingRole} // Disabled saat proses berlangsung
          sx={{
            width: 'calc(100% - 32px)',
            margin: '16px auto',
            padding: '10px',
          }}
        >
          {isChangingRole ? 'Switching...' : 'Back to Buyer'}
        </Button>
      </IonContent>
    </IonPage>
    </ThemeProvider>
  );
};

export default profileSeller;
