import React, { useState } from 'react'
import PreLoader from '../../components/PreLoader'

const Home = () => {
    const [preloader,setPreLoader]=useState(true);
    setTimeout(()=>{
        setPreLoader(false)
    },3000)
    console.log(preloader)
  return (
    <div>
        {
            preloader && <PreLoader/>
        }
        hey
    </div>
  )
}

export default Home