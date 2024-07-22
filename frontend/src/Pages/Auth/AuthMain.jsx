import { Box, TextField } from "@mui/material";
import React, { useState } from "react";
import Register from "./Register";
import { Link, useLocation } from "react-router-dom";
import Login from "./Login";

const AuthMain = ({VerifyToken}) => {
  const { pathname } = useLocation();
  const [detail, setDetail] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetail((prevDetail) => ({
      ...prevDetail,
      [name]: value,
    }));
  };

  return (
    <Box display={"flex"} height={"calc(100vh - 80px)"}>
      <Box
        sx={{
          display: { xs: "none", lg: "block" },
          height: "calc(100vh - 80px)",
          width: "70%",
          overflow: "hidden",
        }}
      >
        <img
          style={{ height: "100%", width: "115%", objectFit: "cover" }}
          src="https://as1.ftcdn.net/v2/jpg/07/45/88/72/1000_F_745887225_U3LowO88iq9Sy9IyKlCgzJDpo0FLfdXS.jpg"
          alt="Login image"
        />
      </Box>
      <Box
        sx={{
          height: "100%",
          width: { xs: "100%", lg: "30%" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1 className="font-bold text-5xl mt-10 lg:text-[3.5vw]">worD.</h1>
        <p className="uppercase">
          {pathname === "/login" ? "login" : "register"}
        </p>
        <div className="mt-14 flex flex-col w-[70%] gap-6">
          <TextField
            id="standard-basc"
            label="Username"
            variant="standard"
            name="username"
            value={detail.username}
            onChange={handleChange}
          />
          <TextField
            id="standard-basic"
            label="Password"
            variant="standard"
            type="password"
            name="password"
            value={detail.password}
            onChange={handleChange}
          />
          <div className="mt-12">
            {pathname === "/login" ? (
              <Login VerifyToken={VerifyToken} detail={detail} />
            ) : (
              <Register detail={detail} />
            )}
          </div>
        </div>
        <p className="mt-10">
          {pathname === "/login"
            ? "Don't have an account? "
            : "Already have an account? "}
          <Link
            to={pathname === "/login" ? "/register" : "/login"}
            className=" underline cursor-pointer"
          >
            {pathname === "/login" ? "Register" : "Login"}
          </Link>
        </p>
      </Box>
    </Box>
  );
};

export default AuthMain;
