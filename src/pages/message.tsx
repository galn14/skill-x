import React from 'react';
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Box,
    Button,
    Menu,
    MenuItem,
    Grid,
    Card,
    CardContent,
    TextField,
} from '@mui/material';
import StarRatings from 'react-star-ratings';
import {
    IonPage,
    IonContent,
} from '@ionic/react';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MailIcon from '@mui/icons-material/Mail';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ChatIcon from '@mui/icons-material/Chat';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useHistory } from 'react-router-dom';

const sellers = [
    {
        id: 1,
        name: 'AileenLiexiuai',
        slogan: 'Interested in creating a portfolio website',
        profileImage: 'https://ionicframework.com/docs/img/demos/thumbnail.svg',
        unreadMessages: 3,
    },
    {
        id: 2,
        name: 'Gelion',
        slogan: 'Place your photos order with me!',
        profileImage: 'https://ionicframework.com/docs/img/demos/thumbnail.svg',
        unreadMessages: 5,
    },
    {
        id: 3,
        name: 'Ananta',
        slogan: 'Need a powerpoint fast? Let me handle it for you!',
        profileImage: 'https://ionicframework.com/docs/img/demos/thumbnail.svg',
        unreadMessages: 2,
    },
];

const buyers = [
    {
        id: 1,
        name: 'John Doe',
        slogan: 'I want to place a bulk order.',
        profileImage: 'https://ionicframework.com/docs/img/demos/thumbnail.svg',
        unreadMessages: 4,
    },
    {
        id: 2,
        name: 'Jane Smith',
        slogan: 'Let’s discuss further about your offer.',
        profileImage: 'https://ionicframework.com/docs/img/demos/thumbnail.svg',
        unreadMessages: 1,
    },
];

const reviews = [
    {
        id: 1,
        reviewer: 'Alice Johnson',
        comment: 'Excellent service, highly recommend!',
        rating: 5,
    },
    {
        id: 2,
        reviewer: 'Bob Smith',
        comment: 'Very responsive and delivered on time.',
        rating: 4,
    },
    {
        id: 3,
        reviewer: 'Charlie Brown',
        comment: 'Good quality work, will use again!',
        rating: 5,
    },
];

