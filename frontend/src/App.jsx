import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Home from "./Pages/HomePage/Home";
import Navbar from "./Components/Navbar";
import AuthMain from "./Pages/Auth/AuthMain";

const App = () => {
 
  const [admin, setAdmin] = useState('false');
  const [loggedin,setLoggedIn]=useState(false)

  useEffect(() => {
    VerifyToken()
  },[]);
  const VerifyToken =()=>{
    const token = localStorage.getItem("token");
    const admin = localStorage.getItem("admin");
    if (token) {
      setAdmin(admin);
    }
    if (token) {
      setLoggedIn(true);
    }
  }
  const Logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    setAdmin('false');
    setLoggedIn(false);
  };

  return (
    <>
      <Router>
        <Navbar Logout={Logout} loggedin={loggedin} />
        <Routes>
          <Route path="/" element={<Home admin={admin} />} />
          <Route path="/register" element={<AuthMain />} />
          {!loggedin && (
            <>
              <Route path="/login" element={<AuthMain VerifyToken={VerifyToken}  />} />
              <Route path="/create" element={<Home />} />
            </>
          )}
          <Route path="/update" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
