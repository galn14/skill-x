import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar ,IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonItem,
  IonLabel, IonIcon, IonList, IonThumbnail,IonSearchbar } from '@ionic/react';


import ExploreContainer from '../components/ExploreContainer';
import './Tab3.css';  

const Tab3: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Skill X</IonTitle>
        </IonToolbar>

      </IonHeader>
      <IonContent fullscreen>
      <IonSearchbar></IonSearchbar>

        {/* card  completed status */}
      
      <IonCard > 
        <IonItem>
      
      <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/thumbnail.svg" className='icon1'/>

      <div className="text-container1">
      <IonCardTitle class="ion-card-title-tab3">Building Website</IonCardTitle>
      <IonCardSubtitle class="ion-card-subtitle-tab3">AileenLiexiuai</IonCardSubtitle>
      </div>
      
      <h1 className="status-label">Completed</h1>
      <IonButton className="kebab-icon"fill='clear' >
      ︙
    </IonButton>

      </IonItem>
      
      <IonCardContent>
        
          <IonItem lines='none'>
            
              <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/thumbnail.svg" className='icon2'/>
              <div  className='text-container2' >
            <IonCardTitle class="ion-card-title2-tab3">Package Portofolio Website</IonCardTitle>
            <IonCardSubtitle class="ion-card-subtitle-tab3">Computer Science</IonCardSubtitle>
            
              </div>
              
          </IonItem>
      
        </IonCardContent>
          <IonItem lines="none" className="order-section">
      <div className="order-details">
        <p>Total Order</p>
        <h2>Rp 500.000</h2>
      </div>

      {/* Buttons */}
      <div className="button-group">
        <IonButton size="small" fill="outline" className='custom-button-outline'>Buy Again</IonButton>
        <IonButton size="small" className='custom-button'>Review</IonButton>
      </div>
    </IonItem>
        </IonCard>
  {/* card  incomplete status */}
        <IonCard > 

        <IonItem>
      
      <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/thumbnail.svg" className='icon1'/>

      <div className="text-container1">
      <IonCardTitle class="ion-card-title-tab3">Photography</IonCardTitle>
      <IonCardSubtitle class="ion-card-subtitle-tab3">GeLion</IonCardSubtitle>
      </div>
      
      <h1 className="status-label">Incomplete</h1>
      <IonButton className="kebab-icon"fill='clear' >
      ︙
    </IonButton>

      </IonItem>
      
      <IonCardContent>
        
          <IonItem lines='none'>
            
              <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/thumbnail.svg" className='icon2'/>
              <div  className='text-container2' >
            <IonCardTitle class="ion-card-title2-tab3">Product Photography</IonCardTitle>
            <IonCardSubtitle class="ion-card-subtitle-tab3">Visual Communication Design</IonCardSubtitle>
            
              </div>
              
          </IonItem>
      
        </IonCardContent>
          <IonItem lines="none" className="order-section">
      <div className="order-details">
        <p>Total Order</p>
        <h2>Rp 1.500.000</h2>
      </div>

      {/* Buttons */}
      <div className="button-group">
        <IonButton size="small" className='custom-button'>Contact Seller</IonButton>
      </div>
    </IonItem>
        </IonCard>

      {/* card pending order */}

        <IonCard > 
        <IonItem>
      
      <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/thumbnail.svg" className='icon1'/>

      <div className="text-container1">
      <IonCardTitle class="ion-card-title-tab3">Copy Writing</IonCardTitle>
      <IonCardSubtitle class="ion-card-subtitle-tab3">Ananta</IonCardSubtitle>
      </div>
      
      <h1 className="status-label">Awaiting conformation</h1>
      <IonButton className="kebab-icon"fill='clear' >
      ︙
    </IonButton>

      </IonItem>
      
      <IonCardContent>
        
          <IonItem lines='none'>
            
              <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/thumbnail.svg" className='icon2'/>
              <div  className='text-container2' >
            <IonCardTitle class="ion-card-title2-tab3">Package Script Video</IonCardTitle>
            <IonCardSubtitle class="ion-card-subtitle-tab3">Communication</IonCardSubtitle>
            
              </div>
              
          </IonItem>
      
        </IonCardContent>
          <IonItem lines="none" className="order-section">
      <div className="order-details">
        <p>Total Order</p>
        <h2>Rp 700.000</h2>
      </div>

      {/* Buttons */}
      <div className="button-group">
        <IonButton size="small" fill="outline" className='custom-button-outline'>Request Refund</IonButton>
        <IonButton size="small" className='custom-button'>complete</IonButton>
      </div>
    </IonItem>
        </IonCard>
        <IonCard > 
        <IonItem>
      
      <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/thumbnail.svg" className='icon1'/>

      <div className="text-container1">
      <IonCardTitle class="ion-card-title-tab3">Building Website</IonCardTitle>
      <IonCardSubtitle class="ion-card-subtitle-tab3">AileenLiexiuai</IonCardSubtitle>
      </div>
      
      <h1 className="status-label">Completed</h1>
      <IonButton className="kebab-icon"fill='clear' >
      ︙
    </IonButton>

      </IonItem>
      
      <IonCardContent>
        
          <IonItem lines='none'>
            
              <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/thumbnail.svg" className='icon2'/>
              <div  className='text-container2' >
            <IonCardTitle class="ion-card-title2-tab3">Package Portofolio Website</IonCardTitle>
            <IonCardSubtitle class="ion-card-subtitle-tab3">Computer Science</IonCardSubtitle>
            
              </div>
              
          </IonItem>
      
        </IonCardContent>
          <IonItem lines="none" className="order-section">
      <div className="order-details">
        <p>Total Order</p>
        <h2>Rp 500.000</h2>
      </div>

      {/* Buttons */}
      <div className="button-group">
        <IonButton size="small" fill="outline" className='custom-button-outline'>Buy Again</IonButton>
        <IonButton size="small" className='custom-button'>Review</IonButton>
      </div>
    </IonItem>
        </IonCard>

      </IonContent>
    </IonPage>
  );
};

export default Tab3;