const MessagePage: React.FC = () => {
    const history = useHistory();
    const handleBack = () => history.goBack();
    const [anchorElSeller, setAnchorElSeller] = React.useState<null | HTMLElement>(null);
    const [anchorElBuyer, setAnchorElBuyer] = React.useState<null | HTMLElement>(null);
    const [anchorElReview, setAnchorElReview] = React.useState<null | HTMLElement>(null);

    const openReview = Boolean(anchorElReview);
    const openSeller = Boolean(anchorElSeller);
    const openBuyer = Boolean(anchorElBuyer);

    const handleClickSeller = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElSeller(anchorElSeller ? null : event.currentTarget);
    };

    const handleClickBuyer = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElBuyer(anchorElBuyer ? null : event.currentTarget);
    };

    const handleClickReview = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElReview(anchorElReview ? null : event.currentTarget);
    };

    const handleClose = () => {
        setAnchorElSeller(null);
        setAnchorElBuyer(null);
    };

    return (
        <IonPage>
            {/* AppBar for header */}
            <AppBar
                position="fixed"
                style={{
                    backgroundColor: 'white',
                    borderBottomLeftRadius: '30px',
                    borderBottomRightRadius: '30px',
                    height: '82px',
                    paddingTop: '25px',
                }}
            >
                <Toolbar
                    style={{
                        height: '100%',
                        display: 'flex',
                        alignItems: 'flex-end',
                        paddingBottom: '10px',
                    }}
                >
                    <Box display="flex" alignItems="center" sx={{ width: '100%' }}>
                        <IconButton onClick={handleBack} color="primary">
                            <ArrowBackIcon />
                        </IconButton>
                        <Typography
                            variant="h6"
                            component="div"
                            color='black'
                            fontSize='16px'
                            style={{
                                fontWeight: 200,
                                marginRight: 'auto',
                                paddingLeft: '16px',
                            }}
                        >
                            Messages
                        </Typography>
                        <IconButton color="primary">
                            <ShoppingCartIcon />
                        </IconButton>
                        <IconButton color="primary">
                            <NotificationsIcon />
                        </IconButton>
                        <IconButton color="primary">
                            <MailIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* IonContent for page content */}
            <IonContent style={{ padding: '0', backgroundColor: '#0094FF' }}>
                <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" marginTop="80px">
                    {/* Button for Chat with the Seller */}
                    <Button
                        variant="contained"
                        onClick={handleClickSeller}
                        style={{
                            backgroundColor: '#0094FF',
                            color: 'white',
                            textTransform: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            borderRadius: '5px',
                            width: '100vw',
                            height: '5vh',
                            maxWidth: '100%',
                            padding: '5px 16px',
                            marginTop: '10px',
                        }}
                    >
                        <Box display="flex" alignItems="center">
                            <ChatIcon style={{ marginRight: '8px' }} />
                            Chat with the Seller
                        </Box>
                        <ArrowDropDownIcon />
                    </Button>

                    {/* Dropdown menu for "Chat with the Seller" */}
                    <Menu
                        anchorEl={anchorElSeller}
                        open={openSeller}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'dropdown-button-seller',
                        }}
                        PaperProps={{
                            style: {
                                width: '100vw',
                                backgroundColor: '#FFFFFF',
                                color: 'black',
                                borderRadius: '8px',
                                padding: 0,
                            },
                        }}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                    >
                        {sellers.map((seller, index) => (
                            <MenuItem
                                key={index}
                                onClick={handleClose}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    height: '62px',
                                    width: '100%',
                                    padding: '8px 16px',
                                    backgroundColor: 'white',
                                    borderBottom: index === sellers.length - 1 ? 'none' : '1px solid #E0E0E0',
                                    margin: 0,
                                }}
                            >
                                <Box
                                    component="img"
                                    src={seller.profileImage}
                                    alt={seller.name}
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '50%',
                                        marginRight: '12px',
                                    }}
                                />
                                <Box style={{ flexGrow: 1 }}>
                                    <Box style={{
                                        fontWeight: 600,
                                        fontSize: '14px',
                                        color: '#000',
                                        marginBottom: '4px',
                                    }}>
                                        {seller.name}
                                    </Box>
                                    <Box style={{
                                        fontSize: '9px',
                                        color: '#666',
                                        wordWrap: 'break-word',
                                        lineHeight: '14px',
                                    }}>
                                        {seller.slogan}
                                    </Box>
                                </Box>
                                <Box
                                    style={{
                                        backgroundColor: '#0094FF',
                                        color: 'white',
                                        borderRadius: '50%',
                                        width: '24px',
                                        height: '24px',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        fontSize: '12px',
                                        fontWeight: 600,
                                    }}
                                >
                                    {seller.unreadMessages}
                                </Box>
                            </MenuItem>
                        ))}
                    </Menu>

                    {/* Button for Chat with the Buyer */}
                    <Button
                        variant="contained"
                        onClick={handleClickBuyer}
                        style={{
                            backgroundColor: '#0094FF',
                            color: 'white',
                            textTransform: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            borderRadius: '5px',
                            width: '100vw',
                            height: '5vh',
                            maxWidth: '100%',
                            padding: '5px 16px',
                            marginTop: openSeller ? `${62 * sellers.length + 16}px` : '10px', // Dinamis berdasarkan seller
                        }}
                    >
                        <Box display="flex" alignItems="center">
                            <ChatIcon style={{ marginRight: '8px' }} />
                            Chat with the Buyer
                        </Box>
                        <ArrowDropDownIcon />
                    </Button>

                    {/* Dropdown menu for "Chat with the Buyer" */}
                    <Menu
                        anchorEl={anchorElBuyer}
                        open={openBuyer}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'dropdown-button-buyer',
                        }}
                        PaperProps={{
                            style: {
                                width: '100vw',
                                backgroundColor: '#FFFFFF',
                                color: 'black',
                                borderRadius: '8px',
                                padding: 0,
                            },
                        }}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                    >
                        {buyers.map((buyer, index) => (
                            <MenuItem
                                key={index}
                                onClick={handleClose}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    height: '62px',
                                    width: '100%',
                                    padding: '8px 16px',
                                    backgroundColor: 'white',
                                    borderBottom: index === buyers.length - 1 ? 'none' : '1px solid #E0E0E0',
                                    margin: 0,
                                }}
                            >
                                <Box
                                    component="img"
                                    src={buyer.profileImage}
                                    alt={buyer.name}
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '50%',
                                        marginRight: '12px',
                                    }}
                                />
                                <Box style={{ flexGrow: 1 }}>
                                    <Box style={{
                                        fontWeight: 600,
                                        fontSize: '14px',
                                        color: '#000',
                                        marginBottom: '4px',
                                    }}>
                                        {buyer.name}
                                    </Box>
                                    <Box style={{
                                        fontSize: '9px',
                                        color: '#666',
                                        wordWrap: 'break-word',
                                        lineHeight: '14px',
                                    }}>
                                        {buyer.slogan}
                                    </Box>
                                </Box>
                                <Box
                                    style={{
                                        backgroundColor: '#0094FF',
                                        color: 'white',
                                        borderRadius: '50%',
                                        width: '24px',
                                        height: '24px',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        fontSize: '12px',
                                        fontWeight: 600,
                                    }}
                                >
                                    {buyer.unreadMessages}
                                </Box>
                            </MenuItem>
                        ))}
                    </Menu>

                    {/* Button for Review */}
                    <Button
                        variant="contained"
                        onClick={handleClickReview}
                        style={{
                            backgroundColor: '#0094FF',
                            color: 'white',
                            textTransform: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            borderRadius: '5px',
                            width: '100vw',
                            height: '5vh',
                            maxWidth: '100%',
                            padding: '5px 16px',
                            marginTop: openBuyer ? `${62 * buyers.length + 16}px` : '10px', // Dinamis berdasarkan seller
                        }}
                    >
                        <Box display="flex" alignItems="center">
                            <ChatIcon style={{ marginRight: '8px' }} />
                            Review
                        </Box>
                        <ArrowDropDownIcon />
                    </Button>

                    {/* Toggling review content */}
      {openReview && (
        <Grid container spacing={2} style={{ marginTop: '16px', padding: '16px', maxWidth: '100%' }}>
          {reviews.map((review, index) => (
            <Grid
              key={review.id}
              item
              xs={12}
              md={6}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Card
                style={{
                  maxWidth: '95%',
                  width: '95%',
                  margin: '20px auto',
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                  borderRadius: '15px',
                  border: '1px solid #000', // Border for card header
                }}
              >
                {/* Card Header with Image, Title, and Seller Name */}
                <CardContent style={{ padding: '16px' }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <img
                        src="https://ionicframework.com/docs/img/demos/thumbnail.svg//" // Gambar untuk di sebelah kiri
                        alt="Reviewer"
                        style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                      />
                    </Grid>
                    <Grid item xs>
                      <Typography
                        variant="h6"
                        style={{
                          fontWeight: 600,
                          fontSize: '16px',
                          color: '#000',
                          marginBottom: '4px',
                        }}
                      >
                        Judul {/* Judul */}
                      </Typography>
                      <Typography
                        variant="body2"
                        style={{
                          fontSize: '14px',
                          color: '#666',
                        }}
                      >
                        Seller: AileenLiexuai {/* Nama Seller */}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>

                {/* Card Content */}
                <CardContent style={{ padding: '16px', borderTop:'1px solid black' }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <img
                        src="https://ionicframework.com/docs/img/demos/thumbnail.svg" // Gambar konten di sebelah kiri
                        alt="Content"
                        style={{ width: '80px', height: '80px', borderRadius: '8px' }}
                      />
                    </Grid>
                    <Grid item xs>
                      <Typography
                        variant="body1"
                        style={{
                          fontWeight: 600,
                          fontSize: '14px',
                          color: '#000',
                          marginBottom: '8px',
                        }}
                      >
                        Package Portfolio Website {/* Judul Konten */}
                      </Typography>
                      <Typography
                        variant="body2"
                        style={{
                          fontSize: '12px',
                          color: '#666',
                          textAlign: 'justify',
                        }}
                      >
                        Oke {/* Deskripsi konten */}
                      </Typography>

                      {/* Rating UI */}
                      <Box style={{ marginTop: '8px' }}>
                        <StarRatings
                          rating={review.rating} // Rating dalam angka
                          starRatedColor="#FF9500"
                          starEmptyColor="#D8D8D8"
                          numberOfStars={5}
                          name="rating"
                          starDimension="18px"
                          starSpacing="2px"
                        />
                      </Box>

                      {/* Leave a review section */}
                      <Typography
                        variant="body2"
                        style={{
                          fontSize: '12px',
                          color: '#333',
                          marginTop: '8px',
                          fontWeight: 600,
                        }}
                      >
                        Leave a review for your purchase
                      </Typography>
                      <TextField
                        placeholder="Let us know what you think!"
                        multiline
                        rows={4}
                        variant="outlined"
                        fullWidth
                        style={{
                          marginTop: '8px',
                          backgroundColor: '#f9f9f9',
                          borderRadius: '8px',
                        }}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
                </Box>
            </IonContent>
        </IonPage>
    );
};

export default MessagePage;
