import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom'
import React, { useContext,useEffect } from 'react'
import Login from '../auth/Login/Login'
import SignUP from '../auth/SignUp/SignUP'
import Home from './home/Home'
import PrivateRoute from '../context/PrivateRoute'
import { Token } from '@mui/icons-material'
import { UserContext } from '../context/UserContext';

const Navigation = () => {
  const {token,setToken}=useContext(UserContext)
    const Navigation = useNavigate()

    useEffect(() => {
      if(token === ""){
        Navigation("/")
      }
    else{
        Navigation("/Home")
    }

    }, [token])
    
return(
    <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/SignUp' element={<SignUP/>}/>
        <Route element={<PrivateRoute />} >
            <Route path='/Home' element={<Home />}/>
            </Route>
    </Routes>
)
}

export default Navigation