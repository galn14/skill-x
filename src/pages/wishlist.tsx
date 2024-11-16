import React, { useState } from 'react';
import {
  Grid,
  InputBase,
  Container,
  ListItemAvatar,
  Avatar,
  Typography,
  IconButton,
  Button,
  FormControl,
  Select,
  MenuItem,
  Card,
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
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { CssBaseline, GlobalStyles } from '@mui/material';
import '@fontsource/poppins';  // Import the font
import { createTheme, ThemeProvider } from '@mui/material/styles';

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

const Wishlist: React.FC = () => {
  const history = useHistory();
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [dateFilter, setDateFilter] = useState('All Dates');
  const [searchQuery, setSearchQuery] = useState('');
  const [wishlist, setWishlist] = useState([
    {
      id: 1,
      name: 'Item A',
      description: 'This is item A',
      image: 'https://via.placeholder.com/150',
      category: 'Website Development',
      dateAdded: '2024-11-14',
    },
    {
      id: 2,
      name: 'Item B',
      description: 'This is item B',
      image: 'https://via.placeholder.com/150',
      category: 'Photography',
      dateAdded: '2024-11-13',
    },
    {
      id: 3,
      name: 'Item C',
      description: 'This is item C',
      image: 'https://via.placeholder.com/150',
      category: 'Copywriting',
      dateAdded: '2024-11-10',
    },
    {
      id: 4,name: 'Item A',description: 'This is item A',image: 'https://via.placeholder.com/150',category: 'Website Development',dateAdded: '2024-11-14',
    },
    {
      id: 5,name: 'Item A',description: 'This is item A',image: 'https://via.placeholder.com/150',category: 'Website Development',dateAdded: '2024-11-14',
    },
  ]);

  const handleBack = () => history.goBack();
  const handleRemove = (id: number) =>
    setWishlist((prev) => prev.filter((item) => item.id !== id));

  // Filter Functionality
  const filteredWishlist = wishlist.filter((item) => {
    const matchesCategory =
      categoryFilter === 'All Categories' || item.category === categoryFilter;

    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesDate =
      dateFilter === 'All Dates' ||
      (dateFilter === 'Today' && item.dateAdded === '2024-11-14') ||
      (dateFilter === 'This Week' && ['2024-11-14', '2024-11-13'].includes(item.dateAdded)) ||
      (dateFilter === 'This Month' && item.dateAdded.startsWith('2024-11'));

    return matchesCategory && matchesSearch && matchesDate;
  });

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
              Wishlist
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

      <IonContent fullscreen>
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

          {/* Filters */}
          <Box
            sx={{
              display: 'flex',
              gap: '10px',
              marginBottom: '20px',
              flexWrap: 'wrap',
            }}
          >
            <FormControl sx={{ width: '45%' }}>
              <Select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                displayEmpty
                sx={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '20px',
                  '& .MuiSelect-select': { padding: '8px' },
                }}
              >
                <MenuItem value="All Categories">All Categories</MenuItem>
                <MenuItem value="Website Development">
                  Website Development
                </MenuItem>
                <MenuItem value="Photography">Photography</MenuItem>
                <MenuItem value="Copywriting">Copywriting</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ width: '45%' }}>
              <Select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                displayEmpty
                sx={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '20px',
                  '& .MuiSelect-select': { padding: '8px' },
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

        {/* Wishlist Items */}
        <Box sx={{ paddingX: '20px' }}>
          {filteredWishlist.length > 0 ? (
            <Grid container spacing={2}>
              {filteredWishlist.map((item) => (
                <Grid item xs={6} key={item.id}>
                  <Card
                    sx={{
                      border: '2px solid #ABABAB',
                      borderRadius: '5.44px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      padding: '10px',
                      height: '283px',
                      width: '100%',
                    }}
                  >
                    <Box
                        sx={{
                          padding:0,
                          margin: 0,
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          // Area khusus gambar
                        }}
                      >
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        alignItems: 'center',
                       borderRadius:'10px',
                        objectFit: 'cover',
                      }}
                    /> </Box>
                    <Typography variant="body1">{item.name}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {item.description}
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '100%',
                      }}
                    >
                      <IconButton onClick={() => handleRemove(item.id)}>
                        <DeleteOutlineIcon />
                      </IconButton>
                      <Button
                        variant="contained"
                        sx={{
                          width: '120px',
                          padding: '5px 10px',        // Padding tombol
                          textTransform: 'none',     
                          backgroundColor: '#0094FF', // Warna biru
                          fontSize: '12px',           // Ukuran font
                          color: '#FFFFFF',           // Teks warna putih
                          '&:hover': {
                            backgroundColor: '#007ACC', // Warna biru lebih gelap saat hover
                          },
                          display: 'block',             // Memastikan tombol tampil sebagai block
    margin: '0 auto', 
                        }}
                      >
                        Add to Cart
                      </Button>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography variant="body1">No items found.</Typography>
          )}
        </Box>
      </IonContent>
    </IonPage>
    </ThemeProvider>

  );
};

export default Wishlist;
