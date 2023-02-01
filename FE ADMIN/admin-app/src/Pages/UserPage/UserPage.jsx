import React from 'react'
import './UserPage.css'
import { Button } from '@mui/material'
import { UserTable } from '../../components/Table/UserTable'

export const UserPage = () => {
  return (
    <div className='UserPage'>
    <h1>User Page</h1>
    <Button variant="outlined" color="success">Add Newsuser</Button>
    <UserTable></UserTable>
  </div>
  )
}
