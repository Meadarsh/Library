const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./Routes/auth");
const bookRoutes = require("./Routes/book");
const cors = require("cors");
require("dotenv").config();

const app = express();

connectDB();
app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/book", bookRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
