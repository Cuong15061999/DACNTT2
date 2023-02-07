import React from 'react'
import './UserEdit.css'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

export const UserEdit = () => {
  const { id } = useParams();
  const [userData, setuserData] = useState({});

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  const [tagFavorite, setTagFavorite] = useState('');
  const [created, setCreated] = useState('');
  const [validation, setValidation] = useState(false);


  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3001/users/' + id)
      .then((res) => {
        setUsername(res.data.data.username);
        setPassword(res.data.data.password)
        setEmail(res.data.data.email)
        setAvatar(res.data.data.avatar)
        setTagFavorite(res.data.data.tag_favorite)
        setCreated(res.data.data.created)

      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const handlesubmit = (e) => {
    e.preventDefault();
    axios.put('http://localhost:3001/users/' + id, {
      username: username,
      password: password,
      email: email,
      avatar: avatar,
      tag_favorite: tagFavorite,
      created: created,

    })
      .then((res) => {
        console.log(res.data)
        alert('Saved Successfully')
        navigate('/User')
      })
      .catch((err) => {
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
        <h2> Edit user</h2>
        {username.length == 0 && validation && <span className='text-danger'> Please Enter User Name </span>}
        <TextField required sx={{ marginBottom: 2 }} fullWidth label="Username" id="username" value={username} onMouseDown={e => setValidation(true)} onChange={e => setUsername(e.target.value)} />
        {password.length == 0 && validation && <span className='text-danger'> Please Enter Password </span>}
        <TextField required sx={{ marginBottom: 2 }} fullWidth label="Password" id="password" value={password} onMouseDown={e => setValidation(true)} onChange={e => setPassword(e.target.value)} />
        {email.length == 0 && validation && <span className='text-danger'> Please Enter Email </span>}
        <TextField required sx={{ marginBottom: 2 }} fullWidth label="Email" id="email" value={email} onMouseDown={e => setValidation(true)} onChange={e => setEmail(e.target.value)} />
        <TextField sx={{ marginBottom: 2 }} fullWidth label="Avatar" id="avatar" value={avatar} onChange={e => setAvatar(e.target.value)} />
        <TextField sx={{ marginBottom: 2 }} fullWidth label="Tag Favorite" id="tagFavorite" value={tagFavorite} onChange={e => setTagFavorite(e.target.value)} />
        <button className='btn btn-success' type='submit'> Save </button>
        <Link to='/user' className='btn btn-danger'> Back </Link>
      </Box>
    </form>
  )
}
