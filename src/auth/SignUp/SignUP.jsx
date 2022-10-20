import { Key } from '@mui/icons-material'
import React, { useState,useContext} from 'react'
import { useNavigate } from 'react-router-dom' 
import axios from "axios";
import './SignUp.css'
import { UserContext } from '../../context/UserContext';

const SignUP = () => {
  const [page, setPage] = useState({})
  const navigation = useNavigate()
  // const {credentials, setCredentials,token, setToken} = useContext(UserContext)
  const onChange = (key,value) => {
    setPage((prev) => ({
      ...prev,
      [key]:value
    }))
  }
const SignUp =(e)=>{
  e.preventDefault()
  let {username, password} = page
  if (username === "" || password === "") {
    alert("Missing Information")
    return
  }
  // const storeData = (data) => {
  //   setCredentials(data)
  //   setToken(data.token)
  //   localStorage.setItem("@user", JSON.stringify(data))
  // }

  let passwordRegex =
  /^(?=.*[0-9])(?=.*[!@#$%^_&|*])[a-zA-Z0-9!@#$%^_&*]{7,15}$/

  if (!password.match(passwordRegex)) {
    alert(
      "Badly Formatted Password, Password must be 8 to 15 characters long, should contain letters and numbers and a special character"
    )
    return
  }
  let config ={
    method:'POST',
    url:'http://localhost:1000/api/v1/user/register',
    headers:{
      "content-type":"application/json"
    },
    data:JSON.stringify(page)
  }
  axios(config)
  .then((resp)=>{
   alert("success")
   navigation("/Home")
  })
  .catch((err)=>{
    alert(err.response.data|| "Error")
  })
}
  return (
    <>
      <div className='sub-div'>
        <div className='input-div'>
          <input className='username' required type="text" placeholder='Username' onChange={(e) =>onChange("username",e.target.value)}/>
          <input className='password' require type="password" placeholder='Password' onChange={(e)=>onChange("password",e.target.value)}/>
        </div>
        <div className='login-btn'>
          <button className='btn' onClick={SignUp}>SignUp</button>
        </div>
        <div className='Already-account'>
          <p onClick={() => navigation("/")}>  Already have an account?</p>
        </div>

      </div>
    </>
  )
}

export default SignUP