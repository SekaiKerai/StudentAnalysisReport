// MultipleFiles/Navbar.jsx
import React, { useEffect, useState } from 'react';
import './Navbar.css';
import logo from '../../assets/logo.jpg';
import { Link } from 'react-scroll';
import menu from '../../assets/menu-icon.png';
import TextToSpeechButton from '../../Components/text-speech/TextToSpeechButton'; // Import the new component

const Navbar = () => {
  const [sticky, setSticky] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [readPageActive, setReadPageActive] = useState(false); // State to control TTS
  const [pageContent, setPageContent] = useState(''); // State to hold content to read

  // Sticky navbar logic
  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Load dark mode preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') setDarkMode(true);
  }, []);

  // Apply/remove dark class on body
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleMenu = () => {
    setMobileMenu(!mobileMenu);
  };

  // Function to extract readable text from the page
  const extractPageText = () => {
    // Target main content areas. You might need to adjust these selectors
    // based on your actual HTML structure.
    const readableElements = document.querySelectorAll(
      'h1, h2, h3, h4, h5, h6, p, li, .hero-text, .about-right, .program .caption p, .slide p, .contact-col p'
    );
    let fullText = '';
    readableElements.forEach(el => {
      // Filter out elements that are part of the TTS button itself or other controls
      if (!el.closest('.tts-button') && !el.closest('.toggle-theme')) {
        fullText += el.textContent + '. '; // Add a period for better sentence separation
      }
    });
    return fullText.trim();
  };

  // Handler for the TTS button toggle
  const handleReadPageToggle = (activate) => {
    setReadPageActive(activate);
    if (activate) {
      const text = extractPageText();
      setPageContent(text);
    } else {
      setPageContent(''); // Stop reading
    }
  };

  return (
    <nav className={`container ${sticky ? 'dark-nav' : ''}`}>
      <img src={logo} alt="logo" className="logo" />

      <ul className={mobileMenu ? '' : 'hide-mobile-menu'}>
        <li><Link to="hero" smooth={true} offset={0} duration={500}>home</Link></li>
        <li><Link to="program" smooth={true} offset={-260} duration={500}>program</Link></li>
        <li><Link to="about" smooth={true} offset={-150} duration={500}>about us</Link></li>
        <li><Link to="campus" smooth={true} offset={-260} duration={500}>gallery</Link></li>
        <li><Link to="testimonials" smooth={true} offset={-260} duration={500}>testimonials</Link></li>
        <li><Link to="contact" smooth={true} offset={-260} duration={500}>contact us</Link></li>
         <li><Link to="donate" smooth={true} offset={-150} duration={500}>donate</Link></li>
        {/* <li><Link className="btn">contact us</Link></li> */}
       <li>
  <Link
    to="login"
    smooth={true}
    offset={-100}
    duration={500}
    className="toggle-theme" // 👈 Use same class for consistent style
    style={{ marginLeft: '10px' }} // optional spacing
  >
    🔐 Login
  </Link>
</li>

      </ul>

      {/* Dark Mode Toggle */}
      <button className="toggle-theme" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? '🌞 Light' : '🌙 Dark'}
      </button>

      {/* Text-to-Speech Button */}
      {/* <TextToSpeechButton
        textToRead={readPageActive ? pageContent : ''}
        onToggle={handleReadPageToggle}
      />

      <img src={menu} alt="menu" className="menu_icon" onClick={toggleMenu} /> */}
    </nav>
  );
};

export default Navbar;
