import React, { useContext,useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { UserContext } from './UserContext'

const PrivateRoute = () => {
  const{credentials, setCredentials,token, setToken} =useContext(UserContext)
  useEffect(() => {
    if (localStorage.getItem("@user")) {
        let deParse = JSON.parse(localStorage.getItem("@user"))
        console.log('deparse is',deParse)
        setCredentials(deParse)
        setToken(deParse.token)
    }
    else {
        console.log('wow')
        setCredentials({
            username: '',
            token: ''
        })
    }

  }, [])
  
  return (
token === "" ? <Navigate to="/"/> : <Outlet />
  )
}

export default PrivateRoute