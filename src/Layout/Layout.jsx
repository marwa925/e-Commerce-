import React from 'react'
import { Outlet } from 'react-router-dom'
import MainSlider from '../MainSlider/MainSlider'
import Navbar from '../Navbar/Navbar'

export default function Layout({userData,logOut}) {
  return (
    <div>
      <div className=''>
      <Navbar userData={userData} logOut={logOut}/>
      
      </div>
      <div className=''>
        <Outlet></Outlet>
      </div>
    </div>
  )
}
