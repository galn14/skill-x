import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  DialogTitle,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";
import { updateCategory, fetchMajors } from "./api.admin"; // Assuming these functions exist
import { useHistory } from "react-router-dom";

type FormData = {
  categoryName: string;
  iconLink: string;
  id_major: string; // Store major ID (not major title)
};

interface EditCategoryModalProps {
  categoryData: any; // Category data to edit
  onClose: () => void;
  onSave: (updatedCategory: any) => void;
}

const ModalUpdateCategory: React.FC<EditCategoryModalProps> = ({
  categoryData,
  onClose,
  onSave,
}) => {
  const [open, setOpen] = useState(true); // Modal state
  const [formData, setFormData] = useState<FormData>({
    categoryName: "",
    iconLink: "",
    id_major: "", // Initialize with empty ID
  });
  const [majors, setMajors] = useState<any[]>([]); // Store majors data
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const history = useHistory();

  // Fetch majors and pre-fill form data
  useEffect(() => {
    const getMajors = async () => {
      try {
        const response = await fetchMajors(); // Fetch the majors list
        console.log("Fetched Majors:", response); // Check if majors data is correct

        setMajors(response); // Set the majors to state
      } catch (error) {
        console.error("Failed to fetch majors", error);
      }
    };
    getMajors();

    // Pre-fill form data with existing category information
    if (categoryData) {
      setFormData({
        categoryName: categoryData.title || "",
        iconLink: categoryData.photo_url || "",
        id_major: categoryData.id_major || "", // Use id_major instead of title_major
      });
      console.log('Form data after setting:', categoryData.id_major);  // Debugging log

    }
  }, [categoryData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const selectedMajorId = event.target.value; // Get selected major ID
    console.log('Selected Major ID:', selectedMajorId); // Debugging log
    setFormData((prev) => ({
      ...prev,
      id_major: selectedMajorId, // Update formData with id_major (major ID)
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrors({});

    if (!formData.categoryName || !formData.iconLink || !formData.id_major) {
      setErrors({
        categoryName: formData.categoryName ? "" : "Category name is required.",
        iconLink: formData.iconLink ? "" : "Icon link is required.",
        id_major: formData.id_major ? "" : "Major is required.",
      });
      return;
    }

    try {
      const userToken = localStorage.getItem("userToken");
      if (!userToken) {
        alert("You are not logged in. Please log in again.");
        history.push("/login");
        return;
      }

      const selectedMajor = majors.find((major) => major.idMajor === formData.id_major);
      if (!selectedMajor) {
        alert("Invalid major selected.");
        return;
      }

      const categoryDataToUpdate = {
        title: formData.categoryName,
        iconUrl: formData.iconLink,
        id_major: formData.id_major, // Pastikan ini adalah ID yang benar
      };
      console.log('Data yang dikirim:', categoryDataToUpdate); // Debugging log
      
      await updateCategory(categoryData.id_category, categoryDataToUpdate);
      alert("Category updated successfully!");
      setOpen(false);
      onSave(categoryDataToUpdate);
      history.replace("/categoryManagement");
      window.location.reload();
    } catch (error) {
      console.error("Error updating category:", error);
      alert("Failed to update category. Please try again.");
    }
  };

  const handleClose = () => {
    setOpen(false);
    onClose(); // Trigger onClose callback
    history.push("/categoryManagement"); // Redirect to category management if modal is closed
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
            Edit Category
          </DialogTitle>
        </Box>

        <form onSubmit={handleSubmit} style={{ padding: "20px" }}>
          {/* Category Name */}
          <TextField
            label="Category Name"
            name="categoryName"
            value={formData.categoryName}
            onChange={handleInputChange}
            fullWidth
            required
            margin="normal"
            error={Boolean(errors.categoryName)}
            helperText={errors.categoryName}
          />

          {/* Icon Link */}
          <TextField
            label="Icon Link"
            name="iconLink"
            value={formData.iconLink}
            onChange={handleInputChange}
            fullWidth
            required
            margin="normal"
            error={Boolean(errors.iconLink)}
            helperText={errors.iconLink}
          />

          {/* Major Dropdown */}
          <FormControl fullWidth required margin="normal">
            <InputLabel>Major</InputLabel>
            <Select
              name="majorId"
              value={formData.id_major} // Use id_major here
              onChange={handleSelectChange}
              label="Major"
            >
              {majors.length > 0 ? (
                majors.map((major) => (
                  <MenuItem key={major.idMajor} value={major.idMajor}>
                    {major.titleMajor}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>No majors available</MenuItem>
              )}
            </Select>
          </FormControl>

          {/* Submit and Cancel Buttons */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "30px",
            }}
          >
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

export default ModalUpdateCategory;
