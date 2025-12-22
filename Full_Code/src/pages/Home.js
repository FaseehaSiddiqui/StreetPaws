import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-wrapper">
      {/* website introduction */}
      <header className="hero-section">
        <div className="hero-badge">
          ❤️ Community-Powered Animal Care
        </div>
        
        <h1 className="hero-title">
          Help Street Animals<br />
          <span className="orange-text">One Report at a Time</span>
        </h1>
        
        <p className="hero-description">
          Join our compassionate community in reporting injured or distressed street animals. 
          Your awareness can save lives and connect animals with the help they need.
        </p>
        
        <div className="hero-buttons">
          <Link to="/report" className="btn-report">
            Report an Animal
          </Link>
          <Link to="/view" className="secondary-btn">
            View All Reports
          </Link>
        </div>
      </header>

      {/*  how it works section for the website*/}
      <section className="how-it-works-section">
        <h2 className="section-title">How It Works</h2>
        <p className="section-subtitle">
          Simple steps to help make a difference in the lives of street animals
        </p>
        
        <div className="card-container">
          {/* Step 1 */}
          <div className="step-card">
            <div className="step-number">1</div>

            <div className="icon-wrapper">
                <img className="step-icon" src="spot_animal.png" alt="Spot animal icon" />

            </div>
            <h3 className="step-title">Spot an Animal</h3>
            <p className="step-desc">See an injured or distressed street animal in need of help</p>
          </div>

          {/* Step 2 */}
          <div className="step-card">
            <div className="step-number">2</div>

            <div className="icon-wrapper">
            <img className="step-icon" src="submit_report.png" alt="Submit report icon" />
            </div>


            <h3 className="step-title">Submit Report</h3>
            <p className="step-desc">Fill out a quick form with location, condition, and photo</p>
          </div>

          {/* Step 3 */}
          <div className="step-card">
            <div className="step-number">3</div>

            <div className="icon-wrapper">

            <img className="step-icon" src="alert.png" alt="alert community  icon" />

            </div>


            <h3 className="step-title">Alert Community</h3>
            <p className="step-desc">Your report helps raise awareness and connect with rescuers</p>
          </div>

          {/* Step 4 */}
          <div className="step-card">
            <div className="step-number">4</div>

            <div className="icon-wrapper">
                <img className="step-icon" src="save_lives.png" alt="Save lives  icon" />


            </div>


            <h3 className="step-title">Save Lives</h3>
            <p className="step-desc">Together we can make a difference for street animals</p>
          </div>
        </div>
      </section>

      {/* orange banner  */}
      <section className="orange-banner">
        <div className="banner-icon">
            <img className='banner-image' src="/banner_logo1.png" alt="banner heart logo"/>


        </div>

        <h2>Every Report Counts</h2>
        <p className="banner-desc">
          Join hundreds of caring individuals making a real difference for street animals in need
        </p>
        <div className="banner-buttons">
          <Link to="/report" className="white-btn">Submit a Report Now</Link>
          <Link to="/help" className="outline-btn">Emergency Help Resources</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;