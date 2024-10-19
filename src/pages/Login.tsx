// src/pages/LoginPage.tsx
import React, { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonContent,
  IonTitle,
  IonToolbar,
  IonInput,
  IonButton,
  IonCheckbox,
  IonLabel,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle, IonItem
} from '@ionic/react';
import { post } from '../api.service'; // Import your API service
import { useHistory } from 'react-router-dom'; // For routing
import './login.css';

const LoginPage: React.FC = () => {
  const [data, setData] = useState({ email: '', password: '' });
  const [rememberMe, setRememberMe] = useState(false);
  const [resp, setResp] = useState<any>(null);
  const history = useHistory(); // Initialize useHistory for navigation

  const handleInputChange = (e: CustomEvent) => {
    const name = (e.target as HTMLInputElement).name;
    const value = (e.detail as any).value;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e: CustomEvent) => {
    setRememberMe(e.detail.checked);
  };

  // Handle login action
  const doLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (data.email && data.password) {
      try {
        // Send login request to the backend
        const response = await post('login', data);

        // If login is successful, the response should include a token
        if (response.token) {
          console.log('Login successful', response);
          localStorage.setItem('userToken', response.token); // Save the token to localStorage

          // Redirect to Tab4 after successful login
          history.push('/tab4');
          window.location.reload(); // This will reload the app after logout
        } else {
          // Handle failed login attempt (no token received)
          setError('Login failed: Invalid credentials');
        }
      } catch (error) {
        setError('Login failed: ' + (error as any).message);
        console.error('Login failed', error);
      }
    } else {
      setError('Email and password are required');
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Sign in to your account</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">



        <IonCardHeader>
        </IonCardHeader>

        <IonCardContent>
          <img alt="Silhouette of mountains" src=".\public\Frame 2 1.png" className='' />
          <div className=','>
            <form onSubmit={doLogin} className="max-w-sm mx-auto">
              <div className="mb-5">
                <IonInput
                  name="email"
                  type="email"
                  placeholder="email"
                  value={data.email}
                  onIonInput={handleInputChange}
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-4 py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>

              <div className="mb-5">
                <IonLabel class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >Password</IonLabel>
                <IonInput
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={data.password}
                  onIonInput={handleInputChange}
                  required
                />
              </div>

              <div className="flex items-start mb-">
                <div className="flex items-center h-5">
                  <IonCheckbox
                    checked={rememberMe}
                    onIonChange={handleCheckboxChange}
                    class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                  />
                  <IonLabel class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300" >Remember me</IonLabel>
                </div>
              </div>

              <IonButton type="submit"
                className="text-white bg-blue-700 font-medium rounded-lg text-sm text-center"
                expand="block">
              </IonButton>

              <div className="form-options">
                <a href="/register">Create an account</a>
                <IonButton fill="clear" routerLink="/register">
                  Register
                </IonButton>
              </div>
            </form>

            {resp && <div className="response">Login successful: {JSON.stringify(resp)}</div>}
          </div>
        </IonCardContent>

      </IonContent>
    </IonPage>
  );
};

export default LoginPage;


function setError(arg0: string) {
  throw new Error('Function not implemented.');
}

