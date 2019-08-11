const express     = require('express');
const router      = express.Router();
const createError = require('http-errors');
const User  = require('../models/user');

/**
 * Get all users
 */
router.get('/', async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    createError(error);
  }
});

/**
 * Create new user
 */
router.post('/', async (req, res, next) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email
  });

  try {
    const userModel = await user.save();
    res.status(201).json(userModel);
  } catch (error) {
    res.status(400).json({message: error.message});
  }
});

/**
 * Get single user
 */
router.get('/:id', getUser, async (req, res) => {
  res.json(res.user);
});

/**
 * Update single user
 */
router.patch('/:id', getUser, async (req, res) => {
  try {
    if (req.body.name != null) {
      res.user.name = req.body.name;
    }

    res.user.save();
    res.json(res.user);
  } catch (error) {
    res.status(400).json({message: error.message});
  }
});

/**
 * Delete an user
 */
router.delete('/:id', getUser, async (req, res) => {
  try {
    await res.user.remove();
    res.status(204).json();
  } catch (error) {
    createError(error);
  }
});

/**
 * Middelware - get single user object
 */
async function getUser(req, res, next) {
  try {
    user = await User.findById(req.params.id)
    if (user == null) {
      return res.status(404).json({message: "User not found"})
    }
  } catch (error) {
    return createError(error)
  }
  
  res.user = user
  next()
}

module.exports = router;
