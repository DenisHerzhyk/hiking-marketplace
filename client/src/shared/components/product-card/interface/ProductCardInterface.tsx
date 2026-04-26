interface ProductCardInterface {
  id: number;
  title: string;
  price: number;
  availableSizes: string[];
  category: string;
  gender: string;
  fit: string;
  color: string;
  sizeGuide:
    | { modelHeightCm: number; modelHeightFeet: string; modelWears: string }
    | undefined;
  details: { label: string; value: string }[] | undefined;
  productImages: string[];
  description: string;
  inStock: boolean;
}

export default ProductCardInterface;
