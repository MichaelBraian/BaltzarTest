import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {currentYear} Baltzar Test. All rights reserved.</p>
        <div className="footer-links">
          <a href="https://github.com/MichaelBraian/BaltzarTest" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href="/about">About</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 