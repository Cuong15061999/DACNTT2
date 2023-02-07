import React from 'react'
import './UserDetail.css'
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom'
import axios from 'axios';
import moment from 'moment';

export const UserDetail = () => {
  const {id} = useParams();
  const [userData, setuserData] = useState({});

  useEffect(() =>{
    axios.get('http://localhost:3001/users/' + id)
    .then( (res) => {
      console.log(res.data.data)
      setuserData(res.data.data)
    })
    .catch( (err) => {
      console.log(err)
    })
  },[])
  return (
       <Box
    sx={{
      paddingTop: 2,
      width: '80%',
      maxWidth: '100%',
      mx: 'auto'
    }}
  >
    <h2> User Detail</h2>
    <TextField focused color="success" sx={{ marginBottom: 2 }} fullWidth label="Username" id="username" value={userData.username} />
    <TextField focused color="success" sx={{ marginBottom: 2 }} fullWidth label="Password" id="password" value={userData.password} />
    <TextField focused color="success" sx={{ marginBottom: 2 }} fullWidth label="Email" id="email" value={userData.email} />
    <TextField focused color="success" sx={{ marginBottom: 2 }} fullWidth label="Avatar" id="avatar" value={userData.avatar} />
    <TextField focused color="success" sx={{ marginBottom: 2 }} fullWidth label="Created" id="created" value={moment(userData.created).format('DD-MM-YYYY, h:mm a')} />
    <TextField focused color="success" sx={{ marginBottom: 2 }} fullWidth label="Tag favorite" id="tag_favorite" value={userData.tag_favorite} />

    <Link to='/user' className='btn btn-danger'> Back </Link>
  </Box>
  )
}
