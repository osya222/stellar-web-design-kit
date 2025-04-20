
import React from 'react';

const Hero = () => {
  return (
    <section className="relative overflow-hidden py-0">
      {/* Анимированный фон волн */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 h-1/2 wave-container">
          <svg 
            className="wave-animation absolute bottom-0 w-full h-full" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 1440 320"
          >
            <path 
              fill="rgba(130, 199, 252, 0.3)" 
              fillOpacity="1" 
              d="M0,256L48,250.7C96,245,192,235,288,229.3C384,224,480,224,576,240C672,256,768,288,864,272C960,256,1056,192,1152,181.3C1248,171,1344,213,1392,234.7L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
            <path 
              fill="rgba(178, 244, 221, 0.3)" 
              fillOpacity="1" 
              d="M0,160L48,165.3C96,171,192,181,288,197.3C384,213,480,235,576,229.3C672,224,768,192,864,197.3C960,203,1056,245,1152,261.3C1248,277,1344,267,1392,261.3L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
          </svg>
        </div>
      </div>

      {/* Изображение рыбы */}
      <div className="absolute inset-0 flex justify-center items-end z-10 pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80"
          alt="Рыба Hero"
          className="max-h-[330px] max-w-full opacity-80 animate-fade-in rounded-b-lg shadow-2xl"
        />
      </div>

      <div className="container relative z-20 mx-auto px-4 py-20 md:py-28 flex flex-col items-center">
        <div className="backdrop-blur-[3px] shadow-xl rounded-xl px-4 md:px-12 py-12 text-center bg-white/80 animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight drop-shadow-lg animate-fade-in">
            Свежая рыба и морепродукты оптом
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto animate-fade-in">
            Поставляем свежайшую рыбу и лучшие морепродукты для ресторанов, магазинов и оптовых покупателей Москвы и области
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
