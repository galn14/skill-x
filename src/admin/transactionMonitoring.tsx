import React, { useState } from 'react';
import { IonContent, IonPage, IonGrid } from '@ionic/react';
import { AppBar, Toolbar, Box, Typography, Button, IconButton, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SidebarAdmin from './sidebarAdmin';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications'; // Notification Icon
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // Account Icon

const transactionMonitoring: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<string>('Transaction Management');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [cancelDialogOpen, setCancelDialogOpen] = useState<boolean>(false);
  const [selectedTransaction, setSelectedTransaction] = useState<number | null>(null);

  // Sample transaction data (transactions made by buyers)
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      buyer: 'John Doe',
      seller: 'Tech Store',
      product: 'Smartphone XYZ',
      transactionDate: new Date('2023-12-10'),
      status: 'In Progress',
      totalAmount: 250,
    },
    {
      id: 2,
      buyer: 'Jane Smith',
      seller: 'Fitness World',
      product: 'Yoga Mat Deluxe',
      transactionDate: new Date('2023-12-15'),
      status: 'Completed',
      totalAmount: 120,
    },
    {
      id: 3,
      buyer: 'Alice Johnson',
      seller: 'Tech Store',
      product: 'Laptop Pro 2023',
      transactionDate: new Date('2023-12-18'),
      status: 'In Progress',
      totalAmount: 500,
    },
  ]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Function to handle canceling an order
  const handleCancelOrder = (id: number) => {
    const updatedTransactions = transactions.map((transaction) =>
      transaction.id === id ? { ...transaction, status: 'Canceled' } : transaction
    );
    setTransactions(updatedTransactions);
    closeCancelDialog(); // Close the dialog after canceling
  };

  const openCancelDialog = (transactionId: number) => {
    setSelectedTransaction(transactionId);
    setCancelDialogOpen(true);
  };

  const closeCancelDialog = () => {
    setCancelDialogOpen(false);
    setSelectedTransaction(null);
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
                Transaction Management
              </Typography>

              {/* Transactions Table */}
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell><strong>Buyer</strong></TableCell>
                      <TableCell><strong>Seller</strong></TableCell>
                      <TableCell><strong>Product</strong></TableCell>
                      <TableCell><strong>Transaction Date</strong></TableCell>
                      <TableCell><strong>Status</strong></TableCell>
                      <TableCell><strong>Total Amount</strong></TableCell>
                      <TableCell><strong>Action</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {transactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell>{transaction.buyer}</TableCell>
                        <TableCell>{transaction.seller}</TableCell>
                        <TableCell>{transaction.product}</TableCell>
                        <TableCell>{transaction.transactionDate.toLocaleDateString()}</TableCell>
                        <TableCell>{transaction.status}</TableCell>
                        <TableCell>${transaction.totalAmount}</TableCell>
                        <TableCell>
                          {transaction.status === 'In Progress' && (
                            <Button
                              variant="contained"
                              color="error"
                              onClick={() => openCancelDialog(transaction.id)}
                            >
                              Cancel Order
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </IonGrid>

          {/* Cancel Order Confirmation Dialog */}
          <Dialog open={cancelDialogOpen} onClose={closeCancelDialog}>
            <DialogTitle>Cancel Order</DialogTitle>
            <DialogContent>
              Are you sure you want to cancel this order? This action cannot be undone.
            </DialogContent>
            <DialogActions>
              <Button onClick={closeCancelDialog} color="primary">
                Cancel
              </Button>
              <Button
                onClick={() => handleCancelOrder(selectedTransaction as number)}
                color="error"
              >
                Cancel Order
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default transactionMonitoring;
