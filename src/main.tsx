import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { GoogleOAuthProvider } from "@react-oauth/google"
import { AuthProvider } from './contexts/AuthContext';

createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId='85800523938-q1hqqos45o9qciubvhdo9cta3qsh8ep7.apps.googleusercontent.com'
  >
    <StrictMode>
      <AuthProvider>
        <App />
      </AuthProvider>
    </StrictMode>
  </GoogleOAuthProvider>
);
