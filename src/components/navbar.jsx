import React from 'react'
import logo from '../assets/sneakers.png'


function Navbar() {
  return (
     <div className="flex w-full bg-[#F6F6F4] p-2 items-center fixed z-10">
      <img className='align-middle' height={"50px"} width={"50px"} src={logo} alt="logo" />
      <ul className="flex justify-evenly list-none w-[40%]">
        <li className='cursor-pointer'>Home</li>
        <li className='cursor-pointer'>Categories</li>
        <li className='cursor-pointer'>About Us</li>
      </ul>
    </div>
  
  )
}

export default Navbar