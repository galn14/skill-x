import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar ,IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonItem,
  IonLabel, IonList, IonThumbnail,IonSearchbar } from '@ionic/react';


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
      
      <IonCard > 
        <IonItem>
      
      <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/thumbnail.svg" className='icon1'/>

      <div className="text-container1">
      <IonCardTitle class="ion-card-title-tab3">Building Website</IonCardTitle>
      <IonCardSubtitle class="ion-card-subtitle-tab3">Aileen Angelica</IonCardSubtitle>
      </div>
      
      <h1 className="status-label">Completed</h1>

      </IonItem>
      
      <IonCardContent>
        <IonList>
          <IonItem>
            
              <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/thumbnail.svg" className='icon2'/>
            <IonLabel>Item</IonLabel>
          </IonItem>
        </IonList>
        </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
