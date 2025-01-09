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
import { fetchCategories, fetchMajors } from './api.admin'; // Pastikan path ini sesuai dengan lokasi file API Anda
import ModalAddCategory from './modalAddCategory';
import { useHistory } from 'react-router-dom';

export interface Category {
  id_category: string;
  title: string;
  photo_url: string;
  id_major: string;
}

const CategoryManagement: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<string>('Seller Approval');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [categories, setCategories] = useState<Category[]>([]); // State untuk menyimpan data kategori
  const [loading, setLoading] = useState<boolean>(false); // State untuk memonitor status loading
  const [majors, setMajors] = useState<any[]>([]); // State untuk menyimpan data majors
  const [majorTitles, setMajorTitles] = useState<{ [key: string]: string }>({});
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null); // State for selected category
  const [isModalOpen, setIsModalOpen] = useState(false); // State for Modal visibility

  const history = useHistory(); // Hook untuk navigasi

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const openEditCategoryModal = (category: Category) => {
    if (!category) return; // Hindari membuka modal jika data tidak valid
    setSelectedCategory(category); // Set the selected category
    setIsModalOpen(true); // Open the modal
    history.push(`/modalUpdateCategory?id=${category.id_category}`);

  };

  const openAddCategory = () => {
    history.push('/modalAddCategory'); // Arahkan ke rute modal
  };

  // Fetch data kategori dan majors dari API saat komponen pertama kali dimuat
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const categoriesData = await fetchCategories(); // Fetch categories
        const majorsData = await fetchMajors(); // Fetch majors

        // Mapping idMajor to titleMajor (note the difference in key names)
        const majorTitlesMap: { [key: string]: string } = {};
        majorsData.forEach((major: any) => {
          majorTitlesMap[major.idMajor] = major.titleMajor; // Correct key here
        });

        setCategories(categoriesData); // Store categories data
        setMajors(majorsData); // Store majors data
        setMajorTitles(majorTitlesMap); // Store major-to-title mapping
      } catch (error) {
        console.error("Failed to fetch categories or majors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
                <IconButton edge="start" color="inherit" onClick={toggleSidebar} style={{ marginRight: '16px' }}>
                  <MenuIcon />
                </IconButton>
                <IconButton edge="start" color="inherit" style={{ marginRight: '16px' }}>
                  <ArrowBackIcon />
                </IconButton>
                <IconButton edge="start" color="inherit" style={{ marginRight: '16px' }}>
                  <ArrowForwardIcon />
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
                Category Management
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
                <Box sx={{ alignSelf: 'start' }}>
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    sx={{ bgcolor: '#1976d2', '&:hover': { bgcolor: '#1565c0' } }}
                    onClick={openAddCategory}
                  >
                    Add New
                  </Button>
                </Box>

                {/* Display kategori */}
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 2 }}>
                  {loading ? (
                    <Typography>Loading categories...</Typography>
                  ) : (
                    categories.map((category) => {
                      // Check if the category has a corresponding major
                      const majorTitle = majorTitles[category.id_major] || 'Unknown';

                      return (
                        <Card
                        key={category.id_category} // Ensure a unique key
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          p: 2,
                          bgcolor: '#ffffff',
                          boxShadow: 1,
                          position: 'relative',  // Add position relative to ensure icon is on top
                        }}
                      >
                        <Avatar
                          sx={{
                            mr: 2,
                            width: 64,
                            height: 64,
                            fontSize: 32,
                            bgcolor: 'transparent',
                          }}
                          src={category.photo_url || 'default-icon.png'}
                          alt={category.title}
                        />
                        <CardContent sx={{ flexGrow: 1 }}>
                          <Typography variant="body1" fontWeight="bold">
                            {category.title}
                          </Typography>
                      
                          {/* Display Major Information */}
                          <Typography variant="body2" color="textSecondary">
                            Major: {majorTitle}
                          </Typography>
                        </CardContent>
                      
                        {/* Ensure IconButton is clickable by adjusting zIndex */}
                        <IconButton
                          color="primary"
                          onClick={() => {
                            console.log('Edit clicked for category:', category);  // Debugging log
                            openEditCategoryModal(category);
                          }}
                          sx={{
                            position: 'absolute',
                            top: '50%',
                            right: '16px',
                            transform: 'translateY(-50%)',
                            zIndex: 10,  // Make sure it's clickable
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                      </Card>
                      
                      );
                    })
                  )}
                </Box>
              </Box>
            </Box>
          </IonGrid>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default CategoryManagement;
