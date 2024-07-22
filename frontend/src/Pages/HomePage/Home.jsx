import { Button, Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import SideImage from "./Components/SideImage";
import Shop from "../Shop/Shop";
import { useEffect, useState } from "react";
import AddBook from "../../Components/AddBook";
import { BookPlus } from "lucide-react";

const Home = ({ admin }) => {
  const theme = useTheme();
  const [data, setData] = useState([]);
  const [addBook, setAddBook] = useState(false);

  const GetBooks = async () => {
    const responce = await fetch(`${import.meta.env.VITE_API_URL}/api/book/`);
    const data = await responce.json();
    setData(data);
  };
  useEffect(() => {
    GetBooks();
  }, []);
  const ToggleAddBookDrawer = () => {
    setAddBook((prev) => {
      return !prev;
    });
  };
  return (
    <>
    <AddBook refresh={GetBooks} open={addBook} toggleDrawer={ToggleAddBookDrawer} />
      <Box
        sx={{
          px: { xs: 3, lg: 10 },
          bgcolor: theme.palette.secondary.background,
          height: "50vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
          flexDirection: { xs: "column-reverse", lg: "row" },
        }}
      >
        <Box>
          <Typography
            sx={{
              fontWeight: "700",
              lineHeight: { xs: "95%", lg: "100%" },
              fontSize: { xs: "15vw", lg: "6.5vw" },
            }}
          >
            Find Your
            <br />
            Next Book
          </Typography>
        </Box>
        <Box sx={{ width: { lg: "30%" } }}>
          <SideImage />
        </Box>
      </Box>
     {admin=='true'&&<Box sx={{width:'100%',p:3,display:'flex',justifyContent:'end'}}>
          <Button variant="contained" onClick={ToggleAddBookDrawer}>
            <BookPlus />&nbsp; Add Book
          </Button>
      </Box>}
      <Shop refresh={GetBooks} admin={admin} data={data} />
    </>
  );
};

export default Home;
