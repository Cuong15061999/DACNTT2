import React from 'react'
import './UserAdd.css'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

export const UserAdd = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  const [tagFavorite, setTagFavorite] = useState('');
  const [validation, setValidation] = useState(false);
 
  const navigate = useNavigate();

  const handlesubmit = (e) =>{
    e.preventDefault();
    axios.post('http://localhost:3001/users', {
      username: username,
      password: password,
      email: email,
      avatar: avatar,
      tag_favorite: tagFavorite,
    })
    .then( (res) => {
      console.log(res.data)
      alert('Saved Successfully')
      navigate('/User')
    })
    .catch( (err) => {
      console.log(err)
    })
  }
  return (
    <form onSubmit={handlesubmit}>
    <Box
      sx={{
        paddingTop: 2,
        width: '80%',
        maxWidth: '100%',
        mx: 'auto'
      }}
    >
      <h2> Create New User</h2>
      {username.length == 0 && validation && <span className='text-danger'> Please Enter User Name </span>}
      <TextField required sx={{ marginBottom: 2 }} fullWidth label="Username" id="username" value={username} onMouseDown={e => setValidation(true)} onChange={e => setUsername(e.target.value)} />
      {password.length == 0 && validation &&   <span className='text-danger'> Please Enter Password </span>}
      <TextField required sx={{ marginBottom: 2 }} fullWidth label="Password" id="password" value={password} onMouseDown={e => setValidation(true)} onChange={e => setPassword(e.target.value)} />
      {email.length == 0 && validation &&   <span className='text-danger'> Please Enter Email </span>}
      <TextField required sx={{ marginBottom: 2 }} fullWidth label="Email" id="email" value={email} onMouseDown={e => setValidation(true)} onChange={e => setEmail(e.target.value)} />
      <TextField sx={{ marginBottom: 2 }} fullWidth label="Avatar" id="avatar" value={avatar} onChange={e => setAvatar(e.target.value)} />
      <TextField sx={{ marginBottom: 2 }} fullWidth label="Tag Favorite" id="tagFavorite" value={tagFavorite} onChange={e => setTagFavorite(e.target.value)} />
      <button className='btn btn-success' type='submit'> Save </button>
      <Link to='/Newspaper' className='btn btn-danger'> Back </Link>
    </Box>
  </form>
  )
}
