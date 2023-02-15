import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CardProfile from "../component/CardProfile";
import './gen.css'
export default function Generate() {
  const [Users, setUsers] = useState([]);

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
    return async () => {
      try {
        await axios.post("/user/Auth");
        const Profiles = await axios.get("/user/viewUser");
        setUsers(Profiles.data.Users);
      } catch (error) {
        alert("Token Incorect");
        navigate("/login");
      }
    };
  },[]);

  useEffect(()=>{

  },[Users])

  console.log(Users);
  return (
    <div className="HomeContainer">
      <div className="ListCard">
        {Users &&
          Users.map((item) => {
            return <CardProfile item={item} callback={DeleteFromId} Update={UpdateFromId} key={item.ID} />;
          })}{" "}
      </div>
    </div>
  );
}
