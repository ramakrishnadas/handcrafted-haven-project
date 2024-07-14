import { User, Products } from './definitions';
import { sql } from '@vercel/postgres';


export async function fetchFilteredUserDetails(
    userId: string,
  ) {

    console.log(userId);
  
    try {
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
  
      return userDetails.rows;
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
        SELECT products.id, products.user_id, products.product_name, products.category, products.price, products.image_url, products.description, products.stock
        FROM users
        JOIN products ON users.id = products.user_id
        WHERE 
        user.id=${`%${userId}%`}`;
  
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