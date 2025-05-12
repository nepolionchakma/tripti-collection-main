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
export interface ProductNow {
  id: number;
  title: string;
  category: string;
  original_price: number;
  new_price: number;
  size: string[];
  colors: string[];
  material: string;
  is_available: boolean;
  edition: string;
  offer: string;
  features: boolean;
  img: string;
  images: string[];
  quantity: number;
  description: string;
  visibility: boolean;
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
  profile_type: string;
  access_token: string;
  create_at: string;
}
