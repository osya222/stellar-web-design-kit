
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { v4 as uuidv4 } from 'uuid';

const ImageUploader = () => {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, выберите файл изображения",
        variant: "destructive"
      });
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Ошибка",
        description: "Размер файла не должен превышать 5MB",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);
    try {
      const fileExtension = file.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExtension}`;
      
      const formData = new FormData();
      const renamedFile = new File([file], fileName, { type: file.type });
      formData.append('image', renamedFile);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Ошибка загрузки');
      }

      const data = await response.json();
      
      toast({
        title: "Успешно",
        description: "Изображение загружено",
      });

      // Copy path to clipboard for convenience
      await navigator.clipboard.writeText(data.path);
      toast({
        title: "Путь скопирован",
        description: "Путь к изображению скопирован в буфер обмена",
      });

      console.log('Uploaded image path:', data.path);
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить изображение",
        variant: "destructive"
      });
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Загрузка изображений</h2>
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          className="relative"
          disabled={isUploading}
        >
          <input
            type="file"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handleFileChange}
            accept="image/*"
          />
          <Upload className="mr-2" />
          {isUploading ? 'Загрузка...' : 'Выберите файл'}
        </Button>
      </div>
      <p className="text-sm text-gray-500">
        Поддерживаемые форматы: JPG, PNG, GIF. Максимальный размер: 5MB
      </p>
      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-medium mb-2">Инструкция:</h3>
        <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600">
          <li>Загрузите изображение</li>
          <li>Путь к файлу будет автоматически скопирован в буфер обмена</li>
          <li>Вставьте путь в поле imageUrl соответствующего товара</li>
        </ol>
      </div>
    </div>
  );
};

export default ImageUploader;
