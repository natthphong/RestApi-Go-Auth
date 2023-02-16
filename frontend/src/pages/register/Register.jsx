import React, { useContext, useState } from "react";
import { ClickMe } from "../../context/clickme";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
export default function Register() {
  const { state, dispatch } = useContext(ClickMe);
  const [User, setUser] = useState({
    username: "",
    password: "",
    fullname: "",
    admin: true,
  });

  const haddleadd = (e) => {
    e.preventDefault();
    const number = state.add + 1;
    dispatch({ type: "click", payload: { name: User.username, add: number } });
  };
  const toggleAdmin =(e)=>{
    setUser({ ...User, admin: !User.admin });
  }
  const haddleUser = (e) => {
    setUser({ ...User, [e.target.id]: e.target.value });
  };
  const navigate = useNavigate();
  const clickRegister = async (e) => {
    e.preventDefault();
    try {
      console.log(User);
      const res = await axios.post("/register", User);
      console.log(res.data);
      if (res.data.status === "error") {
        alert("Username Already Used");
      }
      if (res.data.status === "ok") {
        navigate("/login");
      }
    } catch (error) {
      alert("Format not correct")
    
    }
  };
  
  return (
    <div className="lcon">
      <InputLabel>Register</InputLabel>
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
            <TextField
              fullWidth
              margin="normal"
              type="text"
              name=""
              id="fullname"
              onChange={haddleUser}
              placeholder="fullname"
              required
            />
            {User.admin ? (
              <Button variant="contained" color="success" onClick={toggleAdmin}>
                Admin
              </Button>
            ) : (
              <Button variant="outlined" color="error" onClick={toggleAdmin}>
                Not Admin
              </Button>
            )}
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                onClick={clickRegister}
              >
                Sign Up Now
              </Button>
            </Box>
            <Typography color="textSecondary" variant="body2">
              {" "}
              <Link
                to="/login"
                variant="subtitle2"
                underline="hover"
                sx={{
                  cursor: "pointer",
                }}
              >
                Sign In
              </Link>
            </Typography>
          </form>
        </Container>
      </Box>
    </div>
  );
}
