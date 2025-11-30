// src/TestApp.jsx
import React from 'react';

const TestApp = () => {
  console.log('🔍 TestApp is rendering!');
  
  return (
    <div style={{ 
      background: 'red', 
      color: 'white', 
      padding: '20px', 
      fontSize: '24px',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 9999
    }}>
      🚨 TEST APP IS RENDERING - If you see this, React is working!
    </div>
  );
};

export default TestApp;