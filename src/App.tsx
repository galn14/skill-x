import { Redirect, Route } from 'react-router-dom';
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
import LoginPage from './pages/Login';
import RegisterPage from './pages/RegisterPage';
import LogoutPage from './pages/LogoutPage';
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
          <PrivateRoute path="/tab4" component={Tab4} exact />
          <Route path="/logout" component={LogoutPage} exact />
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
