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
          localStorage.setItem('userToken', response.token);

          // Redirect to Tab4 after successful login
          history.push('/tab4');
          window.location.reload();
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
  
        <IonCardHeader></IonCardHeader>
  
        <IonCardContent>
          <img alt="SkillX Logo" src="public/SkillXLogo.png" className="w-full h-auto mb-5" />
          <div className="max-w-sm mx-auto">
            <form onSubmit={doLogin} className="space-y-5">
              <div className="mb-5">
                <IonInput
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={data.email}
                  onIonInput={handleInputChange}
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-4 py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
  
              <div className="mb-5">
                <IonLabel className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </IonLabel>
                <IonInput
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={data.password}
                  onIonInput={handleInputChange}
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-4 py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
  
              <div className="flex items-center mb-5">
                <IonCheckbox
                  checked={rememberMe}
                  onIonChange={handleCheckboxChange}
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                />
                <IonLabel className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Remember me
                </IonLabel>
              </div>



              <IonButton type="submit" expand="block" className="bg-blue-700 text-white rounded-lg text-sm">
                Sign In
              </IonButton>
              <div className="flex flex-col items-center mt-5 space-y-2 justify-between mt-5">
                <a href="/register" className="text-sm text-center text-blue-500">Create an account</a>
                <IonButton fill="clear" routerLink="/register" className="text-sm text-blue-500">
                  Register
                </IonButton>
              </div>

            </form>
  
            {resp && <div className="mt-5 text-green-500">Login successful: {JSON.stringify(resp)}</div>}
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

