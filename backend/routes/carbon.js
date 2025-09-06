/**
 * Carbon Data Routes
 * Handles carbon footprint tracking
 */

const express = require('express');
const { body, validationResult } = require('express-validator');
const { CarbonData, User, Purchase } = require('../models');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/carbon
// @desc    Get user's carbon data
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    let carbonData = await CarbonData.findOne({
      where: { userId: req.userId }
    });

    // If no carbon data exists, create it
    if (!carbonData) {
      carbonData = await CarbonData.create({
        userId: req.userId,
        totalSaved: 0,
        monthlyGoal: 50,
        weeklySaved: 0,
        itemsRecycled: 0,
        treesEquivalent: 0,
        energySaved: 0
      });
    }

    res.json({
      success: true,
      data: { carbonData }
    });
  } catch (error) {
    console.error('Get carbon data error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/carbon/update
// @desc    Update user's carbon data
// @access  Private
router.post('/update', auth, async (req, res) => {
  try {
    const user = await User.findByPk(req.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Get user's purchase data
    const purchases = await Purchase.findAll({
      where: { buyerId: req.userId }
    });

    // Calculate carbon savings
    const totalSaved = purchases.reduce((sum, purchase) => {
      return sum + (purchase.carbonSaved || 0);
    }, 0);

    const itemsRecycled = purchases.length;
    const treesEquivalent = Math.round(totalSaved / 22); // 1 tree absorbs ~22kg CO2/year
    const energySaved = Math.round(totalSaved * 0.5); // kWh equivalent
    const weeklySaved = totalSaved / 4; // Rough weekly average

    // Find or create carbon data
    let carbonData = await CarbonData.findOne({
      where: { userId: req.userId }
    });

    if (!carbonData) {
      carbonData = await CarbonData.create({
        userId: req.userId,
        totalSaved,
        monthlyGoal: 50,
        weeklySaved,
        itemsRecycled,
        treesEquivalent,
        energySaved
      });
    } else {
      await carbonData.update({
        totalSaved,
        weeklySaved,
        itemsRecycled,
        treesEquivalent,
        energySaved,
        lastUpdated: new Date()
      });
    }

    res.json({
      success: true,
      message: 'Carbon data updated successfully',
      data: { carbonData }
    });
  } catch (error) {
    console.error('Update carbon data error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/carbon/goal
// @desc    Update user's monthly carbon saving goal
// @access  Private
router.put('/goal', [
  auth,
  body('monthlyGoal').isFloat({ min: 0 })
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

    const { monthlyGoal } = req.body;

    let carbonData = await CarbonData.findOne({
      where: { userId: req.userId }
    });

    if (!carbonData) {
      carbonData = await CarbonData.create({
        userId: req.userId,
        totalSaved: 0,
        monthlyGoal,
        weeklySaved: 0,
        itemsRecycled: 0,
        treesEquivalent: 0,
        energySaved: 0
      });
    } else {
      await carbonData.update({ monthlyGoal });
    }

    res.json({
      success: true,
      message: 'Monthly goal updated successfully',
      data: { carbonData }
    });
  } catch (error) {
    console.error('Update carbon goal error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/carbon/leaderboard
// @desc    Get carbon savings leaderboard
// @access  Public
router.get('/leaderboard', async (req, res) => {
  try {
    const leaderboard = await CarbonData.findAll({
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'username', 'firstName', 'lastName', 'avatar']
        }
      ],
      order: [['totalSaved', 'DESC']],
      limit: 10
    });

    res.json({
      success: true,
      data: { leaderboard }
    });
  } catch (error) {
    console.error('Get leaderboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;
