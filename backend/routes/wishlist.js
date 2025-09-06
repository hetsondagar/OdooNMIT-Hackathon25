/**
 * Wishlist Routes
 * Handles wishlist operations
 */

const express = require('express');
const { body, validationResult } = require('express-validator');
const { WishlistItem, Product, User } = require('../models');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/wishlist
// @desc    Get user's wishlist
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const wishlistItems = await WishlistItem.findAll({
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
      data: { wishlistItems }
    });
  } catch (error) {
    console.error('Get wishlist error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/wishlist
// @desc    Add item to wishlist
// @access  Private
router.post('/', [
  auth,
  body('productId').isUUID(),
  body('isPriceAlert').optional().isBoolean(),
  body('targetPrice').optional().isFloat({ min: 0 })
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

    const { productId, isPriceAlert = false, targetPrice } = req.body;

    // Check if product exists
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Check if user is trying to add their own product
    if (product.sellerId === req.userId) {
      return res.status(400).json({
        success: false,
        message: 'Cannot add your own product to wishlist'
      });
    }

    // Check if item already exists in wishlist
    const existingItem = await WishlistItem.findOne({
      where: { userId: req.userId, productId }
    });

    if (existingItem) {
      return res.status(400).json({
        success: false,
        message: 'Product already in wishlist'
      });
    }

    // Create wishlist item
    const wishlistItem = await WishlistItem.create({
      userId: req.userId,
      productId,
      priceWhenAdded: product.price,
      isPriceAlert,
      targetPrice
    });

    // Return wishlist item with product details
    const wishlistItemWithProduct = await WishlistItem.findByPk(wishlistItem.id, {
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
      ]
    });

    res.status(201).json({
      success: true,
      message: 'Item added to wishlist successfully',
      data: { wishlistItem: wishlistItemWithProduct }
    });
  } catch (error) {
    console.error('Add to wishlist error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/wishlist/:id
// @desc    Update wishlist item
// @access  Private
router.put('/:id', [
  auth,
  body('isPriceAlert').optional().isBoolean(),
  body('targetPrice').optional().isFloat({ min: 0 })
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

    const { isPriceAlert, targetPrice } = req.body;

    const wishlistItem = await WishlistItem.findOne({
      where: { id: req.params.id, userId: req.userId }
    });

    if (!wishlistItem) {
      return res.status(404).json({
        success: false,
        message: 'Wishlist item not found'
      });
    }

    await wishlistItem.update({ isPriceAlert, targetPrice });

    res.json({
      success: true,
      message: 'Wishlist item updated successfully',
      data: { wishlistItem }
    });
  } catch (error) {
    console.error('Update wishlist item error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   DELETE /api/wishlist/:id
// @desc    Remove item from wishlist
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const wishlistItem = await WishlistItem.findOne({
      where: { id: req.params.id, userId: req.userId }
    });

    if (!wishlistItem) {
      return res.status(404).json({
        success: false,
        message: 'Wishlist item not found'
      });
    }

    await wishlistItem.destroy();

    res.json({
      success: true,
      message: 'Item removed from wishlist successfully'
    });
  } catch (error) {
    console.error('Remove from wishlist error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   DELETE /api/wishlist
// @desc    Clear entire wishlist
// @access  Private
router.delete('/', auth, async (req, res) => {
  try {
    await WishlistItem.destroy({
      where: { userId: req.userId }
    });

    res.json({
      success: true,
      message: 'Wishlist cleared successfully'
    });
  } catch (error) {
    console.error('Clear wishlist error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;
