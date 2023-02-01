import React from 'react'
import './News.css'
import { NewsTable } from '../../components/Table/NewsTable'

export const News = () => {
  return (
    <div className='NewsPage'>
      <h1>News Page</h1>
      <NewsTable></NewsTable>
    </div>
  )
}
