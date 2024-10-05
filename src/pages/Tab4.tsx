import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonList, IonItem, IonLabel, IonAvatar, IonImg, IonIcon } from '@ionic/react';
import './Tab4.css';
import { } from '@ionic/react';
import { heartOutline } from 'ionicons/icons'; 


const Account: React.FC = () => {
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
      </IonContent>
    </IonPage>
  );
};

export default Account;
