import React, { useEffect, useState } from "react";
import { TextField, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const LoginUpPage = () => {
  const navigate = useNavigate();

  const [loginCredential, setLoginCredential] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setLoginCredential({
      ...loginCredential,
      [e.target.name]: e.target.value
    });
  };

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${backendUrl}/login`, loginCredential, {
        withCredentials: true // ✅ Required if you're using cookies for JWT
      });

      if (res.data.token) {
        try {
          localStorage.setItem('token', res.data.token);
          const decoded = jwtDecode(res.data.token);
          // Redirect based on role
          if (decoded.role === "admin") {
            navigate("/admin");
          } else if (decoded.role === "user") {
            navigate("/user");
          }
        } catch (err) {
          console.error("Invalid token", err);
        }
      }
    } catch (error) {
      console.log(error);
      alert(error?.response?.data?.message || "Login failed");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const decoded = jwtDecode(token);
        // Redirect based on role
        if (decoded.role === "admin") {
          navigate("/admin");
        } else if (decoded.role === "user") {
          navigate("/user");
        }
      } catch (err) {
        console.error("Invalid token", err);
      }
    }
  }, []);

  return (
    <div className="flex shadow-lg justify-center items-center h-screen m-2">
      <div className="bg-[#dae9e4] w-[40%] flex items-center justify-center rounded-[1rem] shadow-md p-[1rem]">
        <div className="flex flex-col gap-[1rem]">
          <label className="2xl font-300 text-bold mb-2 flex items-center">
            Login
          </label>

          <div className="flex flex-col mb-4">
            <TextField
              variant="outlined"
              label="Email"
              className="mb-2"
              name="email"
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col mb-4">
            <TextField
              variant="outlined"
              label="Password"
              className="mb-2"
              name="password"
              type="password"
              onChange={handleChange}
            />
          </div>

          <div className="flex items-center justify-center mb-4">
            <Button
              variant="outlined"
              sx={{ backgroundColor: "transparent" }}
              onClick={handleLogin} // ✅ Corrected
            >
              Submit
            </Button>
          </div>

          <div className="flex items-center justify-center mb-4">
            <Link to="/">Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginUpPage;
