import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { apiRoutes } from './routes.ts'

// Intercept fetch requests for API routes in development mode
const originalFetch = window.fetch;
window.fetch = async (input, init) => {
  const url = typeof input === 'string' ? input : input instanceof URL ? input.toString() : input.url;
  
  try {
    // Check if this is an API request
    for (const [route, handler] of Object.entries(apiRoutes)) {
      if (url.includes(route)) {
        console.log(`Intercepting API request to ${route}`);
        
        // Create a new request object
        const request = new Request(url, init);
        console.log("Request method:", request.method);
        
        const response = await handler(request);
        console.log(`Response from handler ${route}:`, response.status);
        return response;
      }
    }
    
    // Handle requests for image files
    if (url.includes('/lovable-uploads/') || url.includes('/images/products/')) {
      console.log("Image request:", url);
      
      try {
        return await originalFetch(input, init);
      } catch (fetchError) {
        console.error("Fetch failed:", fetchError);
        return originalFetch('/placeholder.svg');
      }
    }
  } catch (error) {
    console.error("Error intercepting request:", error);
  }
  
  // Otherwise, pass the request to the original fetch
  return originalFetch(input, init);
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
