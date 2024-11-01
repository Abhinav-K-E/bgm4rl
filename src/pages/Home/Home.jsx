import React, { useState } from "react";
import PreLoader from "../../components/PreLoader";
import Nav from "../../components/Nav/Nav";

const Home = () => {
  const [preloader, setPreLoader] = useState(true);
  setTimeout(() => {
    setPreLoader(false);
  }, 3000);
  console.log(preloader);
  return (
    <div className="home">
      {preloader && <PreLoader />}
      <Nav />
      <div className="chat-ui">
        <div>
          <div className="scale-0">
            <div className="circle circle-1" />
            <div className="circle circle-2" />
            <div className="circle circle-3" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
