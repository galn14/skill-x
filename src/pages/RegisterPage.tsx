// src/pages/RegisterPage.tsx
import React, { useState } from 'react';
import {
  IonPage,
  IonContent,
  IonButton,

  IonCardContent,
  IonCardHeader
} from '@ionic/react';
import { register } from '../api.service'; // Import your API service
import { AppBar, Toolbar, IconButton, Card, CardContent, Typography, Box, Button, TextField, Checkbox, FormControlLabel } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google'; // Import icon Google
import { useHistory } from 'react-router-dom'; // Import useHistory for routing
import { CssBaseline, GlobalStyles } from '@mui/material';
import '@fontsource/poppins';  // Import the font
import { createTheme, ThemeProvider } from '@mui/material/styles';

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

  const globalStyles = {
    '*': {
      fontFamily: 'Poppins',
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
    },
    ':root': {
      '--ion-font-family': 'Poppins',
    },
  };
  const theme = createTheme({
    typography: {
      fontFamily: '"Poppins"',  // Set font di tema
    },
  });

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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <IonPage>
        <AppBar
          position="fixed"
          style={{
            backgroundColor: 'white',
            borderBottomLeftRadius: '30px',
            borderBottomRightRadius: '30px',
            height: '82px',
            paddingTop: '25px',
          }}
        >
          <Toolbar
            style={{
              height: '100%',
              paddingBottom: '10px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
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
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              height: '100vh',
              textAlign: 'center',
            }}
          >
            {/* Logo */}
            <img
              alt="SkillX Logo"
              src="public/SkillXLogo.png"
              style={{
                width: '250px',
                height: 'auto',
                marginBottom: '20px',
              }}
            />
  
            {/* Form */}
            <form
              onSubmit={doRegister}
              style={{
                width: '80%',
                maxWidth: '400px',
              }}
            >
              {/* Name Input */}
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
                  marginBottom: '10px',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '10px',
                  },
                }}
              />
  
              {/* Email Input */}
              <TextField
                name="email"
                label="Your Email"
                type="email"
                placeholder="name@company.com"
                value={data.email}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                required
                size="medium"
                sx={{
                  marginBottom: '10px',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '10px',
                  },
                }}
              />
  
              {/* Password Input */}
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
                  marginBottom: '10px',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '10px',
                  },
                }}
              />
  
              {/* Confirm Password Input */}
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
                  marginBottom: '10px',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '10px',
                  },
                }}
              />
  
              {/* Terms and Conditions */}
              <FormControlLabel
                control={
                  <Checkbox
                    checked={termsAccepted}
                    onChange={handleCheckboxChange}
                    color="primary"
                    required
                    sx={{alignSelf: 'flex-start' }} // Jarak antara checkbox dan label
                  />
                }
                label={
                  <Typography
                    sx={{
                      color: '#4B4B4B',
                      fontSize: {
                        xs: '0.65rem', // For extra small screens (mobile)
                        sm: '0.85rem', // For small screens
                        md: '1rem',  // For medium screens and above
                      },
                      display: 'inline', // Ensures that the label and asterisk are inline

                    }}
                  >
                    I agree with the{' '}
                    <a href="#" className="text-blue-600 hover:underline">
                      terms and conditions
                    </a>
                  </Typography>
                }
                sx={{
                  display: 'flex',
                }}
              />

              {/* Register Button */}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                sx={{
                  borderRadius: '10px',
                  paddingY: '12px',
                  fontSize: '1.1rem',
                  marginBottom: '16px',
                }}
              >
                Register
              </Button>
  
              {/* Google Login Button */}
              <Button
                variant="outlined"
                fullWidth
                size="large"
                sx={{
                  marginTop: '10px',
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
            </form>
          </div>
        </IonContent>
      </IonPage>
    </ThemeProvider>
  );
};

export default RegisterPage;
