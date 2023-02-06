import { Button, Grid, Link, Paper, TextField } from "@mui/material";
import axios from "axios";
import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./Login.css";
export const Register = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    email: undefined,
    password: undefined,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    // console.log(dispatch);
    try {
      const res = await axios.post(
        "http://localhost:3001/auth/register",
        credentials
      );
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Grid className="login">
      <Paper elevation={10} className="loginForm registerForm">
        <h2 className="loginTitle">Sign Up</h2>
        <TextField
          label="Username"
          placeholder="Enter username"
          id="username"
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Email"
          placeholder="Enter email"
          id="email"
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Password"
          placeholder="Enter password"
          id="password"
          onChange={handleChange}
          type="password"
          fullWidth
        />
        <Button
          type="submit"
          variant="contained"
          onClick={handleClick}
          fullWidth
        >
          Register
        </Button>
        <Link
          component="button"
          variant="body2"
          onClick={() => {
            navigate("/login");
          }}
        >
          Login
        </Link>
      </Paper>
    </Grid>
  );
};
