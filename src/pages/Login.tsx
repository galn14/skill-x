import React, { useState } from 'react';
import {
  IonPage,
  IonContent,
  IonButton
} from '@ionic/react';
import { post, loginWithGoogle } from '../api.service';
import { AppBar, Toolbar, Box, Button, TextField, Checkbox, FormControlLabel } from '@mui/material';
import { useHistory } from 'react-router-dom';
import GoogleIcon from '@mui/icons-material/Google';
import { CssBaseline, GlobalStyles } from '@mui/material';
import '@fontsource/poppins';  // Import the font
import { createTheme, ThemeProvider } from '@mui/material/styles';

const LoginPage: React.FC = () => {
  const [data, setData] = useState({ email: '', password: '' });
  const [rememberMe, setRememberMe] = useState(false);
  const history = useHistory();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRememberMe(e.target.checked);
  };

  const doLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (data.email && data.password) {
      try {
        const response = await post('login', data);
        if (response.token) {
          localStorage.setItem('userToken', response.token);
          history.push('/tab4');
          window.location.reload();
        } else {
          alert('Login failed: Invalid credentials');
        }
      } catch (error) {
        console.error('Login failed:', error);
      }
    } else {
      alert('Email and password are required');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const response = await loginWithGoogle();
      localStorage.setItem('userToken', response.token);
      history.push('/tab4');
      window.location.reload();
    } catch (error) {
      console.error('Google login failed:', error);
    }
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
                />
              }
              label="Remember me"
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-start' }}
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
                marginBottom: '16px',
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
