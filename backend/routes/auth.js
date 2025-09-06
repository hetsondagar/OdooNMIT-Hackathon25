/**
 * Authentication Routes
 * Handles user registration, login, and authentication
 */

const express = require('express');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const { User } = require('../models');
const auth = require('../middleware/auth');

const router = express.Router();

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  body('username').isLength({ min: 3, max: 100 }),
  body('firstName').optional().isLength({ max: 100 }),
  body('lastName').optional().isLength({ max: 100 }),
  body('phone').optional().isLength({ max: 20 }),
  body('address').optional().isLength({ max: 500 })
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const { email, password, username, firstName, lastName, phone, address } = req.body;

    // Check if user already exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      });
    }

    // Check if username is taken
    const existingUsername = await User.findByUsername(username);
    if (existingUsername) {
      return res.status(400).json({
        success: false,
        message: 'Username is already taken'
      });
    }

    // Create new user
    const user = await User.create({
      email,
      password,
      username,
      firstName,
      lastName,
      phone,
      address
    });

    // Generate token
    const token = generateToken(user.id);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user,
        token
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during registration'
    });
  }
});

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', [
  body('email').isEmail().normalizeEmail(),
  body('password').exists()
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const { email, password } = req.body;

    // Find user by email
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Account is deactivated'
      });
    }

    // Validate password
    const isValidPassword = await user.validatePassword(password);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Update last login
    await user.update({ lastLoginAt: new Date() });

    // Generate token
    const token = generateToken(user.id);

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user,
        token
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login'
    });
  }
});

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findByPk(req.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: { user }
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/auth/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', [
  auth,
  body('firstName').optional().isLength({ max: 100 }),
  body('lastName').optional().isLength({ max: 100 }),
  body('phone').optional().isLength({ max: 20 }),
  body('address').optional().isLength({ max: 500 }),
  body('avatar').optional().isURL()
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const user = await User.findByPk(req.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const { firstName, lastName, phone, address, avatar } = req.body;
    
    await user.update({
      firstName,
      lastName,
      phone,
      address,
      avatar
    });

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: { user }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/auth/change-password
// @desc    Change user password
// @access  Private
router.put('/change-password', [
  auth,
  body('currentPassword').exists(),
  body('newPassword').isLength({ min: 6 })
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const user = await User.findByPk(req.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const { currentPassword, newPassword } = req.body;

    // Validate current password
    const isValidPassword = await user.validatePassword(currentPassword);
    if (!isValidPassword) {
      return res.status(400).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    // Update password
    await user.update({ password: newPassword });

    res.json({
      success: true,
      message: 'Password changed successfully'
    });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;
