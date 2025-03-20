export interface Product {
  id: number;
  name: string;
  category: string;
  originalPrice: number;
  newPrice: number;
  sizes?: string[];
  color: string;
  material: string;
  available: boolean;
  edition: string;
  offer: string;
  featuresProduct: boolean;
  featuresType: string[];
  img: string;
  images: string[];
  quantity: number;
  description: string;
}
export interface CartProduct {
  product: Product | undefined;
  quantity: number;
  sizes?: string;
}
export interface IUser {
  id: number;
  user_name: string;
  first_name: string;
  last_name: string;
  email: string;
  picture: string;
  create_at: string;
}
