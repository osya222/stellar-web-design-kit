
import React from 'react';
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface ProductSearchProps {
  onSearch: (query: string) => void;
}

const ProductSearch: React.FC<ProductSearchProps> = ({ onSearch }) => {
  return (
    <div className="relative w-full max-w-md">
      <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
      <Input
        type="text"
        placeholder="Поиск..."
        className="pl-8 py-1 h-9 text-sm"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};

export default ProductSearch;
