import { revalidatePath } from 'next/cache';
import { User, Products } from './definitions';
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
      const data = await sql<Products>`
        SELECT products.id, products.user_id, products.product_name, products.category, products.price, products.image_url, products.description, products.stock, products.thumbnail_image_url
        FROM users
        JOIN products ON users.id = products.user_id
        WHERE 
        users.id=${userId}`;
  
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

      const productDetails = await sql<Products>`
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