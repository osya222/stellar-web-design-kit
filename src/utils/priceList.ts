
import { Product } from "@/types/product";
import { getProducts } from "@/utils/dataService";
import { formatPrice } from "@/lib/formatters";

export function generatePriceListHTML(): string {
  // Получаем товары из хранилища
  const products = getProducts();
  
  if (!products || products.length === 0) {
    return "<p>Нет данных для прайс-листа</p>";
  }
  
  // Создаем HTML-таблицу для прайс-листа
  let html = `
    <table style="width:100%; border-collapse: collapse; margin: 20px 0;">
      <thead>
        <tr style="background-color: #f3f4f6;">
          <th style="padding: 12px; text-align: left; border-bottom: 2px solid #e5e7eb;">Название</th>
          <th style="padding: 12px; text-align: right; border-bottom: 2px solid #e5e7eb;">Цена</th>
        </tr>
      </thead>
      <tbody>
  `;
  
  // Добавляем каждый товар в таблицу
  products.forEach((product: Product) => {
    html += `
      <tr style="border-bottom: 1px solid #e5e7eb;">
        <td style="padding: 12px; text-align: left;">${product.name}</td>
        <td style="padding: 12px; text-align: right; font-weight: bold;">${formatPrice(product.price)}</td>
      </tr>
    `;
  });
  
  // Закрываем таблицу
  html += `
      </tbody>
    </table>
  `;
  
  return html;
}
