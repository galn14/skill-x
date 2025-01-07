import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  DialogTitle,
  FormControl,
  FormLabel,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { updateMajor } from "./api.admin"; 
import { Major } from './majorManagement';
import { useHistory } from 'react-router-dom';

interface EditMajorModalProps {
  majorData: Major;
  onClose: () => void;
  onSave: (updatedMajor: Major) => void;
}

const ModalUpdateMajor: React.FC<EditMajorModalProps> = ({ majorData, onClose, onSave }) => {
  const [formData, setFormData] = useState<Major>({
    idMajor: '',
    titleMajor: '',
    iconUrl: ''
  });
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false); // Loading state
  const history = useHistory();

  useEffect(() => {
    console.log("Major Data received:", majorData);

    if (majorData) {
      setFormData({
        idMajor: majorData.idMajor || '',
        titleMajor: majorData.titleMajor || '',
        iconUrl: majorData.iconUrl || ''
      });
    }
  }, [majorData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  const updatedMajor = {
    id_major: formData.idMajor,
    title_major: formData.titleMajor,
    icon_url: formData.iconUrl,
  };
  const token = localStorage.getItem("userToken");
if (!token) {
  alert("No token found. Please login again.");
  return;
}

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    // Validasi input
    if (!formData.idMajor || !formData.titleMajor) {
      alert("Major ID and Major Name are required.");
      return;
    }
  
    try {
      setLoading(true);
  
      // Panggil function `updateMajor` dengan key yang sesuai
      await updateMajor(token, updatedMajor);
  
      alert("Major updated successfully!");
      onSave(formData); // Trigger onSave dengan data terbaru
      handleClose();
    } catch (error: any) {
      console.error("Error updating major:", error);
      alert("Failed to update the major.");
    } finally {
      setLoading(false);
    }
  };
  
  const handleClose = () => {
    history.push('/majorManagement'); // Redirect to major management page
    setOpen(false); // Close modal
    onClose(); // Call parent onClose function
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
            Edit Major
          </DialogTitle>
        </Box>

        <form onSubmit={handleFormSubmit} style={{ padding: "20px" }}>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <FormLabel>Link Icon SVG</FormLabel>
            <TextField
              name="iconUrl"
              value={formData.iconUrl}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <FormLabel>Major Name</FormLabel>
            <TextField
              name="titleMajor"
              value={formData.titleMajor}
              onChange={handleChange}
              required
            />
          </FormControl>

          <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: "30px" }}>
            <Button variant="contained" color="error" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" type="submit" disabled={loading}>
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Save'}
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default ModalUpdateMajor;
