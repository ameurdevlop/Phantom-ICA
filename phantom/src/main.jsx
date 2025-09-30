// src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // 🔑 L'importation clé pour le routage
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 🔑 BrowserRouter enveloppe l'application pour activer l'historique de navigation */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
