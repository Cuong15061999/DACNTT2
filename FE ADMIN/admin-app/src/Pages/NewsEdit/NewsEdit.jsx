import React from 'react'
import './NewsEdit.css'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import moment from 'moment/moment';

export const NewsEdit = () => {
  const {id} = useParams();
  const [newsData, setNewsData] = useState({});

  const [title, setTitle] = useState('');
  const [domainName, setDomainName] = useState('');
  const [url, setURL] = useState('');
  const [picture, setPicture] = useState('');
  const [date, setDate] = useState('');
  const [type, setType] = useState('');

  const navigate = useNavigate();

  useEffect(() =>{
    axios.get('http://localhost:3001/news/' + id)
    .then( (res) => {
      console.log(res.data.data)
      setTitle(res.data.data.title);
      setDomainName(res.data.data.domain);
      setURL(res.data.data.url)
      setPicture(res.data.data.picture)
      setDate(res.data.data.date)
      setType(res.data.data.type)
    })
    .catch( (err) => {
      console.log(err)
    })
  },[])

  const handlesubmit = (e) =>{
    e.preventDefault();
    console.log({title,domainName, url, picture, date, type});
    axios.put('http://localhost:3001/news/'+ id, {
      title: title,
      domainName: domainName,
      url: url,
      picture: picture,
      date: date,
      type: type
    })
    .then( (res) => {
      console.log(res.data)
      alert('Saved Successfully')
      navigate('/News')
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
        <h2> Edit News</h2>
        <TextField required sx={{ marginBottom: 2 }} fullWidth label="Title" id="title" value={title} onMouseDown={e => setValidation(true)} onChange={e => setTitle(e.target.value)} />
        <TextField required sx={{ marginBottom: 2 }} fullWidth label="Domain" id="domain" value={domainName} onMouseDown={e => setValidation(true)} onChange={e => setDomainName(e.target.value)} />
        <TextField required sx={{ marginBottom: 2 }} fullWidth label="URL" id="url" value={url} onMouseDown={e => setValidation(true)} onChange={e => setURL(e.target.value)} />
        <TextField sx={{ marginBottom: 2 }} fullWidth label="Picture" id="picture" value={picture} onChange={e => setLogo(e.target.value)} />
        <TextField sx={{ marginBottom: 2 }} fullWidth label="Date" id="date" value={moment(date).format('DD:MM:YYYY, h:mm a')} onChange={e => setLogo(e.target.value)} />
        <TextField sx={{ marginBottom: 2 }} fullWidth label="Type" id="type" value={type} onChange={e => setType(e.target.value)} />
        <button className='btn btn-success' type='submit'> Save </button>
        <Link to='/News' className='btn btn-danger'> Back </Link>
      </Box>
    </form>
  )
}
