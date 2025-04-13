import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { PlaceProvider } from './context/PlaceContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PlaceProvider>
      <App />
    </PlaceProvider>
  </React.StrictMode>
);