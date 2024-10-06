import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSearchbar, IonIcon, IonCard, IonCardContent, IonButton, IonFooter, IonTabBar, IonTabButton, IonCardHeader, IonCardSubtitle, IonCardTitle, IonLabel, IonButtons, IonMenuButton } from '@ionic/react';
import { notificationsOutline, mailOutline, menuOutline, desktopOutline, colorPaletteOutline, constructOutline, videocamOutline, brushOutline, globeOutline, link } from 'ionicons/icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Keyboard, Pagination, Scrollbar, Zoom } from 'swiper/modules';
import './Tab2.css';
import ExploreContainer from '../components/ExploreContainer';

const Tab2: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState<any[]>([]);

  useEffect(() => {
    // Fetch categories from the database
    setSubscriptions([
      { id: 1, name: 'Monthly', price: 'Rp. 50.000 / month', background: '#397BAA', link:'/subscribe/monthly' },
      { id: 2, name: 'Yearly', price: 'Rp. 450.000 / year', background: '#0094FF', link:'/subscribe/yearly' }
    ]);
  }, []);
  return (
    <IonPage>
      <IonHeader>
        <div className="blue-background"></div>
        <IonToolbar className="custom-toolbar">
          <div className="logo-container">
            <img src="path_to_your_logo.png" alt="SkillEx Logo" className="logo" />
          </div>
          <IonButtons slot="end">
            <IonIcon icon={notificationsOutline} slot="end" className="header-icon" />
            <IonIcon icon={mailOutline} slot="end" className="header-icon" />
            <IonIcon icon={menuOutline} slot="end" className="header-icon" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="custom-content" color="white">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 2</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="experience-text">
          Experience the different with pro
        </div>

        <div className="subscriptions">
          <Swiper
            modules={[Keyboard, Pagination, Scrollbar, Zoom]}
            direction={'vertical'}
            keyboard={true}
            pagination={true}
            scrollbar={true}
            zoom={true}
            spaceBetween={20}
            slidesPerView={'auto'}
          >
            {subscriptions.map((subscription) => (
              <SwiperSlide key={subscription.id}>
                <IonCard button routerLink={subscription.link} className="subscription-card" style={{ background: subscription.background }}>
                  <IonCardContent className="subscription-card-content">
                    <h4>{subscription.name}</h4>
                    <h5>{subscription.price}</h5>
                  </IonCardContent>
                </IonCard>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="footer-rectangle"></div>

        <div className="subscribe-button">
          Subscribe
        </div>
      </IonContent>

    </IonPage>
  );
};

export default Tab2;
