import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignUpPage = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  };

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userData.password !== userData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const res = await axios.post(`${backendUrl}/register`, {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        role: 'user'
      });

      alert("User registered successfully!");
      if(res.data){
        navigate('/login')
      }
    } catch (error) {
      console.error(error);
      alert(error?.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex shadow-lg justify-center items-center h-screen m-2">
      <form
        className="bg-[#dae9e4] w-[40%] flex items-center justify-center rounded-[1rem] shadow-md p-[1rem]"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-[1rem] w-full">
          <label className="text-2xl font-bold mb-2 text-center">Sign Up</label>

          <div className="flex flex-col mb-4">
            <TextField
              variant="outlined"
              label="Full Name"
              name="name"
              value={userData.name}
              onChange={handleChange}
              className="mb-2"
              fullWidth
            />
          </div>

          <div className="flex flex-col mb-4">
            <TextField
              variant="outlined"
              label="Email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              className="mb-2"
              fullWidth
            />
          </div>

          <div className="flex flex-col mb-4">
            <TextField
              variant="outlined"
              label="Password"
              name="password"
              type="password"
              value={userData.password}
              onChange={handleChange}
              className="mb-2"
              fullWidth
            />
          </div>

          <div className="flex flex-col mb-4">
            <TextField
              variant="outlined"
              label="Retype Password"
              name="confirmPassword"
              type="password"
              value={userData.confirmPassword}
              onChange={handleChange}
              className="mb-2"
              fullWidth
            />
          </div>

          <div className="flex items-center justify-center mb-4">
            <Button variant="outlined" type="submit">
              Submit
            </Button>
          </div>

          <div className="flex items-center justify-center mb-4">
            <Link to="/login">Already have an account? Login</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;
