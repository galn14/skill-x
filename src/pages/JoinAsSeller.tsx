import React, { useState } from 'react';
import {
  TextField,
  Button,
  AppBar,
  Toolbar,
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
import { useHistory } from 'react-router-dom';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

const RegisterAsSeller: React.FC = () => {
  const history = useHistory();
  const handleBack = () => history.goBack();

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [valueDate, setDateValue] = useState<Dayjs | null>(dayjs());
  const [data, setData] = useState({ name: '', kampus: '', jurusan: '' });
  const [studentCard, setStudentCard] = useState<File | null>(null);
  const [studentCardPreview, setStudentCardPreview] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const theme = createTheme({
    typography: {
      fontFamily: '"Poppins"',
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTermsAccepted(e.target.checked);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const validFormats = ['image/jpeg', 'image/png'];
      const maxSizeInMB = 2; // Maksimal 2MB
      if (!validFormats.includes(file.type)) {
        alert('Please upload a JPEG or PNG image.');
        return;
      }
      if (file.size > maxSizeInMB * 1024 * 1024) {
        alert('File size must not exceed 2MB.');
        return;
      }
      setStudentCard(file);
      setStudentCardPreview(URL.createObjectURL(file));
    }
  };
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAccepted) {
      alert('Please agree to the terms and conditions.');
      return;
    }
    if (!studentCard) {
      alert('Please upload your student card.');
      return;
    }

    console.log(data); // Replace with form submission logic
    console.log('Selected Date:', valueDate);
    console.log('Uploaded Student Card:', studentCard);

    alert('Form submitted successfully!');
  };

  return (
    <ThemeProvider theme={theme}>
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

      <div
            style={{
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
                width: '250px',
                height: 'auto',
                maxHeight: '30vh', // Batas tinggi gambar
                marginBottom: '20px',
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
          >
            Register
          </Button>
        </form>
      </div>
    </ThemeProvider>
  );
};

export default RegisterAsSeller;
