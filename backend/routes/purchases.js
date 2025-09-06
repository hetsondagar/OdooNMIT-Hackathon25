/**
 * Purchases Routes
 * Handles purchase operations
 */

const express = require('express');
const { body, validationResult } = require('express-validator');
const { Purchase, Product, User, CartItem } = require('../models');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/purchases
// @desc    Get user's purchase history
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const purchases = await Purchase.findAll({
      where: { buyerId: req.userId },
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
        },
        {
          model: User,
          as: 'seller',
          attributes: ['id', 'username', 'firstName', 'lastName', 'avatar']
        }
      ],
      order: [['purchaseDate', 'DESC']]
    });

    res.json({
      success: true,
      data: { purchases }
    });
  } catch (error) {
    console.error('Get purchases error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/purchases
// @desc    Create a new purchase
// @access  Private
router.post('/', [
  auth,
  body('productId').isUUID(),
  body('quantity').optional().isInt({ min: 1 }),
  body('paymentMethod').optional().isString()
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

    const { productId, quantity = 1, paymentMethod } = req.body;

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

    // Check if user is trying to buy their own product
    if (product.sellerId === req.userId) {
      return res.status(400).json({
        success: false,
        message: 'Cannot purchase your own product'
      });
    }

    // Calculate total amount
    const totalAmount = product.price * quantity;

    // Create purchase
    const purchase = await Purchase.create({
      productId,
      buyerId: req.userId,
      sellerId: product.sellerId,
      quantity,
      totalAmount,
      paymentMethod,
      carbonSaved: product.carbonFootprint ? product.carbonFootprint * quantity : null
    });

    // Mark product as unavailable
    await product.update({ isAvailable: false });

    // Remove from cart if exists
    await CartItem.destroy({
      where: { userId: req.userId, productId }
    });

    // Return purchase with related data
    const purchaseWithDetails = await Purchase.findByPk(purchase.id, {
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
        },
        {
          model: User,
          as: 'seller',
          attributes: ['id', 'username', 'firstName', 'lastName', 'avatar']
        }
      ]
    });

    res.status(201).json({
      success: true,
      message: 'Purchase completed successfully',
      data: { purchase: purchaseWithDetails }
    });
  } catch (error) {
    console.error('Create purchase error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/purchases/sales
// @desc    Get user's sales history
// @access  Private
router.get('/sales', auth, async (req, res) => {
  try {
    const sales = await Purchase.findAll({
      where: { sellerId: req.userId },
      include: [
        {
          model: Product,
          as: 'product'
        },
        {
          model: User,
          as: 'buyer',
          attributes: ['id', 'username', 'firstName', 'lastName', 'avatar']
        }
      ],
      order: [['purchaseDate', 'DESC']]
    });

    res.json({
      success: true,
      data: { sales }
    });
  } catch (error) {
    console.error('Get sales error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/purchases/:id
// @desc    Get single purchase by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const purchase = await Purchase.findByPk(req.params.id, {
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
        },
        {
          model: User,
          as: 'buyer',
          attributes: ['id', 'username', 'firstName', 'lastName', 'avatar']
        },
        {
          model: User,
          as: 'seller',
          attributes: ['id', 'username', 'firstName', 'lastName', 'avatar']
        }
      ]
    });

    if (!purchase) {
      return res.status(404).json({
        success: false,
        message: 'Purchase not found'
      });
    }

    // Check if user is buyer or seller
    if (purchase.buyerId !== req.userId && purchase.sellerId !== req.userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this purchase'
      });
    }

    res.json({
      success: true,
      data: { purchase }
    });
  } catch (error) {
    console.error('Get purchase error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;
