
/**
 * Format a price with currency symbol
 * @param price - The price to format
 * @param currency - The currency symbol (defaults to '₽')
 * @returns Formatted price string
 */
export function formatPrice(price: number | string, currency: string = '₽'): string {
  const priceNumber = typeof price === 'string' ? parseFloat(price) : price;
  
  if (isNaN(priceNumber)) {
    return 'N/A';
  }
  
  return `${priceNumber.toLocaleString('ru-RU')} ${currency}`;
}
