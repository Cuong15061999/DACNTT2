import React from 'react'
import { CardData } from '../../Data/CardData/Data'
import { Card } from './Card'
import './Cards.css'

export const Cards = () => {
  return (
    <div className='Cards'>
        {CardData.map((item, index) => {
            return(
                <div className='parentContainer' key={index}>
                    <Card
                    title={item.Title}
                    color={item.color}
                    barValue={item.barValue}
                    value={item.value}
                    icon={item.icon}
                    charData={item.series}
                    />
                </div>
            )
        })}
    </div>
  )
}
