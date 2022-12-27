import React from 'react'
import { Cards } from '../../components/Cards/Cards'
import { Table } from '../../components/Table/Table'
import './MainDashboard.css'
export const MainDashboard = () => {
  return (
    <div className='MainDash'>
        <h1>Dashboard</h1>
        <Cards></Cards>
        <Table></Table>
    </div>
  )
}
