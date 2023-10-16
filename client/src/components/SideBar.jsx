import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {logo, sun} from '../assets'
import { navlinks } from '../constand'



const Icon = ({styles, imgUrl,name, isActive,HandleChange})=>(
    <div className={`h-[48px] w-[48px] rounded-[10px] ${isActive && isActive === name && 'bg-[#2c2f32]'} flex justify-center items-center cursor-pointer ${styles}`} onClick={HandleChange}>
      {isActive !== name ? (
        <img src={imgUrl} alt="fund_logo" className='w-1/2 h-1/2 grayscale' />
      ):(
        <img src={imgUrl} alt="fund_logo" className='w-1/2 h-1/2' />
      )}
    </div>
)


const SideBar = () => {
    const[isActive,setActive] = useState('dashboard')
    const navigate = useNavigate();
  return (
    <div className='flex justify-between items-center flex-col h-[93vh] top-5 sticky'>
        <Link to='/'>
            <Icon styles = 'h-[56px] w-[56px] bg-[#2c2f32]' imgUrl={logo} />
        </Link>


        <div className='flex flex-col flex-1 rounded-[20px] justify-between items-center bg-[#1c1c24] w-[76px] py-4 mt-12'>
          <div className='flex flex-col justify-center items-center'>
            {
              navlinks.map( (t)=>(
                <Icon
                key={t.name}
                {...t}
                isActive={isActive}
                HandleChange={()=>{
                  setActive(t.name)
                  navigate(t.link)
                }}
                />
              ))
            }
          </div>
          <Link to='/'>
          <img src={sun} alt="settings" />
        </Link>
        </div>
    </div>
  )
}

export default SideBar