import React, { useState, useEffect } from 'react';
import { IonContent, IonPage, IonGrid, IonRow, IonCol, IonButton } from '@ionic/react';
import { Grid, AppBar, Toolbar, Box, Card, CardContent, CardMedia, Typography, Button, TextField, IconButton } from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';
import MenuIcon from '@mui/icons-material/Menu'; // Hamburger Icon
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Back Icon
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'; // Next Icon
import NotificationsIcon from '@mui/icons-material/Notifications'; // Notification Icon
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // Account Icon
import SidebarAdmin from './sidebarAdmin';
import { fetchSellers, verifySeller } from '../api.service'; // Import the service function

const sellerApproval: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<string>('Seller Approval'); // Track selected item
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true); // Track sidebar visibility
  const [sellers, setSellers] = useState<any[]>([]); // State to hold seller data
  useEffect(() => {
    const getSellers = async () => {
        try {
            const fetchedSellers = await fetchSellers();
            // Filter the sellers with status "pending" and verified=false
            const filteredSellers = fetchedSellers.filter(
                (seller: any) => seller.status === 'pending' && !seller.verified
            );
            setSellers(filteredSellers);
        } catch (error) {
            console.error('Error fetching sellers:', error);
        }
    };
    
    getSellers();
}, []);

const handleSellerAction = async (uid: string, status: string) => {
  try {
      const response = await verifySeller(uid, status); // Call the verifySeller function from the API service
      console.log('Seller verification status:', response.message);
      // Remove the seller from the list once action is done
      setSellers(sellers.filter(seller => seller.uid !== uid));
  } catch (error) {
      console.error('Error verifying seller:', error);
  }
};

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen); // Toggle sidebar visibility
  };

  return (
    <IonPage>
      <IonContent>
        <div style={{ display: 'flex', position: 'relative' }}>
          {/* Sidebar */}
          {sidebarOpen && (
            <div
              style={{
                width: '250px',
                backgroundColor: '#E9F3FF',
                height: '100vh', // Make sidebar full height
                padding: '10px',
                position: 'fixed', // Keep sidebar fixed when scrolling
                top: 0,
                left: 0,
                bottom: 0, // Sidebar will stretch to full height
                zIndex: 100, // Make sure sidebar is above other content
                overflowY: 'auto', // Make the sidebar scrollable if the content exceeds the viewport height
              }}
            >
                    <SidebarAdmin setSelectedItem={setSelectedItem} />
            </div>
          )}

          {/* AppBar */}
          <AppBar
  position="fixed"
  style={{
    backgroundColor: '#1976D2',
    borderBottomLeftRadius: '30px',
    borderBottomRightRadius: '30px',
    height: '82px',
    paddingTop: '25px',
    transition: 'all 0.3s ease',
    width: sidebarOpen ? 'calc(100% - 275px)' : '100%', // Lebar dinamis
    marginLeft: sidebarOpen ? '250px' : '0', // Sesuai sidebar
    zIndex: 110,
  }}
>

            <Toolbar style={{ height: '100%', alignItems: 'flex-end', paddingBottom: '10px', marginLeft:'20px' }}>
              <Box display="flex" alignItems="center" sx={{ width: '100%' }}>
                {/* Hamburger Button */}
                <IconButton edge="start" color="inherit" onClick={toggleSidebar} style={{ marginRight: '16px' }}>
                  <MenuIcon />
                </IconButton>

                {/* Back Button */}
                <IconButton edge="start" color="inherit" style={{ marginRight: '16px' }}>
                  <ArrowBackIcon />
                </IconButton>

                {/* Next Button */}
                <IconButton edge="start" color="inherit" style={{ marginRight: '16px' }}>
                  <ArrowForwardIcon />
                </IconButton>

                
                {/* Account and Notification Button */}
                <Box display="flex" alignItems="center" style={{ marginLeft: 'auto' }}>
                  <IconButton color="inherit" style={{ marginRight: '16px' }}>
                    <NotificationsIcon />
                  </IconButton>
                  <IconButton color="inherit">
                    <AccountCircleIcon />
                  </IconButton>
                </Box>
              </Box>
            </Toolbar>
          </AppBar>

          {/* Main Content */}
          <div
            style={{
              flex: 1,
              padding: '20px',
              marginLeft: sidebarOpen ? '300px' : '50px', // Shift content based on sidebar visibility
              transition: 'margin-left 0.3s ease', // Smooth transition for content shift
              marginTop: '82px', // Offset the content below the AppBar
            }}
          >
            {/* Header */}
            <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
          flexDirection: { xs: 'column', sm: 'row' }, // Responsive layout
          gap: 2,
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          Seller Approval
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}> {/* Wrap for smaller screens */}
          <Button variant="outlined" startIcon={<SortIcon />}>
            Sort
          </Button>
          <TextField label="Search name" variant="outlined" size="small" />
        </Box>
      </Box>

            {/* Grid Content */}
            <Grid container spacing={2} justifyContent="center">
  {sellers.map((seller, index) => (
    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
      <Card style={{ height: '100%', marginBottom: '20px' }}>
        <CardMedia
          component="img"
          height="140"
          image={seller.photo_url || '/assets/placeholder.png'}
          alt="Seller Thumbnail"
        />
        <CardContent>
          <Typography variant="h6" component="div">
            {seller.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {seller.major}
          </Typography>
          <Grid container spacing={1}>
  <Grid item xs={6}>
    <Button onClick={() => handleSellerAction(seller.uid, 'denied')}
      variant="contained" color="error" fullWidth size="small">
      Decline
    </Button>
  </Grid>
  <Grid item xs={6}>
    <Button onClick={() => handleSellerAction(seller.uid, 'accepted')}
     variant="contained" color="success" fullWidth size="small">
      Accept
    </Button>
  </Grid>
</Grid>

        </CardContent>
      </Card>
    </Grid>
  ))}
</Grid>


          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default sellerApproval;
