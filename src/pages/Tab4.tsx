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
import { post } from '../api.service';
import { useHistory } from 'react-router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Preferences } from '@capacitor/preferences';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { useEffect, useState } from 'react';
import { cart, heartOutline, notificationsOutline, mailOutline, menuOutline } from 'ionicons/icons';

const Tab4: React.FC = () => {
  const history = useHistory();
  const [image, setImage] = useState<string | undefined>(undefined);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string | undefined | null>(null);

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
          <IonAvatar className="avatar" onClick={captureImage}>
            <IonImg src={image || '/path_to_profile_image'} alt="User Avatar" />
          </IonAvatar>
          <div className="user-details">
            <h3>Ailin</h3>
            <p>BINUS University, Computer Science<br />Indonesia, English, Chinese</p>
            <IonButton fill="outline"  size="small">Join as Seller</IonButton>
          </div>
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




        {/* Complete Your Purchase Section */}
        <IonCard>
          <IonCardContent>
          <div className="CompletePurchaseWrapper">
            <IonText className="CompletePurchase">
              <h3>Complete your purchase now!</h3>
            </IonText>
          </div>
          <IonGrid>
              <IonRow>
                <IonCol size="6">
                  <IonCard className="product-card">
                    <img src="/path_to_package_image.png" alt="Package Portfolio Website" />
                    <IonCardContent>
                      <h5>Package Portfolio Website</h5>
                      <p>by Aileniusluci</p>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
                {/* Repeat IonCol for each additional product */}
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>

        {/* On Progress Section */}
        <IonCard>
          <IonCardContent>
            <IonText color="success"><h3>On Progress</h3></IonText>
            <IonItem lines="none">
              <IonLabel>
                <h5>Package Database Website</h5>
                <p>Next Meeting: 09-29-2024<br />Completion in: 09-30-2024</p>
              </IonLabel>
            </IonItem>
          </IonCardContent>
        </IonCard>

        {/* Menu List */}
        <IonList>
          <IonItem>
            <IonLabel>Transaction List</IonLabel>
          </IonItem>
          <IonItem>
            <IonIcon icon={heartOutline} slot="start" aria-label="Wishlist" />
            <IonLabel>Wishlist</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Following Seller</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Review</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Complained Order</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Help and Support</IonLabel>
          </IonItem>
        </IonList>

        {/* Logout Button */}
        <IonButton color="danger" expand="block" onClick={handleLogout}>
          Logout
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

defineCustomElements(window);
export default Tab4;
