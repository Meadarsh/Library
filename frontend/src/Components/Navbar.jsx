import { Box, Button, Divider, Tooltip, Typography, useTheme } from "@mui/material";
import { BookCheck, User } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BorrowedBook from "./BorrowedBook";

const Navbar = ({Logout,loggedin}) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const ToggleDrawer = () => {
    setOpen((prev) => {
      return !prev;
    });
  };
 
  return (
    <Box
      sx={{
        width: "100%",
        height: 80,
        px: { xs: 2, lg: 15 },
        bgcolor: theme.palette.secondary.background,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography sx={{ fontWeight: 600, fontSize: { xs: 32, lg: 30 } }}>
        worD.
      </Typography>
      <Box
        sx={{
          display: { xs: "none", lg: "flex" },
          alignItems: "center",
          gap: 2,
          fontWeight: 600,
        }}
      >
        <Link to="/">
          <Button>Home</Button>
        </Link>
        <Button>Category</Button>
        <Button>About Us</Button>
        <Button>Support</Button>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", fontWeight: 600 }}>
        
      <Tooltip title="To open this borrow a book"><Button onClick={ToggleDrawer}>
          <BookCheck /><span className="hidden lg:block">Borrowed</span>
        </Button>
        </Tooltip>
        <Divider orientation="vertical" flexItem />
        {loggedin ? (
          <Button onClick={Logout}>
            <User />
            &nbsp;Logout
          </Button>
        ) : (
          <Link to="/login">
            <Button>
              <User />
              &nbsp;Login
            </Button>
          </Link>
        )}
      </Box>
      <BorrowedBook open={open} toggleDrawer={ToggleDrawer} />
    </Box>
  );
};

export default Navbar;
