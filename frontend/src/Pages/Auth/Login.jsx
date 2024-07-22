import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ detail,VerifyToken }) => {
  const navigate = useNavigate();
  const Submit = async () => {
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(detail),
      };
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        requestOptions
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const { token, admin } = data;
      localStorage.setItem("token", token);
      localStorage.setItem("admin", admin);
      navigate("/");
      VerifyToken()
      alert("Login successfull");
    } catch (error) {
      console.error("Error:", error);
      console.log(error);
      alert("Invalid credentials");
    }
  };

  return (
    <Button onClick={Submit} variant="contained" sx={{ width: "100%" }}>
      Login
    </Button>
  );
};

export default Login;
