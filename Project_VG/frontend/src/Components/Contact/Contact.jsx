import React from 'react'
import './Contact.css'
import msg_icon from '../../assets/msg-icon.png'
import ph_icon from '../../assets/phone-icon.png'
import mail_icon from '../../assets/mail-icon.png'
import loc_icon from '../../assets/location-icon.png'
import arw from '../../assets/white-arrow.png'

const Contact = () => {

  const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "0dc644b6-e12b-453c-bdbc-972121c75eef");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };


  return (
    <div className="contact">
        <div className="contact-col">
            <h2>send us a msg <img src={msg_icon} alt="" /></h2>
            <p>Feel free to reach out through contact form or find our 
                contact information below. Your feedback, questions, and suggestions 
                are important to us as we strive 
                to provide exceptional service to
                 our university community.</p>
                 <ul>
                    <li>  <img src={mail_icon} alt="" /> info@visionseducation.org</li>
                    <li><img src={ph_icon} alt="" /> +17146603054 </li>
                    <li><img src={loc_icon} alt="" /> Visions Global Empowerment, 18800 Von Karman Ave., Suite A, Irvine, CA, 92612, USA </li>
                 </ul>
        </div>
        <div className='contact-col'>
            <form onSubmit={onSubmit}>
                <label> Your name</label>
                <input type="text" name="name" placeholder='enter your name' required/>
                <label>phone number</label>
                <input type="tel" name='phone' placeholder='enter ur mobile number' required />
                <label >Write your message here</label>
                <textarea name="message" rows="6" placeholder='enter ur message' required></textarea>
                <button type='submit' className='btn dark-btn'>submit now <img src={arw} alt="" /></button>
            </form>
            <span>{result}</span>
        </div>
    </div>
  )
}

export default Contact