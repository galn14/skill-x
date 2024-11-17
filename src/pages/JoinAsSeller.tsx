import React, { useState } from 'react';
import {
  Typography,
  IconButton,
  Button,
  AppBar,
  Toolbar,
  Box,
  TextField,
  Checkbox,
  FormControlLabel,
  CssBaseline,
} from '@mui/material';
import { useHistory } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { IonPage, IonContent } from '@ionic/react';


const RegisterAsSeller: React.FC = () => {
  const history = useHistory();
  const handleBack = () => history.goBack();

  const [termsAccepted, setTermsAccepted] = useState(false);

  const theme = createTheme({
    typography: {
      fontFamily: '"Poppins"',
    },
  });
  

  
    const [data, setData] = useState({ name: '', kampus: '', jurusan: '', media: '' });
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setData((prevData) => ({ ...prevData, [name]: value }));
    };
  
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setTermsAccepted(e.target.checked);
    };
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (termsAccepted) {
        console.log(data); // Replace with form submission logic
        alert('Form submitted successfully!');
      } else {
        alert('Please agree to the terms and conditions.');
      }
    };
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <IonPage>
        <AppBar
          position="fixed"
          sx={{
            backgroundColor: 'white',
            borderBottomLeftRadius: '30px',
            borderBottomRightRadius: '30px',
            height: '82px',
            paddingTop: '25px',
          }}
        >
          <Toolbar>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <IconButton onClick={handleBack} color="primary">
                <ArrowBackIcon />
              </IconButton>
              <Typography variant="h6" sx={{ color: '#838383', textAlign: 'left', flexGrow: 1 }}>
                Register as Seller
              </Typography>
            </Box>
          </Toolbar>
        </AppBar>

        <IonContent className="ion-padding" style={{ marginTop: '100px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              height: '100%',
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
              onSubmit={handleSubmit}
              style={{
                width: '80%',
                maxWidth: '400px',
              }}
            >

              {/* Full Name Input */}
              <TextField
                name="fullName"
                label="Full Name"
                value={data.name}  // Adjust value accordingly
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                required
                sx={{ marginBottom: '16px' }}
              />

            <TextField
                name="University"
                label="University/Organization"
                value={data.kampus}  // Adjust value accordingly
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                required
                sx={{ marginBottom: '16px' }}
              />

            <TextField
                name="Major"
                label="Major"
                value={data.jurusan}  // Adjust value accordingly
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                required
                sx={{ marginBottom: '16px' }}
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
            </form>
          </div>
        </IonContent>
      </IonPage>
    </ThemeProvider>
  );
};

export default RegisterAsSeller;
