
/**
 * Database Seed Data
 * Populates the database with initial data for development and testing
 */

const { 
  User, 
  Product, 
  Badge, 
  CommunityGroup, 
  CommunityPost,
  CarbonData
} = require('../models');

const seedDatabase = async () => {
  try {
    console.log('🌱 Seeding database with initial data...');

    // Check if data already exists
    const userCount = await User.count();
    if (userCount > 0) {
      console.log('✅ Database already has data, skipping seed');
      return;
    }

    // Create sample users
    const users = await User.bulkCreate([
      {
        email: 'demo@ecofinds.com',
        password: 'password123',
        username: 'EcoWarrior',
        firstName: 'John',
        lastName: 'Doe',
        phone: '+1234567890',
        address: '123 Green Street, Eco City',
        avatar: '/placeholder.svg'
      },
      {
        email: 'sarah@ecofinds.com',
        password: 'password123',
        username: 'GreenThumb',
        firstName: 'Sarah',
        lastName: 'Smith',
        phone: '+1234567891',
        address: '456 Sustainable Lane, Green Valley',
        avatar: '/placeholder.svg'
      },
      {
        email: 'mike@ecofinds.com',
        password: 'password123',
        username: 'EcoMike',
        firstName: 'Mike',
        lastName: 'Johnson',
        phone: '+1234567892',
        address: '789 Eco Drive, Nature Town',
        avatar: '/placeholder.svg'
      }
    ]);

    console.log(`✅ Created ${users.length} users`);

    // Create sample products
    const products = await Product.bulkCreate([
      {
        title: 'Vintage Wooden Chair',
        description: 'Beautiful vintage wooden chair in excellent condition. Perfect for any eco-friendly home. Made from reclaimed oak wood.',
        category: 'Furniture',
        price: 45.99,
        imageUrl: '/placeholder.svg',
        sellerId: users[0].id,
        condition: 'Excellent',
        location: 'Eco City',
        carbonFootprint: 8.5,
        tags: ['vintage', 'wooden', 'furniture', 'sustainable']
      },
      {
        title: 'Organic Cotton T-Shirt',
        description: 'Soft, comfortable organic cotton t-shirt. Size M, barely worn. Made from 100% organic cotton.',
        category: 'Clothing',
        price: 12.50,
        imageUrl: '/placeholder.svg',
        sellerId: users[0].id,
        condition: 'Like New',
        location: 'Eco City',
        carbonFootprint: 2.3,
        tags: ['organic', 'cotton', 'clothing', 'sustainable']
      },
      {
        title: 'Sustainable Living Book',
        description: 'Complete guide to sustainable living practices. Great condition. Covers zero-waste lifestyle, renewable energy, and more.',
        category: 'Books',
        price: 8.99,
        imageUrl: '/placeholder.svg',
        sellerId: users[1].id,
        condition: 'Very Good',
        location: 'Green Valley',
        carbonFootprint: 1.2,
        tags: ['books', 'sustainability', 'education', 'eco-friendly']
      },
      {
        title: 'Bamboo Kitchen Set',
        description: 'Complete bamboo kitchen utensil set. Includes spoons, spatulas, and tongs. All natural and biodegradable.',
        category: 'Home & Garden',
        price: 24.99,
        imageUrl: '/placeholder.svg',
        sellerId: users[1].id,
        condition: 'Excellent',
        location: 'Green Valley',
        carbonFootprint: 3.7,
        tags: ['bamboo', 'kitchen', 'utensils', 'biodegradable']
      },
      {
        title: 'Solar-Powered Phone Charger',
        description: 'Portable solar phone charger. Perfect for outdoor adventures. Charges most smartphones and tablets.',
        category: 'Electronics',
        price: 35.00,
        imageUrl: '/placeholder.svg',
        sellerId: users[2].id,
        condition: 'Good',
        location: 'Nature Town',
        carbonFootprint: 5.2,
        tags: ['solar', 'electronics', 'charger', 'renewable']
      },
      {
        title: 'Recycled Glass Vase',
        description: 'Beautiful handcrafted vase made from recycled glass. Unique design and perfect for flowers or decoration.',
        category: 'Home & Garden',
        price: 18.75,
        imageUrl: '/placeholder.svg',
        sellerId: users[2].id,
        condition: 'Very Good',
        location: 'Nature Town',
        carbonFootprint: 2.8,
        tags: ['recycled', 'glass', 'vase', 'handcrafted']
      }
    ]);

    console.log(`✅ Created ${products.length} products`);

    // Create badges
    const badges = await Badge.bulkCreate([
      {
        id: 'first-purchase',
        title: 'First Steps',
        description: 'Made your first eco-friendly purchase',
        icon: 'Leaf',
        level: 'bronze',
        category: 'purchases',
        points: 10,
        maxProgress: 1,
        requirements: { type: 'purchase_count', target: 1 }
      },
      {
        id: 'eco-shopper',
        title: 'Eco Shopper',
        description: 'Made 5 sustainable purchases',
        icon: 'ShoppingBag',
        level: 'silver',
        category: 'purchases',
        points: 50,
        maxProgress: 5,
        requirements: { type: 'purchase_count', target: 5 }
      },
      {
        id: 'sustainability-champion',
        title: 'Sustainability Champion',
        description: 'Made 25 eco-friendly purchases',
        icon: 'Trophy',
        level: 'gold',
        category: 'purchases',
        points: 250,
        maxProgress: 25,
        requirements: { type: 'purchase_count', target: 25 }
      },
      {
        id: 'carbon-saver',
        title: 'Carbon Saver',
        description: 'Saved 10kg of CO₂ emissions',
        icon: 'Recycle',
        level: 'bronze',
        category: 'impact',
        points: 25,
        maxProgress: 10,
        requirements: { type: 'carbon_saved', target: 10 }
      },
      {
        id: 'climate-warrior',
        title: 'Climate Warrior',
        description: 'Saved 50kg of CO₂ emissions',
        icon: 'Zap',
        level: 'silver',
        category: 'impact',
        points: 100,
        maxProgress: 50,
        requirements: { type: 'carbon_saved', target: 50 }
      },
      {
        id: 'planet-protector',
        title: 'Planet Protector',
        description: 'Saved 100kg of CO₂ emissions',
        icon: 'Star',
        level: 'platinum',
        category: 'impact',
        points: 500,
        maxProgress: 100,
        requirements: { type: 'carbon_saved', target: 100 }
      },
      {
        id: 'community-member',
        title: 'Community Member',
        description: 'Joined the EcoFinds community',
        icon: 'Users',
        level: 'bronze',
        category: 'community',
        points: 5,
        maxProgress: 1,
        requirements: { type: 'community_join', target: 1 }
      },
      {
        id: 'social-advocate',
        title: 'Social Advocate',
        description: 'Shared your impact 5 times',
        icon: 'Share2',
        level: 'silver',
        category: 'social',
        points: 75,
        maxProgress: 5,
        requirements: { type: 'social_shares', target: 5 }
      }
    ]);

    console.log(`✅ Created ${badges.length} badges`);

    // Create community groups
    const groups = await CommunityGroup.bulkCreate([
      {
        name: 'EcoFinds Community',
        description: 'The main community for all EcoFinds users. Share your sustainable finds, tips, and connect with like-minded individuals.',
        category: 'General',
        location: 'Global',
        memberCount: 150,
        isPublic: true,
        tags: ['sustainability', 'community', 'eco-friendly'],
        createdBy: users[0].id
      },
      {
        name: 'Vintage & Upcycled Finds',
        description: 'Share your vintage discoveries and upcycling projects. Perfect for those who love giving old items new life.',
        category: 'Vintage',
        location: 'Global',
        memberCount: 75,
        isPublic: true,
        tags: ['vintage', 'upcycling', 'repurposing'],
        createdBy: users[1].id
      },
      {
        name: 'Zero Waste Warriors',
        description: 'Connect with others committed to reducing waste. Share tips, challenges, and celebrate your zero-waste victories.',
        category: 'Zero Waste',
        location: 'Global',
        memberCount: 60,
        isPublic: true,
        tags: ['zero-waste', 'reduction', 'minimalism'],
        createdBy: users[2].id
      }
    ]);

    console.log(`✅ Created ${groups.length} community groups`);

    // Create sample community posts
    const posts = await CommunityPost.bulkCreate([
      {
        groupId: groups[0].id,
        authorId: users[0].id,
        content: 'Just found this amazing vintage wooden chair on EcoFinds! It\'s perfect for my reading nook. Love how we can give old furniture new life! 🌱',
        tags: ['vintage', 'furniture', 'sustainable']
      },
      {
        groupId: groups[1].id,
        authorId: users[1].id,
        content: 'Check out my latest upcycling project! Turned an old ladder into a beautiful plant stand. What do you think? 🌿',
        tags: ['upcycling', 'plants', 'diy']
      },
      {
        groupId: groups[2].id,
        authorId: users[2].id,
        content: '30 days of zero waste challenge complete! Here are my top 5 tips for anyone starting their zero-waste journey...',
        tags: ['zero-waste', 'tips', 'challenge']
      }
    ]);

    console.log(`✅ Created ${posts.length} community posts`);

    // Create carbon data for users
    const carbonData = await CarbonData.bulkCreate([
      {
        userId: users[0].id,
        totalSaved: 15.5,
        monthlyGoal: 50,
        weeklySaved: 3.9,
        itemsRecycled: 2,
        treesEquivalent: 1,
        energySaved: 8
      },
      {
        userId: users[1].id,
        totalSaved: 8.2,
        monthlyGoal: 50,
        weeklySaved: 2.1,
        itemsRecycled: 1,
        treesEquivalent: 0,
        energySaved: 4
      },
      {
        userId: users[2].id,
        totalSaved: 12.3,
        monthlyGoal: 50,
        weeklySaved: 3.1,
        itemsRecycled: 2,
        treesEquivalent: 1,
        energySaved: 6
      }
    ]);

    console.log(`✅ Created ${carbonData.length} carbon data records`);

    console.log('🎉 Database seeding completed successfully!');
    console.log('');
    console.log('📊 Summary:');
    console.log(`   👥 Users: ${users.length}`);
    console.log(`   🛍️  Products: ${products.length}`);
    console.log(`   🏆 Badges: ${badges.length}`);
    console.log(`   👥 Community Groups: ${groups.length}`);
    console.log(`   📝 Community Posts: ${posts.length}`);
    console.log(`   🌱 Carbon Data: ${carbonData.length}`);
    console.log('');
    console.log('🔑 Demo Login Credentials:');
    console.log('   Email: demo@ecofinds.com');
    console.log('   Password: password123');
    console.log('');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
};

module.exports = seedDatabase;
