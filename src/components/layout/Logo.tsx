
import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
}

const Logo: React.FC<LogoProps> = ({ size = 'md' }) => {
  // Size classes mapping
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-12'
  };

  return (
    <div className="flex items-center gap-2">
      <div className={`${sizeClasses[size]}`}>
        <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" className="h-full">
          {/* Background circle */}
          <circle cx="200" cy="150" r="140" fill="#e0f2f7" />
          
          {/* Water waves */}
          <path d="M60 180 C100 160, 150 200, 200 180 C250 160, 300 200, 340 180" stroke="#78c6e3" strokeWidth="12" fill="none" />
          <path d="M60 210 C100 190, 150 230, 200 210 C250 190, 300 230, 340 210" stroke="#3498db" strokeWidth="12" fill="none" />
          
          {/* Fish */}
          <g transform="translate(200, 120) rotate(-15)">
            {/* Fish body */}
            <path d="M0 0 C30 -20, 80 -20, 100 0 C80 20, 30 20, 0 0 Z" fill="#4c9ccd" />
            
            {/* Fish tail */}
            <path d="M-10 0 L-40 -20 L-40 20 Z" fill="#4c9ccd" />
            
            {/* Fish eye */}
            <circle cx="80" cy="-5" r="5" fill="white" />
            <circle cx="80" cy="-5" r="2" fill="black" />
            
            {/* Fish scales */}
            <path d="M30 -10 A10 10 0 0 1 50 -10" stroke="#3a7daa" strokeWidth="2" fill="none" />
            <path d="M30 0 A10 10 0 0 1 50 0" stroke="#3a7daa" strokeWidth="2" fill="none" />
            <path d="M30 10 A10 10 0 0 1 50 10" stroke="#3a7daa" strokeWidth="2" fill="none" />
            
            {/* Icicles */}
            <path d="M60 -15 L65 -8 M70 -15 L72 -5 M80 -15 L78 -5 M90 -15 L95 -8" stroke="#a8d5e5" strokeWidth="2" />
          </g>
          
          {/* Snowflakes */}
          <g fill="#a8d5e5">
            <circle cx="100" cy="80" r="3" />
            <circle cx="120" cy="60" r="4" />
            <circle cx="280" cy="70" r="3" />
            <circle cx="260" cy="100" r="4" />
            <circle cx="300" cy="120" r="3" />
            <circle cx="150" cy="90" r="3" />
            <circle cx="230" cy="80" r="4" />
          </g>
        </svg>
      </div>
      <span className={`font-bold tracking-tight ${
        size === 'sm' ? 'text-xl' : size === 'md' ? 'text-2xl' : 'text-3xl'
      }`}>
        РыбАртель
      </span>
    </div>
  );
};

export default Logo;
