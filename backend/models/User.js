const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Merchant name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please enter a valid email address',
      ],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false,
    },
    storeName: {
      type: String,
      required: [true, 'Store name is required'],
      trim: true,
    },
    storeSubdomain: {
      type: String,
      required: [true, 'Store subdomain is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ['merchant', 'admin', 'staff'],
      default: 'merchant',
    },
    apiKeys: {
      steadfastApiKey: {
        type: String,
        default: '',
      },
      steadfastSecretKey: {
        type: String,
        default: '',
      },
      bkashAppKey: {
        type: String,
        default: '',
      },
      bkashAppSecret: {
        type: String,
        default: '',
      },
      bkashUsername: {
        type: String,
        default: '',
      },
      bkashPassword: {
        type: String,
        default: '',
      },
      metaVerifyToken: {
        type: String,
        default: '',
      },
      metaPageAccessToken: {
        type: String,
        default: '',
      },
    },
    storeSettings: {
      currency: {
        type: String,
        default: 'BDT',
      },
      currencySymbol: {
        type: String,
        default: '৳',
      },
      bannerText: {
        type: String,
        default: 'Trendy Fashion For a Better You - Up to 50% OFF',
      },
      themeColor: {
        type: String,
        default: '#00F2FE',
      },
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
