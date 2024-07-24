"use server";

import { auth, signIn } from "@/auth";
import { AuthError } from "next-auth";
import { z } from "zod";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Define the user schema using zod
const UserSchema = z.object({
  id: z.string(), // Include the id field
  name: z.string(),
  firstName: z.string().min(1, "First Name is required."),
  lastName: z.string().min(1, "Last Name is required."),
  email: z.string().email("Invalid email address."),
  password: z.string().min(6, "Password must be at least 6 characters long."),
  profile_image: z.string(),
  user_story: z.string(),
});

// Omit the id field for CreateUser schema
const CreateUser = UserSchema.omit({
  id: true,
  name: true,
  profile_image: true,
  user_story: true,
});

export type State = {
  errors?: {
    firstName?: string[];
    lastName?: string[];
    email?: string[];
    password?: string[];
  };
  message?: string | null;
};

export async function createUser(prevState: State, formData: FormData) {
  const validatedFields = CreateUser.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Invalid Fields. Failed to Create User.",
    };
  }

  const { firstName, lastName, email, password } = validatedFields.data;

  // Check if the email already exists in the database
  let existingUser;
  try {
    existingUser = await sql`SELECT * FROM users WHERE email = ${email}`;
  } catch (error) {
    return { message: "Database Error: Failed to Check Email." };
  }

  if (existingUser.rows.length > 0) {
    return {
      errors: { email: ["Email already exists."] },
      message: "Email already exists. Failed to Create User.",
    };
  }

  // Generate a UUID for the user
  const userId = uuidv4();

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Join first and last name
  const name = firstName + " " + lastName;

  try {
    await sql`
      INSERT INTO users (id, name, email, password)
      VALUES (${userId}, ${name}, ${email}, ${hashedPassword})
    `;
  } catch (error) {
    return { message: "Database Error: Failed to Create User." };
  }

  revalidatePath("/login");
  redirect("/login");
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData, { redirectTo: "/dashboard"});
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export type State2 = {
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
    profile_image?: string[];
    user_story?: string[];
  };
  message?: string | null;
};

const UpdateUser = UserSchema.omit({
  id: true,
  firstName: true,
  lastName: true,
});

export async function updateUser(
  id: string,
  prevState: State2,
  formData: FormData
) {
  const validatedFields = UpdateUser.safeParse({
    name: formData.get("userName"),
    email: formData.get("userEmail"),
    password: formData.get("userPassword"),
    profile_image: formData.get("userProfile"),
    user_story: formData.get("userStory"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Invalid Fields. Failed to Create User.",
    };
  }

  const { name, email, password, profile_image, user_story } =
    validatedFields.data;

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await sql`
      UPDATE users SET name=${name}, email=${email}, password=${hashedPassword}, profile_image=${profile_image}, user_story=${user_story}
      WHERE id=${id}
    `;
  } catch (error) {
    return { message: "Database Error: Failed to Update User." };
  }

  const session = await auth();
  const user = session?.user;

  revalidatePath(`/profile/${user?.id}`);
  revalidatePath(`/profile/${id}/edit_profile`);
  redirect(`/profile/${user?.id}`);
}

const UserSchema2 = z.object({
  id: z.string(),
  user_id: z.string(),
  product_name: z.string().min(1, "product_name is required."),
  category: z.string().min(1, "category is required."),
  price: z.number().min(1, "price is required."),
  image_url: z.string().min(1, "image_url is required."),
  description: z.string(),
  stock: z.number().min(1, "stock is required"),
  thumbnail_image_url: z.string(),
});

export type State3 = {
  errors?: {
    product_name?: string[];
    category?: string[];
    price?: string[];
    image_url?: string[];
    description?: string[];
    stock?: string[];
    thumbnail_image_url?: string[];
  };
  message?: string | null;
};

const UpdateProduct = UserSchema2.omit({ id: true, user_id: true });

