import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CdsButton } from '@cds/react/button'; // Ensure this is the correct import for your button component
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

import "./Deliverables.css";
// import "../App.css"; 

const Deliverabels = () => {
    const [uploads, setUploads] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const { getAccessTokenSilently, loginWithRedirect } = useAuth0();
    const itemsPerPage = 10;
    const navigate = useNavigate();

    const api = axios.create({
        baseURL: process.env.REACT_APP_API_BASE_URL,
    });

    useEffect(() => {
        const fetchUploads = async () => {
          try {
            const token = await getAccessTokenSilently({
              authorizationParams: {
                audience: process.env.REACT_APP_AUTH0_AUDIENCE,
                scope: "read:files read:folders",
              },
            });
    
            const headers = {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            };
    
            const response = await api.get('/api/uploads', { headers });
            const data = response.data.files; // Access files array from response
            setUploads(data);
          } catch (error) {
            console.error('Error fetching uploads:', error);
            if (error.error === 'consent_required') {
              await loginWithRedirect({
                authorizationParams: {
                  audience: process.env.REACT_APP_AUTH0_AUDIENCE,
                  scope: "openid profile email read:files read:folders",
                  prompt: "consent"
                },
                appState: {
                  returnTo: window.location.pathname
                }
              });
            }
          }
        };
    
        fetchUploads();
      }, [getAccessTokenSilently, loginWithRedirect, api]);

    const handleFileClick = (upload) => {
        navigate(`/view-pdf/${upload.id}/${upload.file_key}`);
    };

    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1); // Reset to the first page on search
    };

    const handleStartDateChange = (event) => {
        setStartDate(event.target.value);
        setCurrentPage(1); // Reset to the first page on date change
    };

    const handleEndDateChange = (event) => {
        setEndDate(event.target.value);
        setCurrentPage(1); // Reset to the first page on date change
    };

    const filteredUploads = uploads.filter((upload) => {
        const uploadDate = new Date(upload.upload_date);
        const isWithinDateRange =
            (!startDate || uploadDate >= new Date(startDate)) &&
            (!endDate || uploadDate <= new Date(endDate));
        const matchesSearchTerm =
            upload.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            upload.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
            upload.author.toLowerCase().includes(searchTerm.toLowerCase());
        const isPublic = upload.is_public === true;
        const isDeliverable = upload.is_deliverable === true;
        return isWithinDateRange && matchesSearchTerm && isDeliverable && !isPublic;
    });

    // Sort the filtered uploads by upload date in descending order
    const sortedUploads = filteredUploads.sort((a, b) => new Date(b.upload_date) - new Date(a.upload_date));

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedUploads = sortedUploads.slice(startIndex, endIndex);

    return (
        <div className='search-main-div'>
            <h1 className='search-h1'>Search All Deliverables</h1>
            <div>
                <input className='search-input'
                    type="text"
                    placeholder="Search by Title, country, or author"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    style={{ marginBottom: '20px', padding: '10px', width: '100%' }}
                />
                <div style={{ marginBottom: '20px' }}>
                    <label>
                        Start Date:
                        <input
                            type="date"
                            value={startDate}
                            onChange={handleStartDateChange}
                            style={{ marginLeft: '10px', marginRight: '20px' }}
                        />
                    </label>
                    <label>
                        End Date:
                        <input
                            type="date"
                            value={endDate}
                            onChange={handleEndDateChange}
                            style={{ marginLeft: '10px' }}
                        />
                    </label>
                </div>
                <ol>
                    {paginatedUploads.map((upload, index) => (
                        <li style={{
                            listStyle: 'none',
                            height: '50px',
                            width: '75vw',
                            fontSize: 'medium',
                            fontWeight: 500,
                            lineHeight: 1.5,
                            borderStyle: 'none'
                        }} className="pubdocs_search-list-item" key={index} onClick={() => handleFileClick(upload)}>
                            <div className='list-info'>
                                <p style={{ display: 'inline-block', marginRight: '50px' }}>
                                    Title: {upload.category}
                                </p>
                                <p style={{ display: 'inline-block', marginRight: '50px' }}>
                                    Author: {upload.author}
                                </p>
                                <p style={{ display: 'inline-block', marginRight: '50px' }}>
                                    Upload Date: {new Date(upload.upload_date).toLocaleDateString()}
                                </p>
                            </div>
                        </li>
                    ))}
                </ol>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '5px' }}></div>
                    <CdsButton onClick={handlePreviousPage} disabled={currentPage === 1}>
                        Previous
                    </CdsButton>
                    <CdsButton onClick={handleNextPage} disabled={endIndex >= sortedUploads.length}>
                        Next
                    </CdsButton>
                </div>
            </div>
    );
};

export default Deliverabels;