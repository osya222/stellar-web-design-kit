
// Define route handlers for API endpoints
export const apiRoutes = {};

// Function to get image URL with proper path
export const getImageUrl = (path: string | undefined): string => {
  if (!path) return '/placeholder.svg';
  return `/lovable-uploads/${path}`;
};
