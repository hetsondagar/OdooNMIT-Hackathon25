const { User } = require('./models');

const testUser = async () => {
  try {
    console.log(' Testing user lookup...');
    
    const user = await User.findByEmail('demo@ecofinds.com');
    console.log('User found:', user ? 'Yes' : 'No');
    
    if (user) {
      console.log('User email:', user.email);
      console.log('User password length:', user.password.length);
      console.log('User isActive:', user.isActive);
    }
    
    process.exit(0);
  } catch (error) {
    console.error(' Error:', error);
    process.exit(1);
  }
};

testUser();
