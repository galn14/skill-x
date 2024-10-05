import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSearchbar, IonIcon, IonCard, IonCardContent, IonButton, IonFooter, IonTabBar, IonTabButton, IonCardHeader, IonCardSubtitle, IonCardTitle, IonLabel } from '@ionic/react';
import { notificationsOutline, mailOutline, menuOutline, desktopOutline, colorPaletteOutline, constructOutline, videocamOutline, brushOutline, globeOutline } from 'ionicons/icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Grid, Keyboard, Pagination, Scrollbar, Zoom } from 'swiper/modules';
import './Tab1.css';

const Tab1: React.FC = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    // Fetch categories from the database
    setCategories([
      { id: 1, name: 'Computer Science', icon: desktopOutline, link: '/category/computer-science' },
      { id: 2, name: 'Visual Communication Design', icon: colorPaletteOutline, link: '/category/visual-communication-design' },
      { id: 3, name: 'Interior Design', icon: constructOutline, link: '/category/interior-design' },
      { id: 4, name: 'DBI', icon: constructOutline, link: '/category/DBI' }
    ]);

    // Fetch popular services from the database
    setServices([
      { id: 1, name: 'Editing Video', icon: videocamOutline, link: '/service/editing-video' },
      { id: 2, name: 'Logo Design', icon: brushOutline, link: '/service/logo-design' },
      { id: 3, name: 'Build Website', icon: globeOutline, link: '/service/build-website' },
      { id: 4, name: 'Build Prototyoe', icon: globeOutline, link: '/service/build-prototype' }
    ]);
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>SkillX</IonTitle>
          <IonIcon icon={notificationsOutline} slot="end" className="header-icon" />
          <IonIcon icon={mailOutline} slot="end" className="header-icon" />
          <IonIcon icon={menuOutline} slot="end" className="header-icon" />
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonSearchbar placeholder="Search the right services"></IonSearchbar>
        <div className="welcome-banner">
          <h3>Hi Ailin, what are you looking for?</h3>
        </div>

        
        <div className="categories">
        <h3>Categories</h3>        
        <Swiper
          modules={[Grid, Keyboard, Pagination, Scrollbar, Zoom]}
          direction="horizontal"
          keyboard={true}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          zoom={true}
          spaceBetween={10}
          slidesPerView="auto"
          freeMode={true}
          grid={{ rows: 1 }} // Menetapkan jumlah baris grid menjadi 1
        >
          {categories.map((category) => (
            <SwiperSlide
              key={category.id}
              style={{ width: 'auto', flexShrink: 0 }}
              >
              <IonCard button routerLink={category.link} className="category-card">
                <IonCardContent className="category-card-content">
                  <IonIcon icon={category.icon} className="category-icon" />
                  <IonLabel>{category.name}</IonLabel>
                </IonCardContent>
              </IonCard>
            </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="popular-services">
          <h3>Popular Services</h3>
          <Swiper modules={[Grid, Keyboard, Pagination, Scrollbar, Zoom]} 
          direction={'horizontal'} 
          keyboard={true} 
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }} 
          zoom={true} 
          spaceBetween={10} 
          slidesPerView={'auto'}
          freeMode={true}
          grid={{ rows: 1 }}>   
            {services.map((service) => (
              <SwiperSlide key={service.id}
              style={{ width: 'auto', flexShrink: 0 }}
              >
                <IonCard button routerLink={service.link} className="service-card">
                  <IonCardContent className="service-card-content">
                    <IonIcon icon={service.icon} className="service-icon" />
                    <IonLabel>{service.name}</IonLabel>
                  </IonCardContent>
                </IonCard>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="promotion-card">
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Get 20% off your first service</IonCardTitle>
              <IonCardSubtitle>Use code: FIRST20</IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent>Get 20% off your first service with SkilleX. Use code FIRST20 at checkout.</IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;

