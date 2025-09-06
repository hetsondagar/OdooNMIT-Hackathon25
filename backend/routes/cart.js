/**
 * Cart Routes
 * Handles shopping cart operations
 */

const express = require('express');
const { body, validationResult } = require('express-validator');
const { CartItem, Product, User } = require('../models');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/cart
// @desc    Get user's cart items
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const cartItems = await CartItem.findAll({
      where: { userId: req.userId },
      include: [
        {
          model: Product,
          as: 'product',
          include: [
            {
              model: User,
              as: 'seller',
              attributes: ['id', 'username', 'firstName', 'lastName', 'avatar']
            }
          ]
        }
      ],
      order: [['addedAt', 'DESC']]
    });

    res.json({
      success: true,
      data: { cartItems }
    });
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/cart
// @desc    Add item to cart
// @access  Private
router.post('/', [
  auth,
  body('productId').isUUID(),
  body('quantity').optional().isInt({ min: 1 })
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

    const { productId, quantity = 1 } = req.body;

    // Check if product exists and is available
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    if (!product.isAvailable) {
      return res.status(400).json({
        success: false,
        message: 'Product is no longer available'
      });
    }

    // Check if user is trying to add their own product
    if (product.sellerId === req.userId) {
      return res.status(400).json({
        success: false,
        message: 'Cannot add your own product to cart'
      });
    }

    // Check if item already exists in cart
    const existingItem = await CartItem.findOne({
      where: { userId: req.userId, productId }
    });

    if (existingItem) {
      // Update quantity
      await existingItem.update({ 
        quantity: existingItem.quantity + quantity 
      });
    } else {
      // Create new cart item
      await CartItem.create({
        userId: req.userId,
        productId,
        quantity
      });
    }

    // Return updated cart
    const cartItems = await CartItem.findAll({
      where: { userId: req.userId },
      include: [
        {
          model: Product,
          as: 'product',
          include: [
            {
              model: User,
              as: 'seller',
              attributes: ['id', 'username', 'firstName', 'lastName', 'avatar']
            }
          ]
        }
      ],
      order: [['addedAt', 'DESC']]
    });

    res.json({
      success: true,
      message: 'Item added to cart successfully',
      data: { cartItems }
    });
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/cart/:id
// @desc    Update cart item quantity
// @access  Private
router.put('/:id', [
  auth,
  body('quantity').isInt({ min: 1 })
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

    const { quantity } = req.body;

    const cartItem = await CartItem.findOne({
      where: { id: req.params.id, userId: req.userId }
    });

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: 'Cart item not found'
      });
    }

    await cartItem.update({ quantity });

    res.json({
      success: true,
      message: 'Cart item updated successfully',
      data: { cartItem }
    });
  } catch (error) {
    console.error('Update cart item error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   DELETE /api/cart/:id
// @desc    Remove item from cart
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const cartItem = await CartItem.findOne({
      where: { id: req.params.id, userId: req.userId }
    });

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: 'Cart item not found'
      });
    }

    await cartItem.destroy();

    res.json({
      success: true,
      message: 'Item removed from cart successfully'
    });
  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   DELETE /api/cart
// @desc    Clear entire cart
// @access  Private
router.delete('/', auth, async (req, res) => {
  try {
    await CartItem.destroy({
      where: { userId: req.userId }
    });

    res.json({
      success: true,
      message: 'Cart cleared successfully'
    });
  } catch (error) {
    console.error('Clear cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;
