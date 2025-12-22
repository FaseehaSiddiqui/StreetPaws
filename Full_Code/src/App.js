import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink,Link, Navigate } from 'react-router-dom';
import './App.css';

import { useEffect } from 'react'; 
import { auth } from './firebase'; 
import { onAuthStateChanged } from 'firebase/auth';
import { signOut } from 'firebase/auth';

// Importing the pages
import Home from './pages/Home';
import ReportPage from './pages/ReportAnimal';
import ViewReports from './pages/ViewReports';
import HelpBoard from './pages/HelpBoard';
import AuthPage from './pages/AuthPage';
import ContactNGOs from './pages/ContactNGOs';
import Dashboard from './pages/user_dashboard'; 


const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    // If no user is logged in, send them to the login page
    return <Navigate to="/auth" replace />;
  }
  return children;
};

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // This looks for login/logout events automatically
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); 
    });
    return () => unsubscribe(); 
  }, []);


  const handleLogout = () => {
    auth.signOut().then(() => {
      setUser(null); 
      
      window.location.href = "/"; 
    }).catch((error) => {
      console.error("Logout Error:", error);
    });
  };

  return (
    <Router>
      <div className="App">
        {/* Navigation Bar */}
        <nav className="navbar">

          <div className="nav-container">

            <Link to="/" className="nav-logo">
              Street Paws 
              <img src="website_logo.png" alt="website logo "></img>
            </Link>
            
            <div className="nav-links">
                    {user ? (
                      /*  top navigation bar view for logged in users   */
                      <>
                        {/* here changed the  link to NavLink for highlighting */}
                        <NavLink to="/view" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
                          View Reports
                        </NavLink>
                        
                        <NavLink to="/dashboard" className={({ isActive }) => isActive ? "nav-item active dashboard-tab" : "nav-item dashboard-tab"}>
                          My Reports
                        </NavLink>
                        
                        <button onClick={handleLogout} className="logout-btn">
                          Logout
                        </button>
                      </>
                    ) : (
                      /*  top navigation bar view for logged out users */
                      <>
                        <NavLink to="/" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>Home</NavLink>
                        <NavLink to="/view" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>View Reports</NavLink>
                        <NavLink to="/help" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>Emergency Tips</NavLink>
                        <NavLink to="/contact" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>NGOs</NavLink>
                        <NavLink to="/auth" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>Login</NavLink>
                        <Link to="/report" className="btn-report">Report Now</Link>
                      </>
                    )}
                </div>
                </div>
              </nav>

        {/* Page Content Container */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            
            <Route path="/report" element={<ReportPage user={user} />} />

            <Route path="/view" element={<ViewReports />} />
            <Route path="/help" element={<HelpBoard />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/contact" element={<ContactNGOs />} />
            
            <Route path="/dashboard" element={<ProtectedRoute user={user}>
                  <Dashboard user={user} userName={user?.email ? user.email.split('@')[0].replace('.', ' ') : 'User'} 
                  />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>

        {/*  Footer with names  */}
        <footer style={{ textAlign: 'center', padding: '40px', color: '#434343', fontSize: '0.9rem' }}>
          <hr style={{ border: '0.5px solid #eeeeeec1', marginBottom: '20px' }} />
          <p>&copy; 2025 Street Paws Pakistan - Faseeha Siddiqui & Ilsa Rehan</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;