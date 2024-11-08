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
import { AppBar, Toolbar, IconButton, Card, CardContent, Typography, Box, Button, TextField, Checkbox, FormControlLabel } from '@mui/material';
import { useHistory } from 'react-router-dom'; // For routing
import GoogleIcon from '@mui/icons-material/Google'; // Import icon Google
import './login.css';

const LoginPage: React.FC = () => {
  const [data, setData] = useState({ email: '', password: '' });
  const [rememberMe, setRememberMe] = useState(false);
  const [resp, setResp] = useState<any>(null);
  const history = useHistory(); // Initialize useHistory for navigation

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRememberMe(e.target.checked);
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
            <IonButton fill="clear" routerLink="/login" className="text-mg text-gray-500">
              Login
            </IonButton>
          </Box>
          <div style={{ marginLeft: 'auto' }}>
            <IonButton fill="clear" routerLink="/register" className="text-mg text-blue-500">
              Sign Up
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

          <div className="max-w-sm mx-auto">
          <form onSubmit={doLogin} className="space-y-5">
            <div className="mb-5 flex justify-center">
              {/* Email input using Material UI TextField */}
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
                  maxWidth: '80%',
                  marginBottom: '10px',
                  '& .MuiOutlinedInput-root': { // Akses root input untuk border radius
                    borderRadius: '10px',
                  },
                }}
              />
            </div>

            <div className="mb-5 flex justify-center">
              {/* Password input using Material UI TextField */}
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
                  maxWidth: '80%',
                  '& .MuiOutlinedInput-root': { // Akses root input untuk border radius
                    borderRadius: '10px',
                  },
                }}
              />
            </div>

            <div className="flex justify-center items-center mb-5">
              <div style={{ maxWidth: '80%', width: '100%' }}>
                {/* Checkbox input using Material UI FormControlLabel and Checkbox */}
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
                    justifyContent: 'flex-start', // Menempatkan label di kiri
                  }}
                />
              </div>
            </div>

            <div className="flex justify-center items-center mb-5">
              {/* Sign in button using Material UI Button */}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                sx={{
                  maxWidth: '80%', // Membuatnya penuh dalam kotak pembungkus
                  borderRadius: '10px', // Menerapkan border radius langsung
                  paddingY: '12px', // Membuat tombol lebih tinggi
                  fontSize: '1.1rem', // Menambah ukuran teks untuk membuat tombol lebih besar
                }}
              >
                Sign In
              </Button>
            </div>

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

            {resp && <div className="mt-5 text-green-500">Login successful: {JSON.stringify(resp)}</div>}
          </div>
        </IonContent>
    </IonPage>
  );
  
};

export default LoginPage;


function setError(arg0: string) {
  throw new Error('Function not implemented.');
}

