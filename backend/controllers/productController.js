const Product = require('../models/Product');
const User = require('../models/User');

// @desc    Create a new product
// @route   POST /api/v1/products
// @access  Private (Merchant)
exports.createProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      compareAtPrice,
      stock,
      category,
      images,
      sku,
      tags,
    } = req.body;

    if (!title || price === undefined || stock === undefined || !category) {
      return res.status(400).json({
        success: false,
        message: 'Please provide title, price, stock, and category',
      });
    }

    const product = await Product.create({
      merchantId: req.user._id,
      title,
      description: description || '',
      price: Number(price),
      compareAtPrice: compareAtPrice ? Number(compareAtPrice) : 0,
      stock: Number(stock),
      category,
      images: Array.isArray(images) && images.length > 0 ? images : ['https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=600&q=80'],
      sku: sku || `SKU-${Date.now().toString().slice(-6)}`,
      tags: tags || [],
      status: 'Active',
    });

    return res.status(201).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error('Create Product Error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error creating product',
    });
  }
};

// @desc    Fetch all products for logged-in merchant
// @route   GET /api/v1/products/merchant
// @access  Private (Merchant)
exports.getMerchantProducts = async (req, res) => {
  try {
    const { category, status, search } = req.query;
    const query = { merchantId: req.user._id };

    if (category && category !== 'All') {
      query.category = category;
    }
    if (status && status !== 'All') {
      query.status = status;
    }
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    const products = await Product.find(query).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    console.error('Get Merchant Products Error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error fetching merchant products',
    });
  }
};

// @desc    Fetch products by storeSubdomain for public storefront
// @route   GET /api/v1/products/store/:storeSubdomain
// @access  Public
exports.getPublicStoreProducts = async (req, res) => {
  try {
    const { storeSubdomain } = req.params;

    // Find the merchant by subdomain
    const merchant = await User.findOne({
      storeSubdomain: storeSubdomain.toLowerCase(),
    }).select('name storeName storeSubdomain storeSettings');

    if (!merchant) {
      return res.status(404).json({
        success: false,
        message: `Store '${storeSubdomain}' not found.`,
      });
    }

    // Fetch active products
    const products = await Product.find({
      merchantId: merchant._id,
      status: 'Active',
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      merchant: {
        id: merchant._id,
        name: merchant.name,
        storeName: merchant.storeName,
        storeSubdomain: merchant.storeSubdomain,
        settings: merchant.storeSettings,
      },
      count: products.length,
      data: products,
    });
  } catch (error) {
    console.error('Get Public Store Products Error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error fetching store products',
    });
  }
};

// @desc    Update an existing product
// @route   PUT /api/v1/products/:id
// @access  Private
exports.updateProduct = async (req, res) => {
  try {
    let product = await Product.findOne({
      _id: req.params.id,
      merchantId: req.user._id,
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found or unauthorized',
      });
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete product
// @route   DELETE /api/v1/products/:id
// @access  Private
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({
      _id: req.params.id,
      merchantId: req.user._id,
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found or unauthorized',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Product removed successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
