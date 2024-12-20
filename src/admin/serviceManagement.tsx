import React, { useState } from 'react';
import { IonContent, IonPage, IonGrid, IonRow, IonCol, IonButton } from '@ionic/react';
import { Avatar, AppBar, Toolbar, Box, Card, CardContent, Typography, Button, TextField, IconButton } from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';
import MenuIcon from '@mui/icons-material/Menu'; // Hamburger Icon
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Back Icon
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'; // Next Icon
import NotificationsIcon from '@mui/icons-material/Notifications'; // Notification Icon
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // Account Icon
import SidebarAdmin from './sidebarAdmin';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

const serviceManagement: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<string>('Seller Approval'); // Track selected item
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true); // Track sidebar visibility

  // Contoh data seller
  const sellers = Array(12).fill({
    name: 'Aileen Angelica Lee',
    img: '', // URL gambar jika ada
  });

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen); // Toggle sidebar visibility
  };

  // Data layanan
  const service = [
    { id: 1, name: 'PowerPoint', icon: '📘' },
    { id: 2, name: 'Web Development', icon: '💻' },
    // Tambahkan data lainnya jika diperlukan
  ];

  return (
    <IonPage>
      <IonContent
        style={{
          display: 'flex',
          position: 'relative',
          overflowY: 'scroll', // Make the content scrollable
          height: 'calc(100vh - 82px)', // Make sure to account for the app bar height
        }}
      >
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
            <Toolbar style={{ height: '100%', alignItems: 'flex-end', paddingBottom: '10px', marginLeft: '20px' }}>
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

          {/* Main Content (using IonContent) */}
          <IonGrid
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
                Service Management
              </Typography>

              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}> {/* Wrap for smaller screens */}
                <Button variant="outlined" startIcon={<SortIcon />}>
                  Sort
                </Button>
                <TextField label="Search name" variant="outlined" size="small" />
              </Box>
            </Box>

            <Box sx={{ p: 3, border: '1px solid #bdbdbd', borderRadius: 4, bgcolor: '#ffffff', minHeight: '100vh' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {/* Add New Button */}
                <Box sx={{ alignSelf: 'start' }}>
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    sx={{ bgcolor: '#1976d2', '&:hover': { bgcolor: '#1565c0' } }}
                  >
                    Add New
                  </Button>
                </Box>

                {/* Service Cards */}
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 2 }}>
                  {service.map((serviceItem) => (
                    <Card key={serviceItem.id} sx={{ display: 'flex', alignItems: 'center', p: 2, bgcolor: '#ffffff', boxShadow: 1 }}>
                      <Avatar sx={{ mr: 2, width: 64, height: 64, fontSize: 32, bgcolor: 'transparent' }}>
                        {serviceItem.icon}
                      </Avatar>
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography variant="body1" fontWeight="bold">
                          {serviceItem.name}
                        </Typography>
                      </CardContent>
                      <IconButton color="primary">
                        <EditIcon />
                      </IconButton>
                    </Card>
                  ))}
                </Box>
              </Box>
            </Box>
          </IonGrid>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default serviceManagement;
