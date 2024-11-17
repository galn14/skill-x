// src/pages/LoginPage.tsx
import React, { useState } from 'react';
import {
  IonPage,
  IonContent,
  IonButton
} from '@ionic/react';
import { loginWithEmail, loginWithGoogle } from '../api.service';
import { AppBar, Toolbar, IconButton, Card, CardContent, Typography, Box, Button, TextField, Checkbox, FormControlLabel } from '@mui/material';
import { useHistory } from 'react-router-dom'; // For routing
import GoogleIcon from '@mui/icons-material/Google'; // Import icon Google
import { CssBaseline, GlobalStyles } from '@mui/material';
import '@fontsource/poppins';  // Import the font
import { createTheme, ThemeProvider } from '@mui/material/styles';


const LoginPage: React.FC = () => {
  const [data, setData] = useState({ email: '', password: '' });
  const [rememberMe, setRememberMe] = useState(false);
  const [resp, setResp] = useState<any>(null);
  const history = useHistory(); // Initialize useHistory for navigation
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRememberMe(e.target.checked);
  };  

  const doLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Reset error state

    if (data.email && data.password) {
        try {
            const response = await loginWithEmail(data.email, data.password);
            console.log('API Response:', response); // Debug the API response

            if (response.token && response.user) {
                localStorage.setItem('userToken', response.token);
                localStorage.setItem('userInfo', JSON.stringify(response.user)); // Save userInfo
                history.push('/tab4');
                window.location.reload();
            } else {
                setError('Invalid response from server');
                console.error('Response missing token or user:', response);
            }
        } catch (error: any) {
            setError(error.message || 'Login failed');
            console.error('Login failed:', error);
        }
    } else {
        setError('Email and password are required');
    }
};



  const handleGoogleLogin = async () => {
    try {
      // Trigger Google login through Firebase and get backend response
      const response = await loginWithGoogle();
  
      // Extract user and token from the response
      const { user, token } = response;
  
      // Store token and user information in local storage
      localStorage.setItem('userToken', token);
      localStorage.setItem('userInfo', JSON.stringify(user));
  
      // Redirect to Tab4 after successful login
      history.push('/tab4');
      window.location.reload();
    } catch (error) {
      console.error('Google login failed', error);
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
          paddingTop: '25px'
        }}
      >
        <Toolbar style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <IonButton fill="clear" routerLink="/login" className="text-gray-500">
              Login
            </IonButton>
          </Box>
          <IonButton fill="clear" routerLink="/register" className="text-blue-500">
            Sign Up
          </IonButton>
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

          {/* Form Login */}
          <form
            onSubmit={doLogin}
            style={{
              width: '80%',
              maxWidth: '400px',
            }}
          >
            {/* Email Field */}
            <TextField
              name="email"
              label="Email"
              type="email"
              value={data.email}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              required
              size="medium"
              sx={{
                marginBottom: '16px',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '10px',
                },
              }}
            />

            {/* Password Field */}
            <TextField
              name="password"
              label="Password"
              type="password"
              value={data.password}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              required
              size="medium"
              sx={{
                marginBottom: '16px',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '10px',
                },
              }}
            />

            {/* Remember Me Checkbox */}
            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={handleCheckboxChange}
                  color="primary"
                  sx={{ alignSelf: 'flex-start' }}
                />
              }
              label="Remember me"
              sx={{ display: 'flex'}}
            />

            {/* Login Button */}
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
                marginBottom: '16px'
              }}
            >
              Sign In
            </Button>

            {/* Google Login Button */}
            <Button
              variant="outlined"
              fullWidth
              size="large"
              sx={{
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
              onClick={handleGoogleLogin}
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

export default LoginPage;


function setError(arg0: string) {
  throw new Error('Function not implemented.');
}

