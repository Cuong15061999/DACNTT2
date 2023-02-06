import React from 'react'
import './NewsPaper.css'
import { NewsPaperTable } from '../../components/Table/NewsPaperTable'
import { Link } from 'react-router-dom'

export const NewsPaper = () => {
  return (
    <div className='NewsPaperPage'>
      <h1>NewsPaper Page</h1>
      <Link to='/NewspaperAdd' className='btn btn-success' >Add Newspaper</Link>
      <NewsPaperTable></NewsPaperTable>
    </div>
  )
}
