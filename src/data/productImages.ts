
// Map of product images for different categories and product types
export const productImages = {
  // Лосось
  "Лосось (Чили)": {
    default: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=1000&auto=format&fit=crop",
    "5-6 кг": "https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?q=80&w=1000&auto=format&fit=crop",
    "6-7 кг": "https://images.unsplash.com/photo-1574070677033-fbc62e644ff5?q=80&w=1000&auto=format&fit=crop"
  },
  // Форель
  "Форель (Турция)": {
    default: "https://images.unsplash.com/photo-1611171711912-e3f6b536f532?q=80&w=1000&auto=format&fit=crop",
    "1,3-1,8 кг": "https://images.unsplash.com/photo-1580376259349-5f4b7db4c39f?q=80&w=1000&auto=format&fit=crop",
    "1,8-2,7 кг": "https://images.unsplash.com/photo-1559717865-a99cac1c95d8?q=80&w=1000&auto=format&fit=crop",
    "2,7-3,6 кг": "https://images.unsplash.com/photo-1595456982104-14257450c06b?q=80&w=1000&auto=format&fit=crop"
  },
  // Креветки
  "Креветки и морепродукты": {
    default: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?q=80&w=1000&auto=format&fit=crop",
    "Креветка": "https://images.unsplash.com/photo-1623341214825-9f4f963727da?q=80&w=1000&auto=format&fit=crop",
    "Лангустины": "https://images.unsplash.com/photo-1567773613334-c6c47692d899?q=80&w=1000&auto=format&fit=crop",
    "Медальоны": "https://images.unsplash.com/photo-1551248429-40975aa4de74?q=80&w=1000&auto=format&fit=crop",
    "Мясо мидий": "https://images.unsplash.com/photo-1635346619936-8706500f36fe?q=80&w=1000&auto=format&fit=crop"
  },
  // Другие виды рыбы
  "Другие виды рыбы": {
    default: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1000&auto=format&fit=crop",
    "Сорадо": "https://images.unsplash.com/photo-1510130387422-82bed34b37e9?q=80&w=1000&auto=format&fit=crop",
    "Сибас": "https://images.unsplash.com/photo-1498654077810-12c21d4d6dc3?q=80&w=1000&auto=format&fit=crop",
    "Сельдь": "https://images.unsplash.com/photo-1583471883156-9750cb5fdbb1?q=80&w=1000&auto=format&fit=crop",
    "Скумбрия": "https://images.unsplash.com/photo-1531850039645-c8fde54c8f38?q=80&w=1000&auto=format&fit=crop",
    "Кек тунца": "https://images.unsplash.com/photo-1501243282513-b5bf25674386?q=80&w=1000&auto=format&fit=crop",
    "Камбала": "https://images.unsplash.com/photo-1504171833288-3cda76c88ad6?q=80&w=1000&auto=format&fit=crop",
    "Окунь": "https://images.unsplash.com/photo-1583471883099-18261cac3300?q=80&w=1000&auto=format&fit=crop",
    "Минтай": "https://images.unsplash.com/photo-1594322141406-588db26caf32?q=80&w=1000&auto=format&fit=crop",
    "Тунец": "https://images.unsplash.com/photo-1594324587718-9a1e97232782?q=80&w=1000&auto=format&fit=crop",
    "Филе пангасиуса": "https://images.unsplash.com/photo-1574781330855-d0db8cc6a79c?q=80&w=1000&auto=format&fit=crop",
    "Филе тилапии": "https://images.unsplash.com/photo-1513415438302-e2e100572a48?q=80&w=1000&auto=format&fit=crop",
    "Филе трески": "https://images.unsplash.com/photo-1494346480775-936a9f0d0877?q=80&w=1000&auto=format&fit=crop",
    "Филе пикши": "https://images.unsplash.com/photo-1603073163308-9654c3fb70b5?q=80&w=1000&auto=format&fit=crop"
  },
  // Полуфабрикаты
  "Полуфабрикаты": {
    default: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?q=80&w=1000&auto=format&fit=crop",
    "Котлеты": "https://images.unsplash.com/photo-1661793561004-87856a0b5899?q=80&w=1000&auto=format&fit=crop",
    "Пельмени": "https://images.unsplash.com/photo-1605349064096-2b11380ac0d1?q=80&w=1000&auto=format&fit=crop",
    "Палочки": "https://images.unsplash.com/photo-1542803293-cde7da05c348?q=80&w=1000&auto=format&fit=crop"
  }
};

// Function to get the appropriate image URL for a product
export function getProductImage(product: { category: string; name: string; size?: string }): string {
  const categoryImages = productImages[product.category as keyof typeof productImages];
  
  if (!categoryImages) {
    return "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1000&auto=format&fit=crop"; // Default fallback
  }

  // Check for specific product name matches
  for (const [key, url] of Object.entries(categoryImages)) {
    if (key !== 'default' && product.name.includes(key)) {
      return url;
    }
  }
  
  // Check for size match if available
  if (product.size && categoryImages[product.size as keyof typeof categoryImages]) {
    return categoryImages[product.size as keyof typeof categoryImages];
  }

  // Return default category image
  return categoryImages.default;
}
