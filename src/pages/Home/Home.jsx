import React, { useState } from 'react'
import PreLoader from '../../components/PreLoader'

const Home = () => {
    const [preloader,setPreLoader]=useState(false);
    setTimeout(()=>{
        setPreLoader(false)
    },2000)
  return (
    <div>
        {
            preloader && <PreLoader/>
        }
    </div>
  )
}

export default Home