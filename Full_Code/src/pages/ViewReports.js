import React, { useEffect, useState } from 'react';
import { db } from '../firebase'; 
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import '../App.css';

const ViewReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
//  query to get all reports, sorted by newest first
    const q = query(collection(db, "reports"), orderBy("timestamp", "desc"));
    
// check for real-time updates
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const allReports = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setReports(allReports);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching reports:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <div style={{textAlign: 'center', marginTop: '50px'}}>Loading reports...</div>;

  return (
    <div className="view-reports-container" style={{ padding: '20px' }}>
      <h2 style={{ color: '#6D597A', textAlign: 'center', marginBottom: '30px' }}>
        Community Help Board 🐾
      </h2>
      
      {reports.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No reports found. Be the first to help!</p>
      ) : (
        <div className="card-container" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
          gap: '20px' 
        }}>
          {reports.map(report => (
            <div key={report.id} className="card">
              {/* Image section */}
              <div style={{ 
                height: '200px', 
                background: '#eee', 
                borderRadius: '15px', 
                marginBottom: '15px',
                overflow: 'hidden' 
              }}>
                <img 
                  src={report.imageUrl || 'placeholder.jpg'} 
                  alt="animal" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              </div>

              {/* Status and Date */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className={`badge ${report.status?.toLowerCase().replace(' ', '-')}`} style={{
                  background: report.status === 'Pending' ? '#FFF3CD' : '#D1ECF1',
                  padding: '5px 12px',
                  borderRadius: '20px',
                  fontSize: '0.8rem',
                  fontWeight: 'bold'
                }}>
                  {report.status}
                </span>
                <small style={{ color: '#888' }}>{report.date}</small>
              </div>

              <h3 style={{ margin: '15px 0 5px 0', color: '#f97316' }}>{report.animalType}</h3>
              
              {/* Detailed Fields for animal description */}
              <p style={{ fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '5px' }}>📍 {report.location}</p>
              <p style={{ fontSize: '0.85rem', margin: '2px 0' }}> <strong>Color:</strong> {report.animalColor || 'N/A'}</p>
              <p style={{ fontSize: '0.85rem', margin: '2px 0' }}> <strong>Age:</strong> {report.ageGroup || 'Unknown'}</p>
              <p style={{ fontSize: '0.85rem', margin: '2px 0' }}> <strong>Markings:</strong> {report.specialMarks || 'None'}</p>
              
              {report.contactInfo && (
                <p style={{ fontSize: '0.85rem', margin: '2px 0', color: '#f97316' }}>📞 <strong>Contact:</strong> {report.contactInfo}</p>
              )}

              <p style={{ color: '#666', fontSize: '0.9rem', minHeight: '40px', marginTop: '10px' }}>
                {report.description || "No additional details provided."}
              </p>
              
              {/* Footer section with Condition and user who posted  Name */}
              <div style={{ marginTop: '15px', paddingTop: '15px', borderTop: '1px solid #eee' }}>
                <span style={{ fontSize: '0.8rem', color: '#6D597A', fontWeight: 'bold', display: 'block' }}>
                  Condition: {report.condition}
                </span>

                
                <div style={{ marginTop: '8px' }}>
                  <span style={{ fontSize: '0.75rem', color: '#888' }}>
                    👤 Posted by: <strong>{report.postedBy || 'Community Member'}</strong>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewReports;