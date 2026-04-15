export interface ProductInterface {
  id: number;
  title: string;
  price: number;
  availableSizes: string[];
  category: string;
  gender: string;
  productImages: string[];
  description: string;
  inStock: boolean;
}
