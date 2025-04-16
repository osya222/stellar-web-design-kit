import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { apiRoutes } from './routes.ts'

// Intercept fetch requests for API routes in development
const originalFetch = window.fetch;
window.fetch = async (input, init) => {
  const url = typeof input === 'string' ? input : input instanceof URL ? input.toString() : input.url;
  
  // Check if this is an API request
  for (const [route, handler] of Object.entries(apiRoutes)) {
    if (url.includes(route)) {
      console.log(`Intercepting API request to ${route}`);
      return handler(new Request(url, init));
    }
  }
  
  // Otherwise, pass through to original fetch
  return originalFetch(input, init);
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
