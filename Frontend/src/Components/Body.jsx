import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router'
import FooterSec from './FooterSec'

const Body = () => {

  return (
    <div>
        <Navbar/>
        <Outlet/>
        <FooterSec/>
    </div>
  )
}

export default Body