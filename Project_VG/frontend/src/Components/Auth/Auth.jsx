import React, { useState } from 'react';
import './Auth.css';

// --- SignInForm Sub-Component ---
const SignInForm = ({ onSignUpClick }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('user', JSON.stringify(data.data.user));
        
        // Redirect based on user role
        const userRole = data.data.user.role;
        if (userRole === 'student') {
          window.location.href = '/studentdash';
        } else if (userRole === 'tutor') {
          window.location.href = '/teacherdash';
        } else if (userRole === 'admin') {
          window.location.href = '/admindash';
        } else {
          // Default redirect for unknown roles
          window.location.reload();
        }
      } else {
        setError(data.error || 'Login failed. Please try again.');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container1">
      <h1 className="form-title">Sign In</h1>
      <form onSubmit={handleSubmit}>
        {error && <p className="error-popup">{error}</p>}

        <div className="input-group">
            <label htmlFor="email-signin">Email</label>
          <input type="email" id="email-signin" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          
        </div>

        <div className="input-group">
            <label htmlFor="password-signin">Password</label>
          <input type="password" id="password-signin" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
          
        </div>

        {/* <div className="input-group">
          <label htmlFor="role-signin" className="select-label">Select Role</label>
          <select id="role-signin" value={role} onChange={(e) => setRole(e.target.value)} required className="select-field">
            <option value="student">Student</option>
            <option value="educator">Community Educator</option>
            <option value="admin">Admin</option>
          </select>
        </div> */}

        <p className="recover"><a href="#">Recover Password</a></p>
        <button type="submit" className="btn1">Sign In</button>
      </form>

      <div className="links">
        <p>Don't have an account yet?</p>
        <button onClick={onSignUpClick}>Sign Up</button>
      </div>
    </div>
  );
};

// --- SignUpForm Sub-Component ---
const SignUpForm = ({ onSignInClick }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [phone, setPhone] = useState('');
  const [centerId, setCenterId] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role, phone, centerId }),
      });

      const data = await response.json();
      if (response.ok) {
        // Auto login after successful signup
        const loginResp = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, role }),
        });
        const loginData = await loginResp.json();
        if (loginResp.ok) {
          localStorage.setItem('token', loginData.data.token);
          localStorage.setItem('user', JSON.stringify(loginData.data.user));
          
          // Redirect based on user role
          const userRole = loginData.data.user.role;
          if (userRole === 'student') {
            window.location.href = '/studentdash';
          } else if (userRole === 'tutor') {
            window.location.href = '/teacherdash';
          } else if (userRole === 'admin') {
            window.location.href = '/admindash';
          } else {
            // Default redirect for unknown roles
            window.location.reload();
          }
        } else {
          setError(loginData.error || 'Signup succeeded but login failed.');
        }
      } else {
        setError(data.error || 'Signup failed. Please try again.');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container1">
      <h1 className="form-title">Register</h1>
      <form onSubmit={handleSubmit}>
        {error && <p className="error-popup">{error}</p>}

        <div className="input-group">
             <label htmlFor="fName">Full Name</label>
          <input type="text" id="fName" placeholder="Full Name" required value={name} onChange={(e) => setName(e.target.value)} />
         
        </div>

        <div className="input-group">
            <label htmlFor="email-signup">Email</label>
          <input type="email" id="email-signup" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          
        </div>

        <div className="input-group">
             <label htmlFor="password-signup">Password</label>
          <input type="password" id="password-signup" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
         
        </div>

        <div className="input-group">
            <label htmlFor="phone">Phone</label>
          <input type="tel" id="phone" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
          
        </div>

        <div className="input-group">
            <label htmlFor="centerId">Center ID</label>
          <input type="text" id="centerId" placeholder="Center ID" value={centerId} onChange={(e) => setCenterId(e.target.value)} />
          
        </div>

        <div className="input-group">
          <label htmlFor="role-signup" className="select-label">Select Role</label>
          <select id="role-signup" value={role} onChange={(e) => setRole(e.target.value)} required className="select-field">
            <option value="student">Student</option>
            <option value="tutor">Tutor</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button type="submit" className="btn1">Sign Up</button>
      </form>

      <div className="links">
        <p>Already Have Account?</p>
        <button onClick={onSignInClick}>Sign In</button>
      </div>
    </div>
  );
};

// --- Main Auth Component ---
const Auth_New = () => {
  const [showSignIn, setShowSignIn] = useState(true);
  const isAuthenticated = !!localStorage.getItem('token');
  // if (isAuthenticated) return null;

  return (
    <section id="login" className="section">
      {showSignIn ? (
        <SignInForm onSignUpClick={() => setShowSignIn(false)} />
      ) : (
        <SignUpForm onSignInClick={() => setShowSignIn(true)} />
      )}
    </section>
  );
};

export default Auth_New;