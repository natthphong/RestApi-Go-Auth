import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CardProfile from "../component/CardProfile";
import './gen.css'
import ButtonAppBar from "../component/appbar/Appbar";
import { CircularProgress } from "@mui/material";
export default function Generate() {
  const [Users, setUsers] = useState([]);
  const [load, setload] = useState(false);
  const  [profile , setProfile] = useState({})
  function DeleteFromId (id){
    const remove = Users.filter((item)=>{
        return item.ID!==id
    })
    setUsers(remove);
    console.log(Users)
  }

  function UpdateFromId (id,newValue){
    const UpdateUser = Users.map((item)=>{
        return item.ID===id? item:{...item,Username:newValue.Username,Fullname:newValue.Fullname} 
    })
    setUsers(UpdateUser);
  }

  const navigate = useNavigate();
  useEffect(() => {
    setload(true)
    return async () => {
      try {
        await axios.post("/user/Auth");
        const Profiles = await axios.get("/user/viewUser");
        const profile = await axios.get("/user/Profile")
        setProfile(profile.data.User);
        setUsers(Profiles.data.Users);
        setload(false)
      } catch (error) {
        alert("Not Login")
        navigate("/login");
      }
    };
  },[]);

  return (
   <div className="HomeContainer">
      {!load ?<><ButtonAppBar src={profile.Avatar}/>
      <div className="ListCard">
        {Users &&
          Users.map((item) => {
            return <CardProfile item={item} callback={DeleteFromId} Update={UpdateFromId} key={item.ID} />;
          })}{" "}
      </div></>:<CircularProgress  sx={{minWidth: 300,}}/>}
    </div>
  );
}
