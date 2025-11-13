import main_banner from '../assets/banner1.png'
import main_banner_mobile from '../assets/banner2.png'
import React from 'react'
import white_arrow_icon from '../assets/white_arrow_icon.svg'
import black_arrow_icon from '../assets/black_arrow_icon.svg'
import { Link } from 'react-router-dom'


const MainBanner = () => {
  return (
    <div className='relative'>
          <img src={main_banner} alt="banner" className='w-full hidden md:block'/>
          <img src={main_banner_mobile} alt="banner" className='w-full md:hidden'/>
          <div className='absolute inset-0 flex flex-col items-center md:items-start justify-end md:justify-center pb-24 md:pb-0 px-4 md:px-12 lg:px-20'>


          <h1 className='text-3xl md:text-4x1 1g:text-5x1 font-bold text-center md:text-left max-w-72 md:max-w-80 1g:max-w-105 leading-tight'>
            Freshness You Can Trust, Savings You will Love! 
          </h1>
          <div className='flex items-center mt-6 font-medium'>
            <Link to={"/products"} className='group flex items-center gap-2 px-7 md:px-9 py-3 bg-primary hover:bg-primary-dull transition rounded text-white cursor-pointer'>
            Shop now
            <img className='md:hidden transition group-focus: translate-x-1' src={white_arrow_icon} alt="arrow" />
            </Link>
            <Link to={"/products"} className='group hidden md:flex items-center gap-2 px-9 py-3 cursor-pointer'>
            Explore deals
            <img className='transition group-hover: translate-x-1' src={black_arrow_icon} alt="arrow" />
            </Link>
          </div>
        </div>
    </div>

  )
}

export default MainBanner;