
import React from 'react';
import { Fish } from 'lucide-react';

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

  const iconSizes = {
    sm: { width: 18, height: 18 },
    md: { width: 22, height: 22 },
    lg: { width: 24, height: 24 }
  };

  return (
    <div className="flex items-center gap-2">
      <div className={`relative ${sizeClasses[size]}`}>
        <div className="absolute inset-0 bg-blue-600 rounded-full transform rotate-45 scale-75"></div>
        <div className="absolute inset-0 bg-blue-400 rounded-full transform scale-60"></div>
        <div className="relative h-full aspect-square flex items-center justify-center">
          <Fish 
            className="text-white z-10" 
            width={iconSizes[size].width} 
            height={iconSizes[size].height} 
            strokeWidth={2.5} 
          />
        </div>
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
