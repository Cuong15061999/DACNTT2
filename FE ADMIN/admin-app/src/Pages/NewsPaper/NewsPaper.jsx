import React from 'react'
import './NewsPaper.css'
import { NewsPaperTable } from '../../components/Table/NewsPaperTable'
import { Link } from 'react-router-dom'
import axios from 'axios';

export const NewsPaper = () => {
  const handleOnclick = () => {
    if (window.confirm('Do you want to Crawl All newspaper ?')) {
      axios.get('http://localhost:3001/news/crawl')
        .then((res) => {
          console.log(res.data)
          alert('Crawl All Link Successfully')
          window.location.reload();
        })
        .catch((err) => {
          console.log(err)
        })
    }
  };
  return (
    <div className='NewsPaperPage'>
      <h1>NewsPaper Page</h1>
      <Link to='/NewspaperAdd' className='btn btn-success' >Add Newspaper</Link>
      <button className='btn btn-success' onClick={() => { handleOnclick() }}>Crawl all</button>
      <NewsPaperTable></NewsPaperTable>
    </div>
  )
}
