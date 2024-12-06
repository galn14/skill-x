import { Redirect, Route } from 'react-router-dom';
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

// ROUTE UNTUK SERVICES
import WebsiteDevelopment from './pages/services/websiteDevelopment';

// ROUTE UNTUK DETAILED SERVICE
import FullstackDevelopment from './pages/detail_services/websiteDevelopment/fullstackDevelopment';

import ChatRoom from './pages/chatRoom';

import PrivateRoute from './components/PrivateRoute'; // Import the private route
import { createTheme, ThemeProvider } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home'; 
import VerifiedIcon from '@mui/icons-material/Verified';
import ListAltIcon from '@mui/icons-material/ListAlt';
import '@fontsource/poppins';  // Import the font

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
import AddProduct from './sellerrrrrr/AddProduct';
import AddSkill from './sellerrrrrr/AddSkill';
import AddPortoModal from './sellerrrrrr/AddPortoModal';
import AddProductSubscribed from './sellerrrrrr/AddProductSubscribed';
import DetailTransactionProgress from './sellerrrrrr/DetailTransactionProgress';

type RouteParams = {
  id: string;
};

setupIonicReact();
const theme = createTheme({
  typography: {
    fontFamily: '"Poppins", sans-serif',
  },
});

const App: React.FC = () => (
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
          <Route path="/category/computer-science"> 
            <ComputerScience/>
          </Route>
          <Route path="/category/visual-communication-design"> 
            <VisualCommunicationDesign/>
          </Route>
          <Route path="/category/interior-design"> 
            <InteriorDesign/>
          </Route>
          <Route path="/category/digital-business-innovation"> 
            <DigitalBusinessInnovation/>
          </Route>
          <Route path="/category/interactive-design-and-technology"> 
            <InteractiveDesignTechnology/>
          </Route>
          <Route path="/category/public-relation"> 
            <PublicRelation/>
          </Route>
          <Route path="/category/communication"> 
            <Communication/>
          </Route>
          <Route path="/category/entrepenurship-business-creation"> 
            <EntreprenurhsipBusinessCreation/>
          </Route>

          <Route path="/service/website-development"> 
            <WebsiteDevelopment/>
          </Route>

          {/* Route untuk Detailed Service*/}
          <Route path="/service/Full Stack Development"> 
            <FullstackDevelopment/>
          </Route>

          <Route path="/message" component={MessagePage} exact />
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
          <Route path="/AddProductSubscribed" component={AddProductSubscribed}/>
          <Route path="/DetailTransactionProgress" component={DetailTransactionProgress}/>

          <Route
              path="/chatroom/:type/:id"
              render={(props) => {
                  const state = props.location.state as { userName: string; profileImage: string };
                  return (
                      <ChatRoom
                          userName={state?.userName || 'Unknown User'}
                          userId={props.match.params.id}
                          profileImage={state?.profileImage || ''} // Pastikan default kosong
                          initialMessages={[]} // Atur sesuai kebutuhan
                      />
                  );
              }}
          />

          <Route exact path="/">
            <Redirect to="/login" />
          </Route>

        </IonRouterOutlet>


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
      </IonTabs>
    </IonReactRouter>
  </ThemeProvider>
);

export default App;
