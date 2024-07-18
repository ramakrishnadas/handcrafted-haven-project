export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
    profile_image: string;
    user_story: string;
  };

  export type Products = {
    id: string;
    user_id: string;
    product_name: string;
    category: string;
    price: number;
    image_url: string;
    description: string;
    stock: number;
  };