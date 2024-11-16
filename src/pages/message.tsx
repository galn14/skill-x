import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box, Button, Menu, MenuItem, ListItemIcon, Tab, Tabs, Card, CardContent, Avatar, TextField, Rating } from '@mui/material';
import { IonPage, IonContent } from '@ionic/react';
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

const MessagePage: React.FC = () => {
    const history = useHistory();
    const handleBack = () => history.goBack();
    const [anchorElSeller, setAnchorElSeller] = React.useState<null | HTMLElement>(null);
    const [anchorElBuyer, setAnchorElBuyer] = React.useState<null | HTMLElement>(null);

    const openSeller = Boolean(anchorElSeller);
    const openBuyer = Boolean(anchorElBuyer);

    const handleClickSeller = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElSeller(anchorElSeller ? null : event.currentTarget);
    };

    const handleClickBuyer = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElBuyer(anchorElBuyer ? null : event.currentTarget);
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
                            height:'5vh',
                            maxWidth: '100%',
                            padding: '5px 16px',
                            marginTop: '10px'
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
                                margin: 0,
                                left: 0, // Memastikan posisi mulai dari kiri layar
                                right: 0, // Memastikan posisi sampai ke kanan layar
                                position: 'absolute', // Mengunci menu pada layar
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
                                    margin: 0
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
                            marginTop: openSeller ? '205px' : '5px', // Dynamic margin based on Seller dropdown state
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
                                width: '100%',
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
                        {/* Empty dropdown items for Buyer */}
                        <MenuItem disabled style={{ justifyContent: 'center', padding: '16px' }}>
                            No buyers available
                        </MenuItem>
                    </Menu>
                </Box>
            </IonContent>
        </IonPage>
    );
};

export default MessagePage;
