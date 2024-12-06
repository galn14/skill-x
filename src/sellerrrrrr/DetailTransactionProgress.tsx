import React, { useState } from "react";
import {
  Menu,
  MenuItem,
  Box,
  Typography,
  Checkbox,
  Button,
  Divider,
  TextField,
  IconButton,
  Modal,
} from "@mui/material";
import { AppBar, Toolbar } from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';
import MailIcon from '@mui/icons-material/Mail';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { CssBaseline } from '@mui/material';
import '@fontsource/poppins';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { IonPage, IonContent } from '@ionic/react';
import { useHistory } from 'react-router';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


const DetailTransactionProgress: React.FC = () => {
  const transactionDetail = {
    id: "TRX12345",
    customerName: "dor",
    orderDate: "2024-11-20",
    orderTime: "14:30",
    notes: "Kerjain yang bener bro.",
    price: 1500000,
  };

  const theme = createTheme({
    typography: {
      fontFamily: '"Poppins"',
    },
  });

  const history = useHistory();
  const isLoggedIn = !!localStorage.getItem('userToken');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [status, setStatus] = useState("In Progress");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editText, setEditText] = useState("");
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
    handleMenuClose();
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const [items, setItems] = useState([
    { id: "1", text: "Table A", completed: false },
    { id: "2", text: "Item 2", completed: false },
    { id: "3", text: "Item 3", completed: false }
  ]);
  const [newItem, setNewItem] = useState("");

  const handleAddItem = () => {
    if (newItem.trim() !== "") {
      setItems([...items, { id: Date.now().toString(), text: newItem, completed: false }]);
      setNewItem("");
    }
  };

  const handleDelete = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleToggleCompletion = (id: string) => {
    setItems(items.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item)));
  };

  const handleEditClick = (id: string, currentText: string) => {
    setEditingItemId(id);
    setEditText(currentText);
    setIsEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
    setEditingItemId(null);
    setEditText("");
  };

  const handleEditSave = () => {
    if (editingItemId && editText.trim() !== "") {
      setItems(items.map((item) => (item.id === editingItemId ? { ...item, text: editText } : item)));
      handleEditModalClose();
    }
  };

  const handleMessageButtonClick = () => {
    if (isLoggedIn) {
      history.push('/message');
    } else {
      history.push('/login');
    }
  };

  const handleNotificationButtonClick = () => {
    if (isLoggedIn) {
      history.push('/notification');
    } else {
      history.push('/login');
    }
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    const reorderedItems = Array.from(items);
    const [movedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, movedItem);
    setItems(reorderedItems);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <IonPage style={{ overflow: 'auto' }}>
        <AppBar position="fixed" style={{ backgroundColor: 'white', borderBottomLeftRadius: '30px', borderBottomRightRadius: '30px', height: '82px', paddingTop: '25px' }}>
          <Toolbar style={{ height: '100%', alignItems: 'flex-end', paddingBottom: '10px' }}>
            <Box display="flex" alignItems="center" sx={{ width: '100%' }}>
              <img src="../public/SkillXLogo.png" alt="SkillX Logo" className="logo" style={{ marginRight: 'auto', height: '40px' }} />
              <IconButton color="primary" onClick={handleNotificationButtonClick}>
                <NotificationsIcon />
              </IconButton>
              <IconButton color="primary" onClick={handleMessageButtonClick}>
                <MailIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>

        <IonContent>
          <Box
            padding={2}
            sx={{
              marginTop: "100px",
              marginLeft: "20px",
              marginRight: "20px",
              borderColor: "#3CB232",
              borderWidth: 3,
              borderStyle: "solid",
              borderRadius: "27px",
            }}
          >
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "#3CB232" }}>
                {status}
              </Typography>
              <IconButton onClick={handleMenuOpen} sx={{ color: "#3CB232", marginLeft: "1px" }} size="small">
                <EditIcon />
              </IconButton>
            </Box>

            <Menu
              anchorEl={anchorEl}
              open={isMenuOpen}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              {["Pending", "In Progress", "Complete", "Refunded"].map((option) => (
                <MenuItem key={option} onClick={() => handleStatusChange(option)} selected={option === status}>
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box mt={2} p={2} border={1} borderRadius={2} borderColor="#ccc" style={{ marginLeft: '20px', marginRight: '20px', borderRadius: '27px' }}>
            <Typography variant="h6" fontWeight="bold" sx={{ textAlign: 'center' }}>
              Package Database Website
            </Typography>
            <Divider />
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body2" sx={{ marginTop: '6px' }}>Customer:</Typography>
              <Typography variant="body2" sx={{ marginTop: '6px', color: '#0094FF' }}>{transactionDetail.customerName}</Typography>
            </Box>
            <Typography variant="body2">Order Date: <strong>07-11-2024</strong></Typography>
            <Typography variant="body2">Notes: yang bener bikinnya bro</Typography>
            <Typography variant="body2">Price: Rp 500.000</Typography>
          </Box>

          <Box mt={3} p={2} borderRadius={2} border={1} borderColor="#ccc" style={{ marginLeft: '20px', marginRight: '20px' }}>
            <Typography variant="subtitle1" fontWeight="bold">To-do List</Typography>
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="todoList">
                {(provided) => (
                  <Box ref={provided.innerRef} {...provided.droppableProps}>
                    {items.map((item, index) => (
                      <Draggable key={item.id} draggableId={item.id} index={index}>
                        {(provided) => (
                          <Box
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            display="flex"
                            alignItems="center"
                            mt={1}
                            border={1}
                            borderRadius={2}
                            p={1}
                            borderColor="#ccc"
                          >
                            <Checkbox
                              checked={item.completed}
                              onChange={() => handleToggleCompletion(item.id)}
                            />
                            <Typography
                              sx={{
                                textDecoration: item.completed ? 'line-through' : 'none',
                                color: item.completed ? 'gray' : 'black',
                                flexGrow: 1,
                              }}
                            >
                              {item.text}
                            </Typography>
                            <IconButton onClick={() => handleEditClick(item.id, item.text)}>
                              <EditIcon />
                            </IconButton>
                            <IconButton onClick={() => handleDelete(item.id)}>
                              <DeleteIcon />
                            </IconButton>
                          </Box>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </Box>
                )}
              </Droppable>
            </DragDropContext>
            <Box mt={2} display="flex">
              <TextField
                fullWidth
                label="New Task"
                variant="outlined"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
              />
              <Button variant="contained" color="primary" sx={{ ml: 1 }} onClick={handleAddItem}>
                Add
              </Button>
            </Box>
          </Box>
          
          <Modal open={isEditModalOpen} onClose={handleEditModalClose}>
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: 'white',
                padding: 4,
                borderRadius: 2,
                boxShadow: 24,
                minWidth: 300,
              }}
            >
              <Typography variant="h6" mb={2}>Edit Task</Typography>
              <TextField
                fullWidth
                label="Edit Task"
                variant="outlined"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
              <Box mt={2} display="flex" justifyContent="flex-end">
                <Button variant="outlined" onClick={handleEditModalClose} sx={{ marginRight: 1 }}>Cancel</Button>
                <Button variant="contained" color="primary" onClick={handleEditSave}>Save</Button>
              </Box>
            </Box>
          </Modal>
          {/* Meeting Section */}
          <Box mt={3} p={2} borderRadius={2} border={1} borderColor="#ccc" style={{ marginLeft: '20px', marginRight: '20px' }}>
  <Typography variant="subtitle1" fontWeight="bold" mb={2}>
    Meeting
  </Typography>
  
  <Box display="flex" flexDirection="column" gap={1}>
    <Box display="flex" alignItems="center">
      <Checkbox defaultChecked />
      <Typography variant="body2" ml={1}>Requirement / Brainstorming</Typography>
    </Box>
    <Box display="flex" alignItems="center">
      <Checkbox />
      <Typography variant="body2" ml={1}>Progress</Typography>
    </Box>
    <Box display="flex" alignItems="center">
      <Checkbox />
      <Typography variant="body2" ml={1}>Final</Typography>
    </Box>
  </Box>

  <Divider sx={{ my: 2 }} />
  <Typography variant="body2" fontWeight="bold" sx={{ mb: 2 }}>
  Upcoming Meeting: <span style={{ color: 'blue' }}>10-11-2024</span>
</Typography>

{/* Create Meeting Button */}
<Button
  variant="contained"
  size="small"
  sx={{
    mt: 2,
    bgcolor: "#3CB232",
    color: "white",
    "&:hover": {
      bgcolor: "#2a9e1e",
    },
    display: "block",
    mx: "auto", // Center the button horizontally
  }}
>
  Create Meeting
</Button>
</Box>

{/* Cancel Order Button */}
<Box sx={{ mx: "20px" }}>
  <Button
    variant="contained"
    color="error"
    fullWidth
    sx={{
      mt: 4,
      bgcolor: "#d32f2f",
      color: "white",
      "&:hover": {
        bgcolor: "#b71c1c",
      },
    }}
  >
    Cancel Order
  </Button>
</Box>


        </IonContent>
      </IonPage>
    </ThemeProvider>
  );
};

export default DetailTransactionProgress;
