import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom'
import axios from 'axios';

import './NewsPaperDetail.css'
import moment from 'moment';
export const NewsPaperDetail = () => {
  const {id} = useParams();
  const [newspaperData, setNewspaperData] = useState({});

  useEffect(() =>{
    axios.get('http://localhost:3001/newspaper/' + id)
    .then( (res) => {
      console.log(res.data.data)
      setNewspaperData(res.data.data)
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
    <h2> Newspaper Detail</h2>
    <TextField focused color="success" sx={{ marginBottom: 2 }} fullWidth label="Domain Name" id="domain_name" value={newspaperData.domain_name} />
    <TextField focused color="success" sx={{ marginBottom: 2 }} fullWidth label="RSS URL" id="rss_url" value={newspaperData.rss_url} />
    <TextField focused color="success" sx={{ marginBottom: 2 }} fullWidth label="Logo" id="logo" value={newspaperData.logo} />
    <TextField focused color="success" sx={{ marginBottom: 2 }} fullWidth label="Crawl Process" id="type" value={newspaperData.crawl_process} />
    <TextField focused color="success" sx={{ marginBottom: 2 }} fullWidth label="Latest Time Crawl" id="type" value={moment(newspaperData.last_date_crawl).format('DD-MM-YYYY, h:mm a')} />
    <TextField focused color="success" sx={{ marginBottom: 2 }} fullWidth label="Type" id="type" value={newspaperData.type} />

    <button className='btn btn-success' type='submit'> Crawl </button>
    <Link to='/Newspaper' className='btn btn-danger'> Back </Link>
  </Box>
  )
}
