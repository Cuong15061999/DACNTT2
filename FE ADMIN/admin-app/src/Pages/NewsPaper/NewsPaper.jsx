import React from 'react'
import './NewsPaper.css'
import { NewsPaperTable } from '../../components/Table/NewsPaperTable'
import { Button } from '@mui/material'

export const NewsPaper = () => {
  return (
    <div className='NewsPaperPage'>
      <h1>NewsPaper Page</h1>
      <Button variant="outlined" color="success">Add Newspaper</Button>
      <NewsPaperTable></NewsPaperTable>
    </div>
  )
}
