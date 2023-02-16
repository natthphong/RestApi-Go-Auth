import React, { useContext, useState } from "react";
import "./login.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ClickMe } from "../../context/clickme";
import { getCookie } from "../../getCookie/getCookie";
import { Box, Button, Container, InputLabel, TextField, Typography } from "@mui/material";
export default function Login() {
  const { state, dispatch } = useContext(ClickMe);
  const [User, setUser] = useState({
    username: "",
    password: "",
  });

  const haddleadd = (e) => {
    e.preventDefault();
    const number = state.add + 1;
    dispatch({ type: "click", payload: { name: User.username, add: number } });
    console.log(state.add);
  };

  const haddleUser = (e) => {
    setUser({ ...User, [e.target.id]: e.target.value });
  };
  const navigate = useNavigate();
  const clickRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/login", User);
      navigate("/home");
    } catch (error) {
      alert("Format not correct")
    }
  };

  return (
    <div className="lcon">
      <InputLabel>
        Login
      </InputLabel>
      <Box
        component="main"
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
        }}
      >
        <Container maxWidth="sm">
          <form onSubmit={clickRegister}>
            <Box sx={{ my: 3 }}>
              <Typography color="textPrimary" variant="h4">
                Sign in
              </Typography>
            </Box>
            <Box
              sx={{
                pb: 1,
                pt: 3,
              }}
            ></Box>
            <TextField
              fullWidth
              margin="normal"
              type="text"
              name=""
              id="username"
              onChange={haddleUser}
              placeholder="username"
              required
            />
            <TextField
              fullWidth
              margin="normal"
              type="password"
              name=""
              id="password"
              onChange={haddleUser}
              placeholder="password"
              required
            />
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                onClick={clickRegister}
              >
                Sign In Now
              </Button>
            </Box>
            <Typography color="textSecondary" variant="body2">
              {" "}
              <Link
                to="/register"
                variant="subtitle2"
                underline="hover"
                sx={{
                  cursor: "pointer",
                }}
              >
                Sign Up
              </Link>
            </Typography>
          </form>
        </Container>
      </Box>
    </div>
  );
}
