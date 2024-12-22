import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSearchbar, IonIcon, IonCard, IonCardContent, IonButton, IonFooter, IonTabBar, IonTabButton, IonCardHeader, IonCardSubtitle, IonCardTitle, IonLabel } from '@ionic/react';
import { notificationsOutline, mailOutline, menuOutline, desktopOutline, colorPaletteOutline, constructOutline, videocamOutline, brushOutline, globeOutline } from 'ionicons/icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import { AppBar, Toolbar, IconButton, Card, CardContent, CardMedia, Typography, Box, Button, InputBase, Avatar, CardActionArea, CircularProgress} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MailIcon from '@mui/icons-material/Mail';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import SearchIcon from '@mui/icons-material/Search';
import { Autoplay, Grid, Keyboard, Pagination, Scrollbar, Zoom } from 'swiper/modules';
import './Tab1.css';
import { fetchMajors,fetchServices, searchProducts, searchUsers} from '../api.service';
import searchControllerAPI from '../api.users';
import '@fontsource/poppins';
import { CssBaseline, GlobalStyles } from '@mui/material';
import '@fontsource/poppins';  // Import the font
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useHistory } from 'react-router';


const Tab1: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>(''); // State untuk input search
  const [searchTerm, setSearchTerm] = useState(''); // Menyimpan nilai pencarian
  const [searchResults, setSearchResults] = useState<any[]>([]); // State untuk hasil pencarian
  const [isLoading, setIsLoading] = useState<boolean>(false); // State untuk loading indikator
  const [setIsLoggedIn] = useState<boolean>(false);
  const history = useHistory();
  const [categories, setCategories] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const isLoggedIn = !!localStorage.getItem('userToken'); // Misalnya token disimpan di localStorage
  const globalStyles = {
    '*': {
      fontFamily: 'Poppins',
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
    },
    ':root': {
      '--ion-font-family': 'Poppins',
    },
  };
  const theme = createTheme({
    typography: {
      fontFamily: '"Poppins"',  // Set font di tema
    },
  });
  const [userInfo, setUserInfo] = React.useState(() => {
    return JSON.parse(localStorage.getItem('userInfo') || '{}');
  });
  
  const handleMessageButtonClick = () => {
    if (isLoggedIn) {
      history.push('/messages'); // Redirect ke halaman message
    } else {
      history.push('/login'); // Redirect ke halaman login
    }
  };

  const handleNotificationButtonClick = () => {
    if (isLoggedIn) {
      history.push('/notification'); // Redirect ke halaman message
    } else {
      history.push('/login'); // Redirect ke halaman login
    }
};

const handleCartButtonClick = () => {
  if (isLoggedIn) {
    history.push('/cart'); // Redirect ke halaman message
  } else {
    history.push('/login'); // Redirect ke halaman login
  }
};

const handleCategoryClick = (category: string) => {
  // Menavigasi ke halaman Categories dengan data kategori yang dipilih
  history.push({
    pathname: '/categories',
    state: { category }, // Mengirim kategori yang dipilih ke halaman Categories
  });
};

  // Filter kategori berdasarkan nilai pencarian
  const filteredCategories = categories.filter((category) =>
    category.name.toUpperCase().includes(searchTerm.toUpperCase())
  );

interface Category {
  id: string;
  name: string;
  icon: string;
  link: string;
}

