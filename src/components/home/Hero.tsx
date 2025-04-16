
import React, { useState, useEffect } from 'react';
import Logo from "@/components/layout/Logo";
import { ArrowDown, Upload, ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Hero = () => {
  const [backgroundImage, setBackgroundImage] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const { toast } = useToast();

  // Load saved image when component mounts
  useEffect(() => {
    console.log("Hero component mounted, checking for saved image");
    // Check for saved image in local storage
    const savedHeroImage = localStorage.getItem('heroBackgroundImage');
    if (savedHeroImage) {
      console.log("Found saved hero image:", savedHeroImage);
      setBackgroundImage(savedHeroImage);
    }
  }, []);

  const scrollToCatalog = () => {
    const catalogSection = document.getElementById('catalog');
    if (catalogSection) {
      catalogSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    console.log("Uploading hero image:", file.name);
    setIsUploading(true);
    setUploadError('');
    
    try {
      // Generate a unique filename
      const timestamp = Date.now();
      const safeFilename = file.name.replace(/[^\w\s.-]/g, '').replace(/\s+/g, '-');
      const filename = `hero-${timestamp}-${safeFilename}`;
      
      // Create a new FormData object
      const formData = new FormData();
      formData.append('file', file);
      formData.append('filename', filename);

      console.log("Sending upload request for hero image");
      // Save the image file
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
        cache: 'no-store'
      });
      
      // Check if response is OK before trying to parse JSON
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Upload failed with status:", response.status, errorText);
        throw new Error(`Failed to upload image: ${response.statusText || 'Server error'}`);
      }
      
      const result = await response.json();
      console.log("Hero image upload response:", result);
      
      if (!result.path) {
        throw new Error('No image path returned from server');
      }
      
      const savedImagePath = result.path;
      console.log("Hero image uploaded successfully:", savedImagePath);
      
      // Update the UI with the new image path
      setBackgroundImage(savedImagePath);
      
      // Save image path to localStorage
      localStorage.setItem('heroBackgroundImage', savedImagePath);
      
      toast({
        title: "Успешно",
        description: "Изображение загружено",
      });
    } catch (error) {
      console.error('Upload error for hero image:', error);
      const errorMessage = error instanceof Error ? error.message : 'Неизвестная ошибка';
      setUploadError(errorMessage);
      toast({
        title: "Ошибка",
        description: `Не удалось загрузить изображение: ${errorMessage}`,
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background image or waves */}
      <div className="absolute inset-0 pointer-events-none">
        {backgroundImage ? (
          <div className="w-full h-full relative">
            <img 
              src={`${backgroundImage}?t=${Date.now()}`} 
              alt="Hero background" 
              className="w-full h-full object-cover"
              onError={(e) => {
                console.error("Failed to load hero image:", backgroundImage);
                e.currentTarget.onerror = null; // Prevent infinite error loop
                toast({
                  title: "Ошибка",
                  description: "Не удалось загрузить фоновое изображение",
                  variant: "destructive"
                });
              }}
            />
            <div className="absolute inset-0 bg-black/20" /> {/* Overlay for better text readability */}
          </div>
        ) : (
          <svg className="w-full h-full" viewBox="0 0 1200 400" preserveAspectRatio="none">
            <path 
              d="M0,100 C300,300 900,-100 1200,100 L1200,400 L0,400 Z" 
              fill="#EBF7FC" 
              className="opacity-60"
            />
            <path 
              d="M0,200 C300,400 900,0 1200,200 L1200,400 L0,400 Z" 
              fill="#E0F2F7" 
              className="opacity-40"
            />
            <path 
              d="M0,300 C300,500 900,100 1200,300 L1200,400 L0,400 Z" 
              fill="#D3E7F0" 
              className="opacity-20"
            />
          </svg>
        )}
      </div>

      {/* Upload button */}
      <div className="absolute top-4 right-4 z-10">
        <label className="cursor-pointer flex items-center gap-2 bg-white/90 hover:bg-white px-4 py-2 rounded-lg shadow-sm transition-colors">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
            disabled={isUploading}
          />
          <Upload className="w-4 h-4 text-blue-600" />
          <span className="text-sm text-gray-700">
            {isUploading ? 'Загрузка...' : 'Загрузить фон'}
          </span>
        </label>
        {uploadError && (
          <div className="mt-2 p-2 bg-red-50 text-red-600 text-xs rounded">
            {uploadError}
          </div>
        )}
      </div>

      <div className="container-custom text-center relative z-10">
        <div className="flex justify-center mb-12">
          <Logo size="lg" />
        </div>
        <h2 className={`text-5xl font-bold mb-8 ${backgroundImage ? 'text-white' : 'text-gray-800'}`}>
          Премиум морепродукты с доставкой
        </h2>
        <div className={`${backgroundImage ? 'bg-black/50' : 'bg-gray-100/70'} backdrop-blur-sm p-6 rounded-xl shadow-lg max-w-3xl mx-auto mb-8`}>
          <p className={`text-xl leading-relaxed ${backgroundImage ? 'text-white' : 'text-gray-700'}`}>
            Широкий ассортимент качественной морской продукции с доставкой по Москве и МО. Работаем с ресторанами, магазинами и оптовыми покупателями.
          </p>
        </div>
        <button 
          onClick={scrollToCatalog}
          className={`flex items-center gap-2 mx-auto ${
            backgroundImage 
              ? 'bg-white/90 hover:bg-white' 
              : 'bg-white hover:bg-gray-50'
          } text-gray-800 font-medium py-3 px-6 rounded-lg transition-colors border border-gray-200 shadow-sm`}
        >
          Перейти к каталогу
          <ArrowDown className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
