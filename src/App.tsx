import { Route, Redirect, useLocation } from 'react-router-dom';

import { useParams } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle } from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';
import Tab4 from './pages/Tab4';
import Wishlist from './pages/wishlist';
import FollowingSeller from './pages/followingSeller';
import Review from './pages/review';

import LoginPage from './pages/Login';
import RegisterPage from './pages/RegisterPage';
import LogoutPage from './pages/LogoutPage';
import MessagePage from './pages/message';
import NotificationPage from './pages/notification';
import CartPage from './pages/cart';
import PaymentPage from './pages/payment';
import '@ionic/react/css/core.css';

// ROUTE UNTUK JURUSAN
import ComputerScience from './pages/category/computer-science';
import VisualCommunicationDesign from './pages/category/vcd';
import InteriorDesign from './pages/category/interior-design';
import DigitalBusinessInnovation from './pages/category/dbi';
import InteractiveDesignTechnology from './pages/category/idt';
import PublicRelation from './pages/category/public-relation';
import Communication from './pages/category/communication';
import EntreprenurhsipBusinessCreation from './pages/category/ebc';
import Categories from './pages/category/categories';

// ROUTE UNTUK SERVICES
import WebsiteDevelopment from './pages/services/websiteDevelopment';

// ROUTE UNTUK DETAILED SERVICE
import DetailProduct from './pages/detail_services/detail_product';

import ChatRoom from './pages/chatRoom';

import PrivateRoute from './components/PrivateRoute'; // Import the private route
import { createTheme, ThemeProvider } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home'; 
import VerifiedIcon from '@mui/icons-material/Verified';
import ListAltIcon from '@mui/icons-material/ListAlt';
import '@fontsource/poppins';  // Import the font

import sellerApproval from './admin/sellerApproval';
import majorManagement from './admin/majorManagement';
import serviceManagement from './admin/serviceManagement';
import skillManagement from './admin/skillManagement';
import reviewManagement from './admin/reviewManagement';
import userMonitoring from './admin/userMonitoring';
import transactionMonitoring from './admin/transactionMonitoring';
import subscription from './admin/subscription';
import reportManagement from './admin/reportManagement';
import helpAndSupport from './admin/helpAndSupport';


import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import { CssBaseline, GlobalStyles } from '@mui/material';
import { VerifiedOutlined } from '@mui/icons-material';
import JoinAsSeller from './pages/JoinAsSeller';
import JoinAsSellerWait from './pages/JoinSellerWait';
import profileSeller from './sellerrrrrr/profileSeller';
import EditProfileModal from './sellerrrrrr/EditProfileModal';
import EditAboutMe from './sellerrrrrr/EditAboutMe';
import EditPortoModal from './sellerrrrrr/EditPortoModal';
import EditProductModal from './sellerrrrrr/EditProductModal';

import AddProduct from './sellerrrrrr/AddProduct';
import AddSkill from './sellerrrrrr/AddSkill';
import AddPortoModal from './sellerrrrrr/AddPortoModal';
import SearchPage from './pages/search'

import profileSellerCust from './pages/profileSellerCust';

import DetailTransactionProgress from './sellerrrrrr/DetailTransactionProgress';
import ModalAddMajor from './admin/modalAddMajor';
import modalUpdateMajor from './admin/modalUpdateMajor';
import ProfileSeller from './pages/profileSellerCust';
import ProfileSellerCust from './pages/profileSellerCust';

type RouteParams = {
  id: string;
};

setupIonicReact();
const theme = createTheme({
  typography: {
    fontFamily: '"Poppins", sans-serif',
  },
});

