import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'range-slider-input/dist/style.css';
import '../node_modules/toastr/build/toastr.min.css';

import App from './App';
import reportWebVitals from './reportWebVitals';

export let money = new Intl.NumberFormat({
  style: 'currency',
  currency: 'NGN',
});

export const baseUrl = 'https://okigwecreations.online/api/';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
