import React, { useState } from 'react';
import { IonContent, IonPage, IonGrid } from '@ionic/react';
import { AppBar, Toolbar, Box, Typography, Button, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SidebarAdmin from './sidebarAdmin';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications'; // Notification Icon
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // Account Icon

const subscription: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<string>('Subscription Management');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      subscriptionType: 'Monthly',
      status: 'Active',
      startDate: new Date('2023-01-15'),
      endDate: new Date('2023-02-15'),
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      subscriptionType: 'Annual',
      status: 'Expired',
      startDate: new Date('2022-01-10'),
      endDate: new Date('2023-01-10'),
    },
    {
      id: 3,
      name: 'Tech Store',
      email: 'techstore@example.com',
      subscriptionType: 'Monthly',
      status: 'Active',
      startDate: new Date('2023-02-01'),
      endDate: new Date('2023-03-01'),
    }
  ]);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleActivateSubscription = (userId: number) => {
    const updatedUsers = users.map(user =>
      user.id === userId ? { ...user, status: 'Active' } : user
    );
    setUsers(updatedUsers);
  };

  const handleExpireSubscription = (userId: number) => {
    const updatedUsers = users.map(user =>
      user.id === userId ? { ...user, status: 'Expired' } : user
    );
    setUsers(updatedUsers);
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
                Subscription Management
              </Typography>

              {/* Search Filter */}
              <Box sx={{ mb: 3 }}>
                <TextField
                  label="Search by Name or Email"
                  variant="outlined"
                  fullWidth
                />
              </Box>

              {/* Subscription Table */}
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell><strong>Name</strong></TableCell>
                      <TableCell><strong>Email</strong></TableCell>
                      <TableCell><strong>Subscription Type</strong></TableCell>
                      <TableCell><strong>Status</strong></TableCell>
                      <TableCell><strong>Start Date</strong></TableCell>
                      <TableCell><strong>End Date</strong></TableCell>
                      <TableCell><strong>Action</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.subscriptionType}</TableCell>
                        <TableCell>{user.status}</TableCell>
                        <TableCell>{user.startDate.toLocaleDateString()}</TableCell>
                        <TableCell>{user.endDate.toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            color={user.status === 'Active' ? 'secondary' : 'primary'}
                            onClick={() => (user.status === 'Active' ? handleExpireSubscription(user.id) : handleActivateSubscription(user.id))}
                          >
                            {user.status === 'Active' ? 'Expire' : 'Activate'}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </IonGrid>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default subscription;
