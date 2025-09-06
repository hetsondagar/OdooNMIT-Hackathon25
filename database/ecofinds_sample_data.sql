-- EcoFinds Sample Data
-- Inserting realistic sample data for all tables

-- Insert Categories
INSERT INTO categories (name, description, icon, parent_id) VALUES
('Electronics', 'Electronic devices and gadgets', 'smartphone', NULL),
('Computers & Laptops', 'Computers, laptops, and accessories', 'laptop', 1),
('Mobile Phones', 'Smartphones and mobile accessories', 'smartphone', 1),
('Audio & Video', 'Speakers, headphones, cameras', 'headphones', 1),
('Clothing', 'Fashion and apparel', 'shirt', NULL),
('Men\'s Clothing', 'Men\'s fashion and accessories', 'user', 5),
('Women\'s Clothing', 'Women\'s fashion and accessories', 'user', 5),
('Kids\' Clothing', 'Children\'s clothing and accessories', 'baby', 5),
('Furniture', 'Home and office furniture', 'home', NULL),
('Living Room', 'Sofas, chairs, tables', 'sofa', 9),
('Bedroom', 'Beds, dressers, nightstands', 'bed', 9),
('Office', 'Desks, chairs, storage', 'briefcase', 9),
('Books', 'Books and educational materials', 'book', NULL),
('Fiction', 'Novels and fiction books', 'book-open', 13),
('Non-Fiction', 'Educational and reference books', 'book-open', 13),
('Sports & Fitness', 'Sports equipment and fitness gear', 'dumbbell', NULL),
('Home & Garden', 'Home improvement and gardening', 'home', NULL),
('Toys & Games', 'Children\'s toys and games', 'gamepad', NULL),
('Beauty & Health', 'Beauty products and health items', 'heart', NULL),
('Automotive', 'Car parts and accessories', 'car', NULL);

-- Insert Users
INSERT INTO users (email, password_hash, username, first_name, last_name, phone, address, avatar_url, trust_score, eco_points, is_verified) VALUES
('john.doe@ecofinds.com', '$2b$10$example_hash_1', 'EcoWarrior', 'John', 'Doe', '+1234567890', '123 Green Street, Eco City, EC 12345', '/avatars/john.jpg', 4.8, 1250, TRUE),
('sarah.wilson@ecofinds.com', '$2b$10$example_hash_2', 'GreenSarah', 'Sarah', 'Wilson', '+1234567891', '456 Sustainable Ave, Green Valley, GV 54321', '/avatars/sarah.jpg', 4.9, 2100, TRUE),
('mike.chen@ecofinds.com', '$2b$10$example_hash_3', 'EcoMike', 'Mike', 'Chen', '+1234567892', '789 Eco Lane, Nature Town, NT 67890', '/avatars/mike.jpg', 4.7, 980, TRUE),
('lisa.garcia@ecofinds.com', '$2b$10$example_hash_4', 'LisaGreen', 'Lisa', 'Garcia', '+1234567893', '321 Earth Street, Eco Village, EV 13579', '/avatars/lisa.jpg', 4.6, 750, FALSE),
('david.brown@ecofinds.com', '$2b$10$example_hash_5', 'EcoDavid', 'David', 'Brown', '+1234567894', '654 Green Road, Sustainable City, SC 24680', '/avatars/david.jpg', 4.5, 1100, TRUE),
('emma.jones@ecofinds.com', '$2b$10$example_hash_6', 'EmmaEco', 'Emma', 'Jones', '+1234567895', '987 Nature Blvd, Eco Heights, EH 97531', '/avatars/emma.jpg', 4.8, 1650, TRUE),
('alex.kumar@ecofinds.com', '$2b$10$example_hash_7', 'AlexGreen', 'Alex', 'Kumar', '+1234567896', '147 Eco Way, Green Springs, GS 86420', '/avatars/alex.jpg', 4.4, 890, FALSE),
('sophie.martin@ecofinds.com', '$2b$10$example_hash_8', 'SophieEco', 'Sophie', 'Martin', '+1234567897', '258 Sustainable St, Eco Gardens, EG 75319', '/avatars/sophie.jpg', 4.7, 1420, TRUE);

