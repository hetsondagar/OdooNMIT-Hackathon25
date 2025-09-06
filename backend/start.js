/**
 * EcoFinds Backend Startup Script
 * This script helps you get started quickly
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 EcoFinds Backend Setup');
console.log('========================');
console.log('');

// Check if .env file exists
const envPath = path.join(__dirname, '.env');
if (!fs.existsSync(envPath)) {
  console.log('⚠️  No .env file found!');
  console.log('');
  console.log('📝 Creating .env file with default values...');
  
  const envContent = `# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_NAME=ecofinds_db
DB_USER=root
DB_PASSWORD=

# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Secret (Change this in production!)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# CORS Configuration
FRONTEND_URL=http://localhost:8080

# File Upload Configuration
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads`;

  fs.writeFileSync(envPath, envContent);
  console.log('✅ .env file created successfully!');
  console.log('');
  console.log('🔧 Please update the database credentials in .env if needed');
  console.log('');
} else {
  console.log('✅ .env file found');
}

console.log('📋 Prerequisites Checklist:');
console.log('   □ MySQL is running (XAMPP or standalone)');
console.log('   □ Node.js is installed');
console.log('   □ Dependencies are installed (npm install)');
console.log('');

console.log('🎯 To start the server:');
console.log('   npm start');
console.log('');

console.log('🔍 To start with auto-restart (development):');
console.log('   npm run dev');
console.log('');

console.log('📚 For more information, see README.md');
console.log('');

// Start the server
require('./server.js');
