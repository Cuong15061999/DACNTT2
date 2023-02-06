import React from 'react'
import './NewsPaperEdit.css'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';


export const NewsPaperEdit = () => {

  const {id} = useParams();
  const [newspaperData, setNewspaperData] = useState({});
  
  const [domainName, setDomainName] = useState('');
  const [rssURL, setRssURL] = useState('');
  const [logo, setLogo] = useState('');
  const [type, setType] = useState('');

  const navigate = useNavigate();

  useEffect(() =>{
    axios.get('http://localhost:3001/newspaper/' + id)
    .then( (res) => {
      console.log(res.data.data)
      setDomainName(res.data.data.domain_name);
      setRssURL(res.data.data.rss_url)
      setLogo(res.data.data.logo)
      setType(res.data.data.type)
    })
    .catch( (err) => {
      console.log(err)
    })
  },[])

  const handlesubmit = (e) =>{
    e.preventDefault();
    console.log({domainName, rssURL, logo, type});
    axios.put('http://localhost:3001/newspaper/'+ id, {
      domain_name: domainName,
      rss_url: rssURL,
      logo: logo,
      type: type,
    })
    .then( (res) => {
      console.log(res.data)
      alert('Saved Successfully')
      navigate('/Newspaper')
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
        <h2> Edit Newspaper</h2>
        <TextField required sx={{ marginBottom: 2 }} fullWidth label="Domain Name" id="domain_name" value={domainName} onMouseDown={e => setValidation(true)} onChange={e => setDomainName(e.target.value)} />
        <TextField required sx={{ marginBottom: 2 }} fullWidth label="RSS URL" id="rss_url" value={rssURL} onMouseDown={e => setValidation(true)} onChange={e => setRssURL(e.target.value)} />
        <TextField sx={{ marginBottom: 2 }} fullWidth label="Logo" id="logo" value={logo} onChange={e => setLogo(e.target.value)} />
        <TextField sx={{ marginBottom: 2 }} fullWidth label="Type" id="type" value={type} onChange={e => setType(e.target.value)} />
        <button className='btn btn-success' type='submit'> Save </button>
        <Link to='/Newspaper' className='btn btn-danger'> Back </Link>
      </Box>
    </form>
  )
}