const CategoriesComponent = () => {
  const [categories, setCategories] = useState<Category[]>([]); // Specify the type for state
}
  useEffect(() => {
    const getCategories = async () => {
      try {
        console.log("Calling fetchMajors..."); // Log to check if this part runs
        const data: any[] = await fetchMajors(); // Explicitly type the fetched data
        console.log("Fetched data:", data); // Log the fetched data to check it
        const formattedCategories: Category[] = data.map((major: any) => ({
          id: major.idMajor,
          name: major.titleMajor,
          icon: major.iconUrl,
          link: major.link,
        }));
        setCategories(formattedCategories);
      } catch (error) {
        console.error('Error loading categories:', error);
        // Handle errors gracefully (e.g., display an error message)
      }
    };

    getCategories();

    // Populate services with hardcoded data
 
  }, []);
  interface Service{
    id: string;
    name: string;
    icon: string;
    link: string;
  }
  
  const ServicesComponent = () => {
    const [services, setServices] = useState<Service[]>([]); // Specify the type for state
  }
    useEffect(() => {
      const getServices = async () => {
        try {
          console.log("Calling fetchServices..."); // Log to check if this part runs
          const data: any[] = await fetchServices(); // Explicitly type the fetched data
          console.log("Fetched services data:", data); // Log the fetched data to check it
  
          const formattedServices: Service[] = data.map((service: any) => ({
            id: service.idService,
            name: service.titleService,
            icon: service.iconUrl,
            link: service.link,
          }));
  
          setServices(formattedServices); // Update state with formatted services
        } catch (error) {
          console.error('Error loading services:', error);
          // Handle errors gracefully (e.g., display an error message)
        }
      };
  
      getServices(); // Call the function to load services on component mount
    }, []); 

    const handleSearch = async () => {
      if (!searchQuery.trim()) return; // Prevent empty searches
      setIsLoading(true);
  
      try {
        // Call the searchControllerAPI
        const response = await searchControllerAPI(searchQuery);
  
        if (response.success) {
          setSearchResults([
            ...(response.users || []), // Append users if available
            ...(response.products || []), // Append products if available
          ]);
        } else {
          setSearchResults([]); // Clear results on failure
        }
      } catch (error) {
        console.error("Error searching:", error);
        setSearchResults([]); // Clear results on error
      } finally {
        setIsLoading(false);
      }
    };

  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <IonPage>
      <Box
        sx={{
          backgroundColor: '#007bff', // Warna biru
          height: '10vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <AppBar position="fixed" style={{ backgroundColor: 'white', borderBottomLeftRadius: '30px', borderBottomRightRadius: '30px', height: '82px', paddingTop: '25px' }}>
          <Toolbar style={{ height: '100%', alignItems: 'flex-end', paddingBottom: '10px' }}>
            <Box display="flex" alignItems="center" sx={{ width: '100%' }}>
              <img src="../public/SkillXLogo.png" alt="SkillEx Logo" className="logo" style={{ marginRight: 'auto', height: '40px' }} />
              <IconButton color="primary" onClick={handleCartButtonClick}>
                <ShoppingCartIcon />
              </IconButton>
              <IconButton color="primary" onClick={handleNotificationButtonClick}>
                <NotificationsIcon />
              </IconButton>
              <IconButton color="primary" onClick={handleMessageButtonClick}>
                <MailIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>

      <IonContent
        style={{
          backgroundColor: '#007bff', // Biru di luar AppBar
        }}
      >
        <Box
          sx={{
            backgroundColor: '#007bff', // Warna biru
          }}
          >
          <Box 
            display="flex" 
            flexDirection="column" 
            alignItems="center"
            justifyContent="center" 
            sx={{
              backgroundColor: '#007bff',
              color: '#fff',
              padding: '10px 20px',
              borderRadius: '20px',
              margin: '0px 10px',
              textAlign: 'center',
            }}
          >
            <Typography variant="h5" component="h3">
              Hi {userInfo.name}, what are you looking for?
            </Typography>
          </Box>


          <Box sx={{ padding: "16px" }}>
  {/* Search Bar */}
  <Box
    display="flex"
    alignItems="center"
    sx={{
      backgroundColor: "white",
      borderRadius: "10px",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      padding: "5px 10px",
      width: "95%",
      maxWidth: "100%",
      margin: "5px auto",
    }}
  >
    <SearchIcon sx={{ color: "#007bff", marginRight: "10px" }} />
    <InputBase
      placeholder="Search for users or products"
      sx={{ flex: 1, color: "#333" }}
      inputProps={{ "aria-label": "search for users or products" }}
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      onKeyPress={(e) => e.key === "Enter" && handleSearch()} // Trigger on Enter
    />
  </Box>

  {/* Dropdown for Search Results */}
{!isLoading && searchResults.length > 0 && (
  <Box
    sx={{
      position: "relative",
      marginTop: "8px",
      width: "95%",
      maxWidth: "100%",
      margin: "0 auto",
    }}
  >
    <Box
      sx={{
        position: "absolute",
        zIndex: 999,
        backgroundColor: "white",
        borderRadius: "8px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        width: "100%",
      }}
    >
      {searchResults.map((result: any, index: number) => (
        <Button
          key={index}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            textAlign: "left",
            padding: "10px 15px",
            borderBottom: "1px solid #f0f0f0",
            color: "#333",
            "&:hover": {
              backgroundColor: "#f9f9f9",
            },
          }}
          onClick={() => {
      console.log("Result object:", result); // Log the result object
      if (result.id) {
        console.log("Navigating to profileSellerCust with ID:", result.id);
        history.push(`/profileSellerCust/${result.id}`);
      } else if (result.link) {
        console.log("Navigating to product link:", result.link);
        history.push(result.link);
      } else {
        console.warn("No link or ID available for this result");
      }
    }}
        >
          <Box>
            <Typography variant="body1" fontWeight="bold">
              {result.name || result.nameProduct}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {result.email || result.description || "No additional info"}
            </Typography>
          </Box>
          {result.price && (
            <Typography variant="body1" color="primary">
              ${result.price}
            </Typography>
          )}
        </Button>
      ))}
    </Box>
  </Box>
)}

  {/* Loading Indicator */}
  {isLoading && (
    <Typography sx={{ textAlign: "center", marginTop: "10px" }}>
      <CircularProgress size={24} />
      Loading...
    </Typography>
  )}

  {/* No Results Message */}
  {!isLoading && searchResults.length === 0 && searchQuery.trim() && (
    <Typography sx={{ textAlign: "center", marginTop: "10px", color: "#666" }}>
      No results found
    </Typography>
  )}
