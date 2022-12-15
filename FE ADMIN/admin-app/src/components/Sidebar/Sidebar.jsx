import React, { useState } from 'react'
import Logo from '../../imgs/logo.png'
import './Sidebar.css'
import { SidebarData } from '../../SidebarData/Data'
import { UilSignout, UilBars } from '@iconscout/react-unicons'
import {motion} from 'framer-motion'
export const Sidebar = () => {
    const [sidebarSelected, setSidebarSelected] = useState(0)
    const [expanded, setExpanded] = useState(false)
    const sidebarVariants = {
        true:{
            left: '0'
        },
        false:{
            left: '-65%'
        }
    }
    return (
        <>
            <div className='menuButton' style={expanded ? {left: "60%"}: {left: "5%"}} onClick={() => setExpanded(!expanded)}>
                <UilBars></UilBars>
            </div>
            <motion.div className='Sidebar'
            variants={sidebarVariants}
            animate={window.innerWidth<=768?`${expanded}`:``} 
            >
                <div className='logo'>
                    <img src={Logo} alt=""></img>
                    <span>
                        Newspaper Admin
                    </span>
                </div>

                {/*menu*/}
                <div className='menu'>
                    {SidebarData.map((item, index) => {
                        return (
                            <div className={sidebarSelected === index ? 'menuItem active' : 'menuItem'}
                                key={index}
                                onClick={() => setSidebarSelected(index)}>
                                <item.Icon />
                                <span>
                                    {item.Name}
                                </span>
                            </div>
                        )
                    })}
                    <div className='menuItem'>
                        <UilSignout></UilSignout>
                        <span> Logout</span>
                    </div>
                </div>

            </motion.div>
        </>
    )
}
