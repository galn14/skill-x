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
      <img alt="SkillX Logo" src="public/SkillXLogo.png" className='logo' />
        <div className="register-container">
          <div className="form-container">
            <form onSubmit={doRegister} className="max-w-sm mx-auto">
              {/* Name Input Field */}
              <div className="mb-5">
                <IonLabel class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >Your Name</IonLabel>
                <IonInput
                  name="name"
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" 
                  type="text"
                  placeholder="John Doe"
                  value={data.name}
                  onIonInput={handleInputChange}
                  required
                />
              </div>

              <div className="mb-5">
                <IonLabel class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</IonLabel>
                <IonInput
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  name="email"
                  type="email"
                  placeholder="name@company.com"
                  value={data.email}
                  onIonInput={handleInputChange}
                  required
                />
              </div>

              <div className="mb-5">
                <IonLabel class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</IonLabel>
                <IonInput
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={data.password}
                  onIonInput={handleInputChange}
                  required
                />
              </div>

              <div className="mb-5">
                <IonLabel class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >Confirm Password</IonLabel>
                <IonInput
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={data.confirmPassword}
                  onIonInput={handleInputChange}
                  required
                />
              </div>
                <div className="flex items-start mb-5">
                        < div className="flex items-center h-5">
                      <input id="terms" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                      </div>
                      <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a></label>
                </div>

              <IonButton type="submit" expand="block">
                Register
              </IonButton>
              
              {/* Display response if registration is successful */}
              {resp && <div className="response">Registrasi successful: {JSON.stringify(resp)}</div>}
            </form>
          </div>
        </div>
        
      </IonContent>
    </IonPage>
  );
};

export default RegisterPage;
