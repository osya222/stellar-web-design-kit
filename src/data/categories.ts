
export interface Category {
  id: number;
  name: string;
  slug: string;
}

export const categories: Category[] = [
  {
    id: 1,
    name: "Лосось",
    slug: "salmon"
  },
  {
    id: 2,
    name: "Форель",
    slug: "trout"
  },
  {
    id: 3,
    name: "Морепродукты",
    slug: "seafood"
  }
];
