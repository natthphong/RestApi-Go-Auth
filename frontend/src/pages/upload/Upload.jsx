import { Button } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { React, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import "./up.css";
export default function Upload() {
  const location = useLocation();
  const [src, setSrc] = useState(location.state.src);
  const [file, setFile] = useState();
  const hiddenFileInput = useRef(null);
  const handleClick = event => {
    hiddenFileInput.current.click();
  };
  const handleFileChange = (e) => {
   
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const submit = async (e)=>{
    
    e.preventDefault()
    const formData = new FormData();
    formData.append("Avatar", file);
   const res =  await axios.post("/user/Upload", formData, { headers: { "Content-Type": "multipart/form-data" },});
        setSrc(res.data.avatar)
  }



  return (
    <div className="Cupload">
      <Box sx={{ py: 2 }}>
        <Button
          color="primary"
          fullWidth
          size="large"
          type="submit"
          variant="contained"
        >
          <Link
            id="Home"
            to="/Home"
            variant="subtitle2"
            underline="hover"
            sx={{
              cursor: "pointer",
            }}
          >
            Home
          </Link>
        </Button>
      </Box>

      <img
      id="imgsize"
        src={src !== "" ? src : "http://localhost:9999/file/profile2.PNG"}
        alt=""
      />

    <form action="post">
      <Box sx={{ py: 2 }}>
        
        <Button
          color="primary"
          fullWidth
          size="large"
          variant="outlined"
          onClick={handleClick}
        >
          Upload file
        </Button>
        <input
            ref={hiddenFileInput}
            style={{ display: "none" }}
            type="file"
            onChange={handleFileChange}
          />
      </Box>
      <Button
          color="primary"
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          onClick={submit}
        >
            Submit
        </Button>
      </form>
    </div>
  );
}