-- Insert Products
INSERT INTO products (title, description, category_id, seller_id, price, condition_rating, eco_friendly_score, carbon_footprint_saved, location) VALUES
-- Electronics/Computers
('MacBook Pro 13" (2020)', 'Excellent condition MacBook Pro with M1 chip. Barely used, comes with original charger and box. Perfect for students or professionals.', 2, 1, 899.99, 'excellent', 85, 12.5, 'Eco City, EC'),
('Dell XPS 15 Laptop', 'High-performance Dell XPS 15 with Intel i7, 16GB RAM, 512GB SSD. Great for gaming and professional work. Minor scratches on lid.', 2, 2, 749.99, 'good', 78, 10.2, 'Green Valley, GV'),
('iPhone 12 Pro', 'iPhone 12 Pro in Space Gray, 128GB. Excellent condition, battery health 95%. Includes original charger and case.', 3, 3, 599.99, 'excellent', 82, 8.7, 'Nature Town, NT'),
('Samsung Galaxy S21', 'Samsung Galaxy S21 in Phantom Black, 256GB. Good condition with minor wear. Includes charger and screen protector.', 3, 4, 449.99, 'good', 79, 7.3, 'Eco Village, EV'),
('Sony WH-1000XM4 Headphones', 'Premium noise-canceling headphones. Excellent condition, includes original case and charging cable.', 4, 5, 199.99, 'excellent', 88, 5.1, 'Sustainable City, SC'),

-- Clothing
('Nike Air Max 270', 'Men\'s Nike Air Max 270 in black/white. Size 10, worn only a few times. Excellent condition.', 6, 6, 89.99, 'excellent', 72, 3.2, 'Eco Heights, EH'),
('Levi\'s 501 Jeans', 'Classic Levi\'s 501 jeans in dark blue. Size 32x32, minimal wear. Sustainable denim.', 6, 1, 45.99, 'good', 85, 2.8, 'Eco City, EC'),
('Zara Blazer', 'Women\'s professional blazer in navy blue. Size M, excellent condition. Perfect for office wear.', 7, 2, 39.99, 'excellent', 76, 2.1, 'Green Valley, GV'),
('H&M Summer Dress', 'Floral summer dress, size S. Light wear, perfect for casual outings. Sustainable cotton blend.', 7, 3, 24.99, 'good', 82, 1.5, 'Nature Town, NT'),
('Adidas Kids Sneakers', 'Children\'s Adidas sneakers in white/blue. Size 6, good condition. Barely worn.', 8, 4, 29.99, 'good', 79, 1.8, 'Eco Village, EV'),

-- Furniture
('IKEA Hemnes Dresser', 'White Hemnes dresser with 6 drawers. Excellent condition, no scratches. Easy assembly.', 11, 5, 149.99, 'excellent', 90, 15.2, 'Sustainable City, SC'),
('West Elm Sofa', 'Modern 3-seater sofa in gray fabric. Good condition, minor wear on cushions. Very comfortable.', 10, 6, 299.99, 'good', 85, 22.7, 'Eco Heights, EH'),
('Herman Miller Office Chair', 'Ergonomic office chair in black. Excellent condition, adjustable height and lumbar support.', 12, 1, 199.99, 'excellent', 88, 18.5, 'Eco City, EC'),

-- Books
('The Sustainable Living Guide', 'Complete guide to sustainable living practices. Hardcover, excellent condition.', 15, 2, 18.99, 'excellent', 95, 0.8, 'Green Valley, GV'),
('Clean Code by Robert Martin', 'Programming book in excellent condition. Perfect for software developers.', 15, 3, 24.99, 'excellent', 92, 0.6, 'Nature Town, NT'),
('The Great Gatsby', 'Classic novel in good condition. Paperback edition.', 14, 4, 8.99, 'good', 88, 0.3, 'Eco Village, EV'),

-- Sports & Fitness
('Yoga Mat Premium', 'High-quality yoga mat in purple. Excellent condition, non-slip surface.', 16, 5, 34.99, 'excellent', 87, 2.3, 'Sustainable City, SC'),
('Dumbbell Set 20lbs', 'Pair of 20lb dumbbells. Good condition, perfect for home workouts.', 16, 6, 49.99, 'good', 83, 4.1, 'Eco Heights, EH'),

-- Home & Garden
('Philips LED Smart Bulbs', 'Set of 4 smart LED bulbs, compatible with Alexa. Excellent condition.', 17, 1, 39.99, 'excellent', 92, 1.2, 'Eco City, EC'),
('Indoor Plant Collection', 'Collection of 3 indoor plants: Monstera, Snake Plant, and Pothos. All healthy and well-cared for.', 17, 2, 29.99, 'excellent', 96, 0.5, 'Green Valley, GV'),

-- Toys & Games
('LEGO Creator Set', 'LEGO Creator 3-in-1 set. Complete with instructions, excellent condition.', 18, 3, 45.99, 'excellent', 89, 1.8, 'Nature Town, NT'),
('Board Game Collection', 'Collection of 3 board games: Monopoly, Scrabble, and Chess. All complete and in good condition.', 18, 4, 35.99, 'good', 85, 2.1, 'Eco Village, EV'),

