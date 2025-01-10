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
  CircularProgress,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { updateCategory, deleteCategory, fetchMajors } from "./api.admin"; // Assume these functions exist
import { useHistory } from "react-router-dom";
import { SelectChangeEvent } from "@mui/material";

type FormData = {
  categoryName: string;
  iconLink: string;
  id_major: string; // Store major ID
};

interface EditCategoryModalProps {
  categoryData: any; // Category data to edit
  onClose: () => void;
  onSave: (updatedCategory: any) => void;
  onDeleteSuccess: () => void;
}

const ModalUpdateCategory: React.FC<EditCategoryModalProps> = ({
  categoryData,
  onClose,
  onSave,
  onDeleteSuccess,
}) => {
  const [open, setOpen] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    categoryName: "",
    iconLink: "",
    id_major: "",
  });
  const [majors, setMajors] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false); // State for delete confirmation
  const history = useHistory();

  useEffect(() => {
    const fetchMajorData = async () => {
      try {
        const response = await fetchMajors();
        setMajors(response);
      } catch (error) {
        console.error("Failed to fetch majors:", error);
      }
    };

    fetchMajorData();

    if (categoryData) {
      setFormData({
        categoryName: categoryData.title || "",
        iconLink: categoryData.photo_url || "",
        id_major: categoryData.id_major || "",
      });
    }
  }, [categoryData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    setFormData((prev) => ({ ...prev, id_major: e.target.value as string }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const updatedCategory = {
        title: formData.categoryName,
        iconUrl: formData.iconLink,
        id_major: formData.id_major,
      };

      await updateCategory(categoryData.id_category, updatedCategory);
      alert("Category updated successfully!");
      onSave(updatedCategory);
      handleClose();
    } catch (error) {
      console.error("Failed to update category:", error);
      alert("Failed to update the category. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id_category: string) => { // Mark as async
    console.log('Deleting category with id:', id_category); // Log the id_category value 
    if (!id_category) {
      console.error('id_category is undefined or empty');
      return;
    }
  
    try {
      // Proceed with the delete operation
      await deleteCategory(id_category); // Ensure deleteCategory is awaited
      alert('Category deleted successfully');
      onDeleteSuccess(); // Call onDeleteSuccess if deletion is successful
      handleClose();

    } catch (error) {
      console.error('Error deleting category:', error);
      alert('Failed to delete the category. Please try again.');
    }finally {
      setLoading(false);
      setDeleteDialogOpen(false); // Tutup dialog konfirmasi setelah selesai
    }
  };
  
  

  const handleClose = () => {
    setOpen(false);
    if (onClose) {
      onClose(); // Pastikan ini dipanggil
    }
        history.push("/categoryManagement");
  };

  return (
    <>
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
              backgroundColor: "#0094FF",
              borderRadius: "10px 10px 0 0",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "10px",
            }}
          >
            <DialogTitle sx={{ color: "white", fontSize: "18px", textAlign: "center" }}>
              Edit Category
            </DialogTitle>
            <IconButton
              onClick={handleClose}
              sx={{ position: "absolute", right: "10px", color: "white" }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <form onSubmit={handleFormSubmit} style={{ padding: "20px" }}>
            <TextField
              label="Category Name"
              name="categoryName"
              value={formData.categoryName}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Icon Link"
              name="iconLink"
              value={formData.iconLink}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Major</InputLabel>
              <Select
                value={formData.id_major}
                onChange={handleSelectChange}
                required
              >
                {majors.map((major) => (
                  <MenuItem key={major.idMajor} value={major.idMajor}>
                    {major.titleMajor}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: "30px" }}>
              <Button
                variant="contained"
                color="error"
                onClick={() => setDeleteDialogOpen(true)}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : "Delete"}
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : "Save"}
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>

      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this category? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
  <Button onClick={() => setDeleteDialogOpen(false)} color="primary" variant="outlined">
    Cancel
  </Button>
  <Button
    onClick={() => handleDelete(categoryData.id_category)} // Pass the id_category here
    color="error"
    variant="contained"
    disabled={loading}
  >
    {loading ? <CircularProgress size={24} color="inherit" /> : "Delete"}
  </Button>
</DialogActions>
      </Dialog>
    </>
  );
};

export default ModalUpdateCategory;
