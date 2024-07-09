const { db } = require('@vercel/postgres');
const {
  users,
  products,
  reviews_and_ratings
} = require('../lib/placeholder-data.js');
const bcrypt = require('bcrypt');

async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        profile_image VARCHAR(255) DEFAULT NULL,
        user_story TEXT DEFAULT NULL
      );
    `;

    console.log(`Created "users" table`);

    // Insert data into the "users" table
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
        INSERT INTO users (id, name, email, password, profile_image, user_story)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword}, ${user.profile_image}, ${user.user_story})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedUsers.length} users`);

    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

async function seedProducts(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "invoices" table if it doesn't exist
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS products (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id),
    product_name TEXT NOT NULL,
    category TEXT NOT NULL,
    price INTEGER NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    stock INTEGER NOT NULL
  );
`;

    console.log(`Created "products" table`);

    // Insert data into the "products" table
    const insertedProducts = await Promise.all(
      products.map(
        (product) => client.sql`
        INSERT INTO products (id, user_id, product_name, category, price, image_url, description, stock)
        VALUES (${product.id}, ${product.user_id}, ${product.product_name}, ${product.category}, ${product.price}, ${product.image_url}, ${product.description}, ${product.stock})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedProducts.length} products`);

    return {
      createTable,
      products: insertedProducts,
    };
  } catch (error) {
    console.error('Error seeding products:', error);
    throw error;
  }
}

async function seedReviewsAndRatings(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "reviews_and_ratings" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS reviews_and_ratings (
        user_id UUID NOT NULL REFERENCES users(id),
        product_id UUID NOT NULL REFERENCES products(id),
        review TEXT NOT NULL,
        rating INTEGER CHECK (rating >= 0 AND rating <= 5) NOT NULL,
        PRIMARY KEY (user_id, product_id)
      );
    `;

    console.log(`Created "reviews_and_ratings" table`);

    // Insert data into the "reviews_and_ratings" table
    const insertedReviewsAndRatings = await Promise.all(
      reviews_and_ratings.map(
        (review_and_rating) => client.sql`
        INSERT INTO reviews_and_ratings (user_id, product_id, review, rating)
        VALUES (${review_and_rating.user_id}, ${review_and_rating.product_id}, ${review_and_rating.review}, ${review_and_rating.rating})
        ON CONFLICT (user_id, product_id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedReviewsAndRatings.length} reviews and ratings`);

    return {
      createTable,
      reviews_and_ratings: insertedReviewsAndRatings,
    };
  } catch (error) {
    console.error('Error seeding reviews and ratings:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedUsers(client);
  await seedProducts(client);
  await seedReviewsAndRatings(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
