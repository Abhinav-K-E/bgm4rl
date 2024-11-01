import React, { useState } from "react";
import PreLoader from "../../components/PreLoader";
import Nav from "../../components/Nav/Nav";
import MalayalamSpeechToText from "../../components/VoiceTast";

import HERO from "../../assets/Retro.png";
import SPEAKER from "../../assets/speaker.png"
import BTN from "../../assets/btn.png"

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
      {/* <div className="chat-ui">
        <div>
          <div className="scale-0">
            <div className="circle circle-1" />
            <div className="circle circle-2" />
            <div className="circle circle-3" />
          </div>
        </div>
      </div>
      <div className="voice-txt">
        <p className="voice-txt-p">
          <MalayalamSpeechToText/>
        </p>
      </div>
      <div className="voice-record">
        <div className="record">
          Start Record
        </div>
      </div> */}
      <img className="hero-txt" src={HERO} alt="" />
      <div className="voice-txt">
        <p className="voice-txt-p">
          {/* <MalayalamSpeechToText /> */}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium, sapiente velit distinctio consequatur magni libero reprehenderit nihil possimus tenetur dignissimos?
        </p>
      </div>
      <img src={SPEAKER} className="speaker" alt="" />
      <img src={BTN} alt="" className="btn" />
    </div>
  );
};

export default Home;
