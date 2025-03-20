import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="about-page">
      <h1>About Baltzar Test</h1>
      
      <section className="about-section">
        <h2>Project Overview</h2>
        <p>
          This is a React TypeScript project that demonstrates best practices for
          building production-ready web applications with proper error handling,
          loading states, and type safety.
        </p>
      </section>
      
      <section className="about-section">
        <h2>Technologies Used</h2>
        <ul>
          <li>React 18</li>
          <li>TypeScript with strict mode enabled</li>
          <li>React Router for navigation</li>
          <li>CSS for styling</li>
          <li>Error boundaries for graceful error handling</li>
          <li>Netlify for deployment</li>
        </ul>
      </section>
      
      <section className="about-section">
        <h2>Features</h2>
        <ul>
          <li>Strong typing with TypeScript</li>
          <li>Component-based architecture</li>
          <li>Responsive design</li>
          <li>Error handling with informative messages</li>
          <li>Loading states for asynchronous operations</li>
          <li>Lazy loading for improved performance</li>
        </ul>
      </section>
    </div>
  );
};

export default AboutPage; 