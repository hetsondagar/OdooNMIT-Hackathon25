const bcrypt = require('bcrypt');
const { User } = require('./models');

const fixUserPasswords = async () => {
  try {
    console.log(' Fixing user passwords...');
    
    const users = await User.findAll();
    
    for (const user of users) {
      // Check if password is already hashed (hashed passwords are 60 chars long)
      if (user.password.length < 60) {
        console.log(`Updating password for user: ${user.email}`);
        const hashedPassword = await bcrypt.hash(user.password, 12);
        await user.update({ password: hashedPassword });
      }
    }
    
    console.log(' User passwords fixed successfully!');
    process.exit(0);
  } catch (error) {
    console.error(' Error fixing passwords:', error);
    process.exit(1);
  }
};

fixUserPasswords();
