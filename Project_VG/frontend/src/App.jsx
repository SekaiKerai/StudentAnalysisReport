import React, { useState, useEffect } from 'react'; 
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar'
import Hero from './Components/hero/Hero'
import Programs from './Components/Programs/Programs'
import Title from './Components/Title/Title'
import About from './Components/about/About'
import Campus from './Components/Campus/Campus'
import Testimonial from './Components/Testimonial/Testimonial'
import Contact from './Components/Contact/Contact'
import Footer from './Components/footer/Footer'
import Video from './Components/Video/Video'
import Donate from './Components/Donor/Donate';
import Auth_New from './Components/Auth/Auth';
import { getDashboardUrl, getDashboardName } from './config/dashboardConfig';

// Dashboard Components
const StudentDashboard = () => {
  useEffect(() => {
    const dashboardUrl = getDashboardUrl('student');
    window.location.href = dashboardUrl;
  }, []);
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      flexDirection: 'column',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h2>Redirecting to Student Dashboard...</h2>
      <p>If you are not redirected automatically, <a href={getDashboardUrl('student')}>click here</a></p>
    </div>
  );
};

const TeacherDashboard = () => {
  useEffect(() => {
    const dashboardUrl = getDashboardUrl('tutor');
    window.location.href = dashboardUrl;
  }, []);
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      flexDirection: 'column',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h2>Redirecting to Teacher Dashboard...</h2>
      <p>If you are not redirected automatically, <a href={getDashboardUrl('tutor')}>click here</a></p>
    </div>
  );
};

const AdminDashboard = () => {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      flexDirection: 'column',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h2>Admin Dashboard</h2>
      <p>Admin dashboard functionality coming soon...</p>
      <button onClick={() => window.location.href = '/'}>Back to Home</button>
    </div>
  );
};

// Main Landing Page Component
const LandingPage = () => {
  const [playState, setPlayState] = useState(false);
  
  return (
    <div>
      <Navbar/>
      <Hero/>
      <div className="container">
        <Title subTitle='OUR PROGRAM' title='WHAT WE OFFER'/>
        <Programs/>
        <About setPlayState={setPlayState}/>
        <Title subTitle='GALLERY' title='Campus Photos'/>
        <Campus/>
        <Title subTitle='testimonials' title='what students says '/>
        <Testimonial/>
        <Title subTitle='Donate' title='what students says '/>
        <Donate/>
        <Title subTitle='Contact us' title='get in touch with us'/>
        <Contact/>
        <Title subTitle='Login and Register' title='get in touch with us'/>
        <Auth_New/>
        <Footer/>
      </div>
      <Video playState={playState} setPlayState={setPlayState}/>
    </div>
  );
};

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  if (!token) {
    return <Navigate to="/" replace />;
  }
  
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Main landing page */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Dashboard routes */}
        <Route 
          path="/studentdash" 
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <StudentDashboard />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/teacherdash" 
          element={
            <ProtectedRoute allowedRoles={['tutor']}>
              <TeacherDashboard />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/admindash" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        
        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;