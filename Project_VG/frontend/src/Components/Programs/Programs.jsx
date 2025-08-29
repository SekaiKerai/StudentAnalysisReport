import React from 'react'
import './Programs.css'
import pro1 from '../../assets/tech1.jpeg'
import pro2 from '../../assets/tech2.jpeg'
import pro3 from '../../assets/tech3.jpeg'
import pro_icon1 from '../../assets/program-icon-1.png'
import pro_icon2 from '../../assets/program-icon-2.png'
import pro_icon3 from '../../assets/program-icon-3.png'



const Programs = () => {
  return (
    <div className='programs '>
        <div className="program">
            <img src={pro1} alt="" />
            <div className='caption'>
                <img src={pro_icon1} alt="" />
                {/* <p>Graduation degree</p> */}
            </div>
        </div>
        <div className="program">
            <img src={pro2} alt="" />
            <div className='caption'>
                <img src={pro_icon2} alt="" />
                {/* <p>masters degree</p> */}
            </div>
        </div>
        <div className="program">
            <img src={pro3} alt="" />
            <div className='caption'>
                <img src={pro_icon3} alt="" />
                {/* <p>post Graduation degree</p> */}
            </div>
        </div>
    </div>
  )
}

export default Programs