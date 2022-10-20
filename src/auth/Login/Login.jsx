import React, { useState,useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import'../Login/Login.css'
import { UserContext } from '../../context/UserContext';
const Login = () => {
    const navigation = useNavigate()
    const [work,setWork] = useState()
    const {credentials, setCredentials,token, setToken} = useContext(UserContext)


const login = (e) =>{
    e.preventDefault()
    const storeData = (data) => {

      console.log('the data is',data)
      setCredentials(data)
      setToken(data.token)
      localStorage.setItem("@user", JSON.stringify(data))
    }

    let config ={
        method:'POST',
        url:'http://localhost:1000/api/v1/user/login',
        headers:{
          "content-type":"application/json"
        },
        data:JSON.stringify(work)
      }

      axios(config)
      .then((resp)=>{
       alert("success")
       storeData(resp.data)
       navigation("/Home")
      })
      .catch((err)=>{
        alert(err.resp.data.message|| "Error")
      }
      )
}
const onChange = (key,value) => {
  setWork((prev) => ({
    ...prev,
    [key]:value
  }))
}
    return (
        <>
        <div className='sub-div'>
        <div className='input-div'>
            <input require className='username' type="text" onChange={(e)=>onChange("username",e.target.value)} placeholder='Username'/>
            <input required className='password' type="password" placeholder='Password'onChange={(e)=>onChange("password",e.target.value)}/>
        </div>
        <div className='Forget-password'>
            <p>Forgotten password?</p>
            <p onClick={() =>navigation("/SignUp")}>Create new account</p>
        </div>
        <div className='login-btn'>
            <button className='btn' onClick={login}>Login </button>
        </div>
        </div>
        </>
    )
}

export default Login