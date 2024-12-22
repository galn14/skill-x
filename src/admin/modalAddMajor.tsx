import React, { useState } from "react";
import {
  Modal,
  Box,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import { createMajor } from './api.admin';
import { useHistory } from "react-router-dom";

type FormData = {
  majorName: string;
  linkIcon: string;
};

const ModalAddMajor = () => {
  const [open, setOpen] = useState(true); // Modal state
  const [formData, setFormData] = useState<FormData>({
    majorName: '',
    linkIcon: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const history = useHistory();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));  // Change majors to newMajor
  };
  

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrors({}); // Reset errors before submitting
  
    // Validation
    if (!formData.majorName || !formData.linkIcon) {
      setErrors({
        majorName: formData.majorName ? '' : 'Major name is required.',
        linkIcon: formData.linkIcon ? '' : 'Link icon is required.',
      });
      return;
    }
  
    try {
      const userToken = localStorage.getItem('userToken');
      if (!userToken) {
        alert('You are not logged in!');
        history.push('/login');
        return;
      }
  
      // Map FormData to the expected format
      const majorData = {
        titleMajor: formData.majorName,
        iconUrl: formData.linkIcon,
      };
  
      console.log("Sending request with data:", majorData);  // Add logging here
  
      await createMajor(majorData);  // Assuming createMajor function is available
      alert('Major added successfully!');
      history.push('/majorManagement'); // Redirect to the major management page after success
      setOpen(false); // Close modal
    } catch (error) {
      console.error('Error adding major:', error);
      alert('Failed to add major. Please try again.');
    }
  };
  

  const handleClose = () => {
    setOpen(false);
    history.push("/majorManagement"); // Redirect to major management if modal is closed
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        overflow: "auto",
        borderRadius: "8px",
      }}
    >
      <Box
        sx={{
          backgroundColor: "white",
          width: "350px",
          borderRadius: "8px",
          boxShadow: 24,
          overflow: "auto",
          maxHeight: "90vh",
        }}
      >
        <Box
          sx={{
            position: "sticky",
            top: 0,
            height: "100px",
            backgroundColor: "#0094FF",
            borderRadius: "10px 10px 0 0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "10px",
          }}
        >
          <DialogTitle
            sx={{
              paddingTop: "20px",
              margin: 0,
              color: "white",
              fontSize: "18px",
              textAlign: "center",
            }}
          >
            Add New Major
          </DialogTitle>
        </Box>

        <form onSubmit={handleSubmit} style={{ padding: "20px" }}>
          {/* Major Name */}
          <TextField
            label="Major Name"
            name="majorName"
            value={formData.majorName}
            onChange={handleInputChange}
            fullWidth
            required
            margin="normal"
            error={Boolean(errors.majorName)}
            helperText={errors.majorName}
          />

          {/* Link Icon */}
          <TextField
            label="Link Icon"
            name="linkIcon"
            value={formData.linkIcon}
            onChange={handleInputChange}
            fullWidth
            required
            margin="normal"
            error={Boolean(errors.linkIcon)}
            helperText={errors.linkIcon}
          />

          {/* Submit and Cancel Buttons */}
          <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: "30px" }}>
            <Button variant="contained" color="error" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default ModalAddMajor;
