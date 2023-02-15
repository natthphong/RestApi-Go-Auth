import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ClickMeProvider } from './context/clickme';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ClickMeProvider>
      <App />
    </ClickMeProvider>
    
  </React.StrictMode>
);
