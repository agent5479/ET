import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './mirror-app.css';

const basename = (import.meta.env.BASE_URL || '/').replace(/\/$/, '') || '';
// Used by mirrored HTML parity-bridge for in-iframe nav on GitHub Pages
window.__ET_BASE__ = basename;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={basename || undefined}>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
