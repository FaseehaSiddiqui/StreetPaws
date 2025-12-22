
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; 
import '../App.css';
import { db } from '../firebase'; 
import { collection, addDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore'; 

const ReportAnimal = ({ user }) => {
  const { state } = useLocation(); 
  const navigate = useNavigate();

  const editData = state?.editReport;
//using the already saved data when the user clicks update report 
  const [animalType, setAnimalType] = useState(editData?.animalType || '');
  const [condition, setCondition] = useState(editData?.condition || '');
  const [location, setLocation] = useState(editData?.location || '');
  const [description, setDescription] = useState(editData?.description || '');
  const [animalColor, setAnimalColor] = useState(editData?.animalColor || '');
  const [ageGroup, setAgeGroup] = useState(editData?.ageGroup || '');
  const [specialMarks, setSpecialMarks] = useState(editData?.specialMarks || '');
  const [contactInfo, setContactInfo] = useState(editData?.contactInfo || ''); 
  
  // States for Gallery Data to upload the image
  const [imageString, setImageString] = useState(editData?.imageUrl || null);
  const [uploading, setUploading] = useState(false);

  //  Function to convert Gallery Image to Base64 String to upload images 
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Alert if file is too large for Firestore (Limit is 1MB)
      if (file.size > 1048487) {
        alert("ERROR! Your Image is too large! Please select a smaller photo (under 1MB).");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
// here the user can preview the image before submitting the report
        setImageString(reader.result); 
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      alert("You need to login first!");
      navigate('/auth');
      return;
    }

    setUploading(true);

    try {
      
      const rawName = user.email.split('@')[0].split('.')[0];
      const capitalizedName = rawName.charAt(0).toUpperCase() + rawName.slice(1);

      const reportData = {
        animalType,
        condition,
        location,
        description,
        animalColor,
        ageGroup,
        specialMarks,
        contactInfo,
        postedBy: capitalizedName,
        imageUrl: imageString || 'placeholder.jpg', 
        userId: user.uid,
        status: editData?.status || "Pending",
        date: editData?.date || new Date().toLocaleDateString(),
        timestamp: serverTimestamp() 
      };

      if (editData) {
        const reportRef = doc(db, "reports", editData.id);
        await updateDoc(reportRef, reportData);
        alert("Report updated successfully!");
      } else {
        await addDoc(collection(db, "reports"), reportData);
        alert("Report submitted successfully!");
      }
      
      navigate('/dashboard'); 
      
    } catch (error) {
      alert("Error: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
//Form to report an animal 
    <div style={{ display: 'flex', justifyContent: 'center', padding: '40px 20px' }}>
      <div className="card" style={{ maxWidth: '700px', width: '100%' }}>
        <h2 style={{ color: '#f97316', textAlign: 'center' }}>
          {editData ? "Edit Report" : "Report an Animal in Distress"}
        </h2>

       
        <form onSubmit={handleSubmit}>
          <div className="form-row" style={{ display: 'flex', gap: '20px', marginBottom: '15px' }}>
            <div className="form-group" style={{ flex: 1 }}>

              <label>Animal Type</label>
              <select className="form-control" value={animalType} onChange={(e) => setAnimalType(e.target.value)} required>
                <option value="">Select Animal</option>
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
                <option value="Bird">Bird</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group" style={{ flex: 1 }}>
              
              <label>Age Category</label>
              <select className="form-control" value={ageGroup} onChange={(e) => setAgeGroup(e.target.value)}>
                <option value="">Select Age</option>
                <option value="Puppy/Kitten">Puppy/Kitten</option>
                <option value="Young">Young</option>
                <option value="Adult">Adult</option>
                <option value="Senior">Senior</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Animal Color</label>
            <input type="text" className="form-control" value={animalColor} onChange={(e) => setAnimalColor(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Condition / Health Status</label>
            <input type="text" className="form-control" value={condition} onChange={(e) => setCondition(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Location (Area & City)</label>
            <input type="text" className="form-control" value={location} onChange={(e) => setLocation(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Special Identification Marks</label>
            <input type="text" className="form-control" value={specialMarks} onChange={(e) => setSpecialMarks(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Description & Landmarks</label>
            <textarea className="form-control" rows="3" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
          </div>

          <div className="form-group">
            <label>Your Contact Number (Optional)</label>
            <input type="tel" className="form-control" value={contactInfo} onChange={(e) => setContactInfo(e.target.value)} />
          </div>

          <div className="form-group" style={{ border: '1px dashed #f97316', padding: '15px', borderRadius: '8px', textAlign: 'center', background: '#fff9f5' }}>
            <label style={{ block: 'block', marginBottom: '10px', fontWeight: 'bold' }}>Choose Photo from Gallery</label>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageChange}
              style={{ fontSize: '0.9rem' }}
            />
            {imageString && (
              <div style={{ marginTop: '15px' }}>
                <img src={imageString} alt="Selected" style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '8px', border: '2px solid #f97316' }} />
              </div>
            )}
          </div>

          <button 
            type="submit" 
            className="btn-report" 
            disabled={uploading}
            style={{ width: '100%', border: 'none', padding: '15px', fontSize: '1rem', marginTop: '10px', cursor: uploading ? 'not-allowed' : 'pointer', opacity: uploading ? 0.7 : 1 }}
          >
            {uploading ? "Processing..." : (editData ? "Update Report" : "Submit Report")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportAnimal;