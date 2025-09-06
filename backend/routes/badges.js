/**
 * Badges Routes
 * Handles badge operations and user progress
 */

const express = require('express');
const { body, validationResult } = require('express-validator');
const { Badge, UserBadge, User, Purchase } = require('../models');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/badges
// @desc    Get all badges
// @access  Public
router.get('/', async (req, res) => {
  try {
    const badges = await Badge.findAll({
      where: { isActive: true },
      order: [['category', 'ASC'], ['level', 'ASC']]
    });

    res.json({
      success: true,
      data: { badges }
    });
  } catch (error) {
    console.error('Get badges error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/badges/user
// @desc    Get user's badge progress
// @access  Private
router.get('/user', auth, async (req, res) => {
  try {
    const userBadges = await UserBadge.findAll({
      where: { userId: req.userId },
      include: [
        {
          model: Badge,
          as: 'badge'
        }
      ],
      order: [['lastUpdated', 'DESC']]
    });

    res.json({
      success: true,
      data: { userBadges }
    });
  } catch (error) {
    console.error('Get user badges error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/badges/update-progress
// @desc    Update user badge progress
// @access  Private
router.post('/update-progress', auth, async (req, res) => {
  try {
    const user = await User.findByPk(req.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Get user's purchase data for badge calculations
    const purchases = await Purchase.findAll({
      where: { buyerId: req.userId }
    });

    const totalPurchases = purchases.length;
    const totalSaved = purchases.reduce((sum, purchase) => {
      return sum + (purchase.carbonSaved || 0);
    }, 0);

    // Get all badges
    const badges = await Badge.findAll({
      where: { isActive: true }
    });

    const updatedBadges = [];

    for (const badge of badges) {
      let progress = 0;
      let isUnlocked = false;

      // Calculate progress based on badge requirements
      switch (badge.id) {
        case 'first-purchase':
          progress = Math.min(totalPurchases, 1);
          isUnlocked = totalPurchases >= 1;
          break;
        case 'eco-shopper':
          progress = Math.min(totalPurchases, 5);
          isUnlocked = totalPurchases >= 5;
          break;
        case 'sustainability-champion':
          progress = Math.min(totalPurchases, 25);
          isUnlocked = totalPurchases >= 25;
          break;
        case 'carbon-saver':
          progress = Math.min(totalSaved, 10);
          isUnlocked = totalSaved >= 10;
          break;
        case 'climate-warrior':
          progress = Math.min(totalSaved, 50);
          isUnlocked = totalSaved >= 50;
          break;
        case 'planet-protector':
          progress = Math.min(totalSaved, 100);
          isUnlocked = totalSaved >= 100;
          break;
        case 'community-member':
          progress = 1;
          isUnlocked = true;
          break;
        default:
          // For other badges, use default progress
          progress = 0;
          isUnlocked = false;
      }

      // Find or create user badge record
      let userBadge = await UserBadge.findOne({
        where: { userId: req.userId, badgeId: badge.id }
      });

      if (!userBadge) {
        userBadge = await UserBadge.create({
          userId: req.userId,
          badgeId: badge.id,
          progress,
          isUnlocked,
          unlockedAt: isUnlocked ? new Date() : null
        });
      } else {
        const wasUnlocked = userBadge.isUnlocked;
        await userBadge.update({
          progress,
          isUnlocked,
          unlockedAt: isUnlocked && !wasUnlocked ? new Date() : userBadge.unlockedAt,
          lastUpdated: new Date()
        });
      }

      updatedBadges.push(userBadge);
    }

    res.json({
      success: true,
      message: 'Badge progress updated successfully',
      data: { userBadges: updatedBadges }
    });
  } catch (error) {
    console.error('Update badge progress error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/badges/:id
// @desc    Get single badge by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const badge = await Badge.findByPk(req.params.id);

    if (!badge) {
      return res.status(404).json({
        success: false,
        message: 'Badge not found'
      });
    }

    res.json({
      success: true,
      data: { badge }
    });
  } catch (error) {
    console.error('Get badge error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/badges/category/:category
// @desc    Get badges by category
// @access  Public
router.get('/category/:category', async (req, res) => {
  try {
    const badges = await Badge.findAll({
      where: { 
        category: req.params.category,
        isActive: true 
      },
      order: [['level', 'ASC']]
    });

    res.json({
      success: true,
      data: { badges }
    });
  } catch (error) {
    console.error('Get badges by category error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;
