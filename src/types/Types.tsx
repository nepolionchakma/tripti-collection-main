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
  collections: string[];
  prices: Prices;
  sizes: string[];
  colors: string[];
  materials: string[];
  editions: string[];
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
  sections: string[];
}
interface Rating {
  total_reviews: number;
  average_rating: number;
}
interface SizesWithQuantity {
  size_name: string;
  quantity: number;
}
export interface CartProduct {
  user_id: number | undefined;
  product_id: number | undefined;
  title: string | undefined;
  price: number | undefined;
  quantity: number;
  sizes: SizesWithQuantity[];
  image: string | undefined;
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

export interface Section {
  section_id: number;
  section_name: string;
}
export interface Category {
  category_id: number;
  category_name: string;
  category_image: string;
}
export interface Collection {
  collection_id: number;
  collection_name: string;
}
export interface Color {
  color_id: number;
  color_name: string;
}
export interface Material {
  material_id: number;
  material_name: string;
}
export interface Edition {
  edition_id: number;
  edition_name: string;
}
export interface Feature {
  feature_id: number;
  feature_name: string;
}
export interface Size {
  size_id: number;
  size_name: string;
}
