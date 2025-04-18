
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
              
              // If this is a file, store its data URL in localStorage
              if (value instanceof File) {
                const reader = new FileReader();
                reader.onload = () => {
                  const filename = clonedFormData.get('filename') as string || value.name;
                  localStorage.setItem(`image_data_${filename}`, reader.result as string);
                  console.log(`Saved image data for ${filename} to localStorage`);
                };
                reader.readAsDataURL(value);
              }
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
    
    // Handle requests for image files
    if (url.includes('/lovable-uploads/') || url.includes('/images/products/')) {
      console.log("Intercepting image request:", url);
      
      // Extract the filename
      const filename = url.split('/').pop()?.split('?')[0];
      
      if (filename) {
        // Try to get the image data from localStorage with exact filename
        let imageData = localStorage.getItem(`image_data_${filename}`);
        
        // If not found, try matching by partial name (ignoring timestamp and random parts)
        if (!imageData) {
          console.log("Exact match not found, trying partial match for:", filename);
          // Get all localStorage keys
          const keys = Object.keys(localStorage);
          
          // Find keys that start with image_data_ and contain part of the filename
          const filenameBase = filename.split('-')[0]; // Get the base part of the filename
          const matchingKeys = keys.filter(key => 
            key.startsWith('image_data_') && 
            key.includes(filenameBase)
          );
          
          if (matchingKeys.length > 0) {
            console.log("Found potential matches:", matchingKeys);
            // Use the first match
            imageData = localStorage.getItem(matchingKeys[0]);
            console.log("Using match:", matchingKeys[0]);
          }
        }
        
        if (imageData && imageData.startsWith('data:')) {
          console.log("Found image data for:", filename);
          
          // Create a response with the image data
          return new Response(imageData, {
            status: 200,
            headers: {
              'Content-Type': imageData.split(';')[0].replace('data:', '')
            }
          });
        }
        
        // Try to get the blob URL
        const blobUrl = localStorage.getItem(`blob_url_${filename}`);
        if (blobUrl && blobUrl.startsWith('blob:')) {
          console.log("Found blob URL for:", filename);
          
          try {
            // Fetch the blob and return it
            const blobResponse = await originalFetch(blobUrl);
            return blobResponse;
          } catch (blobError) {
            console.error("Error fetching blob:", blobError);
          }
        }
        
        console.log("No local storage data found for:", filename);
      }
      
      // If we couldn't find the image in localStorage, try the original fetch
      try {
        console.log("Attempting original fetch for:", url);
        return await originalFetch(input, init);
      } catch (fetchError) {
        console.error("Original fetch failed:", fetchError);
        // If original fetch fails, return a placeholder
        console.log("Returning placeholder image");
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
