import {
  Box,
  Button,
  Drawer,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";

const BorrowedBook = ({ toggleDrawer, open }) => {
  const theme = useTheme();

  const [books, setBooks] = useState([])
  const GetBooks = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found");
    }
    try {
      const responce = await fetch(`${import.meta.env.VITE_API_URL}/api/book/borrowed`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await responce.json();
     if(data.length>0){
      setBooks(data);
     }else{
        setBooks([]);
        toggleDrawer()
     }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (open) GetBooks();
  }, [open]);
  const Return = async (id) => {
    try {
      const responce = await fetch(
        `${import.meta.env.VITE_API_URL}/api/book/return/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("Book Returned Successfully");
    } catch (err) {
      alert(err.message);
    } finally {
      GetBooks();
    }
  };
  return (
    <Drawer anchor="right" open={open} onClose={toggleDrawer}>
      <Box sx={{ p: 1, width: { xs: "100%", lg: "30vw" } }}>
        <Typography sx={{ fontWeight: 700, fontSize: 30 }}>
          Books you have
        </Typography>
        <Box>
          {books&&books?.map((_, ind) => {
            return (
              <Box
                key={ind}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mt: 2,
                  p: 2,
                  border: "1px solid black",
                  borderRadius: 5,
                  bgcolor: theme.palette.secondary.background,
                }}
              >
                <img
                  style={{ height: "100px", objectFit: "cover", width: "auto" }}
                  src={_.image}
                  alt="Book image"
                />
                <Box>
                  <Typography
                    sx={{ fontSize: 20, mt: 1, lineHeight: 1, fontWeight: 500 }}
                  >
                    {_.title}
                  </Typography>
                  <Typography sx={{ fontSize: 15, mb: 2 }}>
                    {_.author}
                  </Typography>
                </Box>
                <Button onClick={() => Return(_._id)} variant="contained">
                  Return
                </Button>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Drawer>
  );
};

export default BorrowedBook;
