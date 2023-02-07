import React from 'react'
import './UserPage.css'
import { UserTable } from '../../components/Table/UserTable'
import { Link } from 'react-router-dom'

export const UserPage = () => {

  return (
    <div className='UserPage'>
    <h1>User Page</h1>
    <Link to='/UserAdd' className='btn btn-success' >Add New User</Link>
    <UserTable></UserTable>
  </div>
  )
}
