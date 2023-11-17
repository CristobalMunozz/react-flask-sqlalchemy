import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Reporteria from './Reporteria';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Navbar from './Navbar';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
 <Router>
<Navbar />
<Routes>
  <Route path="/" element={<Navigate to="/App" />} />
  <Route path="/App" element={<App />} />
  <Route path="/Reporteria" element={<Reporteria />} />
 
</Routes>

</Router>
  </React.StrictMode>
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
