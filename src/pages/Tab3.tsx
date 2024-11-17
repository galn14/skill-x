import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar ,IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonItem, IonLabel, IonIcon, IonList, IonThumbnail,IonSearchbar} from '@ionic/react';
import { AppBar, Toolbar, IconButton, Card, CardContent, CardMedia, Typography, Box, Button, InputBase, Select, MenuItem, FormControl, CardHeader, Avatar, CardActions } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MailIcon from '@mui/icons-material/Mail';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import React, { useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Modal from '../components/modal'; // Adjust the import based on your file structure
import ExploreContainer from '../components/ExploreContainer';
import './Tab3.css';  
import { CssBaseline, GlobalStyles } from '@mui/material';
import '@fontsource/poppins';  // Import the font
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useHistory } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const Tab3: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [dateFilter, setDateFilter] = useState('All Dates');
  const history = useHistory();
  const [setIsLoggedIn] = useState<boolean>(false);
  const isLoggedIn = !!localStorage.getItem('userToken'); // Misalnya token disimpan di localStorage


  const handleBack = () => history.goBack();

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

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
    // Add your modal open logic here
  };

  const handleMessageClick = () => {
    if (isLoggedIn) {
      history.push('/message'); // Arahkan ke halaman Message jika login
    } else {
      history.push('/login'); // Arahkan ke halaman Login jika belum login
    }
  };

  const handleMessageButtonClick = () => {
    if (isLoggedIn) {
      history.push('/message'); // Redirect ke halaman message
    } else {
      history.push('/login'); // Redirect ke halaman login
    }
  };

  const handleNotificationButtonClick = () => {
    if (isLoggedIn) {
      history.push('/notification'); // Redirect ke halaman message
    } else {
      history.push('/login'); // Redirect ke halaman login
    }
};


  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <IonPage>
        <AppBar position="fixed" style={{ backgroundColor: 'white', borderBottomLeftRadius: '30px', borderBottomRightRadius: '30px', height: '82px', paddingTop: '25px' }}>
          <Toolbar style={{ height: '100%', alignItems: 'flex-end', paddingBottom: '10px' }}>
            <Box display="flex" alignItems="center" sx={{ width: '100%' }}>
            <IconButton onClick={handleBack} color="primary">
                        <ArrowBackIcon />
                    </IconButton>
              {/* Search bar with search icon */}
              <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', width: '80%', border: '1px solid #ABABAB', borderRadius: '15px', padding: '5px', height:'40px' }}>
                  <IconButton color="primary" sx={{ padding: '0', marginRight: '2px' }}>
                    <SearchIcon />
                  </IconButton>
                  <InputBase
                    placeholder="Find transaction"
                    sx={{ flex: 1, color: '#333', padding: '10px', fontSize: '11px' }}
                    inputProps={{ 'aria-label': 'search the right services' }}
                  />
                </Box>
              </Box>
              <IconButton color="primary">
                <ShoppingCartIcon />
              </IconButton>
              <IconButton color="primary" onClick={handleNotificationButtonClick}>
                <NotificationsIcon />
              </IconButton>
              <IconButton color="primary" onClick={handleMessageButtonClick}>
                <MailIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
      <IonContent fullscreen className={`${isModalOpen ? 'blurred-content' : ''} `}>
        <Box
          sx={{
            backgroundColor: '#007bff', // Warna biru
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Filters */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
              marginTop: '90px',
              padding: '10px',
            }}
          >
            {/* Filter: All Status */}
            <FormControl sx={{ width: '30%'}}>
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                displayEmpty
                inputProps={{ 'aria-label': 'All Status' }}
                sx={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '20px', // Border radius ditambahkan di sini
                  '& .MuiSelect-select': {
                    padding: '8px',
                    fontSize: '12px',
                  },
                }}
              >
                <MenuItem value="All Status">All Status</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Incomplete">Incomplete</MenuItem>
              </Select>
            </FormControl>

            {/* Filter: All Categories */}
            <FormControl sx={{ width: '30%' }}>
              <Select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                displayEmpty
                inputProps={{ 'aria-label': 'All Categories' }}
                sx={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '20px', // Border radius ditambahkan di sini
                  '& .MuiSelect-select': {
                    padding: '8px',
                    fontSize: '12px',
                  },
                }}
              >
                <MenuItem value="All Categories">All Categories</MenuItem>
                <MenuItem value="Website Development">Website Development</MenuItem>
                <MenuItem value="Photography">Photography</MenuItem>
                <MenuItem value="Copywriting">Copywriting</MenuItem>
              </Select>
            </FormControl>

            {/* Filter: All Dates */}
            <FormControl sx={{ width: '30%' }}>
              <Select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                displayEmpty
                inputProps={{ 'aria-label': 'All Dates' }}
                sx={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '20px', // Border radius ditambahkan di sini
                  '& .MuiSelect-select': {
                    padding: '8px',
                    fontSize: '12px',
                  },
                }}
              >
                <MenuItem value="All Dates">All Dates</MenuItem>
                <MenuItem value="Today">Today</MenuItem>
                <MenuItem value="This Week">This Week</MenuItem>
                <MenuItem value="This Month">This Month</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
     

      {/* card  completed status */}
      <Card
      sx={{
        maxWidth: '95%',
        width: '95%',
        margin: '20px auto',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        borderRadius: '15px',
      }}
    >
      {/* Card Header */}
      <Box
        sx={{
          borderBottom: '1px solid #e0e0e0',
          display: 'flex',
          alignItems: 'center',
          padding: '16px',
          position: 'relative',
        }}
      >
        <CardMedia
          component="img"
          image="https://ionicframework.com/docs/img/demos/thumbnail.svg"
          alt="Thumbnail"
          sx={{
            width: 30,
            height: 30,
            borderRadius: '50%',
            marginRight: '16px',
          }}
        />
        <Box>
          <Typography variant="h6" sx={{ fontSize: '16px', fontWeight: 'bold' }}>
            Building Website
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            AileenLiexiuai
          </Typography>
        </Box>
        <Button
          sx={{
            position: 'absolute',
            right: 60,
            backgroundColor: '#4caf50', // Warna Button
            color: 'white',
            borderRadius: '12px', // Atur border radius di sini
            padding: '8px 16px',
            fontWeight: 'bold',
            textTransform: 'none',
            width: '120px'
          }}
        >
          Complete
        </Button>
        <IconButton
          sx={{ position: 'absolute', right: 16 }}
          onClick={handleOpenModal}
        >
          <MoreVertIcon />
        </IconButton>
      </Box>

      {/* Card Content */}
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center'}}>
          <CardMedia
            component="img"
            image="https://ionicframework.com/docs/img/demos/thumbnail.svg"
            alt="Thumbnail"
            sx={{
              width: 80,
              height: 80,
              borderRadius: '10px',
              marginRight: '16px',
            }}
          />
          <Box>
            <Typography
              variant="h6"
              sx={{ fontSize: '14px', fontWeight: 'bold' }}
            >
              Package Portfolio Website
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              Computer Science
            </Typography>
          </Box>
        </Box>
      </CardContent>

      {/* Card Footer */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px',
        }}
      >
        <Box>
          <Typography variant="body2" color="textSecondary">
            Total Order
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Rp 500.000
          </Typography>
        </Box>
        <CardActions>
          <Button
            variant="outlined"
            size="small"
            sx={{
              borderRadius: '10px',
              textTransform: 'capitalize',
              fontWeight: 'bold',
            }}
          >
            Buy Again
          </Button>
          <Button
            variant="contained"
            size="small"
            sx={{
              borderRadius: '10px',
              textTransform: 'capitalize',
              fontWeight: 'bold',
              backgroundColor: '#1976d2',
              ':hover': { backgroundColor: '#005bb5' },
            }}
          >
            Review
          </Button>
        </CardActions>
      </Box>
    </Card>

    {/* card  in-progress status */}
    <Card
      sx={{
        maxWidth: '95%',
        width: '95%',
        margin: '20px auto',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        borderRadius: '15px',
      }}
    >
      {/* Card Header */}
      <Box
        sx={{
          borderBottom: '1px solid #e0e0e0',
          display: 'flex',
          alignItems: 'center',
          padding: '16px',
          position: 'relative',
        }}
      >
        <CardMedia
          component="img"
          image="https://ionicframework.com/docs/img/demos/thumbnail.svg"
          alt="Thumbnail"
          sx={{
            width: 30,
            height: 30,
            borderRadius: '50%',
            marginRight: '16px',
          }}
        />
        <Box>
          <Typography variant="h6" sx={{ fontSize: '16px', fontWeight: 'bold' }}>
            Photography
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            Gelion
          </Typography>
        </Box>
        <Button
          sx={{
            position: 'absolute',
            right: 60,
            backgroundColor: '#03a9f4', // Biru muda
            color: 'white',
            borderRadius: '12px', // Atur border radius di sini
            padding: '8px 16px',
            fontWeight: 'bold',
            textTransform: 'none',
            width: '120px',
            maxWidth: '120px'
          }}
        >
          In Progress
        </Button>
        <IconButton
          sx={{ position: 'absolute', right: 16 }}
          onClick={handleOpenModal}
        >
          <MoreVertIcon />
        </IconButton>
      </Box>

      {/* Card Content */}
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center'}}>
          <CardMedia
            component="img"
            image="https://ionicframework.com/docs/img/demos/thumbnail.svg"
            alt="Thumbnail"
            sx={{
              width: 80,
              height: 80,
              borderRadius: '10px',
              marginRight: '16px',
            }}
          />
          <Box>
            <Typography
              variant="h6"
              sx={{ fontSize: '14px', fontWeight: 'bold' }}
            >
              Product Photography
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              Visual Communication Design
            </Typography>
          </Box>
        </Box>
      </CardContent>

      {/* Card Footer */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px',
        }}
      >
        <Box>
          <Typography variant="body2" color="textSecondary">
            Total Order
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Rp 1.500.000
          </Typography>
        </Box>
        <CardActions>
          <Button
            variant="contained"
            size="small"
            sx={{
              borderRadius: '10px',
              textTransform: 'capitalize',
              fontWeight: 'bold',
              backgroundColor: '#1976d2',
              ':hover': { backgroundColor: '#005bb5' },
            }}
          >
            Contact Seller
          </Button>
        </CardActions>
      </Box>
    </Card>

    {/* card pending order */}
    <Card
      sx={{
        maxWidth: '95%',
        width: '95%',
        margin: '20px auto',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        borderRadius: '15px',
      }}
    >
      {/* Card Header */}
      <Box
        sx={{
          borderBottom: '1px solid #e0e0e0',
          display: 'flex',
          alignItems: 'center',
          padding: '16px',
          position: 'relative',
        }}
      >
        <CardMedia
          component="img"
          image="https://ionicframework.com/docs/img/demos/thumbnail.svg"
          alt="Thumbnail"
          sx={{
            width: 30,
            height: 30,
            borderRadius: '50%',
            marginRight: '16px',
          }}
        />
        <Box>
          <Typography variant="h6" sx={{ fontSize: '16px', fontWeight: 'bold' }}>
            Copy Writing
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            Ananta
          </Typography>
        </Box>
        <Button
          sx={{
            position: 'absolute',
            right: 60,
            backgroundColor: '#0288d1', // Biru muda
            maxWidth: '120px',
            color: 'white',
            borderRadius: '12px', // Atur border radius di sini
            padding: '8px 16px',
            fontWeight: 'bold',
            fontSize: '10px',
            textTransform: 'none',
            lineHeight: 1.5
          }}
        >
          Awaiting Confirmation
        </Button>
        <IconButton
          sx={{ position: 'absolute', right: 16 }}
          onClick={handleOpenModal}
        >
          <MoreVertIcon />
        </IconButton>
      </Box>

      {/* Card Content */}
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center'}}>
          <CardMedia
            component="img"
            image="https://ionicframework.com/docs/img/demos/thumbnail.svg"
            alt="Thumbnail"
            sx={{
              width: 80,
              height: 80,
              borderRadius: '10px',
              marginRight: '16px',
            }}
          />
          <Box>
            <Typography
              variant="h6"
              sx={{ fontSize: '14px', fontWeight: 'bold' }}
            >
              Product Photography
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              Visual Communication Design
            </Typography>
          </Box>
        </Box>
      </CardContent>

      {/* Card Footer */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px',
        }}
      >
        <Box>
          <Typography variant="body2" color="textSecondary">
            Total Order
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Rp 1.700.000
          </Typography>
        </Box>
        <CardActions>
          <Button
            variant="outlined"
            size="small"
            sx={{
              borderRadius: '10px',
              textTransform: 'capitalize',
              fontWeight: 'bold',
              maxWidth: '90px',
              maxHeight: '30px',
              lineHeight: 1
            }}
          >
            Request Refund
          </Button>
          <Button
            variant="contained"
            size="small"
            sx={{
              borderRadius: '10px',
              textTransform: 'capitalize',
              fontWeight: 'bold',
              backgroundColor: '#1976d2',
              ':hover': { backgroundColor: '#005bb5' },
            }}
          >
            Complete
          </Button>
        </CardActions>
      </Box>
    </Card>

    {/* Completed*/}
    <Card
      sx={{
        maxWidth: '95%',
        width: '95%',
        margin: '20px auto',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        borderRadius: '15px',
      }}
    >
      {/* Card Header */}
      <Box
        sx={{
          borderBottom: '1px solid #e0e0e0',
          display: 'flex',
          alignItems: 'center',
          padding: '16px',
          position: 'relative',
        }}
      >
        <CardMedia
          component="img"
          image="https://ionicframework.com/docs/img/demos/thumbnail.svg"
          alt="Thumbnail"
          sx={{
            width: 30,
            height: 30,
            borderRadius: '50%',
            marginRight: '16px',
          }}
        />
        <Box>
          <Typography variant="h6" sx={{ fontSize: '16px', fontWeight: 'bold' }}>
            Powerpoint
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            Agung
          </Typography>
        </Box>
        <Button
          sx={{
            position: 'absolute',
            right: 60,
            backgroundColor: '#0288d1', // Biru muda
            maxWidth: '120px',
            color: 'white',
            borderRadius: '12px', // Atur border radius di sini
            padding: '8px 16px',
            fontWeight: 'bold',
            fontSize: '10px',
            textTransform: 'none',
            lineHeight: 1.5
          }}
        >
          Awaiting Confirmation
        </Button>
        <IconButton
          sx={{ position: 'absolute', right: 16 }}
          onClick={handleOpenModal}
        >
          <MoreVertIcon />
        </IconButton>
      </Box>

      {/* Card Content */}
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center'}}>
          <CardMedia
            component="img"
            image="https://ionicframework.com/docs/img/demos/thumbnail.svg"
            alt="Thumbnail"
            sx={{
              width: 80,
              height: 80,
              borderRadius: '10px',
              marginRight: '16px',
            }}
          />
          <Box>
            <Typography
              variant="h6"
              sx={{ fontSize: '14px', fontWeight: 'bold' }}
            >
              Powerpoint
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              Communication
            </Typography>
          </Box>
        </Box>
      </CardContent>

      {/* Card Footer */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px',
        }}
      >
        <Box>
          <Typography variant="body2" color="textSecondary">
            Total Order
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Rp 1.700.000
          </Typography>
        </Box>
        <CardActions>
          <Button
            variant="outlined"
            size="small"
            sx={{
              borderRadius: '10px',
              textTransform: 'capitalize',
              fontWeight: 'bold',
              maxWidth: '90px',
              maxHeight: '30px',
              lineHeight: 1
            }}
          >
            Request Refund
          </Button>
          <Button
            variant="contained"
            size="small"
            sx={{
              borderRadius: '10px',
              textTransform: 'capitalize',
              fontWeight: 'bold',
              backgroundColor: '#1976d2',
              ':hover': { backgroundColor: '#005bb5' },
            }}
          >
            Complete
          </Button>
        </CardActions>
      </Box>
    </Card>

      </IonContent>
      {/* Render the modal and pass the required props */}
    
    <Modal isOpen={isModalOpen} closeModal={closeModal} />
    </IonPage>
    </ThemeProvider>
  );
};


export default Tab3;
