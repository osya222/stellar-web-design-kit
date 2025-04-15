
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
        <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" className="h-full">
          {/* Background circle */}
          <circle cx="200" cy="200" r="180" fill="#1e40af" />
          
          {/* Water lines */}
          <path d="M60 230 C120 210, 180 250, 240 230 C300 210, 360 250, 420 230" stroke="white" strokeWidth="12" fill="none" opacity="0.3" />
          <path d="M60 260 C120 240, 180 280, 240 260 C300 240, 360 280, 420 260" stroke="white" strokeWidth="12" fill="none" opacity="0.3" />
          
          {/* Fish silhouette */}
          <path d="M240 160 L180 200 L240 240 L240 160" fill="white" />
        </svg>
      </div>
      <span className={`font-bold tracking-tight ${
        size === 'sm' ? 'text-xl' : size === 'md' ? 'text-2xl' : 'text-3xl'
      }`}>
        МореПродукт
      </span>
    </div>
  );
};

export default Logo;
