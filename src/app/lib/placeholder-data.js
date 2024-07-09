const users = [
    {
      id: '00d69a19-2ad6-4f40-a14a-51628bc5b5f8',
      name: 'Alice Smith',
      email: 'alice@example.com',
      password: 'password123',
      profile_image: null,
      user_story: null
    },
    {
			id: '70f79bd9-a154-496e-a1da-528576e53897',
			name: 'Bob Johnson',
			email: 'bob@example.com',
			password: 'password456',
			profile_image: 'bob_profile.jpg',
			user_story: 'I love hiking and outdoor adventures.'
    },
		{
			id: '2fe21b44-acf6-43da-af7c-06cc1f109b51',
			name: 'Carol Williams',
			email: 'carol@example.com',
			password: 'password789',
			profile_image: null,
			user_story: 'Passionate about cooking and baking.'
		}
  ];
  
const products = [
	{
		id: 'cac9cdf7-b6d5-407d-99b3-f93ef4eef2e3',
		user_id: users[0].id,
		product_name: 'Hiking Backpack',
		category: 'Outdoor',
		price: 120,
		image_url: 'backpack.jpg',
		description: 'A durable backpack suitable for long hikes.',
		stock: 50
	},
	{
		id: '5806c5d5-23e6-44c5-931b-9bb191f7fb01',
		user_id: users[1].id,
		product_name: 'Cooking Pot',
		category: 'Kitchen',
		price: 45,
		image_url: 'pot.jpg',
		description: 'A versatile cooking pot for all your culinary needs.',
		stock: 200
	},
	{
		id: '0b33146c-9d15-41e2-aec0-928078d56254',
		user_id: users[2].id,
		product_name: 'Baking Set',
		category: 'Kitchen',
		price: 75,
		image_url: 'baking_set.jpg',
		description: 'Complete set of baking tools and accessories.',
		stock: 150
	}
];
  
const reviews_and_ratings = [
	{
		user_id: users[0].id,
		product_id: products[1].id,
		review: 'Great pot for everyday use!',
		rating: 5
	},
	{
		user_id: users[1].id,
		product_id: products[0].id,
		review: 'Perfect backpack for hiking trips.',
		rating: 4
	},
	{
		user_id: users[2].id,
		product_id: products[2].id,
		review: 'Excellent set for baking enthusiasts.',
		rating: 5
	}
];
  
module.exports = {
	users,
	products,
	reviews_and_ratings
};
