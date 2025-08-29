import React, { useRef } from 'react'
import './Testimonial.css'
import next_img from '../../assets/next-icon.png'
import back_img from '../../assets/back-icon.png'
import user1 from '../../assets/test1.jpg'
import user2 from '../../assets/test2.jpg'
import user3 from '../../assets/test3.jpg'
import user4 from '../../assets/test4.jpg'

const Testimonial = () => {
    const slider =useRef();
    let tx = 0;


    const slideforward=()=>{
        if (tx>-50){
            tx -= 25
        }
        slider.current.style.transform=`translateX(${tx}%)`
        
    }
    const slidebackward=()=>{
        if (tx<0){
            tx += 25
        }
        slider.current.style.transform=`translateX(${tx}%)`
        

    }

  return (
    <div className='testimonials'>
        <img src={next_img} alt=""  className='next-btn'onClick={slideforward}/>
        <img src={back_img} alt=""  className='back-btn' onClick={slidebackward}/>
        <div className='slider'>
            <ul ref={slider}>
                <li>
                    <div className='slide'>
                        <div className="userinfo">
                            <img src={user1} alt="" />
                            <div>
                                <h3>D. Shylet Moni 
</h3>
                                <span>- Managing Trustee & Founder</span>
                            </div>
                        </div>
                        <p>Mr. Shylet Moni is a development professional and research scholar with a Masters in Sociology. He has 20+ years of experience in development fields such as women & children empowerment, sustainable rural livelihoods development, and education. He has worked with organizations such as Oxfam Canada, Oxfam G.B., and the ALC School Project. He is currently working toward his Doctoral degree through the Women Studies Department at Bharathidasan University in Tiruchirappalli.</p>
                    </div>
                </li>
                <li>
                    <div className='slide'>
                        <div className="userinfo">
                            <img src={user2} alt="" />
                            <div>
                                <h3>A.S. Beena 
</h3>
                                <span>- Deputy Director,Trichy</span>
                            </div>
                        </div>
                        <p>Beena is a post graduate in English with specialization in education. She has 23 years of teaching experience. Besides coaching, she loves gardening and cooking. She too loves development work. She has managed innovative projects of UNDP, and All India Disaster Mitigation Institute. She loves to help rural children excel in education and leadership. She also enjoys organizing events and counseling Visions Youth.</p>
                    </div>
                </li>
                <li>
                    <div className='slide'>
                        <div className="userinfo">
                            <img src={user3} alt="" />
                            <div>
                                <h3>Gregory T. Buie (Chairman) 
</h3>
                                <span>- Los Angeles, California, U.S.A.</span>
                            </div>
                        </div>
                        <p>Greg Buie is the Executive Director & Co-Founder of Visions Global Empowerment (USA). He has worked as an international development consultant, serving organizations that operate in countries all over the world, including Sri Lanka, India, Ethiopia, Kenya, and Indonesia. He holds a BA in Political Science: International Relations from the University of California, San Diego, and an MA in International Studies & Diplomacy from the School of Oriental and African Studies, University of London.</p>
                    </div>
                </li>
                <li>
                    <div className='slide'>
                        <div className="userinfo">
                            <img src={user4} alt="" />
                            <div>
                                <h3>Sonja Astfalck (Development Chair)
</h3>
                                <span> - London, U.K.</span>
                            </div>
                        </div>
                        <p>Sonja’s professional experience is in the public and financial sectors, including diplomacy, policy-making and risk management, and with a focus on strategic approaches to promoting sustainability and building resilience within economic and social development. Sonja currently works as Strategy Lead at the International Finance Corporation (IFC).</p>
                    </div>
                </li>
            </ul>

        </div>
    </div>
  )
}

export default Testimonial
