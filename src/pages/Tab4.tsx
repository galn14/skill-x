import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonList, IonItem, IonLabel, IonAvatar, IonImg, IonIcon } from '@ionic/react';
import './Tab4.css';
import { } from '@ionic/react';
import { heartOutline } from 'ionicons/icons'; 
import { post } from '../api.service';
import { useHistory } from 'react-router';


const Account: React.FC = () => {
  const history = useHistory(); // For navigation

  // Logout function to handle token removal and redirect
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('userToken'); // Get the token from localStorage

      if (!token) {
        throw new Error('No token found'); // Handle the case where no token exists
      }

      // Make POST request to /api/logout with the Authorization header
      await post('logout', {}, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      // Remove the token from localStorage after successful logout
      localStorage.removeItem('userToken');

      // Redirect the user to the login page
      history.push('/login');
      window.location.reload(); // This will reload the app after logout
    } catch (error) {
      console.error('Logout failed', error); // Log any errors during logout
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
          <IonAvatar className="avatar">
            <IonImg src="path_to_profile_image" alt="User Avatar" />
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

export default Account;
