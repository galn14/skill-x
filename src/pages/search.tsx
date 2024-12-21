import React, { useState } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { InputBase, IconButton, AppBar, Toolbar, Box, Grid, Card, CardMedia, CardContent, Typography, Select, MenuItem } from '@mui/material';
import { useHistory } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MailIcon from '@mui/icons-material/Mail';

const SearchPage: React.FC = () => {
  const history = useHistory();
  const [searchText, setSearchText] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [priceSort, setPriceSort] = useState<string>(''); // Harga (terendah/tertinggi)

  const [products] = useState([
    { id: 1, name: 'Product 1', price: 10, seller: 'Seller 1', image: 'https://via.placeholder.com/150', category: 'Category 1' },
    { id: 2, name: 'Product 2', price: 20, seller: 'Seller 2', image: 'https://via.placeholder.com/150', category: 'Category 2' },
    { id: 3, name: 'Product 3', price: 30, seller: 'Seller 3', image: 'https://via.placeholder.com/150', category: 'Category 1' },
    { id: 4, name: 'Product 4', price: 40, seller: 'Seller 4', image: 'https://via.placeholder.com/150', category: 'Category 3' },
    { id: 5, name: 'Product 5', price: 50, seller: 'Seller 5', image: 'https://via.placeholder.com/150', category: 'Category 2' },
  ]);

  const isLoggedIn = !!localStorage.getItem('userToken');
  const handleBack = () => history.goBack();
  const handleCartButtonClick = () => {
    if (isLoggedIn) {
      history.push('/cart');
    } else {
      history.push('/login');
    }
  };
  const handleMessageButtonClick = () => {
    if (isLoggedIn) {
      history.push('/messages');
    } else {
      history.push('/login');
    }
  };
  const handleNotificationButtonClick = () => {
    if (isLoggedIn) {
      history.push('/notification');
    } else {
      history.push('/login');
    }
  };

  // Filter produk berdasarkan kategori dan pencarian
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchText.toLowerCase()) &&
    (selectedCategory ? product.category === selectedCategory : true)
  );

  // Mengurutkan produk berdasarkan harga
  const sortedProducts = filteredProducts.sort((a, b) => {
    if (priceSort === 'asc') {
      return a.price - b.price; // Urutkan harga terendah ke tertinggi
    } else if (priceSort === 'desc') {
      return b.price - a.price; // Urutkan harga tertinggi ke terendah
    }
    return 0; // Tidak ada pengurutan jika priceSort kosong
  });

  return (
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
            alignItems: 'center',
            paddingBottom: '10px',
          }}
        >
          <Box display="flex" alignItems="center" sx={{ width: '100%' }}>
            <IconButton onClick={handleBack} color="primary">
              <ArrowBackIcon />
            </IconButton>
            <Box sx={{ flexGrow: 1 }} />
            <IconButton color="primary" onClick={handleCartButtonClick}>
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

      <IonContent>
        <Box sx={{ padding: 2, marginTop: '100px' }}>
          {/* Search Bar */}
          <Box
            display="flex"
            alignItems="center"
            sx={{
              backgroundColor: 'white',
              borderRadius: '10px',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
              padding: '5px 10px',
              width: '95%',
              maxWidth: '100%',
              margin: '5px auto',
            }}
          >
            <SearchIcon sx={{ color: '#007bff', marginRight: '10px' }} />
            <InputBase
              placeholder="Search the right services"
              sx={{ flex: 1, color: '#333' }}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              inputProps={{ 'aria-label': 'search the right services' }}
            />
          </Box>

          {/* Filters Section */}
          <Box sx={{  marginTop: '20px', display: 'flex', flexDirection: 'row', gap: '20px' }}>
            {/* Kategori Filter */}
            <Select
            sx={{               borderRadius: '20px'}}
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              displayEmpty
              fullWidth
            >
              <MenuItem value="">All Categories</MenuItem>
              <MenuItem value="Category 1">Category 1</MenuItem>
              <MenuItem value="Category 2">Category 2</MenuItem>
              <MenuItem value="Category 3">Category 3</MenuItem>
            </Select>

            {/* Harga Filter */}
            <Select
                        sx={{               borderRadius: '20px'}}

              value={priceSort}
              onChange={(e) => setPriceSort(e.target.value)}
              displayEmpty
              fullWidth
            >
              <MenuItem value="">Sort by Price</MenuItem>
              <MenuItem value="asc">Price: Low to High</MenuItem>
              <MenuItem value="desc">Price: High to Low</MenuItem>
            </Select>
          </Box>

          {/* Display Filtered and Sorted Products */}
          <Grid container spacing={2} sx={{ marginTop: '20px' }}>
            {sortedProducts.map((product) => (
              <Grid item xs={6} sm={6} md={6} key={product.id}>
                <Card>
                  <CardMedia component="img" alt={product.name} height="140" image={product.image} />
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {product.name}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                      {product.seller}
                    </Typography>
                    <Typography variant="body2" color="text.primary">
                      ${product.price}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </IonContent>
    </IonPage>
  );
};

export default SearchPage;
