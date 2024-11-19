import React, { useState } from "react";
import {
  Modal,
  Box,
  DialogTitle,
  FormControl,
  FormLabel,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  Dialog,
  DialogActions,
  DialogContent,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DeleteIcon from "@mui/icons-material/Delete";
import { useHistory } from "react-router-dom";
import SwipeableViews from "react-swipeable-views";

const AddPortoModal = () => {
  const [open, setOpen] = useState(true); // Modal state
  const [openDialog, setOpenDialog] = useState(false); // Dialog state for uploading images
  const [productPhotos, setProductPhotos] = useState<File[]>([]); // State for uploaded photos
  const [productPhotoPreviews, setProductPhotoPreviews] = useState<string[]>([]); // Preview images for the slider
  const [currentSlide, setCurrentSlide] = useState(0); // Current slide in the slider
 // const [selectedService, setSelectedService] = useState(""); // Selected service

  const history = useHistory();

  const services = ["Photography", "Web Development", "Graphic Design", "Tutoring", "Video Editing"];

  // Handle removing photo
  const handleRemovePhoto = (index: number) => {
    setProductPhotos((prev) => prev.filter((_, i) => i !== index));
    setProductPhotoPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // Handle file changes (upload images)
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const validFormats = ["image/jpeg", "image/png"];
      const maxSizeInMB = 2; // Max file size
      const maxPhotos = 5; // Max number of photos

      // Validate photo limit
      if (productPhotos.length + files.length > maxPhotos) {
        alert(`You can only upload up to ${maxPhotos} photos.`);
        return;
      }

      const newPhotos: File[] = [];
      const newPreviews: string[] = [];

      Array.from(files).forEach((file) => {
        if (!validFormats.includes(file.type)) {
          alert("Please upload a JPEG or PNG image.");
          return;
        }
        if (file.size > maxSizeInMB * 1024 * 1024) {
          alert("File size must not exceed 2MB.");
          return;
        }
        newPhotos.push(file);
        newPreviews.push(URL.createObjectURL(file));
      });

      setProductPhotos((prev) => [...prev, ...newPhotos]);
      setProductPhotoPreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  // Modal close handler
  const handleClose = () => {
    setOpen(false);
    history.push("/ProfileSeller"); // Redirect to the profile page
  };

  // Form submit handler
  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Form submitted:", {
      productPhotos,
      productPhotoPreviews
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
        padding: "20px",
        overflow: "auto",
        marginTop: '20px',
        marginBottom: '20px'
      }}
    >
      <Box
        sx={{
          backgroundColor: "white",
          width: "350px",
          borderRadius: "8px",
          boxShadow: 24,
          overflow: "auto",
          marginTop: '20px',
        marginBottom: '20px'
        }}
      >
       <Box
  sx={{
    backgroundColor: "#0094FF",
    borderRadius: "10px 10px 0 0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center", // Pusatkan secara vertikal
    padding: "10px", // Kurangi padding
  }}
>
  <DialogTitle
    sx={{
      margin: 0, // Pastikan tidak ada margin
      color: "white",
      fontSize: "18px",
      textAlign: "center", // Pusatkan teks
    }}
  >
    Add New Product
  </DialogTitle>
</Box>


        <form onSubmit={handleFormSubmit} style={{
            padding: "20px", // Add padding to the form
          }}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setOpenDialog(true)}
            sx={{ width: "100%", marginTop: "16px", marginBottom: "16px" }}
            startIcon={<UploadFileIcon />}
          >
            Upload Product Photos
          </Button>

          {/* Show uploaded photos in the main modal slider */}
          {productPhotoPreviews.length > 0 && (
            <Box sx={{ position: "relative" }}>
              <SwipeableViews
                index={currentSlide}
                onChangeIndex={(index: number) => setCurrentSlide(index)}
              >
                {productPhotoPreviews.map((preview, index) => (
                  <Box
                    key={index}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    position="relative"
                    height="200px"
                  >
                    <img
                      src={preview}
                      alt={`Slide ${index + 1}`}
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </Box>
                ))}
              </SwipeableViews>
              <Box
                sx={{
                  position: "absolute",
                  bottom: "10px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  display: "flex",
                  gap: "5px",
                }}
              >
                {productPhotoPreviews.map((_, index) => (
                  <Box
                    key={index}
                    sx={{
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      backgroundColor: currentSlide === index ? "black" : "gray",
                    }}
                  />
                ))}
              </Box>
            </Box>
          )}

          <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth>
            <DialogTitle>Upload Product Photos</DialogTitle>
            <DialogContent>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                style={{ display: "none" }}
                id="product-photo-input"
              />
              <label htmlFor="product-photo-input">
                <Button
                  variant="outlined"
                  color="secondary"
                  component="span"
                  fullWidth
                >
                  Choose Files
                </Button>
              </label>
              <Box>
                {productPhotoPreviews.map((preview, index) => (
                  <Box
                    key={index}
                    display="flex"
                    alignItems="center"
                    sx={{ marginBottom: 2 }}
                  >
                    <img
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      style={{
                        maxWidth: "50px",
                        maxHeight: "50px",
                        objectFit: "contain",
                      }}
                    />
                    <DeleteIcon
                      onClick={() => handleRemovePhoto(index)}
                      sx={{
                        cursor: "pointer",
                        color: "red",
                        marginLeft: "10px",
                      }}
                    />
                  </Box>
                ))}
              </Box>
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
          {/* Form Section */}
          <FormControl fullWidth sx={{ marginTop:2, marginBottom: 2 }}>
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

export default AddPortoModal;
