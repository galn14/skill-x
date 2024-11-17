import React, { useState } from 'react';
import {
  Grid,
  InputBase,
  Typography,
  IconButton,
  Button,
  AppBar,
  Toolbar,
  Box,
} from '@mui/material';
import { IonPage, IonContent } from '@ionic/react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MailIcon from '@mui/icons-material/Mail';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import { useHistory } from 'react-router-dom';
import { CssBaseline, Rating } from '@mui/material';
import '@fontsource/poppins';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import StarIcon from '@mui/icons-material/Star';

const reviews = [
  { id: 1, productName: 'Awesome Course', rating: 4.5, reviewText: 'Servicenya sangat baik, komunikatif, hasil produknya bagus.', reviewDate: '2024-11-14', category: 'Education' },
  { id: 2, productName: 'Photography Basics', rating: 5.0, reviewText: 'Komunikatif sekali, fast respon, produk rapi dan sesuai ekspektasi, Harga sesuai dengan services', reviewDate: '2024-11-13', category: 'Photography' },
  { id: 3, productName: 'Copywriting Masterclass', rating: 4.0, reviewText: 'Good course', reviewDate: '2024-11-12', category: 'Writing' },
  { id: 4, productName: 'Web Development 101', rating: 4.7, reviewText: 'Informative course', reviewDate: '2024-11-10', category: 'Web Development' },
  { id: 5, productName: 'Design Fundamentals', rating: 4.8, reviewText: 'Great design course', reviewDate: '2024-11-09', category: 'Design' },
];


const theme = createTheme({
  typography: {
    fontFamily: '"Poppins"',
  },
});

const Review: React.FC = () => {
  const history = useHistory();
  const [searchQuery, setSearchQuery] = useState('');
  const maxRating = 5; // Maximum possible rating

  const handleBack = () => history.goBack();

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
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <IconButton onClick={handleBack} color="primary">
                <ArrowBackIcon />
              </IconButton>
              <Typography
                variant="h6"
                sx={{ color: '#838383', textAlign: 'left', flexGrow: 1 }}
              >
                Review
              </Typography>
              <Box>
                <IconButton color="primary">
                  <ShoppingCartIcon />
                </IconButton>
                <IconButton color="primary">
                  <NotificationsIcon />
                </IconButton>
                <IconButton color="primary">
                  <MailIcon />
                </IconButton>
              </Box>
            </Box>
          </Toolbar>
        </AppBar>

        <IonContent fullscreen style={{ padding: '20px' }}>
          <Box sx={{ paddingTop: '110px', paddingX: '20px' }}>
            {/* Search Box */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                border: '2px solid #ABABAB',
                borderRadius: '15px',
                padding: '0 10px',
                height: '40px',
                boxSizing: 'border-box',
                marginBottom: '20px',
              }}
            >
              <IconButton color="primary" sx={{ padding: 0 }}>
                <SearchIcon />
              </IconButton>
              <InputBase
                placeholder="Search items"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{
                  flex: 1,
                  color: '#333',
                  fontSize: '11px',
                }}
              />
            </Box>

            {/* Render Reviews Dynamically */}
            {reviews.map((review) => (
              <Box
                key={review.id}
                sx={{
                  border: '1px solid #ccc',
                  borderRadius: '10px',
                  padding: '8px',
                  marginBottom: '8px', // Perkecil jarak antar box review
                }}
              >
            
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Rating
                    value={review.rating}
                    readOnly
                    precision={0.1}
                    icon={<StarIcon fontSize="inherit" color="warning" />}
                    sx={{ marginRight: '4px' }}
                  />
                  <Typography variant="body2" fontWeight="bold"  sx={{ fontSize: '12px' }}>
                    {review.rating}/{maxRating}
                  </Typography>
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 'bold',  fontSize: '14px', marginTop: '4px', marginBottom: '4px'  }}>
                  {review.productName}
                </Typography>
                <Typography variant="body2" sx={{ fontSize: '12px', marginTop: '4px', marginBottom: '4px'  }}>
                  {review.reviewText}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '12px', marginTop: '4px', marginBottom: '4px'  }}>
                  Reviewed on: {review.reviewDate}
                </Typography>
                <Box mt={2} style={{ padding: '2px 0' }}>
                  <Button variant="outlined" color="primary" fullWidth sx={{ fontSize: '12px' }}>
                    Reply to Review
                  </Button>
                </Box>
              </Box>
            ))}
          </Box>
        </IonContent>
      </IonPage>
    </ThemeProvider>
  );
};

export default Review;
