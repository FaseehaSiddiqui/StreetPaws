//Faseeha Siddiqui 251723892 & Ilsa rehan

import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const HelpBoard = () => {
  const navigate = useNavigate();

 //safety tips for the users

  const safetyTips = [
    {
      title: "Approach Safely",
      desc: "Never approach an injured animal without caution. Use a calm voice and slow movements.",
      icon: <img src="icon_1.png" style={{ width: '70px', height: '70px' }} alt="shield" />
    },
    {
      title: "Call for Help",
      desc: "Contact local animal welfare organizations or veterinarians immediately.",
      icon: <img src="icon2.png" style={{ width: '70px', height: '70px' }} alt="phone" />
    },
    {
      title: "Provide Comfort",
      desc: "If safe, offer water and shelter while waiting for professional help.",
      icon: <img src="icon3.png" style={{ width: '70px', height: '70px' }} alt="heart" />
    },
    {
      title: "Document Details",
      desc: "Take photos and note the location, condition, and any identifying features.",
      icon: <img src="icon4.png" style={{ width: '70px', height: '70px' }} alt="notes" />
    }
  ];

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <div className="card" style={{ maxWidth: '1000px', margin: 'auto', borderRadius: '20px', padding: '40px' }}>
        
        <h2 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '40px', color: '#2d3748' }}>
          Safety Tips for Helping Street Animals
        </h2>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
          gap: '30px',
          marginBottom: '40px' 
        }}>
          {safetyTips.map((tip, index) => (
            <div key={index} style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
              <div style={{ 
                background: '#fff7ed', 
                padding: '15px', 
                borderRadius: '12px', 
                border: '1px solid #ffedd5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {/* use the image as icon in the grid cards*/}
                {tip.icon}
              </div>
              <div>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '1.2rem', color: '#1a202c' }}>{tip.title}</h3>
                <p style={{ margin: 0, color: '#718096', lineHeight: '1.6' }}>{tip.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ 
          background: '#fffaf0', 
          border: '1px solid #fbd38d', 
          padding: '25px', 
          borderRadius: '15px', 
          textAlign: 'center' 
        }}>
          <h4 style={{ color: '#c05621', marginTop: 0 }}>Need Immediate Help?</h4>
          <p style={{ color: '#744210' }}>View our verified list of NGOs and Shelters across Pakistan to get medical help for the animal.</p>
          
          <button 
            onClick={() => navigate('/contact')}
            style={{ 
              background: '#f97316', 
              color: 'white', 
              border: 'none', 
              padding: '12px 30px', 
              borderRadius: '8px', 
              fontWeight: 'bold',
              cursor: 'pointer',
              marginTop: '10px'
            }}
          >
            Contact NGOs Page →
          </button>
        </div>

      </div>
    </div>
  );
};

export default HelpBoard;