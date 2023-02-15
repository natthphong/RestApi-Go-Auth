import React, { useContext ,useState} from "react";
import "./login.css";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { ClickMe } from "../../context/clickme";
import { getCookie } from "../../getCookie/getCookie";
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
    console.log(state.add)
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
      console.log("error");
    }
  };
  return (
    <div className="lcon">
      <div className="lcon">
        Login
        <input
          type="text"
          name=""
          id="username"
          onChange={haddleUser}
          placeholder="username"
          required
        />
        <input
          type="password"
          name=""
          id="password"
          onChange={haddleUser}
          placeholder="password"
          required
        />
        <button type="submit" className="Rbtn" onClick={clickRegister}>
          Login
        </button>
        <button onClick={haddleadd}>ADD</button>
      </div>
    </div>
  );
}
