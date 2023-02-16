import { React, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./Card.css";
import axios from "axios";
import { TextField } from "@mui/material";

export default function MediaCard({ item, callback,Update}) {
  const [edit, setEdit] = useState(false);
    const [valueUpdate, setvalueUpdate] = useState({
      Username:item.Username,
      Fullname:item.Fullname
    })
  const DeleteCard = async (e) => {
    const id = item.ID;
    const res = await axios.delete(`/user/Delete/${id}`);
    if (res.data.status === "ok") {
      callback(id);
      alert("Deleted");
    } else {
      alert("Delete Failed");
    }
  };
  const haddle = (e)=>{
    setvalueUpdate({...valueUpdate,[e.target.id]:e.target.value})
  }

  const UpdateCard = async(e)=>{
    const id = item.ID;
    console.log(id)
    const res = await axios.put(`/user/Update/${id}`,valueUpdate)
    console.log(res.data)
    if (res.data.status === "ok") {
      Update(id,valueUpdate)
      alert("Update Already");
    } else if (res.data.status ==="okBut"){
      setvalueUpdate({...valueUpdate , Username:item.Username})
      Update(id,valueUpdate)
      alert("Username Already Used But Fullname Update Already");
    }else {
      alert("Update Failed");
    }
  }

  return (
    <div className="CardContainer">
      <Card>
        <CardMedia
          sx={{ height: 360 }}
          image={
            item.Avatar !== ""
              ? item.Avatar
              : "http://localhost:9999/file/profile2.PNG"
          }
          title="green iguana"
        />
        {edit ? (
          <CardContent>
            <TextField
              id="Username"
              label="Username"
              variant="outlined"
              onChange={haddle}
              defaultValue={valueUpdate.Username}
            />
            <TextField
              id="Fullname"
              label="Fullname"
              variant="outlined"
              onChange={haddle}
              defaultValue={valueUpdate.Fullname}
            />
          </CardContent>
        ) : (
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {valueUpdate.Username}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {valueUpdate.Fullname}
            </Typography>
          </CardContent>
        )}
        <CardActions>
          <Button onClick={DeleteCard} size="small">
            Delete
          </Button>
          {edit ? (
            <Button
              size="small"
              onClick={(e) => {
                UpdateCard(e);
                setEdit(!edit);
              }}
            >
              Update
            </Button>
          ) : (
            <Button
              size="small"
              onClick={(e) => {
                setEdit(!edit);
              }}
            >
              Edit
            </Button>
          )}
        </CardActions>
      </Card>
    </div>
  );
}
