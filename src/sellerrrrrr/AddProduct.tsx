import React, { useState } from "react";
import { Modal, Box, DialogTitle, FormControl, FormLabel, TextField, Button, Typography, Dialog, DialogActions, DialogContent } from "@mui/material";
import UploadFileIcon from '@mui/icons-material/UploadFile'; // Tambahkan ikon yang diperlukan
import { useHistory } from "react-router-dom";

const AddProductModal = () => {
  const [open, setOpen] = useState(true); // Modal state
  const [openDialog, setOpenDialog] = useState(false); // Dialog state
  const [productPhoto, setProductPhoto] = useState<File | null>(null); // File state
  const [productPhotoPreview, setProductPhotoPreview] = useState<string | null>(null); // Preview state

  const history = useHistory();

  // File handler
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const validFormats = ["image/jpeg", "image/png"];
      const maxSizeInMB = 2; // Maksimal 2MB
      if (!validFormats.includes(file.type)) {
        alert("Please upload a JPEG or PNG image.");
        return;
      }
      if (file.size > maxSizeInMB * 1024 * 1024) {
        alert("File size must not exceed 2MB.");
        return;
      }
      setProductPhoto(file);
      setProductPhotoPreview(URL.createObjectURL(file));
    }
  };

  // Modal close handler
  const handleClose = () => {
    setOpen(false);
    history.push("/ProfileSeller"); // Redirect ke halaman
  };

  // Form submit handler
  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Form submitted:", {
      productPhoto,
      productPhotoPreview,
    });
    handleClose(); // Close modal on submit
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          backgroundColor: "white",
          width: "400px",
          borderRadius: "8px",
          boxShadow: 24,
          padding: "20px",
        }}
      >
        {/* Header Section */}
        <DialogTitle sx={{ textAlign: "center", marginBottom: 2 }}>
          Add New Product
        </DialogTitle>

        {/* Form Section */}
        <form onSubmit={handleFormSubmit}>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <FormLabel>Product Name</FormLabel>
            <TextField name="productName" required />
          </FormControl>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <FormLabel>Description</FormLabel>
            <TextField name="description" multiline rows={3} required />
          </FormControl>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <FormLabel>Price</FormLabel>
            <TextField name="price" type="number" required />
          </FormControl>

          <Button
            variant="outlined"
            color="primary"
            onClick={() => setOpenDialog(true)}
            sx={{ width: "100%", marginTop: "16px", marginBottom: "16px" }}
            startIcon={<UploadFileIcon />}
          >
            Upload Product Photo
          </Button>

          {/* Preview Section */}
          {productPhotoPreview && (
            <Box mt={2} mb={2}>
              <Typography variant="body2">Preview:</Typography>
              <img
                src={productPhotoPreview}
                alt="Product Photo Preview"
                style={{ width: "100%", maxHeight: "150px", objectFit: "contain" }}
              />
            </Box>
          )}

          {/* Dialog untuk Upload */}
          <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth>
            <DialogTitle>Upload Product Photo</DialogTitle>
            <DialogContent>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
                id="product-photo-input"
              />
              <label htmlFor="product-photo-input">
                <Button variant="outlined" color="secondary" component="span" fullWidth>
                  Choose File
                </Button>
              </label>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDialog(false)} color="secondary">
                Cancel
              </Button>
              <Button
                onClick={() => setOpenDialog(false)}
                color="primary"
                variant="contained"
              >
                Confirm
              </Button>
            </DialogActions>
          </Dialog>

          {/* Action Buttons */}
          <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
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

export default AddProductModal;
