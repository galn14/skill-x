import React, { useState } from 'react';
import { IonContent, IonPage, IonGrid } from '@ionic/react';
import { Grid, AppBar, Toolbar, Box, Card, CardContent, Typography, Button, IconButton, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DeleteIcon from '@mui/icons-material/Delete';
import SidebarAdmin from './sidebarAdmin';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications'; // Notification Icon
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // Account Icon

const sellerManagement: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<string>('Review Management'); // Track selected item
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [selectedReview, setSelectedReview] = useState<number | null>(null);
  
  const [reviews, setReviews] = useState([
    {
      id: 1,
      productName: 'Wireless Headphones',
      sellerName: 'Tech Store',
      review: 'Great sound quality!',
      stars: 5,
    },
    {
      id: 2,
      productName: 'Yoga Mat',
      sellerName: 'Fitness World',
      review: 'Good quality but a bit slippery.',
      stars: 3,
    },
    {
      id: 3,
      productName: 'Coffee Maker',
      sellerName: 'Home Essentials',
      review: 'Makes perfect coffee every time.',
      stars: 4,
    },
  ]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleDelete = (id: number) => {
    // Filter out the deleted review
    const updatedReviews = reviews.filter((review) => review.id !== id);
    setReviews(updatedReviews);
  };

  const openDeleteDialog = (id: number) => {
    setSelectedReview(id);
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setSelectedReview(null);
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
                Review Management
              </Typography>

              {/* Reviews Table */}
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell><strong>Product Name</strong></TableCell>
                      <TableCell><strong>Seller Name</strong></TableCell>
                      <TableCell><strong>Review</strong></TableCell>
                      <TableCell><strong>Stars</strong></TableCell>
                      <TableCell><strong>Action</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {reviews.map((review) => (
                      <TableRow key={review.id}>
                        <TableCell>{review.productName}</TableCell>
                        <TableCell>{review.sellerName}</TableCell>
                        <TableCell>{review.review}</TableCell>
                        <TableCell>{'⭐'.repeat(review.stars)}</TableCell>
                        <TableCell>
                          <Button variant="contained" color="error" onClick={() => openDeleteDialog(review.id)}>
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
            <DialogTitle>Delete Review</DialogTitle>
            <DialogContent>
              Are you sure you want to delete this review? This action cannot be undone.
            </DialogContent>
            <DialogActions>
              <Button onClick={closeDeleteDialog} color="primary">
                Cancel
              </Button>
              <Button onClick={() => handleDelete(selectedReview as number)} color="error">
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default sellerManagement;
