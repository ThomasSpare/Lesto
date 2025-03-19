import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const ViewPdf = () => {
  const { fileKey } = useParams();
  const [fileUrl, setFileUrl] = useState('');
  const { getAccessTokenSilently } = useAuth0(); // Get the token function

  useEffect(() => {
    const abortController = new AbortController();

    const fetchPdf = async () => {
      try {
        if (!fileKey) {
          console.error("File parameter is undefined.");
          return;
        }
    
        // Decode the URL-encoded fileKey
        const decodedKey = decodeURIComponent(fileKey);
    
        // For S3 access, replace spaces with underscores
        const s3Key = decodedKey.replace(/ /g, '_');
    
        const token = await getAccessTokenSilently({
          authorizationParams: {
            audience: process.env.REACT_APP_AUTH0_AUDIENCE,
            scope: "read:files read:folders",
          },
        });
    
        const serverAddress = process.env.REACT_APP_API_BASE_URL;
        const url = `${serverAddress}/api/uploads/${s3Key}`;
        
        const response = await fetch(url, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/pdf'
          }
        });
    
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Response error:', {
            status: response.status,
            text: errorText,
            fileKey: s3Key
          });
          throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }
    
        const blob = await response.blob();
        const objectUrl = URL.createObjectURL(blob);
        setFileUrl(objectUrl);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchPdf();

    return () => {
      abortController.abort();
      if (fileUrl) {
        URL.revokeObjectURL(fileUrl);
      }
    };
  }, [fileKey, getAccessTokenSilently]); // Add getAccessTokenSilently to dependencies

  return (
    <iframe
      title="PDF Viewer"
      src={fileUrl}
      style={{ width: '100%', height: '100vh'}}
    />
  );
}

export default ViewPdf;