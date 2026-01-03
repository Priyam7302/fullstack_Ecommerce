import { createRoot } from 'react-dom/client'
import './App.css'
import App from './App.jsx'
import {GoogleOAuthProvider} from "@react-oauth/google"

createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="644660924092-j5leir850abq7pdnbpo4qbti4p3nvipm.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
);
