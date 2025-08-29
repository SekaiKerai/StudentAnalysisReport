import React, { useRef } from 'react'
import './Video.css'
import video from '../../assets/7971025-uhd_3840_2160_24fps.mp4'


const Video=({playState, setPlayState})=> {
    const player = useRef(null);

    const closePlayer =(e)=>{
        if(e.target=== player.current){
            setPlayState(false);
        }
    }





  return (
    <div className={`videoply ${playState?'':'hide'}`} ref={player} onClick={closePlayer}>
        <video src={video} autoPlay muted controls onClick={(e) => e.stopPropagation()}></video>
    </div>
  )
}

export default Video