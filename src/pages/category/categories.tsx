import { IonContent, IonHeader, IonPage, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonItem, IonLabel, IonIcon, IonList } from '@ionic/react';
import { AppBar, Toolbar, IconButton, Box, Typography } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useHistory } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

// Definisikan tipe untuk subkategori, layanan, dan kategori
interface Subcategory {
  name: string;
  link: string;
}

interface Service {
  id: number;
  icon: string;
  title: string;
  subcategories: Subcategory[];
}

interface Category {
  categoryName: string;
  services: Service[];
}

const Categories: React.FC = () => {
  const [isModalOpen] = useState(false);
  const history = useHistory();
  const isLoggedIn = !!localStorage.getItem('userToken'); // Misalnya token disimpan di localStorage
  const handleBack = () => history.goBack();
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const location = useLocation();
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]); // Tipe data untuk kategori yang difilter
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const queryParams = new URLSearchParams(location.search);
  const categoryFromUrl = queryParams.get('category');

  const toggleCard = (id: number) => {
    setExpandedCard((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [categoryFromUrl]);

  const categories: Category[] = [
    {
      categoryName: 'Computer Science',
      services: [
        {
          id: 1,
          icon: '🌐',
          title: 'Websites',
          subcategories: [
            { name: 'Websites Development', link: '/service/website-development' },
            { name: 'Website Maintenance', link: '/service/website-maintenance' },
            { name: 'Custom Website', link: '/service/custom-website' },
          ],
        },
        {
          id: 2,
          icon: '📱',
          title: 'Application Development',
          subcategories: [
            { name: 'Mobile Apps', link: '/service/mobile-apps' },
            { name: 'Progressive Web Apps', link: '/service/progressive-web-apps' },
            { name: 'Cross-Platform', link: '/service/cross-platform' },
          ],
        },
        {
            id: 3,
            icon: '🔍',
            title: 'Software Development',
            subcategories: [
              { name: 'Custom Software', link: '/service/custom-software' },
              { name: 'Enterprise Solutions', link: '/service/enterprise-solutions' },
              { name: 'Desktop Apps', link: '/service/desktop-apps' },
            ],
          },
          {
            id: 4,
            icon: '🛡️',
            title: 'Support & Cybersecurity',
            subcategories: [
              { name: 'Network Security', link: '/service/network-security' },
              { name: 'System Maintenance', link: '/service/system-maintenance' },
              { name: 'Cloud Security', link: '/service/cloud-security' },
            ],
          },
      ],
    },
    {
      categoryName: 'Visual Communication Design',
      services: [
        {
            id: 5,
            icon: '🌐',
            title: 'Logo Design',
            subcategories: [
              { name: 'Brand Logo Design', link: '/service/brand-logo-design' },
              { name: 'Business Logo Design', link: '/service/business-logo-design' },
              { name: 'Event Logo Design', link: '/service/event-logo-design' },
            ],
          },
          {
            id: 6,
            icon: '📱',
            title: 'Graphic Design',
            subcategories: [
              { name: 'Social Media Graphics', link: '/service/social-media-graphics' },
              { name: 'Print Media Design (flyers, brochures)', link: '/service/print-media-design' },
              { name: 'Infographics', link: '/service/infographics' },
            ],
          },
          {
            id: 7,
            icon: '🔍',
            title: 'Video Editing',
            subcategories: [
              { name: 'Promotional Video Editing', link: '/service/promotional-video-editing' },
              { name: 'Social Media Video Editing', link: '/service/social-media-video-editing' },
              { name: 'Corporate Video Editing', link: '/service/corporate-video-editing' },
            ],
          },
          {
            id: 8,
            icon: '🛡️',
            title: 'UI/UX Design',
            subcategories: [
              { name: 'Website Design', link: '/service/website-design' },
              { name: 'Mobile Apps Design', link: '/service/mobile-apps-design' },
              { name: 'Interactive Prototyping', link: '/service/interactive-prototyping' },
            ],
          },
      ],
    },
    {
        categoryName: 'Design Interior',
        services: [
            {
                id: 1,
                icon: '🌐',
                title: 'Residential Interior Design',
                subcategories: [
                  { name: 'Living Room Design', link: '/service/living-room-design' },
                  { name: 'Kitchen & Dining Design', link: '/service/kitchen-dining-design' },
                  { name: 'Bedroom Design', link: '/service/bedroom-design' },
                ],
              },
              {
                id: 2,
                icon: '📱',
                title: 'Commercial Interior Design',
                subcategories: [
                  { name: 'Office Design', link: '/service/office-design' },
                  { name: 'Retail Store Design', link: '/service/retail-store-design' },
                  { name: 'Restaurant & Cafe Design', link: '/service/restaurant-cafe-design' },
                ],
              },
              {
                id: 3,
                icon: '🔍',
                title: '3D Visualization & Rendering',
                subcategories: [
                  { name: 'Interior Rendering', link: '/service/interior-rendering' },
                  { name: 'Floor Plans and Layouts', link: '/service/floor-plans-layouts' },
                  { name: 'Virtual Walkthroughs', link: '/service/virtual-walkthroughs' },
                ],
              },
              {
                id: 4,
                icon: '🛡️',
                title: 'Build Prototype for Interior Design',
                subcategories: [
                  { name: 'Furniture Prototyping', link: '/service/furniture-prototyping' },
                  { name: 'Display/Store Design Prototyping', link: '/service/display-store-prototyping' },
                  { name: 'Room Layout Prototyping', link: '/service/room-layout-prototyping' },
                ],
              },
        ],
      },
  ];

  useEffect(() => {
    if (selectedCategory) {
      const filtered = categories.filter(
        (category) => category.categoryName.toUpperCase() === selectedCategory.toUpperCase()
      );
      setFilteredCategories(filtered);
    } else {
      setFilteredCategories(categories);
    }
  }, [selectedCategory]);

  const handleServiceClick = (link: string) => {
    if (isLoggedIn) {
      history.push(link);
    } else {
      history.push('/login');
    }
  };

  return (
    <IonPage>
      <AppBar position="fixed" style={{ backgroundColor: 'white', borderBottomLeftRadius: '30px', borderBottomRightRadius: '30px', height: '82px', paddingTop: '25px' }}>
        <Toolbar style={{ height: '100%', alignItems: 'flex-end', paddingBottom: '10px' }}>
          <Box display="flex" alignItems="center" sx={{ width: '100%' }}>
            <IconButton onClick={handleBack} color="primary">
              <ArrowBackIcon />
            </IconButton>
            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', width: '80%', border: '1px solid #ABABAB', borderRadius: '15px', padding: '5px', height: '40px' }}>
                <IconButton color="primary" sx={{ padding: '0', marginRight: '2px' }}>
                  <SearchIcon />
                </IconButton>
                <Typography sx={{ flex: 1, color: '#333', padding: '10px', fontSize: '11px' }}>Search</Typography>
              </Box>
            </Box>
            <IconButton color="primary">
              <ShoppingCartIcon />
            </IconButton>
            <IconButton color="primary">
              <MailIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <IonContent fullscreen>
        <Box sx={{ padding: '10px', marginTop: '90px' }}>
          <Box sx={{ backgroundColor: '#0094FF', borderRadius: '20px', padding: '15px', marginBottom: '20px' }}>
            <Typography variant="h6" sx={{ fontSize: '18px', fontWeight: 'bold', color: '#fff' }}>
              {selectedCategory || 'All Categories'}
            </Typography>
            <Typography variant="body2" sx={{ color: '#fff', fontSize: '14px', marginTop: '5px' }}>
              Find any opportunities in related major!
            </Typography>
          </Box>
        </Box>

        <IonList>
          {filteredCategories.map((category, catIndex) => (
            <Box key={catIndex} sx={{ marginBottom: '20px' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
                {category.categoryName}
              </Typography>
              {category.services.map((service: Service) => (
                <IonCard key={service.id} style={{ marginBottom: '20px' }}>
                  <IonCardHeader onClick={() => toggleCard(service.id)} style={{ cursor: 'pointer' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box sx={{
                        backgroundColor: '#FF4081',
                        color: '#fff',
                        width: '80px',
                        height: '40px',
                        borderRadius: '10px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontSize: '40px',
                        marginRight: '15px',
                      }}>
                        {service.icon}
                      </Box>
                      <Typography variant="h6" sx={{ flex: 1 }}>
                        {service.title}
                      </Typography>
                      <IconButton>
                        {expandedCard === service.id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                      </IconButton>
                    </Box>
                  </IonCardHeader>
                  {expandedCard === service.id && (
                    <IonCardContent>
                      {service.subcategories.map((subcategory: Subcategory, index: number) => (
                        <IonItem key={index} button onClick={() => handleServiceClick(subcategory.link)}>
                          <IonLabel>{subcategory.name}</IonLabel>
                        </IonItem>
                      ))}
                    </IonCardContent>
                  )}
                </IonCard>
              ))}
            </Box>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Categories;
