-- Drop tables if they exist
DROP TABLE IF EXISTS reviews_and_ratings;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS users;

-- Create users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    profile_image VARCHAR(255) DEFAULT NULL,
    user_story TEXT DEFAULT NULL
);

-- Create products table
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    product_name TEXT NOT NULL,
    category TEXT NOT NULL,
    price INTEGER NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    stock INTEGER NOT NULL
);

-- Create reviews_and_ratings table
CREATE TABLE reviews_and_ratings (
    user_id INTEGER REFERENCES users(id),
    product_id INTEGER REFERENCES products(id),
    review TEXT NOT NULL,
    rating INTEGER CHECK (rating >= 0 AND rating <= 5) NOT NULL,
    PRIMARY KEY (user_id, product_id)
);

-- Insert data into users table
INSERT INTO users (name, email, password, profile_image, user_story) VALUES
('Alice Smith', 'alice@example.com', 'password123', NULL, NULL),
('Bob Johnson', 'bob@example.com', 'password456', 'bob_profile.jpg', 'I love hiking and outdoor adventures.'),
('Carol Williams', 'carol@example.com', 'password789', NULL, 'Passionate about cooking and baking.');

-- Insert data into products table
INSERT INTO products (user_id, product_name, category, price, image_url, description, stock) VALUES
(1, 'Hiking Backpack', 'Outdoor', 120, 'backpack.jpg', 'A durable backpack suitable for long hikes.', 50),
(2, 'Cooking Pot', 'Kitchen', 45, 'pot.jpg', 'A versatile cooking pot for all your culinary needs.', 200),
(3, 'Baking Set', 'Kitchen', 75, 'baking_set.jpg', 'Complete set of baking tools and accessories.', 150);

-- Insert data into reviews_and_ratings table
INSERT INTO reviews_and_ratings (user_id, product_id, review, rating) VALUES
(1, 2, 'Great pot for everyday use!', 5),
(2, 1, 'Perfect backpack for hiking trips.', 4),
(3, 3, 'Excellent set for baking enthusiasts.', 5);
