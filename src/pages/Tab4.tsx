import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
  IonAvatar,
  IonImg,
  IonIcon,
  IonText,
  IonCard,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonBadge,
  IonModal,
  IonButtons,
} from '@ionic/react';
import './Tab4.css';

import { Button, Menu, MenuItem, Typography } from '@mui/material';
import { get, post, getSkills, getUserSkills } from '../api.service';
import { getUser, createBuyerProfile, updateBuyerProfile} from '../api.service';
import { useHistory } from 'react-router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Preferences } from '@capacitor/preferences';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { useEffect, useState } from 'react';
import { helpCircleOutline, chatboxOutline, personCircleOutline, cart, heartOutline, notificationsOutline, mailOutline, menuOutline, headsetOutline, listOutline } from 'ionicons/icons';

const Tab4: React.FC = () => {
  
  const [userName, setUserName] = useState<string | null>(null);
  const [buyerData, setBuyerData] = useState<any>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // For controlling menu open/close
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null); // Store the selected skill
  const history = useHistory();
  const [image, setImage] = useState<string | undefined>(undefined);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [skills, setSkills] = useState<any[]>([]); // State to store skills data
  const [userSkills, setUserSkills] = useState<any[]>([]); // State to store user skills
  const [previewImage, setPreviewImage] = useState<string | undefined | null>(null);
  const [isSkillsListVisible, setIsSkillsListVisible] = useState<boolean>(false); // State for toggling the skills dropdown

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
      const photo = await Camera.getPhoto({
        quality: 100,
        allowEditing: false,
        source: CameraSource.Camera,
        resultType: CameraResultType.DataUrl,
      });

      const imageUrl = photo.dataUrl;
      setPreviewImage(imageUrl); // Set the preview image for validation
      setModalOpen(true); // Open modal to show the preview
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

  return (
    <IonPage>
      <IonHeader>
  <IonToolbar className="custom-toolbar">
    <div className="logo-container">
      <img src="public/SkillXLogo.png" alt="SkillX Logo" className="logo" />
    </div>
    <div className="spacer"></div>
    <div className="icon-container">
      <IonButton fill="clear">
        <IonIcon icon={cart} />
        <IonBadge color="danger">5</IonBadge>
      </IonButton>
      <IonButton fill="clear">
        <IonIcon icon={notificationsOutline} />
      </IonButton>
      <IonButton fill="clear">
        <IonIcon icon={mailOutline} />
      </IonButton>
      <IonButton fill="clear">
        <IonIcon icon={menuOutline} />
      </IonButton>
    </div>
  </IonToolbar>
</IonHeader>

      <IonContent fullscreen>
      <div className="profile-section">
        <div className="avatar-container">
          <IonAvatar className="avatar" onClick={captureImage}>
            <IonImg src={image || '/path_to_profile_image'} alt="User Avatar" />
          </IonAvatar>
          <button className="edit-button" onClick={editProfile}>
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16">
              <path fill="currentColor" fill-rule="evenodd" d="M11.423 1A3.577 3.577 0 0 1 15 4.577c0 .27-.108.53-.3.722l-.528.529l-1.971 1.971l-5.059 5.059a3 3 0 0 1-1.533.82l-2.638.528a1 1 0 0 1-1.177-1.177l.528-2.638a3 3 0 0 1 .82-1.533l5.059-5.059l2.5-2.5c.191-.191.451-.299.722-.299m-2.31 4.009l-4.91 4.91a1.5 1.5 0 0 0-.41.766l-.38 1.903l1.902-.38a1.5 1.5 0 0 0 .767-.41l4.91-4.91a2.08 2.08 0 0 0-1.88-1.88m3.098.658a3.6 3.6 0 0 0-1.878-1.879l1.28-1.28c.995.09 1.788.884 1.878 1.88z" clip-rule="evenodd"/>
            </svg>
          </button>
        </div>
  <div className="user-details">
    <h3>{userName || 'Nama Pengguna'}</h3>
    <p>{buyerData?.Universitas || 'Universitas'}<br />{buyerData?.Language || 'Bahasa'}</p>
    <IonButton fill="outline" size="small">Join as Seller</IonButton>
  </div>
</div>
        <div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleClick}
        sx={{ marginBottom: 2 }} // Add some margin for better spacing
      >
        {selectedSkill ? selectedSkill : 'Select a Skill'} {/* Display selected skill */}
      </Button>

      {/* Dropdown Menu */}
      <Menu
        anchorEl={anchorEl} // Menu's anchor element (the button)
        open={Boolean(anchorEl)} // Open the menu if anchorEl is not null
        onClose={handleClose} // Close the menu when clicked outside
      >
        {skills.length > 0 ? (
          skills.map((skill, index) => (
            <MenuItem key={index} onClick={() => handleSelectSkill(skill.TitleSkills)}>
              {skill.TitleSkills}
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>No skills available</MenuItem>
        )}
      </Menu>
    </div>
        <IonModal className="modal-content" isOpen={modalOpen} onDidDismiss={() => setModalOpen(false)}>
          <IonHeader className="modal-header">
            <IonToolbar>
              <IonTitle>Select Image Source</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setModalOpen(false)}>Close</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            {previewImage && (  // Display the preview image
              <IonImg className="preview-image" src={previewImage} alt="Preview" />
            )}
            <IonButton expand="full" onClick={handleCamera}>Take Photo with Camera</IonButton>
            <IonButton expand="full" onClick={handleGallery}>Upload from Gallery</IonButton>
            
            {previewImage && (  // Show confirm button only if there's a preview
              <>
                <IonButton expand="full" color="success" onClick={confirmImage}>Confirm Profile Picture</IonButton>
                </>
            )}
          </IonContent>
        </IonModal>



        <div className="CompletePurchaseWrapper">
      <IonText className="CompletePurchase">
        <h3>Complete your purchase now!</h3>
      </IonText>
    </div>

        {/* Complete Your Purchase Section */}
      <IonCardContent>
        <div className="scrollable-grid">
          {/* Wrap the columns in a div that uses flexbox */}
          <div className="flex-row">

            <IonCol size="6">
              <IonCard className="product-card">
                  <div className="image-wrapper">
                    <img src="public\web-design-internet-website-responsive-software-concept 1.png" alt="Package Portfolio Website" />
                  </div>                
                  <IonCardContent className="productcontent">
                  <h5> Package Portfolio Website</h5>
                  <p> by Aileniusluci</p>
                </IonCardContent>
              </IonCard>
            </IonCol>

            {/* Repeat IonCol for each additional product */}
            <IonCol size="6">
              <IonCard className="product-card">
                  <div className="image-wrapper">
                     <img src="/path_to_package_image.png" alt="Package Portfolio Website" />
                  </div>                 
                  <IonCardContent  className="productcontent">
                  <h5>Another Package website </h5>
                  <p>by Someone Else</p>
                </IonCardContent>
              </IonCard>
            </IonCol>

            <IonCol size="6">
              <IonCard className="product-card">
              <div className="image-wrapper">
                     <img src="/path_to_package_image.png" alt="Package Portfolio Website" />
                  </div>   
                <IonCardContent  className="productcontent">
                  <h5>Third Package</h5>
                  <p>by Another Creator</p>
                </IonCardContent>
              </IonCard>
            </IonCol>

            {/* Add more IonCol as needed */}
          </div>
        </div>
      </IonCardContent>

        <div className="OnProgressWrapper">
          <IonText className="OnProgress">
            <h3>On Progress</h3>
          </IonText>
          </div>
          <IonCardContent className="progress-card">
        <IonItem lines="none">
          <IonLabel className="on-progress-item">
            <IonRow>
              <IonCol size="6" className="center-content">
                <h5>Package Database Website</h5>
              </IonCol>
              <IonCol size="6" className="next-meeting">
                <p>Next Meeting: </p>
                <h4>09-29-2024</h4>
                <p>Completion in: </p>
                <h4>09-31-2024</h4>
              </IonCol>
            </IonRow>
          </IonLabel>
        </IonItem>
      </IonCardContent>
    

        {/* Menu List */}
        <IonList>
          <IonItem>
          <IonIcon icon={listOutline} slot="start" aria-label="Wishlist" />
            <IonLabel>Transaction List</IonLabel>
          </IonItem>
          <IonItem>
            <IonIcon icon={heartOutline} slot="start" aria-label="Wishlist" />
            <IonLabel>Wishlist</IonLabel>
          </IonItem>
          <IonItem>
          <IonIcon icon={personCircleOutline} slot="start" aria-label="Following Seller" />          
          <IonLabel>Following Seller</IonLabel>
          </IonItem>
          <IonItem>
             <IonIcon icon={chatboxOutline} slot="start" aria-label="Following Seller" />          
            <IonLabel>Review</IonLabel>
          </IonItem>
          <IonItem>
          <IonIcon icon={headsetOutline} slot="start" aria-label="Following Seller" />          
            <IonLabel>Complained Order</IonLabel>
          </IonItem>
          <IonItem>
          
          <IonIcon icon={helpCircleOutline} slot="start" aria-label="Following Seller" />          

            <IonLabel>Help and Support</IonLabel>
          </IonItem>
        </IonList>

  {/* Logout Button */}
            <br></br>

            <br></br>
        <IonButton color="danger" expand="block" onClick={handleLogout}>
          Logout
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

defineCustomElements(window);
export default Tab4;
