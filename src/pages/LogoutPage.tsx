// src/pages/LogoutPage.tsx
import React, { useEffect } from 'react';
import { IonPage, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { post } from '../api.service'; // Your API service for making POST requests

const LogoutPage: React.FC = () => {
  const history = useHistory();

  // Function to handle logout
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('userToken'); // Get the token from localStorage

      if (!token) {
        throw new Error('No token found'); // Error if no token is found
      }

      // Make POST request to /api/logout with the Authorization header
      const response = await post('logout', {}, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          'Content-Type': 'application/json', // Set the content type
          Accept: 'application/json', // Ensure we accept JSON responses
        },
      });

      console.log(response); // Log the response for debugging purposes
      localStorage.removeItem('userToken'); // Remove the token from localStorage
      history.push('/login');
      window.location.reload(); // This refreshes the entire tab
 // Redirect to login page after successful logout
    } catch (error) {
      console.error('Logout failed', error); // Log any errors during logout
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
