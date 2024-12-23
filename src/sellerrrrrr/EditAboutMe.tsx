import React, { useState } from "react";
import {
  Modal,
  Box,
  DialogTitle,
  FormControl,
  FormLabel,
  TextField,
  Button,
} from "@mui/material";
import { useHistory } from "react-router-dom";
import { updateAboutMe } from "../api.seller"; // Import the API function

const EditAboutMe = () => {
  const [open, setOpen] = useState(true); // Modal state to control opening/closing
  const [description, setDescription] = useState(
    JSON.parse(localStorage.getItem("userInfo") || "{}").description || ""
  ); // State for "About Me"
  const [loading, setLoading] = useState(false); // State to show loading state
  const history = useHistory();

  // Close modal and redirect
  const handleCloseEdit = () => {
    history.push("/ProfileSeller"); // Redirect to ProfileSeller
    setOpen(false); // Close the modal
  };

  // Form submit handler
  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent default form submission behavior

    setLoading(true); // Set loading state
    try {
      // Call the API to update "About Me"
      await updateAboutMe(description);

      // Update localStorage with the new description
      const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
      userInfo.description = description;
      localStorage.setItem("userInfo", JSON.stringify(userInfo));

      alert("About Me updated successfully!"); // Show success message
      handleCloseEdit(); // Close modal after success
    } catch (error) {
      console.error("Failed to update About Me:", error);
      alert("Failed to update About Me. Please try again."); // Show error message
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleCloseEdit} // Close modal when clicking outside
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
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
        {/* Header Section */}
        <Box
          sx={{
            backgroundColor: "#0094FF",
            borderRadius: "10px 10px 0 0",
            display: "flex",
            justifyContent: "center",
            padding: "20px",
            marginBottom: "20px",
          }}
        >
          <DialogTitle
            sx={{
              padding: 0,
              color: "white",
              fontSize: "18px",
            }}
          >
            Edit Description
          </DialogTitle>
        </Box>

        {/* Form Section */}
        <form onSubmit={handleFormSubmit}>
          <Box
            sx={{
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {/* Input Field */}
            <FormControl>
              <FormLabel>Description*</FormLabel>
              <TextField
                sx={{ width: "100%" }}
                value={description}
                onChange={(e) => setDescription(e.target.value)} // Update state on change
                required
                multiline
                rows={4}
                placeholder="Write about yourself here..."
                disabled={loading} // Disable input while submitting
              />
            </FormControl>

            {/* Action Buttons */}
            <Box display="flex" justifyContent="space-between" mt={1}>
              <Button
                variant="contained"
                color="error"
                onClick={handleCloseEdit} // Close modal on cancel
                sx={{ width: "150px" }}
                disabled={loading} // Disable button while submitting
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{ width: "150px" }}
                disabled={loading} // Disable button while submitting
              >
                {loading ? "Submitting..." : "Submit"} {/* Show loading state */}
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default EditAboutMe;
