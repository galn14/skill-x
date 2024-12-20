import React, { useState } from 'react';
import { IonContent, IonPage, IonGrid } from '@ionic/react';
import { AppBar, Toolbar, Box, Typography, Button, IconButton, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SidebarAdmin from './sidebarAdmin';
import NotificationsIcon from '@mui/icons-material/Notifications'; // Notification Icon
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // Account Icon

const helpAndSupport: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<string>('Help and Support');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  // Toggle Sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
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
                height: '100vh',
                padding: '10px',
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: 100,
                overflowY: 'auto',
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
              height: '82px',
              paddingTop: '25px',
              transition: 'all 0.3s ease',
              width: sidebarOpen ? 'calc(100% - 275px)' : '100%',
              marginLeft: sidebarOpen ? '250px' : '0',
              zIndex: 110,
            }}
          >
            <Toolbar style={{ height: '100%', paddingBottom: '10px', marginLeft: '20px' }}>
              <Box display="flex" alignItems="center" sx={{ width: '100%' }}>
                <IconButton edge="start" color="inherit" onClick={toggleSidebar} style={{ marginRight: '16px' }}>
                  <MenuIcon />
                </IconButton>
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
          <IonGrid
            style={{
              flex: 1,
              padding: '20px',
              marginLeft: sidebarOpen ? '300px' : '50px',
              transition: 'margin-left 0.3s ease',
              marginTop: '82px',
            }}
          >
            {/* Header */}
            <Box sx={{ padding: '20px' }}>
              <Typography variant="h4" fontWeight="bold" mb={3}>
                Help and Support
              </Typography>

              {/* Help and Support Content */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6">Frequently Asked Questions</Typography>
                <ul>
                  <li><strong>How do I reset my password?</strong> You can reset your password by clicking on 'Forgot Password' on the login page.</li>
                  <li><strong>How do I contact customer support?</strong> You can contact support by emailing support@example.com or calling 123-456-7890.</li>
                  <li><strong>How do I track my order?</strong> To track your order, go to the 'Orders' section of your account.</li>
                </ul>
              </Box>

              {/* Contact Form */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6">Contact Us</Typography>
                <form>
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Subject</InputLabel>
                    <Select
                      value="General Inquiry"
                      onChange={() => {}}
                      label="Subject"
                    >
                      <MenuItem value="General Inquiry">General Inquiry</MenuItem>
                      <MenuItem value="Technical Support">Technical Support</MenuItem>
                      <MenuItem value="Billing Issue">Billing Issue</MenuItem>
                    </Select>
                  </FormControl>

                  {/* Message Textarea */}
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel shrink>Message</InputLabel>
                    <textarea
                      rows={4}
                      style={{
                        width: '100%',
                        padding: '10px',
                        color: '#ADADAD', // Light gray text color
                        backgroundColor: '#F0F0F0', // Light gray background
                        border: '1px solid #ccc', // Light gray border
                        borderRadius: '4px', // Rounded borders
                        fontSize: '14px', // Comfortable font size
                        outline: 'none', // Remove outline on focus
                      }}
                    />
                  </FormControl>

                  <Button variant="contained" color="primary" style={{ marginTop: '10px' }}>
                    Submit
                  </Button>
                </form>
              </Box>
            </Box>
          </IonGrid>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default helpAndSupport;
