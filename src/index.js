import React from 'react';
import ReactDOM from 'react-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import './styles/index.css';
import {App} from './components';
import {BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <ToastContainer position='top-right' autoClose={5000} pauseOnHover closeOnClick />
    <Router>
    <App />
    </Router>
    
    
  </React.StrictMode>,
  document.getElementById('root')
);
