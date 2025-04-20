
export const apiRoutes = {};

export const getImageUrl = (image?: string): string => {
  if (!image) return '/placeholder.svg';
  return `/images/products/${image}`;
};