const App: React.FC = () => {
  //const { user } = useAuth(); // Contoh auth check
  //const isAdmin = user?.role === 'admin';

  
  // Define the routes where tabs should appear
  const routesWithTabs = ['/tab1', '/tab2', '/tab3', '/tab4', '/profileSeller'];

  // Show tabs only on certain paths, and also make sure it's not an admin path
  const showTabs = routesWithTabs.includes(location.pathname) ;

  return (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <GlobalStyles
      styles={{
        body: {
          fontFamily: '"Poppins", sans-serif',
        },
      }}
    />
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
        
        <Route path="/sellerApproval" component={sellerApproval}/>
        <Route path="/majorManagement" component={majorManagement}/>
        <Route path="/serviceManagement" component={serviceManagement}/>
        <Route path="/skillManagement" component={skillManagement}/>
        <Route path="/reviewManagement" component={reviewManagement}/>
        <Route path="/userMonitoring"  component={userMonitoring}/>
        <Route path="/transactionMonitoring"  component={transactionMonitoring}/>
        <Route path="/subscription"  component={subscription}/>
        <Route path="/reportManagement"  component={reportManagement}/>
        <Route path="/helpAndSupport"  component={helpAndSupport}/>
        <Route path="/modalAddMajor"  component={ModalAddMajor}/>
        <Route path="/modalEditMajor"  component={modalUpdateMajor}/>


          <Route exact path="/login">
            <LoginPage />
          </Route>
          <Route path="/register">
            <RegisterPage />
          </Route>
          
          <Route exact path="/tab1">
            <Tab1 />
          </Route>
          <Route exact path="/tab2">
            <Tab2 />
          </Route>
          <Route path="/tab3">
            <Tab3 />
          </Route>
          <Route path="/cart">
            <CartPage/>
          </Route>
          <Route path="/payment">
            <PaymentPage/>
          </Route>

          <Route path="/categories">
            <Categories/>
          </Route>

          <Route path="/service/website-development"> 
            <WebsiteDevelopment/>
          </Route>

          <Route path="/:username/:productName" component={DetailProduct} />
        <Route path="/profile-seller" component={ProfileSeller} />
        {/* Tambahkan route lain di sini */}

          {/* Route untuk Detailed Service*/}
          <Route path="/service/detail-product"> 
            <DetailProduct/>
          </Route>
          <Route path="/notification" component={NotificationPage} exact/>

          <Route path="/tab4" exact><Tab4 /></Route>
          <Route path="/logout" component={LogoutPage} exact />
          <Route path="/wishlist" component={Wishlist} />
          <Route path="/followingseller" component={FollowingSeller} />
          <Route path="/review" component={Review} />
          <Route path="/JoinAsSeller" component={JoinAsSeller}/>
          <Route path="/JoinAsSellerWait" component={JoinAsSellerWait}/>
          <Route path="/profileSeller" component={profileSeller}/>
          <Route path="/EditProfileModal" component={EditProfileModal}/>
          <Route path="/EditAboutMe" component={EditAboutMe}/>
          <Route path="/EditPortoModal" component={EditPortoModal}/>
          <Route path="/AddProduct" component={AddProduct}/>
          <Route path="/AddSkill" component={AddSkill}/>
          <Route path="/AddPortoModal" component={AddPortoModal}/>
          <Route path="/search" component={SearchPage}/>
          <Route path="/EditProductModal" component={EditProductModal}/>

          <Route path="/DetailTransactionProgress" component={DetailTransactionProgress}/>
          <Route path="/profileSellerCust" component={profileSellerCust}/>

         {/* Redirect root to messages */}
         <Route exact path="/">
                    <Redirect to="/messages" />
                </Route>

                {/* Route for MessagePage */}
                <Route exact path="/messages">
                    <MessagePage />
                </Route>

                {/* Route for ChatRoom */}
                <Route
                    exact
                    path="/chat/:conversationID"
                    render={(props) => {
                        const { conversationID } = props.match.params;
                        const state = props.location.state as {
                            userName: string;
                            profileImage: string;
                            initialMessages: any[];
                        } || {
                            userName: 'Unknown',
                            profileImage: '',
                            initialMessages: [],
                        };

                        return (
                            <ChatRoom
                                conversationID={conversationID}
                                userName={state.userName}
                                profileImage={state.profileImage}
                                initialMessages={state.initialMessages}
                            />
                        );
                    }}
                />

              {/* Route for ProfileSellerCust */}
              <Route
                exact
                path="/profileSellerCust/:id"
                render={(props) => {
                  const { id } = props.match.params;
                  console.log("Dynamic route accessed with ID:", id); // Log the ID from the URL
                  return <ProfileSellerCust id={id} {...props} />;
                }}
              />
              


          <Route exact path="/">
            <Redirect to="/login" />
          </Route>

        </IonRouterOutlet>

        {showTabs && (
        <IonTabBar slot="bottom">
          <IonTabButton tab="tab1" href="/tab1">
            <div style={{ fontSize: 30 }}>
              <HomeIcon />
            </div>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/tab2">
          <div style={{ fontSize: 30 }}>
              <VerifiedIcon />
            </div>
          </IonTabButton>
          <IonTabButton tab="tab3" href="/tab3">
          <div style={{ fontSize: 30 }}>
              <ListAltIcon />
            </div>
          </IonTabButton>
          <IonTabButton tab="tab4" href="/tab4">
            <div style={{ fontSize: 30 }}>
              <AccountCircleIcon />
            </div>
          </IonTabButton>
        </IonTabBar>
        )}
      </IonTabs>
    </IonReactRouter>
  </ThemeProvider>
  );
};

export default App;
