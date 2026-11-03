import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

import './styles/tokens.css';
import './styles/base.css';
import './styles/typography.css';
import './styles/layout.css';
import './styles/components.css';
import './styles/home.css';
import './styles/interior.css';
import './styles/fashion.css';
import './styles/lifestyle.css';
import './styles/pages.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
