import React, { useEffect, useState } from 'react';
import {
  TextField,
  Button,
  AppBar,
  Toolbar,
  Grid,
  Box,
  IconButton,
  Typography,
  Checkbox,
  FormControlLabel,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import {IonContent,IonPage} from '@ionic/react';

import { useHistory } from 'react-router-dom';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { requestSeller, getRegisterSellerStatus } from "../api.service"; // Import fungsi API
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebaseConfig'; // Import Firebase storage

const JoinAsSeller: React.FC = () => {
  const history = useHistory();
  const handleBack = () => history.goBack();

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [valueDate, setDateValue] = useState<Dayjs | null>(dayjs());
  const [data, setData] = useState({ name: '', kampus: '', email:'',jurusan: '' });
  const [studentCard, setStudentCard] = useState<File | null>(null);
  const [studentCardPreview, setStudentCardPreview] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isLoggedIn = !!localStorage.getItem('userToken'); // Misalnya token disimpan di localStorage
  const [isLoading, setIsLoading] = useState(true);


  const theme = createTheme({
    typography: {
      fontFamily: '"Poppins"',
    },
  });

  useEffect(() => {
    const checkStatus = async () => {
      const userToken = localStorage.getItem('userToken');
      if (!userToken) {
        console.log('No user token found.');
        history.push('/login');
        return;
      }
  
      try {
        const response = await getRegisterSellerStatus(userToken);
        console.log('API Response:', response); // Log the API response
        if (response.status === 'pending') {
          history.push('/JoinAsSellerWait');
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error fetching status:', error);
        setIsLoading(false);
      }
    };
  
    checkStatus();
  }, [history]);
  

  if (isLoading) {
    return <div>Loading...</div>; // Optional loading state
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTermsAccepted(e.target.checked);
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
  
    const validFormats = ['image/jpeg', 'image/png'];
    const maxSizeInMB = 2; // Maximum size 2MB
  
    if (!validFormats.includes(file.type)) {
      alert('Please upload a JPEG or PNG image.');
      return;
    }
    if (file.size > maxSizeInMB * 1024 * 1024) {
      alert('File size must not exceed 2MB.');
      return;
    }
  
    try {
      const storageRef = ref(storage, `student_cards/${file.name}`);
      const snapshot = await uploadBytes(storageRef, file); // Upload file
      const downloadURL = await getDownloadURL(snapshot.ref); // Get file URL
      setStudentCard(file);
      setStudentCardPreview(downloadURL);
      console.log('File uploaded successfully:', downloadURL);
    } catch (error: any) {
      console.error('Error uploading file:', error.message);
      alert(`Failed to upload the file: ${error.message}`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!termsAccepted) {
      alert('Please agree to the terms and conditions.');
      return;
    }
    if (!studentCardPreview) {
      alert('Please upload your student card.');
      return;
    }

    const payload = {
      name: data.name,
      email: data.email,
      organization: data.kampus,
      major: data.jurusan,
      photo_url: studentCardPreview,
      graduation_month: valueDate?.format('MMMM') || '',
      graduation_year: valueDate?.year() || '',
    };

    setIsSubmitting(true);
    const userToken = localStorage.getItem('userToken');
    if (!userToken) {
      alert('User is not logged in.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await requestSeller(userToken, payload);
      alert(response.message || 'Request submitted successfully!');
      history.push('/JoinAsSellerWait'); // Redirect after successful submission
    } catch (error: any) {
      console.error('Error submitting request:', error);
      alert(error.response?.data?.message || 'Failed to submit request.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
          <IonPage>

      <AppBar position="fixed" sx={{ backgroundColor: 'white', borderBottomLeftRadius: '30px', borderBottomRightRadius: '30px', height: '82px', paddingTop: '25px',    zIndex: 1201, // Pastikan hanya melayang di atas konten
 }}>
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

      <IonContent>
        <Grid sx={{
                marginTop: '100px',
                marginBottom:'100000px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                overflowY: 'auto', // Aktifkan scroll
                height: '100vh', // Pastikan tinggi viewport
            }}
            >
            <img
                alt="SkillX Logo"
                src="public/SkillXLogo.png"
                style={{
                width: '150px',
                height: 'auto',
                maxHeight: '30vh', // Batas tinggi gambar
                marginTop: '30px',
                marginBottom: '30px',
                }}
            />

                <form
                    onSubmit={handleSubmit}
                    style={{
                        position: 'relative',

                    width: '80%',
                    maxWidth: '400px',
                    overflowY: 'visible',
                    paddingBottom: '20px',
                    marginBottom:'250px',

                    }}
                >

          <TextField name="name" label="Full Name" value={data.name} onChange={handleInputChange} fullWidth variant="outlined" required sx={{ marginBottom: '16px' }} />
          <TextField name="kampus" label="University/Organization" value={data.kampus} onChange={handleInputChange} fullWidth variant="outlined" required sx={{ marginBottom: '16px' }} />
          <TextField name="email" label="University/Organization Email" value={data.email} onChange={handleInputChange} fullWidth variant="outlined" required sx={{ marginBottom: '16px' }} />
          <TextField name="jurusan" label="Major" value={data.jurusan} onChange={handleInputChange} fullWidth variant="outlined" required sx={{ marginBottom: '16px' }} />

          {/* Date Picker */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker label="Expected Graduate Time" value={valueDate} onChange={(newValue) => setDateValue(newValue)} />
            </DemoContainer>
          </LocalizationProvider>

          {/* Upload Student Card */}
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setOpenDialog(true)}
            sx={{ width:'100%', marginTop: '16px', marginBottom: '16px' }}
            startIcon={<UploadFileIcon />}
          >
            Upload Student Card
          </Button>

          {studentCardPreview && (
            <Box mt={2} mb={2}>
              <Typography variant="body2">Preview:</Typography>
              <img src={studentCardPreview} alt="Student Card Preview" style={{ width: '100%', maxHeight: '150px', objectFit: 'contain' }} />
            </Box>
          )}

          <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth>
            <DialogTitle>Upload Student Card</DialogTitle>
            <DialogContent>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
                id="student-card-input"
              />
              <label htmlFor="student-card-input">
                <Button variant="outlined" color="secondary" component="span" fullWidth>
                  Choose File
                </Button>
              </label>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDialog(false)} color="secondary">
                Cancel
              </Button>
              <Button onClick={() => setOpenDialog(false)} color="primary" variant="contained">
                Confirm
              </Button>
            </DialogActions>
          </Dialog>

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
           // size="large"
            sx={{
              borderRadius: '10px',
              paddingY: '12px',
              fontSize: '1.1rem',
              marginTop: '16px',
              borderTop:'100px'
            }}
            disabled={isSubmitting}
          >
          {isSubmitting ? "Submitting..." : "Register"}
          </Button>
        </form>
        </Grid>
      </IonContent>
      </IonPage>

    </ThemeProvider>
  );
};

export default JoinAsSeller;
