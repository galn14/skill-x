import React, { useState } from 'react';
import { Container, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText, Button, Divider } from '@mui/material';

const Wishlist: React.FC = () => {
  // Contoh data wishlist
  const [wishlist, setWishlist] = useState([
    { id: 1, name: 'Item A', description: 'This is item A', image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Item B', description: 'This is item B', image: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Item C', description: 'This is item C', image: 'https://via.placeholder.com/150' },
  ]);

  // Fungsi untuk menghapus item dari wishlist
  const handleRemove = (id: number) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        My Wishlist
      </Typography>
      {wishlist.length > 0 ? (
        <List>
          {wishlist.map((item) => (
            <React.Fragment key={item.id}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar src={item.image} alt={item.name} />
                </ListItemAvatar>
                <ListItemText
                  primary={item.name}
                  secondary={item.description}
                />
                <Button variant="outlined" color="error" onClick={() => handleRemove(item.id)}>
                  Remove
                </Button>
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))}
        </List>
      ) : (
        <Typography variant="body1">Your wishlist is empty!</Typography>
      )}
    </Container>
  );
};

export default Wishlist;
