import React from 'react';
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Box,
    Button,
    Menu,
    MenuItem,
    Grid,
    Card,
    CardContent,
    TextField,
    CssBaseline,
    InputBase,
    FormControl,
    Select,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import StarRatings from 'react-star-ratings';
import {
    IonPage,
    IonContent,
} from '@ionic/react';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MailIcon from '@mui/icons-material/Mail';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ChatIcon from '@mui/icons-material/Chat';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import '@fontsource/poppins';  // Import the font
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';

const NotificationPage: React.FC = () => {
    const history = useHistory();
    const handleBack = () => history.goBack();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const isLoggedIn = !!localStorage.getItem('userToken'); // Misalnya token disimpan di localStorage
    const [anchorElSeller, setAnchorElSeller] = React.useState<null | HTMLElement>(null);
    const [anchorElBuyer, setAnchorElBuyer] = React.useState<null | HTMLElement>(null);
    const [anchorElReview, setAnchorElReview] = React.useState<null | HTMLElement>(null);

    const openReview = Boolean(anchorElReview);
    const openSeller = Boolean(anchorElSeller);
    const openBuyer = Boolean(anchorElBuyer);

    const handleClickSeller = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElSeller(anchorElSeller ? null : event.currentTarget);
    };

    const handleClickBuyer = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElBuyer(anchorElBuyer ? null : event.currentTarget);
    };

    const handleClickReview = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElReview(anchorElReview ? null : event.currentTarget);
    };

    const handleClose = () => {
        setAnchorElSeller(null);
        setAnchorElBuyer(null);
    };

    const theme = createTheme({
        typography: {
          fontFamily: '"Poppins"',  // Set font di tema
        },
      });

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

    const [statusFilter, setStatusFilter] = useState<string>('All Status');
    const [categoryFilter, setCategoryFilter] = useState<string>('All Categories');
    const [dateFilter, setDateFilter] = useState<string>('All Dates');

    return(
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
                        display: 'flex',
                        alignItems: 'flex-end',
                        paddingBottom: '10px',
                    }}
                >
                    <Box display="flex" alignItems="center" sx={{ width: '100%' }}>
                        <IconButton onClick={handleBack} color="primary">
                            <ArrowBackIcon />
                        </IconButton>
                        <Typography
                            variant="h6"
                            component="div"
                            color='black'
                            fontSize='16px'
                            style={{
                                fontWeight: 200,
                                marginRight: 'auto',
                                paddingLeft: '16px',
                            }}
                        >
                            Notification
                        </Typography>
                        <IconButton color="primary">
                            <ShoppingCartIcon />
                        </IconButton>
                        <IconButton color="primary">
                            <NotificationsIcon />
                        </IconButton>
                        <IconButton color="primary" onClick={handleMessageButtonClick}>
                            <MailIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
          <IonContent fullscreen className={`${isModalOpen ? 'blurred-content' : ''} `}>
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
            {/* Filter: On Going Transaction */}
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

            {/* Filter: Waiting for Payment */}
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

            {/* Filter: Promo */}
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
          </IonContent>
          {/* Render the modal and pass the required props */}
        
        </IonPage>
        </ThemeProvider>
    );
};

export default NotificationPage;
