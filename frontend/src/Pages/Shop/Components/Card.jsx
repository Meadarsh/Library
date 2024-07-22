import {
  Box,
  Button,
  Card,
  CircularProgress,
  Dialog,
  Typography,
} from "@mui/material";
import { BookPlus, Pencil, Trash } from "lucide-react";
import React, { useState } from "react";
import DeleteBook from "../../../Components/deleteBook";
import AddBook from "../../../Components/AddBook";

const BookCard = ({ _, refresh, admin }) => {
  const [loading, setLoading] = useState(false);
  const [editBook, setEditBook] = useState(false);
  const [bookIdToDelete, setBookIdtoDelete] = useState(false);
  const Borrow = async () => {
    setLoading(true);
    try {
      const responce = await fetch(
        `${import.meta.env.VITE_API_URL}/api/book/borrow/${_._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await responce.json();
      if (data.success) {
        alert("Book Borrowed Successfully");
      } else {
        alert(data.message);
      }
      refresh();
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const DeleteBookfunc = () => {
    setBookIdtoDelete(_._id);
  };

  return (
    <>
      <AddBook
        open={editBook}
        data={_}
        refresh={refresh}
        toggleDrawer={() => setEditBook(false)}
      />
      <DeleteBook
        open={bookIdToDelete}
        handleClose={() => {
          setBookIdtoDelete(false);
          refresh();
        }}
      />
      <Card
        sx={{
          p: 2,
          position: "relative",
          display: "flex",
          justifyContent: "center",
          mt: 2,
          flexDirection: "column",
        }}
      >
        <img
          style={{ height: "200px", objectFit: "cover", width: "auto" }}
          src={_.image}
          alt="Book image"
        />
        <Typography
          sx={{ fontSize: 20, mt: 1, lineHeight: 1, fontWeight: 500 }}
        >
          {_.title}
        </Typography>
        <Typography sx={{ fontSize: 15, mb: 2 }}>{_.author}</Typography>
        <Button onClick={Borrow}>
          {loading ? (
            <CircularProgress size={20} />
          ) : (
            <>
              <BookPlus size={20} />
              &nbsp;Borrow
            </>
          )}
        </Button>
        {admin == "true" && (
          <Box
            sx={{
              position: "absolute",
              color: "white",
              borderRadius: 3,
              bgcolor: "black",
              top: 2,
              right: 2,
              padding: 1,
              display: "flex",
              gap: 2,
            }}
          >
            <Pencil onClick={setEditBook} />
            <Trash onClick={DeleteBookfunc} />
          </Box>
        )}
      </Card>
    </>
  );
};

export default BookCard;
