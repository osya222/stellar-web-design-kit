
import { Product } from '@/types/product';
import { getProductImage } from '../productImages';

// Мидии products
export const musselProducts: Product[] = [
  { 
    id: 14, 
    name: "МИДИИ раковина в собственном соку", 
    category: "Мидии",
    size: "50-70", 
    packaging: "10*1", 
    catchDate: "Июнь-август",
    manufacturer: "Чили", 
    image: getProductImage({ category: "Мидии", name: "МИДИИ раковина в собственном соку" }),
    price: 391.9
  },
  { 
    id: 15, 
    name: "МИДИИ раковина сливки-чеснок/томат-чеснок/вино", 
    category: "Мидии",
    size: "50-70", 
    packaging: "10*0,5", 
    catchDate: "Апрель/май/ноябрь",
    manufacturer: "Чили", 
    image: getProductImage({ category: "Мидии", name: "МИДИИ раковина сливки-чеснок/томат-чеснок/вино" }),
    price: 483.9
  },
  { 
    id: 16, 
    name: "МЯСО МИДИЙ в/м", 
    category: "Мидии",
    size: "200-300", 
    packaging: "9,2", 
    catchDate: "Май",
    manufacturer: "Чили", 
    image: getProductImage({ category: "Мидии", name: "МЯСО МИДИЙ в/м" }),
    price: 520.9
  },
  { 
    id: 17, 
    name: "МЯСО МИДИЙ в/м", 
    category: "Мидии",
    size: "300-500", 
    packaging: "9,2", 
    catchDate: "Май",
    manufacturer: "Чили", 
    image: getProductImage({ category: "Мидии", name: "МЯСО МИДИЙ в/м" }),
    price: 509.9
  },
];
