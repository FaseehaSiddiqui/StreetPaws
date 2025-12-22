//Faseeha siddiqui 251723892 & Ilsa rehan
//this deals with firebase login and logout using email

import React, { useState } from 'react';
import '../App.css';
import { auth } from '../firebase'; 
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
// Log the users  in
        await signInWithEmailAndPassword(auth, email, password); 
      } else {
// Create new account
        await createUserWithEmailAndPassword(auth, email, password); 
      }
// after login Send them to the dashboard
      navigate('/dashboard'); 
    } catch (error) {
      alert(error.message); 
    }
  }; 

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>

      <div className="card" style={{ width: '100%', maxWidth: '400px' }}>

        <h2 style={{ textAlign: 'center', color: '#6D597A' }}>
          {isLogin ? 'Welcome Back! 🐾' : 'Join Street Paws 🐾'}
        </h2>
        
        <p style={{ textAlign: 'center', color: '#777', marginBottom: '20px' }}>
          {isLogin ? 'Login to manage your reports' : 'Create an account to help animals'}
        </p>

        {/* when the form is submitted it gets saved in the firestore database */}
        <form onSubmit={handleAuth}> 
          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" 
              className="form-control" 
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              className="form-control" 
              placeholder="Min. 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              required
            />
          </div>
          
          <button type="submit" className="btn-report" style={{ width: '100%', border: 'none', cursor: 'pointer', marginTop: '10px' }}>
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.9rem' }}>
          {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
          <span 
            onClick={() => setIsLogin(!isLogin)} 
            style={{ color: '#FF8C42', cursor: 'pointer', fontWeight: 'bold' }}
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;