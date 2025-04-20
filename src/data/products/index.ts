
import { Category } from "../categories";

export interface Product {
  id: number;
  name: string;
  price: number;
  categoryId: number;
  description?: string;
  manufacturer: string;
  image?: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Лосось свежемороженый",
    price: 1457,
    categoryId: 1,
    description: "Свежемороженый лосось премиального качества",
    manufacturer: "Чили Premium"
  },
  {
    id: 2,
    name: "Форель свежемороженая морская",
    price: 1166,
    categoryId: 2,
    description: "Свежемороженая морская форель высшего качества",
    manufacturer: "Турция"
  },
  {
    id: 3,
    name: "Креветка ваннамей в глазури",
    price: 1002,
    categoryId: 3,
    description: "Свежемороженые креветки в глазури",
    manufacturer: "Индия"
  },
  {
    id: 4,
    name: "Лангустины свежемороженые L1",
    price: 884,
    categoryId: 3,
    description: "Свежемороженые лангустины премиум класса",
    manufacturer: "Аргентина"
  },
  {
    id: 5,
    name: "Медальоны из морепродуктов",
    price: 1199,
    categoryId: 3,
    description: "Медальоны из отборных морепродуктов",
    manufacturer: "Индия"
  },
  {
    id: 6,
    name: "Мясо мидий варено-мороженое",
    price: 520,
    categoryId: 3,
    description: "Варено-мороженое мясо мидий",
    manufacturer: "Чили"
  }
];
