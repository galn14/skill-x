// src/pages/RegisterPage.tsx
import React, { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonContent,
  IonTitle,
  IonToolbar,
  IonInput,
  IonButton,
  IonLabel,
  IonButtons,
  IonBackButton,
} from '@ionic/react';
import { register } from '../api.service'; // Import your API service
import { useHistory } from 'react-router-dom'; // Import useHistory for routing

const RegisterPage: React.FC = () => {
  const [data, setData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [resp, setResp] = useState<any>(null);
  const history = useHistory(); // Initialize useHistory for navigation

  // Handle form input changes (real-time input)
  const handleInputChange = (e: CustomEvent) => {
    const name = (e.target as HTMLInputElement).name;
    const value = (e.detail as any).value;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle registration action
  const doRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (data.password === data.confirmPassword && data.email && data.name) {
      try {
        // Send 'name', 'email', 'password', and 'password_confirmation' to the backend
        const response = await register({
          name: data.name, // Include the 'name' field
          email: data.email,
          password: data.password,
          password_confirmation: data.confirmPassword,
        });
        console.log('Registration successful', response);
        setResp(response);
        history.push('/login'); // Redirect to login page after successful registration
      } catch (error) {
        console.error('Registration failed', error);
      }
    } else {
      console.error('Passwords do not match or required fields are missing');
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>Create an Account</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="register-container">
          <div className="form-container">
            <form onSubmit={doRegister} className="register-form">
              {/* Name Input Field */}
              <div className="form-group">
                <IonLabel>Your Name</IonLabel>
                <IonInput
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  value={data.name}
                  onIonInput={handleInputChange}
                  required
                />
              </div>

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

              <div className="form-group">
                <IonLabel>Confirm Password</IonLabel>
                <IonInput
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={data.confirmPassword}
                  onIonInput={handleInputChange}
                  required
                />
              </div>

              <IonButton type="submit" expand="block">
                Register
              </IonButton>

              {/* Display response if registration is successful */}
              {resp && <div className="response">Registration successful: {JSON.stringify(resp)}</div>}
            </form>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default RegisterPage;
