import React, { useState } from 'react'
import PreLoader from '../../components/PreLoader'
import Nav from '../../components/Nav/Nav';

const Home = () => {
    const [preloader,setPreLoader]=useState(true);
    setTimeout(()=>{
        setPreLoader(false)
    },3000)
    console.log(preloader)
  return (
    <div className='home'>
        {
            preloader && <PreLoader/>
        }
        <Nav/>
    </div>
  )
}

export default Home