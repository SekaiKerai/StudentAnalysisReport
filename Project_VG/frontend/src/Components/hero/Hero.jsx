import React from 'react'
import './Hero.css'
import  dark_arrow from '../../assets/white-arrow.png'
import { Link } from 'react-scroll';

const Hero = () => {
  return (
    <div className='hero container' >
      <div className="hero-text">
        <h1>We Ensure better education for a better world</h1>
        <p>We are dedicated to transforming education by delivering personalized, inclusive, and community-driven learning. Our platform supports learners with localized content, real-time progress tracking, and the tools they need to thrive in school and beyond.
        </p>
        <Link 
          to="about" 
          smooth={true} 
          offset={-100} 
          duration={500} 
          className="btn"
        >
          explore more <img src={dark_arrow} alt="" />
        </Link>
      </div>

    </div>
  )
}

export default Hero