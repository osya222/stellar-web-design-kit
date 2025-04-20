
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Upload, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription,
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle
} from '@/components/ui/alert-dialog';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface ProductImageUploadProps {
  productId: string | undefined;
  initialPreview: string;
  imageUrl: string;
  uploadActive?: boolean;
  onImageChange: (imagePath: string) => void;
}

export const ProductImageUpload: React.FC<ProductImageUploadProps> = ({
  productId,
  initialPreview,
  imageUrl,
  uploadActive = true,
  onImageChange,
}) => {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [errorDetails, setErrorDetails] = useState("");
  const [showHelpDialog, setShowHelpDialog] = useState(false);
  const uploadTimeoutRef = useRef<number | null>(null);

  // Show preview based on proper path hierarchy
  const previewUrl =
    imageUrl && imageUrl !== '/placeholder.svg'
      ? imageUrl
      : initialPreview && initialPreview !== '/placeholder.svg'
        ? initialPreview
        : '/placeholder.svg';

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Basic file validation
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, выберите файл изображения",
        variant: "destructive"
      });
      return;
    }

    // Size check - reduced to 2MB for better reliability
    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: "Ошибка",
        description: "Размер файла не должен превышать 2MB",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsUploading(true);
      console.log("Starting upload process for file:", file.name, "Size:", file.size, "Type:", file.type);

      const formData = new FormData();
      
      // Clean up the filename to avoid issues
      const fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg';
      const safeFileName = `product_${productId || 'new'}_${Date.now()}.${fileExt}`;
      console.log("Using safe filename:", safeFileName);
      
      // Add to form with controlled filename
      formData.append('image', file, safeFileName);
      
      // Set a timeout to abort if taking too long
      if (uploadTimeoutRef.current) {
        window.clearTimeout(uploadTimeoutRef.current);
      }
      
      // Create abort controller for the fetch
      const controller = new AbortController();
      
      // Set timeout to abort after 10 seconds
      uploadTimeoutRef.current = window.setTimeout(() => {
        console.log("Upload timeout triggered, aborting");
        controller.abort();
        
        // Clear the timeout reference
        uploadTimeoutRef.current = null;
      }, 10000);
      
      console.log("Sending upload request to server");
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
        signal: controller.signal
      });
      
      // Clear timeout as we got a response
      if (uploadTimeoutRef.current) {
        window.clearTimeout(uploadTimeoutRef.current);
        uploadTimeoutRef.current = null;
      }
      
      console.log("Server response status:", response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response from server:", errorText);
        
        let parsedError;
        try {
          parsedError = JSON.parse(errorText);
        } catch (e) {
          parsedError = { error: "Unknown server error", details: errorText };
        }
        
        throw new Error(`Ошибка загрузки: ${response.status} - ${parsedError.details || errorText}`);
      }

      // Try to parse the response
      const responseText = await response.text();
      console.log("Server response text:", responseText);
      
      let result;
      try {
        result = JSON.parse(responseText);
      } catch (parseError) {
        console.error("JSON parse error:", parseError);
        throw new Error("Некорректный формат ответа сервера");
      }

      if (!result?.success || !result?.path) {
        console.error("Invalid response format:", result);
        throw new Error('Некорректный ответ сервера при загрузке изображения');
      }

      console.log("Upload successful, path:", result.path);
      
      // Verify the image can be loaded
      const imgElement = new Image();
      imgElement.onload = () => {
        // Image loaded successfully, update the product
        onImageChange(result.path);
        
        toast({
          title: "Изображение загружено",
          description: "Изображение сохранено и связано с продуктом",
        });
      };
      
      imgElement.onerror = () => {
        console.error("Failed to load the uploaded image");
        setErrorDetails("Изображение загружено на сервер, но не может быть отображено. Попробуйте снова.");
        setErrorDialogOpen(true);
      };
      
      // Start loading the image
      imgElement.src = result.path;

    } catch (error) {
      console.error("Upload error:", error);
      
      const errorMessage = error instanceof Error 
        ? error.message 
        : error instanceof DOMException && error.name === "AbortError"
          ? "Превышено время ожидания ответа от сервера"
          : "Не удалось загрузить изображение";
      
      // Save error details and open dialog
      setErrorDetails(errorMessage);
      setErrorDialogOpen(true);
      
      toast({
        title: "Ошибка загрузки",
        description: "Не удалось загрузить изображение. Нажмите для подробностей.",
        variant: "destructive",
        action: <Button variant="outline" size="sm" onClick={() => setErrorDialogOpen(true)}>Детали</Button>
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm font-medium">Изображение продукта</p>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setShowHelpDialog(true)}
          >
            <AlertTriangle className="h-4 w-4 mr-1" />
            Помощь
          </Button>
        </div>
        
        <AspectRatio ratio={4 / 3} className="bg-gray-100 rounded-md overflow-hidden mb-4">
          <img
            src={previewUrl}
            alt="Product preview"
            className="w-full h-full object-cover"
            onError={(e) => {
              console.log("Image loading error, falling back to placeholder");
              (e.target as HTMLImageElement).src = '/placeholder.svg';
            }}
          />
        </AspectRatio>
        
        {uploadActive ? (
          <div className="flex flex-col gap-2">
            <Button variant="outline" className="w-full relative" disabled={isUploading}>
              <input
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleImageUpload}
                accept="image/jpeg,image/png,image/webp,image/gif"
                disabled={isUploading}
              />
              {isUploading ? (
                <>
                  <div className="animate-spin h-4 w-4 mr-2 border-2 border-primary border-t-transparent rounded-full" />
                  Загрузка...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Загрузить изображение (макс. 2MB)
                </>
              )}
            </Button>
            
            <Alert variant="default" className="mt-2 bg-gray-50">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Рекомендации</AlertTitle>
              <AlertDescription>
                Используйте изображения в формате JPG, PNG или WebP, размером до 2MB
              </AlertDescription>
            </Alert>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <Button variant="outline" className="w-full relative" disabled>
              <Upload className="mr-2 h-4 w-4" />
              Загрузка изображений отключена
            </Button>
          </div>
        )}
      </div>

      {/* Error Dialog */}
      <AlertDialog open={errorDialogOpen} onOpenChange={setErrorDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Ошибка загрузки изображения</AlertDialogTitle>
            <AlertDialogDescription>
              <div className="mb-4">{errorDetails}</div>
              <div className="mt-4 p-3 bg-gray-100 rounded text-sm">
                <p className="font-medium mb-2">Возможные причины:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Проблемы с подключением к серверу</li>
                  <li>Недостаточно прав для записи файла</li>
                  <li>Ошибка обработки на сервере</li>
                </ul>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Закрыть</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Help Dialog */}
      <Dialog open={showHelpDialog} onOpenChange={setShowHelpDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Рекомендации по загрузке изображений</DialogTitle>
            <DialogDescription>
              Для успешной загрузки изображений следуйте этим рекомендациям
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div>
              <h4 className="font-medium mb-1">Поддерживаемые форматы:</h4>
              <p className="text-sm">JPG, PNG, WebP, GIF</p>
            </div>
            
            <div>
              <h4 className="font-medium mb-1">Максимальный размер:</h4>
              <p className="text-sm">2 мегабайта (2MB)</p>
            </div>
            
            <div>
              <h4 className="font-medium mb-1">Оптимальное разрешение:</h4>
              <p className="text-sm">1200×900 пикселей или с соотношением сторон 4:3</p>
            </div>
            
            <div>
              <h4 className="font-medium mb-1">При возникновении ошибок:</h4>
              <ul className="list-disc pl-5 text-sm space-y-1">
                <li>Убедитесь, что изображение не превышает 2MB</li>
                <li>Попробуйте другой формат изображения (например, JPG вместо PNG)</li>
                <li>Используйте сжатие изображений перед загрузкой</li>
              </ul>
            </div>
          </div>

          <DialogFooter>
            <Button onClick={() => setShowHelpDialog(false)}>Понятно</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
