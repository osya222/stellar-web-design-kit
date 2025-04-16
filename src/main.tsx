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
        
        // Special handling for file uploads
        if (init?.body instanceof FormData) {
          console.log("FormData detected:", [...init.body.entries()].map(e => e[0]));
          
          try {
            // We need to clone the FormData since it can only be consumed once
            const clonedFormData = new FormData();
            for (const [key, value] of init.body.entries()) {
              clonedFormData.append(key, value);
            }
            
            // Create a new request with the cloned FormData
            const newRequest = new Request(url, {
              ...init,
              body: clonedFormData
            });
            
            const response = await handler(newRequest);
            console.log(`Response from handler ${route}:`, response.status);
            return response;
          } catch (formError) {
            console.error("Error handling FormData:", formError);
            throw formError;
          }
        }
        
        const response = await handler(request);
        console.log(`Response from handler ${route}:`, response.status);
        return response;
      }
    }
    
    // Check if this is a request for an uploaded image
    if (url.includes('/images/')) {
      console.log("Intercepting image request:", url);
      
      // Try to get the image from localStorage
      const imagePath = url;
      const base64Data = localStorage.getItem(imagePath) || 
                         localStorage.getItem(`uploaded_image_${url.split('/').pop()}`);
      
      if (base64Data) {
        console.log("Found image data for:", url);
        
        // Create a response with the image data
        const response = new Response(base64Data);
        // Clone the response and add the content type header
        const clonedResponse = new Response(response.body, {
          status: 200,
          headers: {
            'Content-Type': base64Data.startsWith('data:image/') 
              ? base64Data.split(';')[0].replace('data:', '')
              : 'image/jpeg'
          }
        });
        
        return clonedResponse;
      }
    }
  } catch (error) {
    console.error("Error intercepting API request:", error);
    return new Response(JSON.stringify({ 
      error: 'Error processing request', 
      details: error instanceof Error ? error.message : String(error) 
    }), { 
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  
  // Otherwise, pass the request to the original fetch
  return originalFetch(input, init);
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
