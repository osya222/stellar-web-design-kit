
import React from 'react';
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface ViewAllButtonProps {
  onClick: (event: React.MouseEvent) => void;
}

const ViewAllButton: React.FC<ViewAllButtonProps> = ({ onClick }) => {
  return (
    <div className="mt-10 md:mt-12 text-center">
      <Button 
        size="lg" 
        onClick={onClick} 
        className="bg-blue-700 hover:bg-blue-800 text-white font-medium px-6 py-5 md:px-8 md:py-6 h-auto rounded-xl shadow-md text-sm md:text-base"
      >
        <ExternalLink className="mr-2 h-4 w-4 md:h-5 md:w-5" />
        Смотреть весь каталог
      </Button>
    </div>
  );
};

export default ViewAllButton;
