import React, { createContext, useState, useContext } from 'react'
export const UserContext = createContext()
export const UserProvider = props => {
    const [credentials, setCredentials] = useState({})
    const [token, setToken] = useState("")
    return (
        <UserContext.Provider value={{ credentials, setCredentials, token, setToken }}>
            {props.children}
        </UserContext.Provider>
    )
}