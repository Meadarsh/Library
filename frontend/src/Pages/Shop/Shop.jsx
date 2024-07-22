import { Box, Card, Grid, Typography } from "@mui/material";
import React from "react";
import BookCard from "./Components/Card";

const Shop = ({ data, refresh, admin }) => {
  return (
    <Box
      display={"flex"}
      gap={5}
      flexDirection={"column"}
      alignItems={"center"}
      p={{ xs: 3, lg: 5 }}
    >
      <Box sx={{ bgcolor: "black", p: { xs: "2px", lg: "10px 30px" } }}>
        <Typography sx={{ fontWeight: 600, color: "white", fontSize: 20 }}>
          Books
        </Typography>
      </Box>
      <Grid
        container
        justifyContent={{ xs: "center", lg: "start" }}
        spacing={{ xs: 1, md: 3 }}
        gap={{ sx: 1, lg: 2 }}
        columns={{ xs: 4, sm: 8, md: 16 }}
      >
        {data?.map((_, index) => (
          <Grid item xs={3} sm={2} md={3} key={index}>
            <BookCard refresh={refresh} admin={admin} _={_} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Shop;
