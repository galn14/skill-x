import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonIcon, IonCard, IonCardContent, IonFooter } from '@ionic/react';
import { notificationsOutline, mailOutline, menuOutline } from 'ionicons/icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Pagination, Scrollbar, Zoom } from 'swiper/modules';
import './Tab2.css';

const Tab2: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState<any[]>([]);

  useEffect(() => {
    // Set data subscription
    setSubscriptions([
      { id: 1, name: 'Monthly', price: 'Rp. 50.000 / month', background: '#397BAA', link: '/subscribe/monthly' },
      { id: 2, name: 'Yearly', price: 'Rp. 450.000 / year', background: '#0094FF', link: '/subscribe/yearly' }
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
          <IonIcon icon={notificationsOutline} slot="end" className="header-icon" />
          <IonIcon icon={mailOutline} slot="end" className="header-icon" />
          <IonIcon icon={menuOutline} slot="end" className="header-icon" />
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="custom-content" color="white">
        <div className="experience-text">
          Experience the different with pro
        </div>

        {/* Swiper Section */}
        <div className="subscriptions">
          <IonCard button routerLink="/subscribe/monthly" className="subscription-card">
            <IonCardContent className="subscription-card-content">
              <h4>Monthly</h4>
              <h5>Rp. 50.000 / month</h5>
            </IonCardContent>
          </IonCard>

          <IonCard button routerLink="/subscribe/yearly" className="subscription-card">
            <IonCardContent className="subscription-card-content">
              <h4>Yearly</h4>
              <h5>Rp. 450.000 / year</h5>
            </IonCardContent>
          </IonCard>
        </div>

        {/* Footer and Subscribe Button */}
        <div className="subscribe-button">Subscribe</div>
        <div className="terms-text">Terms Apply | Cancel Anytime</div>
        <div className="footer-rectangle"></div>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
