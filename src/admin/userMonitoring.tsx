import React, { useState } from 'react';
import { IonContent, IonPage, IonGrid } from '@ionic/react';
import { AppBar, Toolbar, Box, Typography, Button, IconButton, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DeleteIcon from '@mui/icons-material/Delete';
import SidebarAdmin from './sidebarAdmin';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications'; // Notification Icon
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // Account Icon

const userMonitoring: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<string>('User Management');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);

  // Sample user data (sellers and buyers)
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Tech Store',
      email: 'techstore@example.com',
      role: 'Seller',
      accountCreated: new Date('2023-01-15'),
    },
    {
      id: 2,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Buyer',
      accountCreated: new Date('2023-02-20'),
    },
    {
      id: 3,
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'Buyer',
      accountCreated: new Date('2023-03-05'),
    },
    {
      id: 4,
      name: 'Fitness World',
      email: 'fitnessworld@example.com',
      role: 'Seller',
      accountCreated: new Date('2023-03-01'),
    }
  ]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Function to handle deleting a user
  const handleDeleteUser = (id: number) => {
    const updatedUsers = users.filter(user => user.id !== id);
    setUsers(updatedUsers);
    closeDeleteDialog(); // Close the dialog after deleting
  };

  const openDeleteDialog = (userId: number) => {
    setSelectedUser(userId);
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setSelectedUser(null);
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
                User Management
              </Typography>

              {/* Users Table */}
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell><strong>Name</strong></TableCell>
                      <TableCell><strong>Email</strong></TableCell>
                      <TableCell><strong>Role</strong></TableCell>
                      <TableCell><strong>Account Created</strong></TableCell>
                      <TableCell><strong>Action</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>{user.accountCreated.toLocaleDateString()}</TableCell> {/* Account creation date */}
                        <TableCell>
                          <Button variant="contained" color="error" onClick={() => openDeleteDialog(user.id)}>
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </IonGrid>

          {/* Delete Confirmation Dialog */}
          <Dialog open={deleteDialogOpen} onClose={closeDeleteDialog}>
            <DialogTitle>Delete User</DialogTitle>
            <DialogContent>
              Are you sure you want to delete this user? This action cannot be undone.
            </DialogContent>
            <DialogActions>
              <Button onClick={closeDeleteDialog} color="primary">
                Cancel
              </Button>
              <Button
                onClick={() => handleDeleteUser(selectedUser as number)}
                color="error"
              >
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default userMonitoring;
