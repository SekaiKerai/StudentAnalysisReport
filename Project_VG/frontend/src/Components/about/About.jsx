import React from 'react'
import './About.css'
import about_img from '../../assets/video.jpg'
import play_icon from '../../assets/play-icon.png'


const About = ({setPlayState}) => {
  return (
    <div className='about'>
        <div className='about-left'>
            <img src= {about_img} alt="" className='about_img'/>
            <img src={play_icon} alt="" className='play_icon' onClick={()=>{setPlayState(true)}}/>
        </div>
        <div className='about-right'>
            <h3>ABOUT THE VISION GLOBAL EMPOWERMENT</h3>
            <h2>Nuturing Tmrw's leader today</h2>
            <p>Visions Global Empowerment – India ("Visions India") is a nonprofit organization dedicated to driving social change through education, technology, leadership, and health. Operating primarily in Tamil Nadu, the organization focuses on empowering marginalized communities—especially youth facing poverty, disability, or discrimination—through inclusive, equitable, and sustainable development.</p>
        </div>
    </div>
  )
}

export default About