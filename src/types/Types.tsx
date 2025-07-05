// export interface Product {
//   id: number;
//   title: string;
//   category: string;
//   original_price: number;
//   new_price: number;
//   sizes?: string[];
//   color: string;
//   material: string;
//   available: boolean;
//   edition: string;
//   offer: string;
//   featuresProduct: boolean;
//   featuresType: string[];
//   img: string;
//   images: string[];
//   quantity: number;
//   description: string;
//   timestamp: string;
// }
interface Prices {
  original_price: number;
  new_price: number;
}
interface Offer {
  type: string;
  amount: number;
  expires_at: string;
}
export interface Product {
  product_id: number;
  title: string;
  categories: string[];
  collection: string[];
  prices: Prices;
  sizes: string[];
  colors: string[];
  material: string[];
  edition: string[];
  offer: Offer;
  features: string[];
  img: string;
  images: string[];
  stock_quantity: number;
  rating: Rating;
  description: string;
  tags: string[];
  visibility: boolean;
  is_available_product: boolean;
  is_featured_product: boolean;
  created_at: string;
  updated_at: string;
}
interface Rating {
  total_reviews: number;
  average_rating: number;
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
