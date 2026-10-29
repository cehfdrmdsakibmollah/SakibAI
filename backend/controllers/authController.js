const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Helper to generate signed JWT
const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET || 'sakibai-production-super-secret-jwt-key-2026',
    { expiresIn: '30d' }
  );
};

// @desc    Register a new merchant
// @route   POST /api/v1/auth/register
// @access  Public
exports.registerMerchant = async (req, res) => {
  try {
    const { name, email, password, storeName, storeSubdomain } = req.body;

    if (!name || !email || !password || !storeName || !storeSubdomain) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, password, storeName and storeSubdomain',
      });
    }

    // Check if email already registered
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'A merchant account with this email already exists',
      });
    }

    // Check if subdomain is already taken
    const cleanSubdomain = storeSubdomain.toLowerCase().trim().replace(/[^a-z0-9-]/g, '');
    const existingSubdomain = await User.findOne({ storeSubdomain: cleanSubdomain });
    if (existingSubdomain) {
      return res.status(400).json({
        success: false,
        message: 'This store subdomain is already taken. Please choose another.',
      });
    }

    // Create merchant user (pre-save hook hashes password)
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      storeName,
      storeSubdomain: cleanSubdomain,
    });

    const token = generateToken(user._id);

    return res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        storeName: user.storeName,
        storeSubdomain: user.storeSubdomain,
        apiKeys: user.apiKeys,
      },
    });
  } catch (error) {
    console.error('Register Merchant Error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error during registration',
    });
  }
};

// @desc    Authenticate merchant & get token
// @route   POST /api/v1/auth/login
// @access  Public
exports.loginMerchant = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password',
      });
    }

    // Check for user with password field included
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password credentials',
      });
    }

    // Verify password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password credentials',
      });
    }

    const token = generateToken(user._id);

    return res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        storeName: user.storeName,
        storeSubdomain: user.storeSubdomain,
        apiKeys: user.apiKeys,
      },
    });
  } catch (error) {
    console.error('Login Merchant Error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error during merchant login',
    });
  }
};

// @desc    Update merchant Steadfast & bKash API credentials
// @route   PUT /api/v1/auth/api-keys
// @access  Private
exports.updateApiKeys = async (req, res) => {
  try {
    const {
      steadfastApiKey,
      steadfastSecretKey,
      bkashAppKey,
      bkashAppSecret,
      bkashUsername,
      bkashPassword,
      metaVerifyToken,
      metaPageAccessToken,
    } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Merchant user not found',
      });
    }

    if (!user.apiKeys) user.apiKeys = {};

    if (steadfastApiKey !== undefined) user.apiKeys.steadfastApiKey = steadfastApiKey;
    if (steadfastSecretKey !== undefined) user.apiKeys.steadfastSecretKey = steadfastSecretKey;
    if (bkashAppKey !== undefined) user.apiKeys.bkashAppKey = bkashAppKey;
    if (bkashAppSecret !== undefined) user.apiKeys.bkashAppSecret = bkashAppSecret;
    if (bkashUsername !== undefined) user.apiKeys.bkashUsername = bkashUsername;
    if (bkashPassword !== undefined) user.apiKeys.bkashPassword = bkashPassword;
    if (metaVerifyToken !== undefined) user.apiKeys.metaVerifyToken = metaVerifyToken;
    if (metaPageAccessToken !== undefined) user.apiKeys.metaPageAccessToken = metaPageAccessToken;

    await user.save();

    return res.status(200).json({
      success: true,
      message: 'API credentials updated successfully',
      apiKeys: user.apiKeys,
    });
  } catch (error) {
    console.error('Update API Keys Error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Error updating API credentials',
    });
  }
};

// @desc    Get currently logged in merchant profile
// @route   GET /api/v1/auth/me
// @access  Private
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
