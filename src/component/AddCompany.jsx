import { useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config/api";

function AddCompany({ onAddCompany, onClose }) {
  const [company, setCompany] = useState({
    companyName: "",
    location: "",
    foundedOn: "",
    logo: "",
    description: "",
    city: "",
  });

  const handleChange = (e) => {
    setCompany({ ...company, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
      const response = await axios.post(`${API_BASE_URL}/company/add-company`, company);
      if(response.status === 201){
        onAddCompany(company);
        setCompany({ companyName: "", location: "", foundedOn: "", logo: "", description: "", city: "" });
        onClose();
      }
  };

  return (
    <div className="modal-overlay" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div className="modal-content" style={{
        backgroundColor: 'white',
        borderRadius: '20px',
        padding: '30px',
        maxWidth: '500px',
        width: '90%',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
      }}>
        <div className="modal-header" style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '20px',
          borderBottom: '1px solid #e9ecef',
          paddingBottom: '15px'
        }}>
          <h5 className="modal-title fw-bold">Add Company</h5>
          <button
            type="button"
            className="btn-close"
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer'
            }}
          >
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit} >
          <div className="modal-body">
            {/* Company Name */}
            <div className="mb-3">
              <label className="form-label">Company name</label>
              <input
                type="text"
                className="form-control"
                name="companyName"
                value={company.companyName}
                onChange={handleChange}
                placeholder="Enter..."
                required
              />
            </div>

            {/* Location */}
            <div className="mb-3">
              <label className="form-label">Location</label>
              <input
                type="text"
                className="form-control"
                name="location"
                value={company.location}
                onChange={handleChange}
                placeholder="Enter..."
                required
              />
            </div>

            {/* Founded on */}
            <div className="mb-3">
              <label className="form-label">Founded on</label>
              <input
                type="date"
                className="form-control"
                name="foundedOn"
                value={company.foundedOn}
                onChange={handleChange}
                required
              />
            </div>

            {/* City */}
            <div className="mb-3">
              <label className="form-label">City</label>
              <input
                type="text"
                className="form-control"
                  name="city"
                  value={company.city}
                onChange={handleChange}
                placeholder="Enter City"
                required
              />
            </div>

            {/* Logo */}
            <div className="mb-3">
              <label className="form-label">Logo</label>
              <input type="text" className="form-control" name="logo" onChange={handleChange} required />
            </div>

            {/* Description */}
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea className="form-control" name="description" value={company.description} onChange={handleChange} required />
            </div>
          </div>

          <div className="modal-footer" style={{ borderTop: '1px solid #e9ecef', paddingTop: '15px' }}>
            <button
              type="submit"
              className="btn text-white w-100"
              style={{
                background: 'linear-gradient(90deg, #6f42c1, #007bff)',
                border: 'none',
                borderRadius: '8px',
                padding: '10px'
              }}
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCompany;
