
import { formatPrice } from "@/lib/formatters";
import { products } from "@/data/products/index";
import { toast } from "@/hooks/use-toast";

export const downloadPriceList = () => {
  let csvContent = "Наименование,Категория,Производитель,Цена\n";
  
  products.forEach(product => {
    const row = [
      `"${product.name.replace(/"/g, '""')}"`,
      `"${product.category}"`,
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
  
  setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 100);
  
  toast({
    title: "Прайс-лист загружается",
    description: "Файл сохранен в формате CSV",
  });
};
