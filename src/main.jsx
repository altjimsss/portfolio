// src/main.jsx (test App directly)
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import AppWrapper from './AppWrapper';

console.log('🎯 Testing App directly...');

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>,
);