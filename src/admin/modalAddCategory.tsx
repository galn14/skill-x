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
import { createCategory } from "./api.admin"; // Assuming this function is for category creation
import { useHistory } from "react-router-dom";
import { fetchMajors } from "./api.admin"; // Function to fetch majors

type FormData = {
  categoryName: string;
  iconLink: string;
  title_major: string; // Store major title (not majorId)
};

const ModalAddCategory = () => {
  const [open, setOpen] = useState(true); // Modal state
  const [formData, setFormData] = useState<FormData>({
    categoryName: "",
    iconLink: "",
    title_major: "", // Store major title here
  });
  const [majors, setMajors] = useState<any[]>([]); // Store majors data
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const history = useHistory();

  // Fetching the majors
  useEffect(() => {
    const getMajors = async () => {
      try {
        const response = await fetchMajors(); // Fetch the majors list
        setMajors(response); // Set the majors to state
      } catch (error) {
        console.error("Failed to fetch majors", error);
      }
    };
    getMajors();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const selectedMajorTitle = event.target.value; // Get selected major title
    setFormData((prev) => ({
      ...prev,
      title_major: selectedMajorTitle, // Update formData with title_major (major title)
    }));
    console.log("Selected Major Title:", selectedMajorTitle);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrors({}); // Reset errors before submitting

    // Validation
    if (!formData.categoryName || !formData.iconLink || !formData.title_major) {
      setErrors({
        categoryName: formData.categoryName ? "" : "Category name is required.",
        iconLink: formData.iconLink ? "" : "Icon link is required.",
        title_major: formData.title_major ? "" : "Major is required.", // Ensure major is validated
      });
      return;
    }

    try {
      const userToken = localStorage.getItem("userToken");
      if (!userToken) {
        alert("You are not logged in!");
        history.push("/login");
        return;
      }

      // Map FormData to the expected format
      const categoryData = {
        title: formData.categoryName,
        iconUrl: formData.iconLink,
        title_major: formData.title_major, // Send title_major to the backend
      };
      console.log("Request data:", categoryData);

      if (!categoryData.title_major) {
        alert("Please select a valid major.");
        return;
      }

      console.log("Sending request with data:", categoryData);

      await createCategory(categoryData); // Assuming createCategory function is available
      alert("Category added successfully!");

      setOpen(false); // Close modal
      // Refresh the category management page
      history.replace("/categoryManagement");
      window.location.reload(); // Ensure the page reloads to show the new data
    } catch (error) {
      console.error("Error adding category:", error);
      alert("Failed to add category. Please try again.");
    }
  };

  const handleClose = () => {
    setOpen(false);
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
            Add New Category
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
              value={formData.title_major} // Value should now be title_major (title of selected major)
              onChange={handleSelectChange}
              label="Major"
            >
              {majors.length > 0 ? (
                majors.map((major) => (
                  <MenuItem key={major.idMajor} value={major.titleMajor}>
                    {major.titleMajor}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>No majors available</MenuItem>
              )}
            </Select>
          </FormControl>

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

export default ModalAddCategory;
