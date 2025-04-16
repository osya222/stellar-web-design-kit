
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { apiRoutes } from './routes.ts'

// Перехватываем fetch запросы для API маршрутов в режиме разработки
const originalFetch = window.fetch;
window.fetch = async (input, init) => {
  const url = typeof input === 'string' ? input : input instanceof URL ? input.toString() : input.url;
  
  try {
    // Проверяем, является ли это API запросом
    for (const [route, handler] of Object.entries(apiRoutes)) {
      if (url.includes(route)) {
        console.log(`Перехват API запроса к ${route}`);
        const request = new Request(url, init);
        console.log("Метод запроса:", request.method);
        
        // Если это загрузка файла, выведем дополнительную информацию
        if (init?.body instanceof FormData) {
          console.log("FormData обнаружен:", [...init.body.entries()].map(e => e[0]));
        }
        
        const response = await handler(request);
        console.log(`Ответ от обработчика ${route}:`, response.status);
        return response;
      }
    }
  } catch (error) {
    console.error("Ошибка при перехвате API запроса:", error);
    return new Response(JSON.stringify({ 
      error: 'Ошибка обработки запроса', 
      details: error instanceof Error ? error.message : String(error) 
    }), { 
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  
  // Иначе передаем запрос оригинальному fetch
  return originalFetch(input, init);
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
