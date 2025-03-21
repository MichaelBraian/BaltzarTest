"use client";

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

const ErrorPage: React.FC = () => {
  const searchParams = useSearchParams();
  const errorMessage = searchParams.get('message') || 'An unknown error occurred';
  const errorCode = searchParams.get('code') || '500';

  return (
    <div className="error-page">
      <h1>Error {errorCode}</h1>
      <div className="error-container">
        <p className="error-message">{errorMessage}</p>
        <div className="error-actions">
          <Link href="/" className="button primary-button">
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