export async function updateProduct(
  id: string,
  prevState: State3,
  formData: FormData
) {
  const validatedFields = UpdateProduct.safeParse({
    product_name: formData.get("productName"),
    category: formData.get("category"),
    price: parseInt(formData.get("price") as string, 10),
    image_url: formData.get("product_image"),
    description: formData.get("description"),
    stock: parseInt(formData.get("stock") as string, 10),
    thumbnail_image_url: formData.get("product_image_small"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Invalid Fields. Failed to Create User.",
    };
  }

  const {
    product_name,
    category,
    price,
    image_url,
    description,
    stock,
    thumbnail_image_url,
  } = validatedFields.data;

  try {
    await sql`
      UPDATE products SET product_name=${product_name}, category=${category}, price=${price}, image_url=${image_url}, description=${description}, stock=${stock}, thumbnail_image_url=${thumbnail_image_url}
      WHERE id=${id}
    `;
  } catch (error) {
    return { message: "Database Error: Failed to Update User." };
  }

  const session = await auth();
  const user = session?.user;

  revalidatePath(`/profile/${user?.id}`);
  revalidatePath(`/profile/${id}/edit_product`);
  redirect(`/profile/${user?.id}`);
}

export async function createProduct(
  userId: string,
  prevState: State3,
  formData: FormData
) {
  const validatedFields = UpdateProduct.safeParse({
    product_name: formData.get("productName"),
    category: formData.get("category"),
    price: parseInt(formData.get("price") as string, 10),
    image_url: formData.get("product_image"),
    description: formData.get("description"),
    stock: parseInt(formData.get("stock") as string, 10),
    thumbnail_image_url: formData.get("product_image_small"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Invalid Fields. Failed to Create Product.",
    };
  }

  const {
    product_name,
    category,
    price,
    image_url,
    description,
    stock,
    thumbnail_image_url,
  } = validatedFields.data;

  try {
    await sql`
      INSERT INTO products (product_name, user_id, category, price, image_url, description, stock, thumbnail_image_url)
      VALUES (${product_name}, ${userId}, ${category}, ${price}, ${image_url}, ${description}, ${stock}, ${thumbnail_image_url})
    `;

    // Perform any additional logic after successfully creating the product
  } catch (error) {
    console.error("Database Error:", error);
    return { message: "Database Error: Failed to Create Product." };
  }

  const session = await auth();
  const user = session?.user;

  revalidatePath(`/profile/${user?.id}`);
  revalidatePath(`/profile/create`);
  redirect(`/profile/${user?.id}`);
}

export async function deleteProduct(id: string) {

  let productReviews;
  // Check if product has reviews
  try {
    productReviews = await sql`SELECT * FROM reviews_and_ratings WHERE product_id = ${id}`;
  } catch (error) {
    return { message: "Database Error: Failed to retrieve Reviews and Ratings."};
  }

  // Delete product's reviews and ratings
  if (productReviews.rows.length > 0) {
    try {
      await sql`DELETE FROM reviews_and_ratings WHERE product_id = ${id}`;
    } catch (error) {
      return { message: "Database Error: Failed to delete Reviews and Ratings."}
    }
  }

  // Delete product
  try {
    await sql`DELETE FROM products WHERE id = ${id}`;
    revalidatePath("/profile");
    return { message: "Deleted Invoice." };
  } catch (error) {
    return { message: "Database Error: Failed to Delete Invoice." };
  }
}

// Define the Review and Rating schema using zod
const ReviewAndRatingSchema = z.object({
  user_id: z.string(),
  product_id: z.string(),
  review: z.string().min(1, "Review is required."),
  rating: z.number().min(1, "Rating is required."),
});

const CreateReviewAndRating = ReviewAndRatingSchema.omit({ user_id: true });

export type State4 = {
  errors?: {
    product_id?: string[];
    review?: string[];
    rating?: string[];
  };
  message?: string | null;
};


export async function createReviewAndRating(prevState: State4, formData: FormData) {
  const validatedFields = CreateReviewAndRating.safeParse({
    product_id: formData.get("product_id"),
    review: formData.get("review"),
    rating: Number(formData.get("rating")),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Invalid Fields. Failed to Create Review and Rating.",
    };
  }

  const { product_id, review, rating } = validatedFields.data;

  const session = await auth();

  const user_id = session?.user?.id;

  // Check if user has already left review for this product
  let existingReview;
  try {
    existingReview = await sql`SELECT * FROM reviews_and_ratings WHERE product_id = ${product_id} AND user_id = ${user_id}`;
  } catch (error) {
    return { message: "Database Error: Already submitted a review." };
  }

  if (existingReview.rows.length > 0) {
    return {
      errors: { review: ["Review from this user for this product already exists."] },
      message: "Review already exists. Failed to Create Review and Rating.",
    };
  }

  try {
    await sql`
      INSERT INTO reviews_and_ratings (user_id, product_id, review, rating)
      VALUES (${user_id}, ${product_id}, ${review}, ${rating})
    `;
  } catch (error) {
    return { message: "Database Error: Failed to Create Review and Rating." };
  }

  revalidatePath(`/product/${product_id}`);
  redirect(`/product/${product_id}`);
  
}