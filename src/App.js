import logo from './logo.svg';
import './App.css';
import Navigation from './navigation/Navigation';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import {useContext} from 'react';
import {UserContext} from '../src/context/UserContext';
import{useEffect} from'react';
function App() {
  const {credentials, setCredentials, token, setToken} = useContext(UserContext)

  useEffect(() => {
    if(localStorage.getItem("@user")){
      let deParse = JSON.parse(localStorage.getItem("@user"))
      setCredentials(deParse)
      setToken(deParse.token)
    }
  else{
    setCredentials({})
    setToken("")
  }

  }, [])
  
  return (
    <Router>
      <Navigation />
    </Router>
  );
}

export default App;
