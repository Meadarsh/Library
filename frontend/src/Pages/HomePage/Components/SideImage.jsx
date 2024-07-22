import { Box } from "@mui/material";
import React from "react";

const SideImage = () => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 3,
      }}
    >
      {imageUrl.map((url, ind) => (
        <Box
          key={ind}
          width={"30%"}
          height={{ xs: "80%", lg: 200 }}
          sx={{
            borderRadius: ind == 1 ? "0px 0px 100px 100px" : "120px 120px 0 0",
            overflow: "hidden",
          }}
        >
          <img
            width="100%"
            height="100%"
            className="object-cover"
            src={url}
            alt="book image"
          />
        </Box>
      ))}
    </Box>
  );
};

export default SideImage;

const imageUrl = [
  "https://images.booksense.com/images/296/260/9782382260296.jpg",
  "https://i0.wp.com/thegemsbok.com/wp-content/uploads/2015/11/The-Stranger-book-cover.png?resize=262%2C400",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWUdRfMIlHZW4LfTq-dzLZ44UP0pLZmPlrEA&s",
];
