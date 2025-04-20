
import React from 'react';
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface ProductSearchProps {
  onSearch: (query: string) => void;
}

const ProductSearch: React.FC<ProductSearchProps> = ({ onSearch }) => {
  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 h-4 w-4" />
      <Input
        type="text"
        placeholder="Поиск по каталогу..."
        className="pl-10 py-2 h-10 text-sm border-blue-100 rounded-lg focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};

export default ProductSearch;
