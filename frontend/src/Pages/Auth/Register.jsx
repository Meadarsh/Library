import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const Register = ({ detail }) => {
  const navigate = useNavigate();
  const Submit = async () => {
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(detail),
      };
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        requestOptions
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      alert("Register successfull");
      navigate("/login");
    } catch (error) {
      console.error("Error:", error);
      alert("Invalid");
    }
  };
  return (
    <Button onClick={Submit} variant="contained" sx={{ width: "100%" }}>
      Register
    </Button>
  );
};

export default Register;
