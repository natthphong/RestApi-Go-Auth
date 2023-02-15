import axios from "axios";

const GetHome = async () => {
  console.log("GetHome");
  const res = await axios.get("http://127.0.0.1:9999/");

  console.log(res.status);
};

const PostRegister = async () => {
  const User = {
    username: "taza3aza00123",
    password: "123456",
    fullname: "tarza123asd",
    admin: true,
  };

  const res = await axios.post("http://127.0.0.1:9999/register" , User);

  console.log(res.data);
};



const Login = async () => {
    const User = {
      username: "taza3aza00123",
      password: "123456",
    };
  
    const res = await axios.post("http://127.0.0.1:9999/login" , User);
  
    console.log(res.data);
  };

console.log("running");

Login()
