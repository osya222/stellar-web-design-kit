
import { formatPrice } from "@/lib/formatters";
import { products } from "@/data/products/index";
import { toast } from "@/hooks/use-toast";
import { categories } from "@/data/categories";

export const downloadPriceList = () => {
  let csvContent = "Наименование,Категория,Производитель,Цена\n";
  
  products.forEach(product => {
    // Find the category name using categoryId
    const category = categories.find(c => c.id === product.categoryId);
    const categoryName = category ? category.name : '';
    
    const row = [
      `"${product.name.replace(/"/g, '""')}"`,
      `"${categoryName}"`,
      `"${product.manufacturer || ''}"`,
      formatPrice(product.price || 0).replace(/\s/g, "")
    ];
    csvContent += row.join(",") + "\n";
  });
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  
  const link = document.createElement('a');
  
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', 'МореПродукт-Прайс-лист.csv');
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  toast({
    title: "Прайс-лист скачан",
    description: "Файл успешно сохранен на ваше устройство",
  });
};
