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
  FormControlLabel,
  Checkbox,
  FormHelperText,
} from "@mui/material";
import { addPortfolio } from '../api.service';
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DeleteIcon from "@mui/icons-material/Delete";
import { useHistory } from "react-router-dom";
import SwipeableViews from "react-swipeable-views";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { SelectChangeEvent } from '@mui/material';

// Define enums for TypePortofolio and StatusPortofolio
enum TypePortofolio {
  PRODUCT = "Product",
  PROJECT = "Project",
}

enum StatusPortofolio {
  ON_GOING = "On Going",
  COMPLETED = "Completed",
}

type FormData = {
  title: string;
  description: string;
  link: string;
  type: TypePortofolio; // Portfolio Type
  status: StatusPortofolio; // Portfolio Status
  dateCreated: string;
  dateEnd: string;
  isPresent: boolean;
};

const AddPortoModal = () => {
  const [open, setOpen] = useState(true); // Modal state
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    link: '',
    type: TypePortofolio.PRODUCT, // Default value for 'type'
    status: StatusPortofolio.ON_GOING, // Default value for 'status'
    dateCreated: new Date().toISOString().split('T')[0],
    dateEnd: '',
    isPresent: false,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const history = useHistory();

  // Handle form input changes
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name as string]: value });
  };

// Handle selection changes for type and status
    const handleSelectChange = (
        event: SelectChangeEvent<TypePortofolio | StatusPortofolio>, 
        field: 'type' | 'status'
    ) => {
        setFormData({ ...formData, [field]: event.target.value });
    };
  

  // Handle form submission
  const handleSubmit = async () => {
    try {
      const userToken = localStorage.getItem('userToken');
      if (!userToken) {
        alert('You are not logged in!');
        history.push('/login');
        return;
      }

      await addPortfolio(userToken, formData); // API call
      alert('Portfolio added successfully!');
      history.push('/ProfileSeller'); // Redirect to profile page
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error adding portfolio:', error.message);
      } else {
        console.error('Error adding portfolio:', error);
      }
      alert('Failed to add portfolio.');
    }
  };

  const handleClose = () => {
    setOpen(false);
    history.push("/ProfileSeller"); // Redirect to the profile page
  };
  
  const [openDialog, setOpenDialog] = useState(false); // Dialog state for uploading images
  const [productPhotos, setProductPhotos] = useState<File[]>([]); // State for uploaded photos
  const [productPhotoPreviews, setProductPhotoPreviews] = useState<string[]>([]); // Preview images for the slider
  const [currentSlide, setCurrentSlide] = useState(0); // Current slide in the slider

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



  return (
    <Modal
    open={open}
    onClose={handleClose}
    sx={{
      display: "flex",
      alignItems: "center", // Pusatkan modal secara vertikal
      justifyContent: "center", // Pusatkan modal secara horizontal
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
            position: "sticky", // Tetap di atas selama scroll
            top: 0,
            zIndex: 10, // Pastikan di atas elemen lain
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
            margin: 0, // Pastikan tidak ada margin
            color: "white",
            fontSize: "18px",
            textAlign: "center", // Pusatkan teks
          }}
        >
          Edit Portofolio
        </DialogTitle>
      </Box>

    <form onSubmit={handleSubmit} style={{ padding: "20px" }}>

            {/* Portfolio Title */}
            <TextField
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            fullWidth
            required
            margin="normal"
            />

            {/* Portfolio Description */}
            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              fullWidth
              required
              multiline
              rows={4}
              margin="normal"
            />

                        {/* Portfolio Link */}
            <TextField
              label="Link"
              name="link"
              value={formData.link}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
              placeholder="your figma, github, instagram. etc"
            />

<FormControl fullWidth required margin="normal">
            <InputLabel>Type of Portfolio</InputLabel>
            <Select
                name="type"
                value={formData.type}
                required
                onChange={(e) => handleSelectChange(e, 'type')}
                label="Type of Portfolio"
            >
                {Object.values(TypePortofolio).map((type) => (
                <MenuItem key={type} value={type}>
                    {type}
                </MenuItem>
                ))}
            </Select>
            </FormControl>

            <FormControl fullWidth required margin="normal">
            <InputLabel>Status of Portfolio</InputLabel>
            <Select
                name="status"
                value={formData.status}
                onChange={(e) => handleSelectChange(e, 'status')}
                label="Status of Portfolio"
            >
                {Object.values(StatusPortofolio).map((status) => (
                <MenuItem key={status} value={status}>
                    {status}
                </MenuItem>
                ))}
            </Select>
            </FormControl>

            {/* Date Created */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker
                  label="Date Created"
                  value={dayjs(formData.dateCreated)}
                  onChange={(newValue: Dayjs | null) => {
                    if (newValue) setFormData({ ...formData, dateCreated: newValue.toString() });
                  }}
                />
                {errors.dateCreated && <FormHelperText error>{errors.dateCreated}</FormHelperText>}
              </DemoContainer>
            </LocalizationProvider>

    {/* Date End */}
    <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker
                  label="Date End"
                  value={formData.isPresent ? null : dayjs(formData.dateEnd)}  // Set value to null if isPresent is true
                  onChange={(newValue: Dayjs | null) => {
                    if (!formData.isPresent && newValue) {
                      setFormData({ ...formData, dateEnd: newValue.toString() });
                    }
                  }}
                />
                {errors.dateEnd && <FormHelperText error>{errors.dateEnd}</FormHelperText>}
              </DemoContainer>
            </LocalizationProvider>

      
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
 

            {/* Submit Button */}
            <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: "30px" }}>
            <Button variant="contained" color="error" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </Box>  

</form>

      </Box>
    </Modal>
  );
};

export default AddPortoModal;
