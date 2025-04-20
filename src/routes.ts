
// Define route handlers for API endpoints
export const apiRoutes = {};

// Simple function to get placeholder image
export const getImageUrl = (path: string | undefined): string => {
  if (!path) return '/placeholder.svg';
  return '/placeholder.svg';
};

// Function to get the URL for uploaded images (now just returns placeholder)
export const getUploadedImageUrl = (path: string | undefined): string => {
  if (!path) return '/placeholder.svg';
  return '/placeholder.svg';
};
