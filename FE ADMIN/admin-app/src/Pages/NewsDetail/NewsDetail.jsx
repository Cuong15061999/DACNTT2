import React from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom'
import axios from 'axios';
import './NewsDetail.css'
import moment from 'moment';

export const NewsDetail = () => {
  const {id} = useParams();
  const [newsData, setNewsData] = useState({});

  useEffect(() =>{
    axios.get('http://localhost:3001/news/' + id)
    .then( (res) => {
      console.log(res.data.data)
      setNewsData(res.data.data)
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
    <h2> News Detail</h2>
    <TextField focused color="success" sx={{ marginBottom: 2 }} fullWidth label="Title" id="title" value={newsData.title} />
    <TextField focused color="success" sx={{ marginBottom: 2 }} fullWidth label="Domain" id="domain" value={newsData.domain} />
    <TextField focused color="success" sx={{ marginBottom: 2 }} fullWidth label="Url" id="url" value={newsData.url} />
    <TextField focused color="success" sx={{ marginBottom: 2 }} fullWidth label="Picture link" id="picture" value={newsData.picture} />
    <TextField focused color="success" sx={{ marginBottom: 2 }} fullWidth label="Date" id="date" value={moment(newsData.date).format('DD-MM-YYYY, h:mm a')} />
    <TextField focused color="success" sx={{ marginBottom: 2 }} fullWidth label="Type" id="type" value={newsData.type} />
    <Link to='/News' className='btn btn-danger'> Back </Link>
  </Box>
  )
}
