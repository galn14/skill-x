import React, { useState } from "react";
import { Modal, Box, DialogTitle, Select, MenuItem, FormControl, InputLabel, Button } from "@mui/material";
import { useHistory } from "react-router-dom";

const AddSkill = () => {
  const [open, setOpen] = useState(true); // Modal state
  const [selectedSkill, setselectedSkill] = useState(""); // Selected category
  const history = useHistory();

  const skills = ["Photography", "Web Development", "Graphic Design", "Tutoring", "Video Editing"];

  // Handle form submit
  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Selected Skill:", selectedSkill);
    handleClose(); // Close modal after form submission
  };

  // Modal close handler
  const handleClose = () => {
    setOpen(false);
    history.push("/ProfileSeller"); // Redirect to the profile page
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
        marginTop: "20px",
        marginBottom: "20px",
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
              padding: 0,
              color: "white",
              fontSize: "18px",
              textAlign: "center",
            }}
          >
            Add New Skill
          </DialogTitle>
        </Box>

        <form onSubmit={handleFormSubmit} style={{ padding: "20px" }}>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              value={selectedSkill}
              onChange={(e) => setselectedSkill(e.target.value)}
              required
            >
              {skills.map((skill) => (
                <MenuItem key={skill} value={skill}>
                  {skill}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box display="flex" justifyContent="space-between" mt={1}>
              <Button
                variant="contained"
                color="error"
                onClick={handleClose}  // Close modal on cancel
                sx={{ width: '150px' }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{ width: '150px' }}
              >
                Submit
              </Button>
            </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default AddSkill;
