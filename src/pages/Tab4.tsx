import { Redirect, Route } from 'react-router-dom';

import {
  IonPage,
  IonContent,
  IonButton,
} from '@ionic/react';
import '@fontsource/poppins';
import EditIcon from '@mui/icons-material/Edit';
import LanguageIcon from '@mui/icons-material/Language';
import * as React from 'react';
//import './Tab4.css';
import {Stack, FormControl, FormLabel, Input, TextField, Modal, Divider, List, ListItemButton, ListItemIcon, ListItemText, Avatar, Grid, AppBar, Toolbar, IconButton, Card, CardContent, Typography, Box, Button, Menu, MenuItem } from '@mui/material' ;
import { List as ListIcon, FavoriteBorder as WishlistIcon, PersonOutline as FollowingSellerIcon, ChatBubbleOutline as ReviewIcon, HeadsetMic as ComplainedOrderIcon, HelpOutline as HelpIcon } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline, GlobalStyles } from '@mui/material';
import '@fontsource/poppins';  // Import the font

import ModalDialog from '@mui/joy/ModalDialog';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MailIcon from '@mui/icons-material/Mail';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { get, post, getSkills, getUserSkills } from '../api.service';
import { getUser, createBuyerProfile, updateBuyerProfile} from '../api.service';
import { useHistory } from 'react-router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Preferences } from '@capacitor/preferences';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
const Tab4: React.FC = () => {
  
  const [userName, setUserName] = useState<string | null>(null);
  const [buyerData, setBuyerData] = useState<any>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // For controlling menu open/close
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null); // Store the selected skill
  const [image, setImage] = useState<string | undefined>(undefined);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [skills, setSkills] = useState<any[]>([]); // State to store skills data
  const [userSkills, setUserSkills] = useState<any[]>([]); // State to store user skills
  const [previewImage, setPreviewImage] = useState<string | undefined | null>(null);
  const [isSkillsListVisible, setIsSkillsListVisible] = useState<boolean>(false); // State for toggling the skills dropdown

  const [setIsLoggedIn] = useState<boolean>(false);
  const isLoggedIn = !!localStorage.getItem('userToken'); // Misalnya token disimpan di localStorage



  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUser();
        setUserName(userData.name); // Mengambil variabel 'name' dari user data
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchUserData();
  }, []);

  // Load saved image on component mount
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

 // Handle opening the menu
 const handleClick = (event: React.MouseEvent<HTMLElement>) => {
  console.log('Menu button clicked'); // Log when the menu button is clicked
  setAnchorEl(event.currentTarget);
};

// Handle closing the menu
const handleClose = () => {
  console.log('Menu closed'); // Log when the menu is closed
  setAnchorEl(null);
};

// Handle selecting a skill from the dropdown
const handleSelectSkill = (skillTitle: string) => {
  console.log(`Skill selected: ${skillTitle}`); // Log the selected skill
  setSelectedSkill(skillTitle); // Set the selected skill
  handleClose(); // Close the menu
};

// Log the skills data each time it updates
useEffect(() => {
  console.log('Skills data updated:', skills); // Log skills whenever the state updates
}, [skills]);

