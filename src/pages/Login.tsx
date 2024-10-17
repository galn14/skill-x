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
        const response = await post('login', data);
        console.log('Login successful', response);
        setResp(response);
        localStorage.setItem('userToken', response.token);

        // Navigate to the dashboard if login is successful
        history.push('/tab1');
      } catch (error) {
        console.error('Login failed', error);
      }
    } else {
      console.error('Email and password are required');
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
            </form>

            {resp && <div className="response">Login successful: {JSON.stringify(resp)}</div>}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;


