import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";

export default function ButtonAppBar({ src }) {
  const navigate = useNavigate();
  const logout = async (e) => {
    try {
      await axios.post("/user/Logout");
      alert("Logout Suscess");
      navigate("/login");
    } catch (error) {
      alert("Logout Already");
    }
  };
  const upLoadPage = (e) => {
    navigate("/upload",{state:{src}});
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Avatar
            alt="Avatar"
            src={src}
            onClick={upLoadPage}
            sx={{
              cursor: "pointer",
            }}
          />

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Home
          </Typography>
          <Button color="inherit" onClick={logout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
