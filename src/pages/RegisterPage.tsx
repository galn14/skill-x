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
  IonCardContent,
  IonCardHeader
} from '@ionic/react';
import { register } from '../api.service'; // Import your API service
import { AppBar, Toolbar, IconButton, Card, CardContent, Typography, Box, Button, TextField, Checkbox, FormControlLabel } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google'; // Import icon Google
import { useHistory } from 'react-router-dom'; // Import useHistory for routing

const RegisterPage: React.FC = () => {
  const [data, setData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [termsAccepted, setTermsAccepted] = useState(false); // Tambahkan state untuk termsAccepted
  const [resp, setResp] = useState<any>(null);
  const history = useHistory(); // Initialize useHistory for navigation

  // Handle form input changes (real-time input)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTermsAccepted(e.target.checked);
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
      <AppBar
        position="fixed"
        style={{
          backgroundColor: 'white',
          borderBottomLeftRadius: '30px',
          borderBottomRightRadius: '30px',
          height: '82px',
          paddingTop: '25px'
        }}
      >
        <Toolbar style={{ height: '100%', paddingBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <IonButton fill="clear" routerLink="/register" className="text-mg text-gray-500">
              Register
            </IonButton>
          </Box>
          <div style={{ marginLeft: 'auto' }}>
            <IonButton fill="clear" routerLink="/login" className="text-mg text-blue-500">
              Login
            </IonButton>
          </div>
        </Toolbar>
      </AppBar>
      <IonContent className="ion-padding">

      <IonCardHeader></IonCardHeader>
          <IonCardContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '150px'}}>
            {/* Membuat logo lebih kecil dan posisinya terpusat */}
            <img alt="SkillX Logo" src="public/SkillXLogo.png" style={{ width: '250px', height: 'auto' }} />
          </IonCardContent>

          <div className="register-container max-w-sm mx-auto">
            <form onSubmit={doRegister} className="space-y-5">
              {/* Name Input Field */}
              <div className="mb-5 flex justify-center">
                <TextField
                  name="name"
                  label="Your Name"
                  type="text"
                  placeholder="John Doe"
                  value={data.name}
                  onChange={handleInputChange}
                  fullWidth
                  variant="outlined"
                  required
                  size="medium"
                  sx={{
                    maxWidth: '80%',
                    marginBottom: '10px',
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '10px',
                    },
                  }}
                />
              </div>

              {/* Email Input Field */}
              <div className="mb-5 flex justify-center">
                <TextField
                  name="email"
                  label="Your email"
                  type="email"
                  placeholder="name@company.com"
                  value={data.email}
                  onChange={handleInputChange}
                  fullWidth
                  variant="outlined"
                  required
                  size="medium"
                  sx={{
                    maxWidth: '80%',
                    marginBottom: '10px',
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '10px',
                    },
                  }}
                />
              </div>

              {/* Password Input Field */}
              <div className="mb-5 flex justify-center">
                <TextField
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                  value={data.password}
                  onChange={handleInputChange}
                  fullWidth
                  variant="outlined"
                  required
                  size="medium"
                  sx={{
                    maxWidth: '80%',
                    marginBottom: '10px',
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '10px',
                    },
                  }}
                />
              </div>

              {/* Confirm Password Input Field */}
              <div className="mb-5 flex justify-center">
                <TextField
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  placeholder="••••••••"
                  value={data.confirmPassword}
                  onChange={handleInputChange}
                  fullWidth
                  variant="outlined"
                  required
                  size="medium"
                  sx={{
                    maxWidth: '80%',
                    marginBottom: '10px',
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '10px',
                    },
                  }}
                />
              </div>

              {/* Terms and Conditions Checkbox */}
              <div className="flex justify-center items-center mb-5">
                <div style={{ maxWidth: '80%', width: '100%' }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={termsAccepted}
                        onChange={handleCheckboxChange}
                        color="primary"
                        required
                      />
                    }
                    label={
                      <span>
                        I agree with the{' '}
                        <a href="#" className="text-blue-600 hover:underline">
                          terms and conditions
                        </a>
                      </span>
                    }
                    sx={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'flex-start',
                    }}
                  />
                </div>
              </div>

              {/* Register Button */}
              <div className="flex justify-center items-center mb-5">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  sx={{
                    maxWidth: '80%',
                    borderRadius: '10px',
                    paddingY: '12px',
                    fontSize: '1.1rem',
                  }}
                >
                  Register
                </Button>
              </div>

              {/* Display response if registration is successful */}
              {resp && (
                <div className="mt-5 text-green-500">
                  Registrasi berhasil: {JSON.stringify(resp)}
                </div>
              )}

                {/* Google Login Button */}
            <div className="flex justify-center items-center mb-5">
              <Button
                variant="outlined"
                fullWidth
                size="large"
                sx={{
                  marginTop: '10px',
                  maxWidth: '80%',
                  borderRadius: '10px',
                  paddingY: '12px',
                  fontSize: '1.1rem',
                  color: 'black',
                  backgroundColor: 'white',
                  borderColor: '#dddddd',
                  textTransform: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  '&:hover': {
                    backgroundColor: '#f5f5f5',
                  },
                }}
                startIcon={<GoogleIcon style={{ color: '#4285F4' }} />}
              >
                Google
              </Button>
            </div>

            </form>
          </div>
      </IonContent>
    </IonPage>
  );
};

export default RegisterPage;
