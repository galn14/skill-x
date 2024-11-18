import React, { useState } from "react";
import { Modal, Box, DialogTitle, FormControl, FormLabel, TextField, Button } from "@mui/material";
import { useHistory } from 'react-router-dom';

const EditProfileModal = () => {
  const [open, setOpen] = useState(true);  // Modal state to control opening/closing
  const history = useHistory();

  // Close modal and redirect
  const handleCloseEdit = () => {
    history.push('/ProfileSeller');  // Redirect to home or main page
    setOpen(false);  // Close the modal
  };

  // Form submit handler (example)
  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Add your form submit logic here
    handleCloseEdit();  // Close modal on submit
  };

  return (
    <Modal
      open={open}
      onClose={handleCloseEdit} // Close modal when clicking outside
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          backgroundColor: 'white',
          width: '350px',
          borderRadius: '8px',
          boxShadow: 24,
        }}
      >
        {/* Header Section */}
        <Box
          sx={{
            backgroundColor: '#0094FF',
            borderRadius: '10px 10px 0 0',
            display: 'flex',
            justifyContent: 'center',
            padding: '20px',
            marginBottom: '20px',
          }}
        >
          <DialogTitle
            sx={{
              padding: 0,
              color: 'white',
              fontSize: '18px',
            }}
          >
            Edit Profile
          </DialogTitle>
        </Box>

        {/* Form Section */}
        <form onSubmit={handleFormSubmit}>
          <Box
            sx={{
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            {['name', 'organization', 'major', 'language'].map((field) => (
              <FormControl key={field}>
                <FormLabel>{capitalize(field)}*</FormLabel>
                <TextField
                  sx={{ width: '100%' }}
                  name={field}
                  defaultValue={JSON.parse(localStorage.getItem('userInfo') || '{}')[field] || ''}
                  autoFocus={field === 'name'}
                  required
                />
              </FormControl>
            ))}

            {/* Action Buttons */}
            <Box display="flex" justifyContent="space-between" mt={1}>
              <Button
                variant="contained"
                color="error"
                onClick={handleCloseEdit}  // Close modal on cancel
                sx={{ width: '150px' }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{ width: '150px' }}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default EditProfileModal;

// Utility function for capitalizing field names
const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
