import React, { useState, useEffect } from 'react';
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
import { fetchMajors } from '../api.service';
import ModalAddMajor from './modalAddMajor';
import { Route, useLocation } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import ModalUpdateMajor from './modalUpdateMajor';

export interface Major {
  idMajor: string;
  titleMajor: string;
  photo_url: string;
}

const MajorManagement: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<string>('Major Management');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [majors, setMajors] = useState<Major[]>([]); // Tipe data lebih spesifik
  
  const [selectedMajor, setSelectedMajor] = useState<any | null>(null); // State for selected major to edit
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const openModal = () => setIsModalOpen(true); // Open modal by setting state
  const closeModal = () => setIsModalOpen(false); // Close modal by setting state

  const [newMajor, setNewMajor] = useState({
    titleMajor: '',
    iconUrl: '',
  });

  

  const history = useHistory();  // Hook untuk navigasi
  const openAddMajor = () => {
    history.push('/modalAddMajor');  // Arahkan ke rute modal
  };
  
  const openEditMajorModal = (major: Major) => {
    if (!major) return; // Hindari membuka modal jika data tidak valid
    setSelectedMajor(major);
    //setIsModalOpen(true);
    history.push(`/modalUpdateMajor?id=${major.idMajor}`);
  };
  
  

  const closeEditMajorModal = () => {
    setSelectedMajor(null);
    setIsModalOpen(false);  // Close the modal
  };
  
  
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search); // Gunakan useLocation
    const id = queryParams.get('id');
  
    if (id) {
      const major = majors.find((item) => item.idMajor === id);
      if (major) {
        setSelectedMajor(major);
        setIsModalOpen(true);
      }
    
    }
  }, [location.search, majors]);
  
  const refreshMajors = async () => {
    try {
      const updatedMajors = await fetchMajors(); // Refresh data dari API
      setMajors(updatedMajors);
    } catch (error) {
      console.error('Error refreshing majors:', error);
    }
  };

  useEffect(() => {
 const loadMajors = async () => {
          try {
            const majorsData = await fetchMajors(); // Ambil data dari API
            setMajors(majorsData); // Simpan di state
          } catch (error) {
            console.error('Error fetching majors:', error);
          }
        };
    
        loadMajors();  }, []);
  
  
        

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen); // Toggle sidebar visibility
  };

  return (
    <IonPage>
      <IonContent
        style={{
          display: 'flex',
          position: 'relative',
          overflowY: 'scroll',
          height: 'calc(100vh - 82px)',
        }}
      >
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
                bottom: 0,
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
              borderBottomLeftRadius: '30px',
              borderBottomRightRadius: '30px',
              height: '82px',
              paddingTop: '25px',
              transition: 'all 0.3s ease',
              width: sidebarOpen ? 'calc(100% - 275px)' : '100%',
              marginLeft: sidebarOpen ? '250px' : '0',
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
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2,
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 2,
              }}
            >
              <Typography variant="h4" fontWeight="bold">
                Major Management
              </Typography>

              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
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
                    onClick={openAddMajor}
                  >
                    Add New
                  </Button>
                  <Route path="/ModalAddMajor" component={ModalAddMajor}/>

                </Box>
                
                
               

                {/* Major Cards */}

                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 2 }}>
                  {majors.length > 0 ? (
                    majors.map((major, index) => (
                      
                <Card key={index} sx={{ display: 'flex', alignItems: 'center', p: 2, boxShadow: 2 }}>
                <Avatar 
                    sx={{ mr: 2, width: 64, height: 64 }} 
                    src={major.photo_url || 'default-icon.png'} 
                    alt={major.titleMajor}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="body1" fontWeight="bold">
                      {major.titleMajor || 'No Name'}
                    </Typography>
                  </CardContent>
                  <IconButton color="primary" onClick={() => openEditMajorModal(major)}>
                        <EditIcon />
                      </IconButton>
                </Card>

    ))
  ) : (
    <Typography>No majors available</Typography>
  )}


{isModalOpen && selectedMajor ? (
 <ModalUpdateMajor
  majorData={selectedMajor}
  onClose={closeEditMajorModal}
  onSave={(updatedMajor: Major) => {
    setMajors((prevMajors) =>
      prevMajors.map((major) =>
        major.idMajor === updatedMajor.idMajor ? updatedMajor : major
      )
    );
    closeEditMajorModal();
  }}
  onDeleteSuccess={refreshMajors}
/>

) : null}

  
</Box>

                          
                
              </Box>
            </Box>
          </IonGrid>
        </div>
      </IonContent>
    </IonPage>

    
  );
};

export default MajorManagement;