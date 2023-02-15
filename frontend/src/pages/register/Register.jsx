import React, { useContext,useState } from 'react'
import { ClickMe } from '../../context/clickme'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export default function Register() {
  const {state,dispatch} = useContext(ClickMe)
  const [User, setUser] = useState({
    username: "",
    password: "",
    fullname: "",
    admin: true,
  })

  const haddleadd = (e)=>{
    e.preventDefault();
    const number = state.add+1;
    dispatch({type:"click" , payload:{name:User.username, add:number}})
  }

  const haddleUser = (e)=>{
    setUser({...User  , [e.target.id] : e.target.value})
  }
  const navigate = useNavigate()
  const clickRegister =async (e)=>{
      e.preventDefault()
    try {
      console.log(User)
      const res = await axios.post("/register" , User);
        console.log(res.data)
        if(res.data.status==="error"){
            alert("Username Already Used")
        }
        if(res.data.status==="ok"){
           navigate('/login')
        }
       
    } catch (error) {
        console.log("error")
    }
  }

  return (
    <div className='lcon'>
    Register
    <input type="text" name="" id="username" onChange={haddleUser} placeholder='username'   required/>
  
    <input type="password" name="" id="password"  onChange={haddleUser} placeholder='password'  required/>
    <input type="text" name="" id="fullname" onChange={haddleUser} placeholder='fullname'  required/>

        <button  className='Admin' onClick={(e)=>{setUser({...User,admin: !User.admin}) } }>Admin</button>


    <button type='submit' className='Rbtn' onClick={clickRegister}>Register</button>
    <button type='submit' className='Rbtn' onClick={(e)=>{navigate('/login')}}>Login</button>

    <button onClick={haddleadd}>ADD</button>
</div>
  )
}
