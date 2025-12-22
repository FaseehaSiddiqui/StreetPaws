//Faseeha Siddiqui 251723892 & Ilsa rehan

import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase'; 
import { collection, query, where, onSnapshot, doc, updateDoc, deleteDoc} from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

const Dashboard = ({ user, userName}) => {
  const [reports, setReports] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, progress: 0, resolved: 0 });
  const navigate = useNavigate();

  const handleUpdate = async (reportId, updatedData) => {
    try {
        const reportRef = doc(db, "reports", reportId);
        await updateDoc(reportRef, updatedData);
        alert("Report updated successfully!");
    } catch (error) {
        console.error("Error updating report:", error);
        alert("Failed to update report.");
    }
  };

//here the user can delete their own report 
  const handleDelete = async (reportId) => {
    if (window.confirm("Are you sure you want to delete this report?")) {
      try {
        await deleteDoc(doc(db, "reports", reportId));
        alert("Report deleted successfully.");
      } catch (error) {
        console.error("Error deleting:", error);
        alert("Error deleting report.");
      }
    }
  };

  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, "reports"), where("userId", "==", user.uid));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const reportsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setReports(reportsData);

      setStats({
        total: reportsData.length,
        pending: reportsData.filter(r => r.status === 'Pending').length,
        progress: reportsData.filter(r => r.status === 'In Progress').length,
        resolved: reportsData.filter(r => r.status === 'Resolved').length
      });
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <div className="dashboard-container" style={{ padding: '20px 10%' }}>
      <div className="welcome-banner card">
        <div>
          <h1>Welcome back, {userName}! </h1>
          <p>Thank you for making a difference in the lives of street animals</p>
        </div>
        <Link to="/report" className="btn-report">+ Report an Injured Animal</Link>
      </div>

      <div className="stats-grid">
        <div className="stat-card"><span>📄</span> Total Reports <h3>{stats.total}</h3></div>
        <div className="stat-card pending"><span>🕒</span> Pending <h3>{stats.pending}</h3></div>
        <div className="stat-card progress"><span>💙</span> In Progress <h3>{stats.progress}</h3></div>
        <div className="stat-card resolved"><span>💚</span> Resolved <h3>{stats.resolved}</h3></div>
      </div>

      <h2>My Reports <small>{stats.total} reports</small></h2>
    
      <div className="reports-grid">
        {reports.map(report => (
          <div key={report.id} className="report-card">
            <img src={report.imageUrl || 'placeholder.jpg'} alt="animal" />
            
            <div style={{ padding: '20px' }}>
              <div className="report-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className={`report-badge ${report.status?.toLowerCase().replace(' ', '-')}`}>
                  {report.status}
                </span>
                <small>{report.date}</small>
              </div>

              <h3 style={{ margin: '15px 0' }}>{report.animalType}</h3>
              <p>📍 {report.location}</p>
              
              {/* description for animals  */}
              <div className="report-details-list" style={{ fontSize: '0.9rem', color: '#555', marginTop: '10px' }}>
                <p> <strong>Color:</strong> {report.animalColor || 'N/A'}</p>
                <p> <strong>Age:</strong> {report.ageGroup || 'Unknown'}</p>
                <p> <strong>Marks:</strong> {report.specialMarks || 'None'}</p>
              </div>

              <p className="report-desc-text" style={{ fontStyle: 'italic', fontSize: '0.85rem', color: '#777', marginTop: '10px' }}>
                "{report.description || "No additional details provided."}"
              </p>

              <div style={{ marginTop: 'auto', paddingTop: '15px', borderTop: '1px solid #eee' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#6D597A', display: 'block', marginBottom: '5px' }}>
                  UPDATE STATUS:
                </label>
                
                <select 
                  value={report.status} 
                  onChange={(e) => handleUpdate(report.id, { status: e.target.value })}
                  className="status-select"
                  style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #ddd', marginBottom: '15px' }}
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">Contacted NGO</option>
                  <option value="Resolved">Resolved</option>
                </select>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button 
                    className="btn-edit-details"
                    onClick={() => navigate('/report', { state: { editReport: report } })}
                    style={{ flex: 1, padding: '10px', backgroundColor: 'transparent', border: '2px solid #f97316', color: '#f97316', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold' }}
                  >
                    Edit Details
                  </button>

                  <button 
                    onClick={() => handleDelete(report.id)}
                    style={{ flex: 1, padding: '10px', backgroundColor: '#fee2e2', border: '2px solid #ef4444', color: '#ef4444', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold' }}
                  >
                    Delete Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;