import { Button, Grid, Link, Paper, TextField } from "@mui/material";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./Login.css";
export const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    // console.log(dispatch);
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(
        "http://localhost:3001/auth/login",
        credentials
      );

      let { userCheck, msg, ...token } = res.data;
      // console.log(res.data);
      dispatch({ type: "LOGIN_SUCCESS", payload: token });
      navigate("/");
    } catch (err) {
      console.log(err);
      dispatch({ type: "LOGIN_FAILURE", payload: err });
    }
  };
  return (
    <Grid className="login">
      <Paper elevation={10} className="loginForm">
        <h2 className="loginTitle">Sign In</h2>
        <TextField
          label="Username"
          placeholder="Enter username"
          id="username"
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
          Sign In
        </Button>
        <Link
          component="button"
          variant="body2"
          onClick={() => {
            navigate("/register");;
          }}
        >
          Register
        </Link>
      </Paper>
    </Grid>
  );
};
