import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { DisasterProvider } from './context/DisasterContext';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <DisasterProvider>
        <App />
      </DisasterProvider>
    </HashRouter>
  </React.StrictMode>
);
