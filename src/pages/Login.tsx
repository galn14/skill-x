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
} from '@ionic/react';
import { post } from '../api.service'; // Import your API service
import { useHistory } from 'react-router-dom'; // For routing

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
        <div className="login-container">
          <div className="form-container">
            <form onSubmit={doLogin} className="login-form">
              <div className="form-group">
                <IonLabel>Your email</IonLabel>
                <IonInput
                  name="email"
                  type="email"
                  placeholder="name@company.com"
                  value={data.email}
                  onIonInput={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <IonLabel>Password</IonLabel>
                <IonInput
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={data.password}
                  onIonInput={handleInputChange}
                  required
                />
              </div>

              <div className="form-options">
                <div className="remember-me">
                  <IonCheckbox
                    checked={rememberMe}
                    onIonChange={handleCheckboxChange}
                  />
                  <IonLabel>Remember me</IonLabel>
                </div>
              </div>

              <IonButton type="submit" expand="block">
                Sign in
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
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;


function setError(arg0: string) {
  throw new Error('Function not implemented.');
}

