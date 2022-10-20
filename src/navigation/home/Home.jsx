import React, { useEffect, useState, useContext } from 'react'
import axios from "axios";
import { json, useNavigate } from 'react-router-dom';
import "../home/Home.css"
import { Filter, Logout, Title } from '@mui/icons-material';
import { UserContext } from '../../context/UserContext';
import { Post } from 'react-axios';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
const Home = () => {
  const [list, setList] = useState([])
  const { credentials, setCredentials, token, setToken } = useContext(UserContext)
  const navigation = useNavigate()
  const [todo, setTodo] = useState({
    title: "",
    description: '',
    isCompleted: false
  })
  const [todo1, setTodo1] = useState({
    title: "",
    description: '',
    isCompleted: false
  })
  const [open, setOpen] = React.useState(false);
  const [current, setCurrent] = useState("");
  // const [current1, setCurrent1] = useState("");
  // console.log('here the creds are', credentials, 'token is',token)

  useEffect(() => {
    let config = {
      method: 'GET',
      url: `http://localhost:1000/api/v1/todo/get-tasks`,
      headers: {
        "content-type": "application/json",
        "x-auth-token": token
      },
    }
    axios(config)
      .then((resp) => {
        // console.log('the resp is',resp.data)
        if (resp.data.message === "You have not created any task yet!") {
          setList([])
        }
        else {
          setList(resp.data.tasks)
        }
      })
      .catch((err) => {
        alert(err.response.data || "Error")
        setList([])
      }
      )
  }, [])
  const add = () => {

    let post = {
      method: "POST",
      url: `http://localhost:1000/api/v1/todo/create-task`,
      headers: {
        "content-type": "application/json",
        'x-auth-token': token
      },
      data: JSON.stringify(todo)
    }
    axios(post)
      .then((resp) => {
        console.log("response is : ------ : ", resp)
        let obj = resp.data.task
        let array = [...list]
        array.push(resp.data.task)
        setList(array)

      })
      .catch((err) => {
        alert(err || "Error12")
        // console.log("response error is : ------ : ", err.resp.data)
      })
    // console.log("Todo is : --- : ", todo)
    // let newArr = list
    // newArr.push(todo)


  }

  console.log('the list is', list)

  const handleClickOpen = () => {
    setOpen(true);



    // setCurrent()
  };

  const handleClose = () => {
    setOpen(false);
  };
  const save = () => {

    console.log("the current is", current)
    console.log('the todo is', todo)
    let put = {
      method: 'PUT',
      url: `http://localhost:1000/api/v1/todo/update-task/${current}`,
      headers: {
        "content-type": "application/json",
        'x-auth-token': token
      },
      data: JSON.stringify(todo1)
    }
    axios(put)
      .then((resp) => {
        console.log("response is : ------ : ", resp)
    
        setCurrent("")
      })
      .catch((err) => {
        alert(err || "Error15")
        setCurrent("")
      })
    setOpen(false);
  }
  const logOut = () => {
    setCredentials({})
    setToken("")
    localStorage.removeItem("@user")
    navigation('/')
  }
const unSave = (_id) =>{
  console.log('the id is',current)
  let Delete ={
    method:'DELETE',
    url:`http://localhost:1000/api/v1/todo/delete-task/${_id}`,
    headers:{
      "content-type":"application/json",
      'x-auth-token': token
    },
    data:JSON.stringify(todo1)
  }
  axios(Delete)
  // console.log(Delete)
  .then((resp)=>{
      console.log("delete is ...........",resp.data)
    // let obj = resp.data.task
    //     let array = [...list]
    //     array.push(resp.data.task)
    //     setList(array)
    const newList = list.filter((each)=> each._id !==_id);
    setList(newList)
    console.log(" delete list ::::::::::",newList)

  
  })
  .catch((err)=>{
    alert(err || "Error15")
    // setCurrent("")
  })
}
  return (
    <div className='top-div'>
      <div className='Logout-btn'>
        <p onClick={logOut}>Log out</p>
      </div>
      <div className='To-do'>
        <input type="text"
          value={todo.title}
          onChange={
            (e) => setTodo(prev => ({
              ...prev,
              title: e.target.value
            }))
          } placeholder="Title"/>
        <input type="text" value={todo.description} onChange={
          (e) => setTodo(prev => ({
            ...prev,
            description: e.target.value,
          }))
        } placeholder="Description" />
  
        <button onClick={add}>Submit</button>

      </div>
    
      {
        list.map((each, index) => {
          return (
            <>
              <div className='To-do-data'>
                <p>{each?.title}</p>
                <p>{each?.description}</p>
              </div>
              <div style={{margin:'3px',display: 'flex', marginInline: '24px'}}>
                <Button variant="outlined" onClick={() => { setCurrent(each._id); handleClickOpen() }}>
                  Update
                </Button>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      <input type="text" placeholder='Title' value={todo1.title} onChange={
                        (e) => setTodo1(prev => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      } />
                      <input type="text" value={todo1.description} onChange={
                        (e) => setTodo1(prev => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      } placeholder="Description" />
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={save} autoFocus>
                      Agree
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
              <div className='delete-ion'  onClick={()=>unSave(each._id)}>
              <Grid container sx={{ color: 'text.primary' }}>
      <Grid item xs={4}>
        <Typography></Typography>
      </Grid>
      <Grid item xs={8}>
        <DeleteIcon />
      </Grid>
      </Grid>
              </div>
            </>

          )

        })
      }

    </div>

  )
}

export default Home
