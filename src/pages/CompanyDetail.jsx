import { useState, useEffect } from "react";
import DetailReview from "../component/DetailReview";
import AddCompany from "../component/AddCompany";
import axios from "axios";
import API_BASE_URL from "../config/api";

const dummycompanies = [
  {
    id: 1,
    name: 'Graffersid Web and App Development',
    address: '816, Shekhar Central, Manorama Ganj, AB road, New Palasia, Indore (M.P.)',
    rating: 4.5,
    reviews: 41,
    foundedDate: '01-01-2016',
    logo: 'G',
    logoColor: '#1e40af'
  },
  {
    id: 2,
    name: 'Code Tech Company',
    address: '414, Kanha Appartment, Bhawarkua, Indore (M.P.)',
    rating: 4.5,
    reviews: 0,
    regDate: '01-01-2016',
    logo: '<CT>',
    logoColor: '#16a34a'
  },
  {
    id: 3,
    name: 'Innogent Pvt. Ltd.',
    address: '910, Shekhar Central, Manorama Ganj, AB road, New Palasia, Indore (M.P.)',
    rating: 4.5,
    reviews: 0,
    regDate: '01-01-2016',
    logo: '💡',
    logoColor: '#ea580c'
  }
];

function CompanyDetail(){

  const [selectedCity, setSelectedCity] = useState('');
  const [sortBy, setSortBy] = useState('Name');
    const [selectedCompany, setSelectedCompany] = useState(null);
  const [showDetailReview, setShowDetailReview] = useState(false);
   const [showAddCompany, setShowAddCompany] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/company/get-All-Company`);
        if (response.status === 201) {
          const data = response.data;
          console.log('Fetched companies data:', data);
          setCompanies(data);
          setFilteredCompanies(data);
        } else {
          console.log('Backend not available, using mock data');
          // Use mock data if backend is not available
          setCompanies(dummycompanies);
          setFilteredCompanies(dummycompanies);
        }
      } catch (error) {
        console.log('Backend not available, using mock data');
        // Use mock data if backend is not available
        setCompanies(dummycompanies);
        setFilteredCompanies(dummycompanies);
      }
    };
    fetchCompanies();
  }, []);

  // Filter and sort functionality
  useEffect(() => {
    let filtered = companies;

    // Filter by city if selected
    if (selectedCity && selectedCity.trim() !== '') {
      filtered = companies.filter(company => {
        return company.location?.toLowerCase().includes(selectedCity.toLowerCase());
      });
    }

    // Sort functionality
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'Name':
          return (a.companyName || '').localeCompare(b.companyName || '');
        case 'Rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'Reviews':
          return (b.reviews?.length || 0) - (a.reviews?.length || 0);
        case 'Date':
          return new Date(b.foundedOn || 0) - new Date(a.foundedOn || 0);
        default:
          return 0;
      }
    });

    setFilteredCompanies(filtered);
  }, [companies, selectedCity, sortBy]);

    const handleDetailReview = (company) => {
    setSelectedCompany(company);
    setShowDetailReview(true);
  };

  const handleCloseDetailReview = () => {
    setShowDetailReview(false);
    setSelectedCompany(null);
  };


    const handleAddCompany = (newCompany) => {
    // In a real app, you would save to a database
    // For now, we'll just show an alert
    alert(`Company "${newCompany.name}" has been added successfully!`);
    console.log('New company added:', newCompany);
  };

  const handleShowAddCompany = () => {
    setShowAddCompany(true);
  };

  const handleCloseAddCompany = () => {
    setShowAddCompany(false);
  };

  const handleFindCompany = () => {
    // Filter is handled automatically by useEffect
    console.log('Filtering companies in city:', selectedCity);
  };

  // If showing detail review, render only that component
  if (showDetailReview && selectedCompany) {
    return (
      <DetailReview 
        company={selectedCompany} 
        onClose={handleCloseDetailReview}
      />
    );
  }

const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={i} className="fas fa-star rating-stars" style={{color: '#ffc107'}}></i>);
    }

    if (hasHalfStar) {
      stars.push(<i key="half" className="fas fa-star-half-alt rating-stars" style={{color: '#ffc107'}}></i>);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="far fa-star rating-stars" style={{color: '#e0e0e0'}}></i>);
    }

    return stars;
  };
    return (
        <>
            <div className="container my-4">
                {/* Search and Filter Section */}
                <div className="row mb-4">
                    <div className="col-md-8">
                        <div className="row align-items-end">
                        <div className="col-md-6">
                            <label className="form-label fw-semibold">Select City</label>
                            <div className="position-relative">
                            <input
                                type="text"
                                className="form-control city-input"
                                placeholder="Enter city name..."
                                value={selectedCity}
                                onChange={(e) => setSelectedCity(e.target.value)}
                            />
                            <i className="fas fa-map-marker-alt position-absolute top-50 end-0 translate-middle-y me-3 purple-accent"></i>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="d-flex gap-2">
                            <button className="btn btn-purple text-white" onClick={handleFindCompany}>
                                Find Company
                            </button>
                            <button className="btn btn-purple text-white" onClick={handleShowAddCompany}>
                                + Add Company
                            </button>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="d-flex align-items-center justify-content-end">
                        <label className="form-label me-2 mb-0 fw-semibold">Sort:</label>
                        <select 
                            className="form-select sort-dropdown"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="Name">Name</option>
                            <option value="Rating">Rating</option>
                            <option value="Reviews">Reviews</option>
                            <option value="Date">Date</option>
                        </select>
                        </div>
                    </div>
                </div>
                {/* <br /><br /> */}
             {/* Results Section */}
                <div className="mb-3">
                <h5 className="text-muted">Result Found: {filteredCompanies.length}</h5>
                </div>
                <div className="row">
                    {filteredCompanies.map((company) => (
                        <div key={company._id} className="col-12 mb-3">
                        <div className="card company-card">
                            <div className="card-body">
                            <div className="row align-items-center">
                                <div className="col-md-1">
                                <div 
                                  className="company-logo-large"
                                  style={{ backgroundColor: company.logoColor }}
                                >
                                  {company.logo &&(
                                    <>
                                      <img 
                                        src={company.logo} 
                                        alt={company.name}
                                        style={{ 
                                          width: '100%', 
                                          height: '100%', 
                                          objectFit: 'cover',
                                          borderRadius: '12px'
                                        }}
                                        onError={(e) => {
                                          e.target.style.display = 'none';
                                          if (e.target.nextSibling) {
                                            e.target.nextSibling.style.display = 'block';
                                          }
                                        }}
                                      />
                                      <div 
                                        style={{ 
                                          width: '100%', 
                                          height: '100%', 
                                          borderRadius: '12px',
                                          display: 'flex',
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                          color: 'white',
                                          fontSize: '24px',
                                          fontWeight: 'bold'
                                        }}
                                      >
                                        {company.companyName ? company.companyName.charAt(0).toUpperCase() : 'C'}
                                      </div>
                                    </>
                                  )}
                                  
                                </div>
                                </div>
                                <div className="col-md-6">
                                  <h5 className="card-title mb-2">{company.companyName}</h5>
                                  <p className="card-text text-muted mb-1">
                                      <i className="fas fa-map-marker-alt me-1"></i>
                                      {company.location}
                                  </p>
                                  <div className="d-flex align-items-center">
                                      <span className="me-2 fw-semibold">{company.rating?.toFixed(1) || '0.0'}</span>
                                      <div className="me-3">
                                      {renderStars(company.rating)}
                                      </div>
                                      <span className="text-muted">
                                        {company.reviews?.length || 0} Reviews
                                      </span>

                                  </div>
                                </div>
                                <div className="col-md-3 text-end">
                                  {company.foundedOn && (
                                      <p className="text-muted mb-0 mt-2">Founded on {company.foundedOn}</p>
                                  )}
                                  <button 
                                      className="btn btn-outline-gray"
                                      onClick={() => handleDetailReview(company)}
                                  >
                                    Detail Review
                                  </button>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Add Company Modal */}
            {showAddCompany && (
                <AddCompany
                    onAddCompany={handleAddCompany}
                    onClose={handleCloseAddCompany}
                />
            )}

        </>
    );
}
export default CompanyDetail