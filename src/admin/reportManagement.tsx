import React, { useState } from 'react';
import { IonContent, IonPage, IonGrid } from '@ionic/react';
import { AppBar, Toolbar, Box, Typography, Button, IconButton, Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SidebarAdmin from './sidebarAdmin';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications'; // Notification Icon
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // Account Icon

// Define ReportData type for Product, Account, Transaction Reports
type ReportData = {
  ProductReports: { id: number; productName: string; reportReason: string; status: string; date: string }[];
  AccountReports: { id: number; reportedUser: string; reportReason: string; status: string; date: string }[];
  TransactionReports: { id: number; transactionId: string; user: string; reportReason: string; status: string; date: string }[];
};

// Type guard functions
const isProductReport = (report: any): report is { productName: string } => 'productName' in report;
const isAccountReport = (report: any): report is { reportedUser: string } => 'reportedUser' in report;
const isTransactionReport = (report: any): report is { transactionId: string } => 'transactionId' in report;

const reportManagement: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<string>('Report Management');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [reportType, setReportType] = useState<string>('ProductReports'); // Default report type
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  // Example report data with explicit typing
  const [reportData, setReportData] = useState<ReportData>({
    ProductReports: [
      { id: 1, productName: 'Product A', reportReason: 'Defective item', status: 'Pending', date: '2024-12-01' },
      { id: 2, productName: 'Product B', reportReason: 'Wrong product received', status: 'In Progress', date: '2024-12-02' },
    ],
    AccountReports: [
      { id: 1, reportedUser: 'John Doe', reportReason: 'Suspicious activity', status: 'Resolved', date: '2024-12-03' },
      { id: 2, reportedUser: 'Jane Smith', reportReason: 'Impersonation', status: 'Pending', date: '2024-12-04' },
    ],
    TransactionReports: [
      { id: 1, transactionId: 'TX12345', user: 'John Doe', reportReason: 'Unauthorized transaction', status: 'Pending', date: '2024-12-05' },
      { id: 2, transactionId: 'TX12346', user: 'Jane Smith', reportReason: 'Transaction error', status: 'Resolved', date: '2024-12-06' },
    ],
  });

  // Toggle Sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Handle Report Type Change
  const handleReportTypeChange = (event: SelectChangeEvent<string>) => {
    setReportType(event.target.value);
  };

  // Function to resolve the report (change status to 'Resolved')
  const resolveReport = (id: number) => {
    const updatedReports = reportData[reportType as keyof ReportData].map(report => {
      if (report.id === id) {
        return { ...report, status: 'Resolved' }; // Change status to 'Resolved'
      }
      return report;
    });

    // Update state with the new report data
    setReportData({
      ...reportData,
      [reportType as keyof ReportData]: updatedReports,
    });
  };

  // Function to change the report status to 'In Progress'
  const inProgressReport = (id: number) => {
    const updatedReports = reportData[reportType as keyof ReportData].map(report => {
      if (report.id === id) {
        return { ...report, status: 'In Progress' }; // Change status to 'In Progress'
      }
      return report;
    });

    // Update state with the new report data
    setReportData({
      ...reportData,
      [reportType as keyof ReportData]: updatedReports,
    });
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
                Report Management
              </Typography>

              {/* Report Type Filter */}
              <Box sx={{ mb: 3 }}>
                <FormControl fullWidth>
                  <InputLabel>Report Type</InputLabel>
                  <Select
                    value={reportType}
                    onChange={handleReportTypeChange}
                    label="Report Type"
                  >
                    <MenuItem value="ProductReports">Product Reports</MenuItem>
                    <MenuItem value="AccountReports">Account Reports</MenuItem>
                    <MenuItem value="TransactionReports">Transaction Reports</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              {/* Report Table */}
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      {reportType === 'ProductReports' && (
                        <>
                          <TableCell><strong>Product Name</strong></TableCell>
                          <TableCell><strong>Report Reason</strong></TableCell>
                          <TableCell><strong>Status</strong></TableCell>
                          <TableCell><strong>Date</strong></TableCell>
                          <TableCell><strong>Action</strong></TableCell>
                        </>
                      )}
                      {reportType === 'AccountReports' && (
                        <>
                          <TableCell><strong>Reported User</strong></TableCell>
                          <TableCell><strong>Report Reason</strong></TableCell>
                          <TableCell><strong>Status</strong></TableCell>
                          <TableCell><strong>Date</strong></TableCell>
                          <TableCell><strong>Action</strong></TableCell>
                        </>
                      )}
                      {reportType === 'TransactionReports' && (
                        <>
                          <TableCell><strong>Transaction ID</strong></TableCell>
                          <TableCell><strong>User</strong></TableCell>
                          <TableCell><strong>Report Reason</strong></TableCell>
                          <TableCell><strong>Status</strong></TableCell>
                          <TableCell><strong>Date</strong></TableCell>
                          <TableCell><strong>Action</strong></TableCell>
                        </>
                      )}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(reportData[reportType as keyof ReportData] || []).map((row, index) => (
                      <TableRow key={index}>
                        {isProductReport(row) && (
                          <>
                            <TableCell>{row.productName}</TableCell>
                            <TableCell>{row.reportReason}</TableCell>
                            <TableCell>{row.status}</TableCell>
                            <TableCell>{row.date}</TableCell>
                            <TableCell>
                              {row.status === 'Pending' && (
                                <>
                                  <Button onClick={() => resolveReport(row.id)}>Resolve</Button>
                                  <Button onClick={() => inProgressReport(row.id)}>In Progress</Button>
                                </>
                              )}
                              {row.status === 'In Progress' && (
                                <Button onClick={() => resolveReport(row.id)}>Resolve</Button>
                              )}
                            </TableCell>
                          </>
                        )}
                        {isAccountReport(row) && (
                          <>
                            <TableCell>{row.reportedUser}</TableCell>
                            <TableCell>{row.reportReason}</TableCell>
                            <TableCell>{row.status}</TableCell>
                            <TableCell>{row.date}</TableCell>
                            <TableCell>
                              {row.status === 'Pending' && (
                                <>
                                  <Button onClick={() => resolveReport(row.id)}>Resolve</Button>
                                  <Button onClick={() => inProgressReport(row.id)}>In Progress</Button>
                                </>
                              )}
                              {row.status === 'In Progress' && (
                                <Button onClick={() => resolveReport(row.id)}>Resolve</Button>
                              )}
                            </TableCell>
                          </>
                        )}
                        {isTransactionReport(row) && (
                          <>
                            <TableCell>{row.transactionId}</TableCell>
                            <TableCell>{row.user}</TableCell>
                            <TableCell>{row.reportReason}</TableCell>
                            <TableCell>{row.status}</TableCell>
                            <TableCell>{row.date}</TableCell>
                            <TableCell>
                              {row.status === 'Pending' && (
                                <>
                                  <Button onClick={() => resolveReport(row.id)}>Resolve</Button>
                                  <Button onClick={() => inProgressReport(row.id)}>In Progress</Button>
                                </>
                              )}
                              {row.status === 'In Progress' && (
                                <Button onClick={() => resolveReport(row.id)}>Resolve</Button>
                              )}
                            </TableCell>
                          </>
                        )}
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

export default reportManagement;
