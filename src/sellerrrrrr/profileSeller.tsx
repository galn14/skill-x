import React from 'react';
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonIcon,
  IonButtons,
  IonButton,
} from '@ionic/react';
import { Typography, Card, CardContent, Grid, Avatar, Chip } from '@mui/material';
import { notificationsOutline } from 'ionicons/icons';

const profileSeller: React.FC = () => {
  return (
    <IonPage>
      {/* Header */}
      <IonHeader>
        <IonToolbar
          style={{
            backgroundColor: 'white',
            borderBottom: '1px solid #ddd',
          }}
        >
          <IonButtons slot="start">
            <IonTitle>
              <img src="/assets/logo-skillx.png" alt="SkillX Logo" style={{ height: '30px' }} />
            </IonTitle>
          </IonButtons>
          <IonButtons slot="end">
            <IonButton>
              <IonIcon icon={notificationsOutline} slot="icon-only" color="primary" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      {/* Content */}
      <IonContent>
        <div style={{ padding: '16px' }}>
          {/* Profile Card */}
          <Card
            style={{
              padding: '16px',
              borderRadius: '12px',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
              marginBottom: '16px',
            }}
          >
            <Grid container spacing={2}>
              {/* Avatar */}
              <Grid item xs={3}>
                <Avatar
                  src="/assets/avatar.png" // Ganti dengan path gambar avatar Anda
                  alt="Avatar"
                  style={{ width: '80px', height: '80px', margin: 'auto' }}
                />
              </Grid>

              {/* Info */}
              <Grid item xs={9}>
                <Typography variant="h6" fontWeight="bold">
                  Aileen Liexiulai
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  BINUS University, Computer Science
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  🌍 Indonesia, English, Chinese
                </Typography>
              </Grid>
            </Grid>
          </Card>

          {/* Stats Section */}
          <Grid container spacing={2} style={{ textAlign: 'center', marginBottom: '16px' }}>
            <Grid item xs={3}>
              <Typography variant="body2" color="textSecondary">
                ⭐ Rating
              </Typography>
              <Typography variant="h6">4.9</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="body2" color="textSecondary">
                📅 Since
              </Typography>
              <Typography variant="h6">2019</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="body2" color="textSecondary">
                📦 Orders
              </Typography>
              <Typography variant="h6">46</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="body2" color="textSecondary">
                🎓 Level
              </Typography>
              <Typography variant="h6">2</Typography>
            </Grid>
          </Grid>

          {/* About Me */}
          <Card
            style={{
              padding: '16px',
              borderRadius: '12px',
              marginBottom: '16px',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Typography variant="h6" fontWeight="bold" style={{ marginBottom: '8px' }}>
              About Me
            </Typography>
            <Typography variant="body2">
              As a BINUS University Computer Science major graduating in 2026, I am a highly motivated
              individual with a keen interest in exploring new opportunities, particularly in the realms of
              personal development and relationships.
            </Typography>
          </Card>

          {/* Skills Section */}
          <Card
            style={{
              padding: '16px',
              borderRadius: '12px',
              marginBottom: '16px',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Typography variant="h6" fontWeight="bold" style={{ marginBottom: '8px' }}>
              Skills
            </Typography>
            <div>
              <Chip label="Database Design" style={{ marginRight: '8px', marginBottom: '8px' }} />
              <Chip label="Software Engineering" style={{ marginBottom: '8px' }} />
            </div>
          </Card>

          {/* My Products */}
          <Typography variant="h6" fontWeight="bold" style={{ marginBottom: '8px' }}>
            My Products
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Card style={{ height: '100px', backgroundColor: '#f5f5f5' }} />
            </Grid>
            <Grid item xs={6}>
              <Card style={{ height: '100px', backgroundColor: '#f5f5f5' }} />
            </Grid>
          </Grid>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default profileSeller;
