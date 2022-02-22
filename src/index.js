import React from 'react';
import ReactDOM from 'react-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles/index.css';
import { App } from './components';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider, PostsProvider } from './providers';

ReactDOM.render(
  <React.StrictMode>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      pauseOnHover
      closeOnClick
    />
    <AuthProvider>
    <PostsProvider>
      <Router>
        <App />
      </Router>
      </PostsProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
