import React, { useState, useEffect } from "react";
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
import { fetchCategories, fetchServices, createProduct } from "../api.seller";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "../firebaseConfig"; // Konfigurasi Firebase
 
const AddProduct = () => {
  const [open, setOpen] = useState(true); // Modal state
  const [openDialog, setOpenDialog] = useState(false); // Dialog state for uploading images
  const [productPhotos, setProductPhotos] = useState<File[]>([]); // State for uploaded photos
  const [photoUrls, setPhotoUrls] = useState<string[]>([]); // URL download dari Firebase
  const [productPhotoPreviews, setProductPhotoPreviews] = useState<string[]>([]); // Preview images for the slider
  const [currentSlide, setCurrentSlide] = useState(0); // Current slide in the slider
  const [filteredServices, setFilteredServices] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [productData, setProductData] = useState({
    nameProduct: "",
    description: "",
    photo_url: [] as string[], // URLs of the uploaded images
    price: "",
    idCategory: "",
    idService: "",
  });
  const [productPhotoURLs, setProductPhotoURLs] = useState<string[]>([]);
  const [userData, setUserData] = useState<any>(null);
  const [sellerData, setSellerData] = useState<any>(null);

  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesData = await fetchCategories();
        const servicesData = await fetchServices();
        setCategories(categoriesData);
        setServices(servicesData);
      } catch (error) {
        console.error("Error fetching categories or services:", error);
      }
    };

    fetchData();
  }, []);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);

    // Filter services based on selected category
    const relatedServices = services.filter(
      (service) => service.id_category === categoryId
    );
    setFilteredServices(relatedServices);
    setSelectedService(""); // Reset the selected service when category changes
  };

  const uploadPhotoToFirebase = async (file: File): Promise<string> => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
      const userId = userInfo.uid;

      if (!userId) throw new Error("User ID not found.");

      const storageRef = ref(storage, `product_photos/${userId}/product_${Date.now()}.jpg`);
      const snapshot = await uploadBytes(storageRef, file);
      return await getDownloadURL(snapshot.ref);
    } catch (error) {
      console.error("Error uploading photo:", error);
      throw error;
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const validFormats = ["image/jpeg", "image/png"];
    const maxSizeInMB = 2;
    const maxPhotos = 5;

    if (productPhotos.length + files.length > maxPhotos) {
      alert(`You can only upload up to ${maxPhotos} photos.`);
      return;
    }

    const newPhotos: File[] = [];
    const newPhotoUrls: string[] = [];

    for (const file of Array.from(files)) {
      if (!validFormats.includes(file.type)) {
        alert("Please upload a JPEG or PNG image.");
        continue;
      }
      if (file.size > maxSizeInMB * 1024 * 1024) {
        alert("File size must not exceed 2MB.");
        continue;
      }

      newPhotos.push(file);

      try {
        const url = await uploadPhotoToFirebase(file);
        newPhotoUrls.push(url);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }

    setProductPhotos((prev) => [...prev, ...newPhotos]);
    setPhotoUrls((prev) => [...prev, ...newPhotoUrls]);
  };

  const handleRemovePhoto = (index: number) => {
    setProductPhotos((prev) => prev.filter((_, i) => i !== index));
    setPhotoUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
      // Ambil token pengguna dari localStorage
  const userToken = localStorage.getItem("userToken");
  if (!userToken) {
    alert("User is not logged in.");
    return;
  }

    const formData = {
      ...productData,
      photo_url: photoUrls,
      idCategory: selectedCategory,
      idService: selectedService,
    };

    try {
      await createProduct(userToken, formData);
      alert("Product created successfully!");
      handleClose();
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    history.push("/profileSeller");
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
      }}
    >
      <Box
        sx={{
          backgroundColor: "white",
          width: "350px",
          borderRadius: "8px",
          boxShadow: 24,
        }}
      >
        <Box
          sx={{
            position: "sticky",
            top: 0,
            backgroundColor: "#0094FF",
            borderRadius: "10px 10px 0 0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "10px",
          }}
        >
          <DialogTitle sx={{ color: "white", fontSize: "18px" }}>
            Add New Product
          </DialogTitle>
        </Box>
        <form onSubmit={handleFormSubmit} style={{ padding: "20px" }}>
          <Button
            variant="outlined"
            color="primary"
            component="label"
            sx={{ width: "100%", marginBottom: "16px" }}
            startIcon={<UploadFileIcon />}
          >
            Upload Product Photos
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              hidden
            />
          </Button>
          {photoUrls.length > 0 && (
            <Box sx={{ position: "relative" }}>
              <SwipeableViews
                index={currentSlide}
                onChangeIndex={setCurrentSlide}
              >
                {photoUrls.map((url, index) => (
                  <Box key={index} height="200px">
                    <img
                      src={url}
                      alt={`Slide ${index + 1}`}
                      style={{ maxWidth: "100%", height: "100%" }}
                    />
                    <DeleteIcon
                      onClick={() => handleRemovePhoto(index)}
                      sx={{
                        cursor: "pointer",
                        color: "red",
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                      }}
                    />
                  </Box>
                ))}
              </SwipeableViews>
            </Box>
          )}
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <FormLabel>Product Name</FormLabel>
            <TextField
              name="nameProduct"
              value={productData.nameProduct}
              onChange={(e) =>
                setProductData({ ...productData, nameProduct: e.target.value })
              }
              required
            />
          </FormControl>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <FormLabel>Description</FormLabel>
            <TextField
              name="description"
              value={productData.description}
              onChange={(e) =>
                setProductData({ ...productData, description: e.target.value })
              }
              multiline
              rows={3}
              required
            />
          </FormControl>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <FormLabel>Price</FormLabel>
            <TextField
              name="price"
              value={productData.price}
              onChange={(e) =>
                setProductData({ ...productData, price: e.target.value })
              }
              required
            />
          </FormControl>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              required
            >
              {categories.map((category) => (
                <MenuItem key={category.id_category} value={category.id_category}>
                  {category.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel>Service</InputLabel>
            <Select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              required
              disabled={!selectedCategory}
            >
              {filteredServices.map((service) => (
                <MenuItem key={service.id_service} value={service.id_service}>
                  {service.title_service}
                </MenuItem>
              ))}
            </Select>
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

export default AddProduct;