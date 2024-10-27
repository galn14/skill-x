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
} from '@ionic/react';
import './Tab4.css';
import { heartOutline } from 'ionicons/icons';
import { post } from '../api.service';
import { useHistory } from 'react-router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';

import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { useEffect, useState } from 'react';

const Account: React.FC = () => {
  const history = useHistory();
  const [image, setImage] = useState<string | undefined>(undefined);

  // Load saved image on component mount
  useEffect(() => {
    const loadImage = async () => {
      const { value } = await Preferences.get({ key: 'profileImage' });
      if (value) {
        setImage(value);
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

  // Updated captureImage function with parameters similar to Angular code
  const captureImage = async () => {
    try {
      const photo = await Camera.getPhoto({
        quality: 100,
        allowEditing: false,
        source: CameraSource.Camera,
        resultType: CameraResultType.DataUrl, // Get image as Data URL
      });

      const imageUrl = photo.dataUrl;
      setImage(imageUrl); // Update IonAvatar with the new image URL

      // Save image URL to Preferences for persistence
      if (imageUrl) {
        await Preferences.set({
          key: 'profileImage',
          value: imageUrl,
        });
      }
    } catch (error) {
      console.error('Error capturing image', error);
    }
  };

  return (
    <IonPage>
      <IonHeader translucent={true} className="custom-header">
        <IonToolbar>
          <IonButton className="close-button" slot="start" fill="clear">x</IonButton>
          <IonTitle className="subtitle">Main Menu</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {/* User Profile Section */}
        <div className="profile-section">
          <IonAvatar className="avatar" onClick={captureImage}>
            <IonImg src={image || 'path_to_profile_image'} alt="User Avatar" />
          </IonAvatar>
          <div className="user-details">
            <h3>Ailin</h3>
            <IonButton fill="outline" size="small">Join as a seller</IonButton>
          </div>
        </div>

        {/* Promotion Section */}
        <div className="promotion-section">
          <h2>Earn badges and stand out</h2>
          <p>Boost your sales, by boosting your expertise.</p>
          <IonButton fill="solid" className="enroll">Enroll Now</IonButton>
        </div>

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
          <div className="custom-divider"></div>

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
export default Account;
