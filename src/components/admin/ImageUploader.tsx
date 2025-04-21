
import React from "react";
import { Loader2, Image as ImageIcon, FileImage } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  return (
    <div>
      <img
        src={imageUrl || "https://placehold.co/64x64/png"}
        alt={imageAlt || "Фото"}
        className="w-16 h-16 object-cover rounded"
      />
      <label className="flex flex-col items-start mt-2">
        <span className="text-xs text-gray-500">Загрузить фото</span>
        <div className="relative w-full">
          <input
            type="file"
            accept="image/*"
            className={`block w-full mt-1 ${isUploading ? "opacity-50" : ""}`}
            onChange={onFileChange}
            disabled={isUploading}
          />
          {isUploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/70">
              <Loader2 className="w-5 h-5 animate-spin text-primary" />
            </div>
          )}
        </div>
        {serverPath && (
          <span className="block mt-1 text-[10px] text-gray-400 break-all">
            <FileImage className="inline w-3 h-3 mr-1" />
            {serverPath}
          </span>
        )}
      </label>
    </div>
  );
};

export default ImageUploader;
