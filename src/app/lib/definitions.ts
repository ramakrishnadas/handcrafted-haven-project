export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
    profile_image: string | null;
    user_story: string | null;
};

export type Product = {
  id: string;
  user_id: string;
  product_name: string;
  category: string;
  price: number;
  image_url: string;
  description: string;
  stock: number;
  thumbnail_image_url: string;
};

export type Category = {
  category: string;
}

export type ReviewAndRating = {
  id: string;
  user_id: string;
  product_id: string;
  review: string;
  rating: number;
  user_name: string;
  user_profile_image: string;
}

export type Seller = {
  id: string;
  name: string;
  profile_image: string;
  product_count: number;
}