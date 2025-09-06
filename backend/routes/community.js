/**
 * Community Routes
 * Handles community groups and posts
 */

const express = require('express');
const { body, query, validationResult } = require('express-validator');
const { Op } = require('sequelize');
const { CommunityGroup, CommunityPost, User } = require('../models');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/community/groups
// @desc    Get all community groups
// @access  Public
router.get('/groups', [
  query('category').optional().isString(),
  query('location').optional().isString(),
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 })
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

    const {
      category,
      location,
      page = 1,
      limit = 20
    } = req.query;

    // Build where clause
    const where = { isActive: true, isPublic: true };

    if (category) {
      where.category = category;
    }

    if (location) {
      where.location = { [Op.like]: `%${location}%` };
    }

    // Calculate offset
    const offset = (parseInt(page) - 1) * parseInt(limit);

    // Get groups with pagination
    const { count, rows: groups } = await CommunityGroup.findAndCountAll({
      where,
      include: [
        {
          model: User,
          as: 'creator',
          attributes: ['id', 'username', 'firstName', 'lastName', 'avatar']
        }
      ],
      order: [['createdAt', 'DESC']],
      limit: parseInt(limit),
      offset
    });

    res.json({
      success: true,
      data: {
        groups,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(count / parseInt(limit)),
          totalItems: count,
          itemsPerPage: parseInt(limit)
        }
      }
    });
  } catch (error) {
    console.error('Get community groups error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/community/groups
// @desc    Create a new community group
// @access  Private
router.post('/groups', [
  auth,
  body('name').isLength({ min: 1, max: 255 }),
  body('description').isLength({ min: 1 }),
  body('category').isLength({ min: 1, max: 100 }),
  body('location').optional().isLength({ max: 255 }),
  body('isPublic').optional().isBoolean(),
  body('tags').optional().isArray()
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

    const {
      name,
      description,
      category,
      location,
      isPublic = true,
      tags = []
    } = req.body;

    const group = await CommunityGroup.create({
      name,
      description,
      category,
      location,
      isPublic,
      tags,
      createdBy: req.userId
    });

    // Include creator information in response
    const groupWithCreator = await CommunityGroup.findByPk(group.id, {
      include: [
        {
          model: User,
          as: 'creator',
          attributes: ['id', 'username', 'firstName', 'lastName', 'avatar']
        }
      ]
    });

    res.status(201).json({
      success: true,
      message: 'Community group created successfully',
      data: { group: groupWithCreator }
    });
  } catch (error) {
    console.error('Create community group error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/community/groups/:id
// @desc    Get single community group
// @access  Public
router.get('/groups/:id', async (req, res) => {
  try {
    const group = await CommunityGroup.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'creator',
          attributes: ['id', 'username', 'firstName', 'lastName', 'avatar']
        }
      ]
    });

    if (!group) {
      return res.status(404).json({
        success: false,
        message: 'Community group not found'
      });
    }

    res.json({
      success: true,
      data: { group }
    });
  } catch (error) {
    console.error('Get community group error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/community/posts
// @desc    Get community posts
// @access  Public
router.get('/posts', [
  query('groupId').optional().isUUID(),
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 })
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

    const {
      groupId,
      page = 1,
      limit = 20
    } = req.query;

    // Build where clause
    const where = { isActive: true };

    if (groupId) {
      where.groupId = groupId;
    }

    // Calculate offset
    const offset = (parseInt(page) - 1) * parseInt(limit);

    // Get posts with pagination
    const { count, rows: posts } = await CommunityPost.findAndCountAll({
      where,
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'username', 'firstName', 'lastName', 'avatar']
        },
        {
          model: CommunityGroup,
          as: 'group',
          attributes: ['id', 'name', 'category']
        }
      ],
      order: [['createdAt', 'DESC']],
      limit: parseInt(limit),
      offset
    });

    res.json({
      success: true,
      data: {
        posts,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(count / parseInt(limit)),
          totalItems: count,
          itemsPerPage: parseInt(limit)
        }
      }
    });
  } catch (error) {
    console.error('Get community posts error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/community/posts
// @desc    Create a new community post
// @access  Private
router.post('/posts', [
  auth,
  body('groupId').isUUID(),
  body('content').isLength({ min: 1 }),
  body('imageUrl').optional().isURL(),
  body('tags').optional().isArray()
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

    const {
      groupId,
      content,
      imageUrl,
      tags = []
    } = req.body;

    // Check if group exists
    const group = await CommunityGroup.findByPk(groupId);
    if (!group) {
      return res.status(404).json({
        success: false,
        message: 'Community group not found'
      });
    }

    const post = await CommunityPost.create({
      groupId,
      authorId: req.userId,
      content,
      imageUrl,
      tags
    });

    // Include author and group information in response
    const postWithDetails = await CommunityPost.findByPk(post.id, {
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'username', 'firstName', 'lastName', 'avatar']
        },
        {
          model: CommunityGroup,
          as: 'group',
          attributes: ['id', 'name', 'category']
        }
      ]
    });

    res.status(201).json({
      success: true,
      message: 'Post created successfully',
      data: { post: postWithDetails }
    });
  } catch (error) {
    console.error('Create community post error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/community/posts/:id
// @desc    Get single community post
// @access  Public
router.get('/posts/:id', async (req, res) => {
  try {
    const post = await CommunityPost.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'username', 'firstName', 'lastName', 'avatar']
        },
        {
          model: CommunityGroup,
          as: 'group',
          attributes: ['id', 'name', 'category']
        }
      ]
    });

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Community post not found'
      });
    }

    res.json({
      success: true,
      data: { post }
    });
  } catch (error) {
    console.error('Get community post error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;
