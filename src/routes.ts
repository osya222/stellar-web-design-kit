
// Define route handlers for API endpoints
export const apiRoutes = {};

// Simple function to get placeholder image
export const getImageUrl = (path: string | undefined): string => {
  if (!path) return '/placeholder.svg';
  return path;
};

// Function to get product image path
export const getProductImageUrl = (imagePath: string | undefined): string => {
  if (!imagePath) return '/placeholder.svg';
  return `/images/products/${imagePath}`;
};
