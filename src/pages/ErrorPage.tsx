import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const ErrorPage: React.FC = () => {
  const location = useLocation();
  const errorMessage = location.state?.message || 'An unknown error occurred';
  const errorCode = location.state?.code || '500';

  return (
    <div className="error-page">
      <h1>Error {errorCode}</h1>
      <div className="error-container">
        <p className="error-message">{errorMessage}</p>
        <div className="error-actions">
          <Link to="/" className="button primary-button">
            Return to Home
          </Link>
          <button 
            onClick={() => window.location.reload()} 
            className="button secondary-button"
          >
            Refresh Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage; 