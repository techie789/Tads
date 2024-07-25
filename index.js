import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyBzYPTaegvDBDcSQJ4nRqZ7BVhedszzN90",
  authDomain: "aid-tracker.firebaseapp.com",
  projectId: "aid-tracker",
  storageBucket: "aid-tracker.appspot.com",
  messagingSenderId: "821084142053",
  appId: "1:821084142053:web:c6cc605b34210e19c6570c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