</Box>

          {/* Categories */}
<Box
  sx={{
    backgroundColor: 'white',
    borderTopLeftRadius: '30px',
    borderBottomLeftRadius: '30px',
    marginLeft: '10px',
    marginTop: '20px',
  }}
>
  <div className="categories">
    {filteredCategories.length > 0 ? (
      <Swiper slidesPerView={3} freeMode={true} spaceBetween={10}>
        {filteredCategories.map((category) => (
          <SwiperSlide key={category.id} style={{ width: 'auto', flexShrink: 0 }}>
            <Card
              sx={{
                width: '100%',
                height: 200,
                margin: '10px',
                borderRadius: '10px',
                border: '1px solid #007bff',
                '&:hover': {
                  backgroundColor: '#f0f0f0',
                  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                  transitionDuration: '0.5ms',
                },
              }}
            >
              <CardActionArea href={`/categories?category=${category.name.toUpperCase()}`} style={{ height: '100%' }}>
                <CardContent
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                  }}
                >
                  <img
                    src={category.icon}
                    alt={category.name}
                    style={{ width: '80px', height: '70px', marginBottom: '30px' }}
                  />
                  <Typography
                    variant="body2"
                    component="div"
                    sx={{ marginTop: '10px', textAlign: 'center' }}
                  >
                    {category.name}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    ) : (
      <p>No categories available.</p>
    )}
  </div>
</Box>
        </Box>
          
        <Box
          sx={{
            backgroundColor: '#FF99D0', // Warna merah muda
            paddingBottom: '20px', // Tambahkan padding bawah agar nyaman
          }}
          >
        <div className="popular-services">
            <Typography
              variant="h6"
              sx={{
                fontFamily: 'Poppins, sans-serif', // Font Poppins
                fontWeight: 900, // Tebal
                color: 'white', // Warna putih
                fontSize: '20px', // Ukuran font
                textAlign: 'left', // Rata tengah
                marginLeft: 1
              }}
            >
              Popular Services
        </Typography>
            <Swiper slidesPerView={3} freeMode={true} spaceBetween={10}>
              {services.map((service) => (
                <SwiperSlide key={service.id} style={{ width: 'auto', flexShrink: 0 }}>
                  <Card sx={{ width: '100%', height: 200, margin: '10px', borderRadius: '10px',  }}>
                    <CardActionArea href={service.link} style={{ height: '100%' }}>
                      <CardContent
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          height: '100%',
                          backgroundColor: '#FFB3E0', // Warna pink untuk kartu
                          '&:hover': {
                            backgroundColor: '#ff7cb7', // Warna latar belakang berubah saat hover
                            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', // Efek bayangan saat hover
                          },
                        }}
                      >
                          <img src={service.icon} alt={service.name} style={{ width: '80px', height: '70px', marginBottom: '30px' }} />
                          <Typography variant="body2" component="div" sx={{ marginTop: '10px', textAlign: 'center', color:'white', 
                            fontWeight: 600, fontFamily: 'Inter, sans-serif' }}>
                          {service.name}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </Box>
          

        <div className="promotion-card">
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 2 }}>
            <Card
              sx={{
                width: '100%',
                maxWidth: '100%',
                backgroundColor: '#FFD600',
                borderRadius: '15px',
                boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                alignItems: 'center',
                height: 'auto', // Tinggi kartu lebih rendah
              }}
            >
              {/* Emoticon di sebelah kiri */}
              <CardMedia
                component="span"
                sx={{
                  fontSize: '80px', // Ukuran lebih besar
                  marginLeft: '20px', // Jarak dari sisi kiri
                  flexShrink: 0, // Memastikan ukurannya tetap
                }}
              >
                👋
              </CardMedia>

              {/* Konten di sebelah kanan */}
              <CardContent
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  padding: '10px 20px',
                  textAlign: 'left',
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 900,
                    fontSize: '14px',
                    color: '#807450',
                    marginBottom: '0px',
                    marginTop: '5px'
                  }}
                >
                  Become a Part of Our Team
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: '12px',
                    color: '#807450',
                    marginBottom: '8px',
                  }}
                >
                  Enhance your skills, unlock more opportunities
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    fontSize: '20px',
                    color: '#0094FF',
                    marginBottom: '10px',
                  }}
                >
                  Professional Freelancer
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: '#FFFFFF',
                    color: '#397BAA',
                    borderRadius: '30px',
                    padding: '8px 16px',
                    fontWeight: 800,
                    textTransform: 'none',
                    fontSize: '10px',
                    alignSelf: 'start', // Tombol rata kiri
                    '&:hover': {
                      backgroundColor: '#FFFFFF',
                    },
                  }}
                >
                  REGISTER NOW
                </Button>
              </CardContent>
            </Card>
          </Box>
        </div>
      </IonContent>
    </IonPage>
    </ThemeProvider>
  );
};

export default Tab1;