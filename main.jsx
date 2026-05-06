import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Wrapper de localStorage que mimica a API window.storage usada no App
window.storage = {
  async get(key) {
    const v = localStorage.getItem('slidestone_' + key);
    if (v === null) return null;
    return { value: v };
  },
  async set(key, value) {
    localStorage.setItem('slidestone_' + key, value);
    return { value };
  },
  async delete(key) {
    localStorage.removeItem('slidestone_' + key);
    return { deleted: true };
  },
  async list() {
    const keys = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith('slidestone_')) keys.push(k.replace('slidestone_', ''));
    }
    return { keys };
  }
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
