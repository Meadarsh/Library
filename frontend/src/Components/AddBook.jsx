import { Box, Button, Drawer, TextField, Typography } from "@mui/material";
import React from "react";

const AddBook = ({ toggleDrawer,refresh, data = false, open }) => {
  const [detail, setDetail] = React.useState({
    title: data.title||"",
    author: data.author||"",
    image: data.image||"",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetail((prevDetail) => ({
      ...prevDetail,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found");
    }
    try {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(detail),
      };
      const responce = await fetch(
        `${import.meta.env.VITE_API_URL}/api/book/add`,
        requestOptions
      );
      const data = await responce.json();
      toggleDrawer()
      refresh()
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdate = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found");
    }
    try {
      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(detail),
      };
      const responce = await fetch(
        `${import.meta.env.VITE_API_URL}/api/book/edit/${data._id}`,
        requestOptions
      );
      const result = await responce.json();
      toggleDrawer()
      refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Drawer anchor="right" open={open} onClose={toggleDrawer}>
      <Box sx={{ p: 2, width: { xs: "100%", lg: "25vw" } }}>
        <Typography sx={{ fontWeight: 700, fontSize: 30 }}>
         {data?'Update Book':'Add new book'}
        </Typography>
        <span>All fields are required</span>
        <TextField
          id="book-title"
          label="Book Title"
          variant="standard"
          type="text"
          name="title"
          value={detail.title}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          id="book-author"
          label="Author"
          variant="standard"
          type="text"
          name="author"
          value={detail.author}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          id="book-image"
          label="Image URL"
          variant="standard"
          type="text"
          name="image"
          value={detail.image}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        {data?<Button
          onClick={handleUpdate}
          variant="contained"
          sx={{ width: "100%", mt: 2 }}
        >
          Update
        </Button>:
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{ width: "100%", mt: 2 }}
        >
          Save
        </Button>}
      </Box>
    </Drawer>
  );
};

export default AddBook;