useEffect(() => {
  const fetchSkillsData = async () => {
    try {
      console.log('Fetching skills data...'); // Log before fetching
      const skillsData = await get('skills/fetch', {});
      console.log('Fetched skills data:', skillsData); // Log the fetched data
      
      // Check if skills data is an object and contains the 'data' array
      if (skillsData && Array.isArray(skillsData.data)) {
        setSkills(skillsData.data); // Set the skills data from the 'data' property
      } else {
        console.error('Fetched skills data is not in the expected format:', skillsData);
      }
    } catch (error) {
      console.error('Error fetching skills data:', error); // Log any errors during fetch
    }
  };

  fetchSkillsData();
}, []); // Empty dependency array means this will run once on mount

  // Function to handle cancel action
  const handleCancel = () => {
    // Reset any form fields, close modal, or any other cleanup
    handleCloseEdit(); // This closes the modal, for example
    console.log("Cancel action triggered.");
  };

  const [open, setOpenEdit] = useState(false);// Function to open modal
  const handleOpenEdit = () => setOpenEdit(true);

  const handleCloseEdit = () => setOpenEdit(false);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('userToken');
      if (!token) throw new Error('No token found');

      await post('logout', {}, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      localStorage.removeItem('userToken');
      history.push('/login');
      window.location.reload();
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

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

  function editProfile(event: React.MouseEvent<HTMLButtonElement>): void {
    throw new Error('Function not implemented.');
  }
  const theme = createTheme({
    typography: {
      fontFamily: '"Poppins", sans-serif', // Pastikan font didefinisikan dengan benar
    },
  });
  
  const globalStyles = {
    '*': {
      fontFamily: 'Poppins, sans-serif',  // Sesuaikan font global dengan tema
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
    },
  };
  const history = useHistory();

  const handleTransactionClick = () => {
    // Arahkan ke halaman transaksi
    history.push('/tab3');
  };

  const handleWishlistClick = () => {
    console.log('Navigating to Wishlist');
    history.push('/wishlist');
  };


  const handlefollowSellerClick= () => {
    console.log('Navigating to Wishlist');
    history.push('/followingSeller');
  };

  const handleReviewClick= () => {
    console.log('Navigating to Wishlist');
    history.push('/review');
  };

  const [ completePurchase, setCompletePurchase] = useState<any[]>([]);

  useEffect(() => {
    setCompletePurchase([
      { id: 1, name: 'Package Powerpoint', icon: '../public/image 1.png', seller: 'dikadika' },
      { id: 2, name: 'Visual Communication Design', icon:'public/web-design-internet-website-responsive-software-concept 1.png', seller: 'aileenliexiuai' },
      { id: 3, name: 'Copywriting (Caption)', icon: 'public/high-angle-hand-correcting-grammar-mistakes 1.png', seller: 'galn' },
    ]);
  }, []);
  type ProgressItem = {
    id: number;
    name: string;
    nextMeeting: string;
    completion: string;
  };
  
  const [progressData, setProgressData] = useState<ProgressItem[]>([]);

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
    // Set data untuk kartu
    setProgressData([
      {id: 1,
        name: 'Package Database Website',
        nextMeeting: '09-29-2024',
        completion: '09-31-2024'
      },
      { id: 2,
        name: 'Visual Communication Design',
        nextMeeting: '10-05-2024',
        completion: '10-10-2024'
      },
      {id: 3,
        name: 'Copywriting (Caption)',
        nextMeeting: '11-15-2024',
        completion: '11-20-2024'
      },
    ]);
  }, []);


  useEffect(() => {
    document.body.style.fontFamily = 'Poppins, sans-serif';
  }, []);

  const modalStyles = {
    zIndex: 1300,  // pastikan modal memiliki z-index yang cukup tinggi
  };

  return (
 
    <IonPage>
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

    <IonContent fullscreen>
    <Grid container spacing={3} sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
    <Grid container item xs={12} sm={12} md={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', position: 'relative' }}>
      
      {/* Avatar Section */}
      <Grid item xs="auto"  sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '100px', marginLeft: '25px' }}>
        <Avatar
          src={image || '/path_to_profile_image'}
          alt="User Avatar"
          sx={{ width: 85, height: 85, cursor: 'pointer' }}
          onClick={captureImage}
        />
      </Grid>

        <Grid item xs sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'left', marginTop: '150px', marginLeft: '16px', height: '80px' }}>
          
          {/* User Name */}
          <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '2px' }}>
            {userName || 'Nama Pengguna'}
          </Typography>

          {/* University and Major */}
          <Typography variant="body2" color="textSecondary" sx={{ marginBottom: '6px' }}>
            {buyerData?.Universitas || 'Universitas'} | {buyerData?.Major || 'Jurusan'}
          </Typography>

          {/* Language */}
          <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '2px' }}>
            <LanguageIcon fontSize="small" sx={{ marginRight: 0.5 }} />
            <Typography variant="body2" color="textSecondary">
              {buyerData?.Language || 'Bahasa'}
            </Typography>
          </Box> 

          {/* Join as Seller Button */}
          <Button 
            variant="contained" 
            size="small" 
            sx={{
              width: '120px',
              backgroundColor: '#2196f3', 
              color: '#fff', 
              borderRadius: '20px', 
              textTransform: 'none', 
              padding: '5px 15px',
              marginTop: '6px'
            }}
          >
            Join as Seller
          </Button>
        </Grid>

        {/* Edit Button */}
        <Grid item xs="auto" sx={{ position: 'relative' }}>
          <IconButton
             onClick={handleOpenEdit}
            sx={{
              position: 'absolute',
              marginTop :'30px',
              right: '15px',
              transform: 'translateY(-50%)', // Adjust to perfectly center the button vertically
              zIndex: 2,
            }}
            size="small"
          >
            <EditIcon />
          </IconButton>
        </Grid>
    </Grid>
  </Grid>

  <Modal
        open={open}
        onClose={handleCloseEdit}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            backgroundColor: 'white',
            width: '350px',
            borderRadius: '8px',
            
            boxShadow: 24,
          }}
        >
          <Box
      sx={{
        
        backgroundColor: '#0094FF',  // Blue background
        borderRadius: '10px 10px 0 0',  // Rounded top corners
        display: 'flex',
        justifyContent: 'center',
        padding: '20px',
        margin: 0,
        paddingLeft: 0,
            paddingRight:0,
        marginBottom: '20px',  // Adjust space below the blue bar
      }}
    >
      <DialogTitle
        sx={{
          padding: 0,  // Remove padding around text
          color: 'white',
          fontSize: '18px', // Adjust font size if necessary
        }}
      >
        Edit Profile
      </DialogTitle>
      </Box>

          <form
            onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              setOpenEdit(false);
            }}
          >
            <Box sx={{ paddingLeft: '20px',
            paddingRight:'20px',
            paddingBottom: '20px',
            display: 'flex', marginTop:'20px', flexDirection: 'column', alignItems: 'flex-start' }}>
              <FormControl sx={{ marginBottom: 2 }}>
                <FormLabel>Name*</FormLabel>
                <TextField sx={{width: '300px' }} autoFocus required />
              </FormControl>
              <FormControl sx={{ marginBottom: 2 }}>
                <FormLabel>Organization*</FormLabel>
                <TextField sx={{ width: '300px' }} autoFocus required />
              </FormControl>
              <FormControl sx={{ marginBottom: 2 }}>
                <FormLabel>Major*</FormLabel>
                <TextField sx={{ width: '300px' }} autoFocus required />
              </FormControl>
              <FormControl sx={{ marginBottom: 10 }}>
                <FormLabel>Language*</FormLabel>
                <TextField sx={{ width: '300px' }} autoFocus required />
              </FormControl>
              <Box display="flex" justifyContent="space-between" mt={1}>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleCloseEdit}
                  sx={{ width: '150px' }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  sx={{ marginLeft: '10px', width: '150px' }}
                >
                  Submit
                </Button>
              </Box>
            </Box>
          </form>
        </Box>
      </Modal>


  <br></br>
      <br></br>
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


      <div className="CompletePurchaseWrapper" style={{ width: '100%' }}>
  {/* Red background section only for the message */}
  <Typography
    variant="h6"
    style={{
      color: 'white',
      textAlign: 'left',
      padding: '2px 17px',
      backgroundColor: '#FF4D00', // Red background only for the text
    }}
  >
    Complete your purchase now!
  </Typography>

  <CardContent>
    <div className="scrollable-grid" style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
      {/* Wrap the columns in a div that uses flexbox */}
      <div style={{ display: 'flex' }}>
        {completePurchase.map((item) => (
          <Card
            key={item.id}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              borderRadius: '12px',
              overflow: 'hidden',
              margin: '8px',
              width: '125px', // Adjust the card width to fit in the scrollable container
              height: '200px',
              padding: '10px',
              borderColor: '#ABABAB',
              backgroundColor: 'white',
              flexShrink: 0, // Prevent shrinking in the scrollable flex container
            }}
          >
            <Box
              className="image-wrapper"
              sx={{
                width: '100%',
                height: '120px',
                marginBottom: '10px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
                borderRadius: '8px',
              }}
            >
              <img
                src={item.icon}
                alt={item.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </Box>
            <CardContent
              sx={{
                padding: '0',
                textAlign: 'left',
                paddingBottom: '0',
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  textAlign: 'left',
                  wordBreak: 'break-word',
                  whiteSpace: 'normal',
                  fontSize: '14px',
                  fontWeight: 'bold',
                }}
              >
                {item.name}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  textAlign: 'left',
                  fontSize: '12px',
                  color: 'textSecondary',
                }}
              >
                by {item.seller}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </CardContent>
</div>



  <div className="OnProgressWrapper" style={{ width: '100%' }}>
      <Typography
        variant="h6"
        style={{
          color: 'white',
          textAlign: 'left',
          padding: '2px 17px',
          backgroundColor: '#3CB232',
        }}
      >
        On Progress
      </Typography>

      <CardContent>
        <div className="scrollable-grid" style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            {progressData.map((item) => (
              <Card
                key={item.id}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  overflow: 'hidden',
                  border: '1px solid #ABABAB',
                  borderRadius: '8px',
                  margin: '10px',
                  width: 200,
                  flexShrink: 0,
                }}
              >
                <CardContent className="progress-card" sx={{ padding: '8px' }}>
                  <Grid container spacing={0}>
                    <Grid
                      item
                      xs={6}
                      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          fontSize: '14px',
                          marginLeft: '2px',
                          wordBreak: 'break-word',
                          whiteSpace: 'normal',
                        }}
                      >
                        {item.name}
                      </Typography>
                    </Grid>

                    <Grid
                      item
                      xs={6}
                      sx={{
                        marginTop: '1px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                      }}
                    >
                      <Box>
                        <Typography variant="body2" color="textSecondary" sx={{ fontSize: '12px' }}>
                          Next Meeting:
                        </Typography>
                        <Typography
                          variant="h6"
                          sx={{ fontWeight: 'bold', fontSize: '14px', color: '#0094FF' }}
                        >
                          {item.nextMeeting}
                        </Typography>
                      </Box>
                      <Box mt={1}>
                        <Typography variant="body2" color="textSecondary" sx={{ fontSize: '12px' }}>
                          Completion in:
                        </Typography>
                        <Typography
                          variant="h6"
                          sx={{ fontWeight: 'bold', fontSize: '14px', color: '#0094FF' }}
                        >
                          {item.completion}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </CardContent>
    </div>


        {/* Menu List */}
        <List>
      <ListItemButton  onClick={handleTransactionClick}  component="li">
        <ListItemIcon>
          <ListIcon />
        </ListItemIcon>
        <ListItemText primary="Transaction List" />
      </ListItemButton>
      <Divider />
      <ListItemButton onClick={handleWishlistClick}  component="li">
        <ListItemIcon>
          <WishlistIcon />
        </ListItemIcon>
        <ListItemText primary="Wishlist" />
      </ListItemButton>
      <Divider />
      <ListItemButton onClick={handlefollowSellerClick} component="li">
        <ListItemIcon>
          <FollowingSellerIcon />
        </ListItemIcon>
        <ListItemText primary="Following Seller" />
      </ListItemButton>
      <Divider />
      <ListItemButton onClick={handleReviewClick} component="li">
        <ListItemIcon>
          <ReviewIcon />
        </ListItemIcon>
        <ListItemText primary="Review" />
      </ListItemButton>
      <Divider />
      <Divider />

      <Divider />

      <ListItemButton component="li">
        <ListItemIcon>
          <ComplainedOrderIcon />
        </ListItemIcon>
        <ListItemText primary="Complained Order" />
      </ListItemButton>
      <Divider />
      <ListItemButton component="li">
        <ListItemIcon>
          <HelpIcon />
        </ListItemIcon>
        <ListItemText primary="Help and Support" />
      </ListItemButton>
    </List>

  {/* Logout Button */}
            <br></br>

            <br></br>
      <Button
      variant="contained"
      color="error"
      fullWidth
      onClick={handleLogout}
      sx={{
        width: 'calc(100% - 32px)',  // Full width minus margin
        margin: '0 16px',  // Horizontal margin to prevent touching screen edges
        padding: '10px',  // Padding inside the button
      }}
    >
      Logout
    </Button>
      </IonContent>
    </IonPage>
  );
};

defineCustomElements(window);
export default Tab4;
