
import React, { useState, useEffect } from "react";
import { Loader2, Image as ImageIcon, FileImage, AlertCircle, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

interface ImageUploaderProps {
  imageUrl?: string | null;
  imageAlt?: string;
  serverPath?: string;
  isUploading: boolean;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  imageUrl,
  imageAlt,
  serverPath,
  isUploading,
  onFileChange,
}) => {
  const [error, setError] = useState<string | null>(null);
  
  // Debug log when component mounts or props change
  useEffect(() => {
    console.log("ImageUploader received imageUrl:", imageUrl);
    console.log("ImageUploader received serverPath:", serverPath);
  }, [imageUrl, serverPath]);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    try {
      if (e.target.files && e.target.files[0]) {
        console.log("Selected file for upload:", e.target.files[0].name);
      }
      onFileChange(e);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка при выборе файла');
      console.error("Error during file selection:", err);
    }
  };
  
  return (
    <div className="space-y-3">
      {/* Отображение изображения */}
      <div className="relative">
        <img
          src={imageUrl || "https://placehold.co/64x64/png"}
          alt={imageAlt || "Фото"}
          className="w-24 h-24 object-cover rounded border border-gray-200"
        />
        {isUploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/70 rounded">
            <Loader2 className="w-5 h-5 animate-spin text-primary" />
          </div>
        )}
      </div>
      
      {/* Форма загрузки */}
      <label className="flex flex-col items-start mt-2">
        <span className="text-xs text-gray-500 mb-1 flex items-center">
          <Upload className="w-3 h-3 mr-1" />
          Загрузить фото
        </span>
        <div className="relative w-full">
          <input
            type="file"
            accept="image/*"
            className={`block w-full text-sm text-gray-500 file:mr-4 file:py-1 file:px-3 
                        file:rounded file:border-0 file:text-xs file:bg-primary file:text-white
                        hover:file:bg-primary/90 ${isUploading ? "opacity-50 cursor-not-allowed" : ""}`}
            onChange={handleFileChange}
            disabled={isUploading}
          />
        </div>
        
        {/* Сообщение об ошибке */}
        {error && (
          <Alert variant="destructive" className="mt-2 py-2 text-xs">
            <AlertCircle className="h-3 w-3" />
            <AlertTitle className="text-xs ml-2">Ошибка загрузки</AlertTitle>
            <AlertDescription className="text-xs ml-2">
              {error}
            </AlertDescription>
          </Alert>
        )}
        
        {/* Путь на сервере */}
        {serverPath && (
          <span className="block mt-1 text-xs text-gray-400 break-all">
            <FileImage className="inline w-3 h-3 mr-1" />
            {serverPath}
          </span>
        )}
      </label>
    </div>
  );
};

export default ImageUploader;
