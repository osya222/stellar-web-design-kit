
import React from 'react';
import { Fish, ShellIcon, Soup, GanttChart } from "lucide-react";

export const renderProductIcon = (category: string) => {
  switch (category) {
    case 'Лосось (Чили)':
    case 'Форель (Турция)':
    case 'Филе рыбы':
      return <Fish className="w-8 h-8 text-blue-600" />;
    case 'Креветки и морепродукты':
      return <ShellIcon className="w-8 h-8 text-pink-500" />;
    case 'Полуфабрикаты':
      return <Soup className="w-8 h-8 text-orange-500" />;
    default:
      return <GanttChart className="w-8 h-8 text-blue-300" />;
  }
};
