import React, { useState, useEffect } from 'react';
import { UserProfile, ApiStatus } from '../types';
import { fetchData } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

const HomePage: React.FC = () => {
  const [userStatus, setUserStatus] = useState<ApiStatus>('idle');
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUserData = async (): Promise<void> => {
      setUserStatus('loading');
      try {
        // This is a placeholder URL - replace with your actual API endpoint
        const response = await fetchData<UserProfile>('/api/user');
        
        if (response.status === 'succeeded' && response.data) {
          setUserData(response.data);
          setUserStatus('succeeded');
        } else {
          setError(response.error?.message || 'Failed to load user data');
          setUserStatus('failed');
        }
      } catch (err) {
        setError('An unexpected error occurred');
        setUserStatus('failed');
      }
    };

    // Mock user data for this demo
    setTimeout(() => {
      setUserData({
        id: '123',
        name: 'John Doe',
        email: 'john.doe@example.com'
      });
      setUserStatus('succeeded');
    }, 1000);
    
    // Uncomment this to use real API
    // loadUserData();
  }, []);

  if (userStatus === 'loading') {
    return <LoadingSpinner message="Loading user data..." />;
  }

  if (userStatus === 'failed') {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error || 'An unknown error occurred'}</p>
        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="home-page">
      <h1>Welcome to Baltzar Test</h1>
      
      {userData && (
        <div className="user-profile">
          <h2>User Profile</h2>
          <p><strong>Name:</strong> {userData.name}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>ID:</strong> {userData.id}</p>
        </div>
      )}
      
      <div className="content-section">
        <h2>Features</h2>
        <ul>
          <li>TypeScript with strict mode</li>
          <li>React with best practices</li>
          <li>Error handling and boundaries</li>
          <li>Loading states</li>
          <li>Netlify deployment ready</li>
        </ul>
      </div>
    </div>
  );
};

export default HomePage; 