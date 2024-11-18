import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-multi-carousel/lib/styles.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-medium-image-zoom/dist/styles.css'
import { GoogleOAuthProvider } from "@react-oauth/google"
import 'react-medium-image-zoom/dist/styles.css'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <GoogleOAuthProvider clientId='337823169120-ofehsul948og3s8dgfjpo69r7ulbdfta.apps.googleusercontent.com'>
        <App />
    </GoogleOAuthProvider>

);

reportWebVitals();
