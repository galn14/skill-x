// src/pages/LogoutPage.tsx
import React, { useEffect } from 'react';
import { IonPage, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { logout } from '../api.service'; // Your API service for making POST requests

const LogoutPage: React.FC = () => {
  const history = useHistory();
  // Function to handle logout
  const handleLogout = async () => {
    try {
      const response = await logout();
      console.log('Logout successful:', response);

      // Optional: Navigate to login page after logout
      history.push('/login');
    } catch (error) {
      console.error('Failed to logout:', error);
      alert('Logout failed. Please try again.');
    }
  };

  useEffect(() => {
    handleLogout(); // Trigger logout when the component mounts
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Logging Out...</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <p>Logging out, please wait...</p>
      </IonContent>
    </IonPage>
  );
};

export default LogoutPage;
