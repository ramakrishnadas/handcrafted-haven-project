import { revalidatePath } from 'next/cache';
import { User, Product, Category } from './definitions';
import { sql } from '@vercel/postgres';


export async function fetchFilteredUserDetails(
    userId: string,
  ) {
  
    try {
      // await sql`
      // UPDATE users SET profile_image='carol_profile.jpg' 
      // WHERE id=${userId}`;

      // console.log(updateImage);

      // const commit = await sql`
      // commit`;

      // console.log(commit);

      const userDetails = await sql<User>`
        SELECT
          users.id,
          users.name,
          users.email,
          users.password,
          users.profile_image,
          users.user_story
        FROM users
        WHERE
          users.id=${userId}
      `;

      
  
      return userDetails.rows[0];
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch user details.');
    }
}

export async function fetchFilteredProductsByUser(
  userId: string,
) {
  try {

    const data = await sql<Product>`
      SELECT products.id, products.user_id, products.product_name, products.category, products.price, products.image_url, products.description, products.stock, products.thumbnail_image_url
      FROM users
      JOIN products ON users.id = products.user_id
      WHERE 
      users.id=${userId}
      ORDER BY products.id`;

    //const latestInvoices = data.rows.map((invoice) => ({
      //...invoice,
      // amount: formatCurrency(invoice.amount),
    // }));
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the products by user.');
  }
}

export async function fetchFilteredProductDetails(
  productId: string,
) {

  try {
    // await sql`
    // UPDATE users SET profile_image='carol_profile.jpg' 
    // WHERE id=${userId}`;

    // console.log(updateImage);

    // const commit = await sql`
    // commit`;

    // console.log(commit);

    const productDetails = await sql<Product>`
      SELECT
        id,
        user_id,
        product_name,
        category,
        price,
        image_url,
        description,
        stock,
        thumbnail_image_url
      FROM products
      WHERE
        products.id=${productId}
    `;

    return productDetails.rows[0];
    
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch products details.');
  }
}

export async function UpdateUserDetails(
  userId: string,
) {

  try {
    await sql`
    UPDATE users SET profile_image='carol_profile.jpg' 
    WHERE id=${userId}`;

  } catch (error) {
    console.error('Error updating or fetching user details:', error);
      throw error; // Propagate the error to the caller
  }
}

export async function getProducts() {
  try {
    const data = await sql<Product>`
      SELECT *
      FROM products
    `;
    const products = data.rows;
    return products;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all products.');
  }
}

export async function getCategories() {
  try {
    const data = await sql<Category>`
      SELECT DISTINCT category
      FROM products
    `;
    const categories = data.rows;
    return categories;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all categories.');
  }
}

export async function getFilteredProducts(
  query: string,
) {
  try {
    const products = await sql<Product>`
      SELECT *
      FROM products
      WHERE
        product_name ILIKE ${`%${query}%`} OR
        description ILIKE ${`%${query}%`} OR
        category ILIKE ${`%${query}%`}
    `;

    return products.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch products.');
  }
}

export async function getProductById(id: string) {
  try {
    const products = await sql<Product>`
      SELECT *
      FROM products
      WHERE
        id = ${id}
    `;

    return products.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch products.');
  }
}