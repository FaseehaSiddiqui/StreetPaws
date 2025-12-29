//Faseeha siddiqui 251723892 & Ilsa rehan

import React from 'react';
import '../App.css';

const ContactNGOs = () => {
//data and information of the NGOS
  const ngos = [
    {
      name: "K.F.R - Animal Shelter",
      city: "Karachi",
      location: "Tariq road, Karachi 75100 Taria, road, Karachi, 75100",
      phone: "0329 2253783",
      site: "https://www.facebook.com/EmDeejah?mibextid=ZbWKwL",
      services: ["Rescue", "Shelter", "Medical Care"]
    },
    {
      name: "Todd's Welfare Society (TWS)",
      city: "Lahore",
      phone: "0321 4674957",
      email: "info@toddswelfaresociety.pk",
      location: "N/A",
      site: "https://toddswelfaresociety.pk/",
      services: ["Rehabilitation", "Advocacy", "Rescue"]
    },
    {
      name: "HOUSE OF HAPPINESS FOUNDATION",
      city: "Islamabad",
      location: "Lehtrar Rd, near Al bader mosque, Tarli, Islamabad, 04403",
      phone: " 0341 1122559",
      site: "https://houseofhappinessf.org/",
      services: ["Shelter", "Food Programs", "Veterinary"]
    },
    {
      name: "Lucky Animal Protection Shelter - LAPS",
      city: "Peshawar",
      location: "Ibrahim Flour Mill, Sardaryab, Bela Road, Agra Payan, Chārsadda",
      phone: "0303 2592131",
      site: "https://www.facebook.com/LAPSkpk/?ref=nf&hc_ref=ARQ4N63wbTvzK6_P4eNhAaC7hhWOvbUJOZOjVUk6S-gaV1QAuuPFZr0nUjTPERU7G7g",
      services: ["Protection", "Rescue", "Local Support"]
    }
  ];

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      {/* Header Section  */}
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <span style={{ 
          background: '#fff3e0', color: '#e65100', padding: '8px 16px', borderRadius: '20px', fontSize: '0.9rem', fontWeight: 'bold' 
        }}>
          🧡 Animal Welfare Organizations
        </span>
        <h1 style={{ fontSize: '2.5rem', marginTop: '15px', color: '#1a202c' }}>Contact NGOs in Pakistan</h1>
        <p style={{ color: '#4a5568', maxWidth: '600px', margin: '15px auto' }}>
          Connect with trusted animal welfare organizations across Pakistan for rescue, medical care, and support for street animals in need.
        </p>
      </div>

      {/* Grid Layout for the ngo information */}
      <div style={{ 
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '30px', maxWidth: '1200px', margin: '0 auto'
      }}>
        {ngos.map((ngo, index) => (
          <div key={index} className="card" style={{ 
            padding: '30px', borderRadius: '20px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', position: 'relative'
          }}>
            <div style={{ position: 'absolute', top: '20px', right: '20px', background: '#fff3e0', padding: '8px', borderRadius: '50%' }}>🧡</div>
            <h3 style={{ fontSize: '1.4rem', color: '#f97316', marginBottom: '10px' }}>{ngo.name}</h3>
            
            <div style={{ marginBottom: '20px' }}>
              <p style={{ fontWeight: 'bold', fontSize: '0.85rem', color: '#a0aec0', textTransform: 'uppercase', marginBottom: '10px' }}>Services Offered:</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {ngo.services.map((service, sIndex) => (
                  <span key={sIndex} style={{ background: '#fff7ed', color: '#c05621', padding: '4px 12px', borderRadius: '15px', fontSize: '0.8rem', border: '1px solid #ffedd5' }}>
                    {service}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ borderTop: '1px solid #edf2f7', paddingTop: '20px', color: '#4a5568' }}>
              <p style={{ margin: '0 0 8px 0' }}>📍 <strong>{ngo.city}</strong></p>
              <p style={{ margin: '0 0 8px 0' }}>📞 <strong>{ngo.phone}</strong></p>
              <p style={{ margin: '0 0 15px 0', fontSize: '0.9rem', color: '#718096' }}>➣ {ngo.location}</p>
              <a href={ngo.site} target="_blank" rel="noreferrer" style={{ color: '#f97316', fontWeight: 'bold', textDecoration: 'none' }}>
                Visit Website →
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Suggestion CTA Section */}
      <div style={{ 
        marginTop: '60px', background: 'linear-gradient(135deg, #f97316 0%, #fb923c 100%)', borderRadius: '25px', padding: '50px', textAlign: 'center', color: 'white', maxWidth: '1200px', margin: '60px auto 0'
      }}>
        <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🤍</div>

        <h2 style={{ fontSize: '2rem', marginBottom: '15px' }}>Know Another Animal Welfare Organization?</h2>

        <p style={{ fontSize: '1.1rem', marginBottom: '30px', opacity: 0.9 }}>
          Help us expand our network of caring organizations. Contact us to add more animal welfare NGOs to this list.
        </p>

        <button 
        onClick={() => {
          alert("Please send us an email at: atracelink@gmail.com\n\nInclude the NGO name, location, and contact details in your message.");
        }}
        style={{ 
          background: 'white', 
          color: '#f97316', 
          border: 'none', 
          padding: '15px 40px', 
          borderRadius: '12px', 
          fontWeight: 'bold', 
          fontSize: '1rem',
          cursor: 'pointer'
        }}
      >
        Suggest an Organization
      </button>

      </div>

      {/* Emergency Alert Bar */}
      <div style={{ maxWidth: '1200px', margin: '30px auto', background: '#fff5f5', border: '1px solid #feb2b2', padding: '20px', borderRadius: '15px', display: 'flex', alignItems: 'center', gap: '15px' }}>
        <span style={{ background: '#fed7d7', padding: '10px', borderRadius: '10px' }}>📞</span>
        
        <p style={{ margin: 0, color: '#c53030', fontSize: '0.95rem' }}>
          <strong>Note:</strong> Street Paws is a reporting platform. For immediate medical rescue, please call the NGOs listed above directly.
        </p>
      </div>
    </div>
  );
};


export default ContactNGOs;
