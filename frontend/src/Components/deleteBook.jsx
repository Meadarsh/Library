import { Box, Button, Dialog, Typography } from '@mui/material'
import React from 'react'

const DeleteBook = ({open,handleClose}) => {
  const DeleteBookById = async () => {
    try {
      const responce = await fetch(
        `${import.meta.env.VITE_API_URL}/api/book/delete/${open}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await responce.json();
      if (data) {
        handleClose();
      }
    } catch (err) {
      alert(err.message);
    }
  };
  return (
    <Dialog
    open={open}
    onClose={handleClose}>
      <Box sx={{p:2}}>
        <Typography sx={{fontWeight:600,fontSize:20}}>Delete Book</Typography>
        <Typography>You can't recover it after deleting</Typography>
        <Box sx={{display:'flex',gap:2,justifyContent:'end',mt:3}}>
          <Button variant='outlined' onClick={handleClose}>Cancel</Button>
          <Button variant='contained' onClick={DeleteBookById}>Delete</Button>
          </Box>
        </Box>
    </Dialog>
  )
}

export default DeleteBook