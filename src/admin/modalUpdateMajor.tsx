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
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { updateMajor, deleteMajor } from "./api.admin";
import { Major } from "./majorManagement";
import { useHistory } from "react-router-dom";

interface EditMajorModalProps {
  majorData: Major;
  onClose: () => void;
  onSave: (updatedMajor: Major) => void;
  onDeleteSuccess: () => void;
}

const ModalUpdateMajor: React.FC<EditMajorModalProps> = ({
  majorData,
  onClose,
  onSave,
  onDeleteSuccess,
}) => {
  const [formData, setFormData] = useState<Major>({
    idMajor: "",
    titleMajor: "",
    iconUrl: "",
  });
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false); // State untuk dialog konfirmasi
  const history = useHistory();

  useEffect(() => {
    if (majorData) {
      setFormData({
        idMajor: majorData.idMajor || "",
        titleMajor: majorData.titleMajor || "",
        iconUrl: majorData.iconUrl || "",
      });
    }
  }, [majorData]);

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!formData.idMajor || !formData.titleMajor) {
      alert("Major ID and Major Name are required.");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("userToken");
      if (!token) {
        alert("No token found. Please login again.");
        return;
      }

      await updateMajor(token, {
        id_major: formData.idMajor,
        title_major: formData.titleMajor,
        icon_url: formData.iconUrl,
      });

      alert("Major updated successfully!");
      onSave(formData);
      handleClose();
    } catch (error) {
      console.error("Error updating major:", error);
      alert("Failed to update the major.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!majorData.idMajor) {
      alert("Invalid major ID.");
      return;
    }

    try {
      setLoading(true);
      await deleteMajor(majorData.idMajor);
      alert("Major deleted successfully!");
      onDeleteSuccess();
      handleClose();
    } catch (error) {
      console.error("Error deleting major:", error);
      alert("Failed to delete major. Please try again.");
    } finally {
      setLoading(false);
      setDeleteDialogOpen(false); // Tutup dialog konfirmasi setelah selesai
    }
  };

  const handleClose = () => {
    history.push("/majorManagement");
    setOpen(false);
    onClose();
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
          {/* Header */}
          <Box
            sx={{
              position: "sticky",
              top: 0,
              height: "100px",
              backgroundColor: "#0094FF",
              borderRadius: "10px 10px 0 0",
              display: "flex",
              justifyContent: "center", // Pastikan konten di tengah horizontal
              alignItems: "center",    // Pastikan konten di tengah vertikal
              padding: "10px",
            }}
          >
            <DialogTitle
              sx={{
                margin: 0,
                color: "white",
                fontSize: "18px",
                textAlign: "center", // Tambahkan text-align

              }}
            >
              Edit Major
            </DialogTitle>
            <IconButton
              onClick={handleClose}
              sx={{
                position: "absolute", // Buat tombol silang tetap di pojok kanan
                right: "10px",

                color: "white",
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Form */}
          <form onSubmit={handleFormSubmit} style={{ padding: "20px" }}>
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <FormLabel>Link Icon SVG</FormLabel>
              <TextField
                name="iconUrl"
                value={formData.iconUrl}
                onChange={(e) =>
                  setFormData({ ...formData, iconUrl: e.target.value })
                }
              />
            </FormControl>

            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <FormLabel>Major Name</FormLabel>
              <TextField
                name="titleMajor"
                value={formData.titleMajor}
                onChange={(e) =>
                  setFormData({ ...formData, titleMajor: e.target.value })
                }
                required
              />
            </FormControl>

            {/* Buttons */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "30px",
              }}
            >
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

      {/* Dialog Konfirmasi Delete */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        sx={{
          '& .MuiDialog-paper': {
            width: '350px', // Sesuaikan dengan lebar modal utama
            borderRadius: '8px', // Sesuaikan dengan border modal utama
            maxHeight: '90vh', // Sama seperti modal utama
          },
        }}
      >
        <DialogTitle >Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this major? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{
      padding: '16px', // Konsisten dengan padding modal utama
      display: 'flex',
      justifyContent: 'space-between', // Untuk mengatur posisi tombol
    }}>
          <Button
            onClick={() => setDeleteDialogOpen(false)}
            color="primary"
            variant="outlined"

          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
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

export default ModalUpdateMajor;
