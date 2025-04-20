
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface ProductSearchProps {
  onSearch: (query: string) => void;
}

const ProductSearch: React.FC<ProductSearchProps> = ({ onSearch }) => {
  return (
    <div className="relative mb-8">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
      <Input
        type="text"
        placeholder="Поиск по товарам..."
        className="pl-10 w-full max-w-xl"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};

export default ProductSearch;