-- Beauty & Health
('Organic Skincare Set', 'Complete organic skincare routine set. Unused, still sealed.', 19, 5, 59.99, 'excellent', 94, 1.5, 'Sustainable City, SC'),
('Yoga Block Set', 'Set of 2 yoga blocks in natural cork. Excellent condition.', 19, 6, 19.99, 'excellent', 91, 0.8, 'Eco Heights, EH'),

-- Automotive
('Car Phone Mount', 'Universal car phone mount with wireless charging. Excellent condition.', 20, 1, 24.99, 'excellent', 78, 0.9, 'Eco City, EC'),
('Car Air Freshener Set', 'Set of 3 eco-friendly car air fresheners. Natural scents.', 20, 2, 12.99, 'excellent', 95, 0.3, 'Green Valley, GV');

-- Insert Product Images
INSERT INTO product_images (product_id, image_url, is_primary, alt_text) VALUES
-- MacBook Pro
(1, 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500', TRUE, 'MacBook Pro 13 inch laptop'),
(1, 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500', FALSE, 'MacBook Pro side view'),

-- Dell XPS
(2, 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500', TRUE, 'Dell XPS 15 laptop'),
(2, 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500', FALSE, 'Dell XPS keyboard'),

-- iPhone 12 Pro
(3, 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500', TRUE, 'iPhone 12 Pro Space Gray'),
(3, 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500', FALSE, 'iPhone 12 Pro camera'),

-- Samsung Galaxy S21
(4, 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500', TRUE, 'Samsung Galaxy S21'),
(4, 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500', FALSE, 'Samsung Galaxy S21 display'),

-- Sony Headphones
(5, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500', TRUE, 'Sony WH-1000XM4 Headphones'),
(5, 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500', FALSE, 'Sony headphones case'),

-- Nike Shoes
(6, 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500', TRUE, 'Nike Air Max 270'),
(6, 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=500', FALSE, 'Nike Air Max sole'),

-- Levi's Jeans
(7, 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500', TRUE, 'Levi\'s 501 Jeans'),
(7, 'https://images.unsplash.com/photo-1582418702059-97ebafb35d09?w=500', FALSE, 'Levi\'s jeans detail'),

-- Zara Blazer
(8, 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500', TRUE, 'Zara Navy Blazer'),
(8, 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500', FALSE, 'Blazer buttons detail'),

-- H&M Dress
(9, 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500', TRUE, 'H&M Summer Dress'),
(9, 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500', FALSE, 'Dress pattern detail'),

-- Adidas Kids Shoes
(10, 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500', TRUE, 'Adidas Kids Sneakers'),
(10, 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=500', FALSE, 'Kids shoes side view');

-- Insert Cart Items
INSERT INTO cart_items (user_id, product_id, quantity) VALUES
(1, 3, 1),
(1, 5, 1),
(2, 1, 1),
(3, 6, 2),
(4, 8, 1);

-- Insert Wishlist Items
INSERT INTO wishlist_items (user_id, product_id) VALUES
(1, 2),
(1, 4),
(2, 3),
(2, 6),
(3, 1),
(3, 5),
(4, 7),
(5, 8);

-- Insert Reviews
INSERT INTO reviews (product_id, reviewer_id, rating, review_text, is_verified_purchase) VALUES
(1, 2, 5, 'Excellent laptop! Fast and reliable. Seller was very responsive.', TRUE),
(1, 3, 4, 'Great condition, works perfectly. Minor cosmetic wear but doesn\'t affect performance.', TRUE),
(2, 1, 5, 'Amazing laptop for the price. Highly recommend this seller!', TRUE),
(3, 4, 4, 'Phone is in great condition. Battery life is excellent.', TRUE),
(5, 6, 5, 'Best headphones I\'ve ever owned. Noise cancellation is incredible.', TRUE),
(6, 7, 4, 'Comfortable shoes, true to size. Good condition.', TRUE),
(7, 8, 5, 'Classic jeans, perfect fit. Sustainable choice!', TRUE);

-- Insert Search History
INSERT INTO search_history (user_id, search_query, search_type, results_count) VALUES
(1, 'laptop', 'product', 2),
(1, 'smartphone', 'product', 2),
(2, 'furniture', 'category', 3),
(3, 'clothing', 'category', 5),
(4, 'books', 'category', 3),
(5, 'electronics', 'category', 5);

-- Insert AI Suggestions
INSERT INTO ai_suggestions (user_id, query_text, suggested_products, suggestion_type, confidence_score) VALUES
(1, 'I want to add a laptop product', '[1, 2]', 'add_product', 0.95),
(2, 'Looking for smart LED lights under 50000', '[21]', 'find_product', 0.88),
(3, 'Need sustainable clothing', '[7, 8, 9]', 'find_product', 0.92),
(4, 'Want to buy books', '[13, 14, 15]', 'find_product', 0.85);
