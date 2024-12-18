import React from 'react';
import { IonContent, IonPage, IonGrid, IonRow, IonCol, IonSearchbar, IonButton } from '@ionic/react';
import { Card, CardContent, CardMedia, Typography, Button, TextField } from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';

const sellerApproval: React.FC = () => {
  // Contoh data seller
  const sellers = Array(12).fill({
    name: 'Aileen Angelica Lee',
    major: 'BINUS University | Computer Science',
    img: '', // URL gambar jika ada
  });

  return (
    <IonPage>
      {/* Sidebar dan Header */}
      <IonContent>
        <div style={{ display: 'flex' }}>
          {/* Sidebar */}
          <div style={{ width: '250px', backgroundColor: '#E9F3FF', minHeight: '100vh', padding: '10px' }}>
            <img src="/assets/skillx_logo.png" alt="SkillX Logo" style={{ width: '100%', marginBottom: '20px' }} />
            <Typography variant="h6" style={{ marginBottom: '20px', color: '#000', fontWeight: 'bold' }}>
              Admin
            </Typography>
            <nav>
              {[
                'Dashboard',
                'Seller Approval',
                'Major Management',
                'Service Management',
                'Skills Management',
                'Review Management',
                'Transaction Monitoring',
                'User Monitoring',
                'Subscription',
                'Report Management',
                'Help and Support',
                'Account Setting',
              ].map((item) => (
                <div
                  key={item}
                  style={{
                    padding: '10px',
                    backgroundColor: item === 'Seller Approval' ? '#1976D2' : 'transparent',
                    color: item === 'Seller Approval' ? '#fff' : '#000',
                    borderRadius: '5px',
                    marginBottom: '5px',
                    cursor: 'pointer',
                  }}
                >
                  {item}
                </div>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div style={{ flex: 1, padding: '20px' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <Typography variant="h4" style={{ fontWeight: 'bold' }}>
                Seller Approval
              </Typography>
              <div style={{ display: 'flex', gap: '10px' }}>
                <Button variant="outlined" startIcon={<SortIcon />}>
                  Sort
                </Button>
                <TextField label="Search name" variant="outlined" size="small" />
              </div>
            </div>

            {/* Grid Content */}
            <IonGrid>
              <IonRow>
                {sellers.map((seller, index) => (
                  <IonCol size="12" size-md="4" key={index}>
                    <Card style={{ marginBottom: '20px' }}>
                      <CardMedia
                        component="img"
                        height="140"
                        image={seller.img || '/assets/placeholder.png'}
                        alt="Seller Thumbnail"
                      />
                      <CardContent>
                        <Typography variant="h6" component="div">
                          {seller.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {seller.major}
                        </Typography>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                          <Button variant="contained" color="error" size="small">
                            Decline
                          </Button>
                          <Button variant="contained" color="success" size="small">
                            Accept
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </IonCol>
                ))}
              </IonRow>
            </IonGrid>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default sellerApproval;
