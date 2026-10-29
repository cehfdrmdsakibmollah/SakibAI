const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1,
  },
  image: {
    type: String,
    default: '',
  },
});

const orderSchema = new mongoose.Schema(
  {
    merchantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    invoiceId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    customerName: {
      type: String,
      required: [true, 'Customer name is required'],
      trim: true,
    },
    customerPhone: {
      type: String,
      required: [true, 'Customer phone number is required'],
      trim: true,
    },
    customerAddress: {
      type: String,
      required: [true, 'Delivery address is required'],
      trim: true,
    },
    items: {
      type: [orderItemSchema],
      required: true,
      validate: [array => array.length > 0, 'Order must contain at least one item'],
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    deliveryCharge: {
      type: Number,
      default: 60,
    },
    paymentMethod: {
      type: String,
      enum: ['COD', 'bKash', 'Nagad', 'Card'],
      default: 'COD',
    },
    paymentStatus: {
      type: String,
      enum: ['Pending', 'Paid', 'Failed', 'Refunded'],
      default: 'Pending',
    },
    bkashTrxId: {
      type: String,
      default: '',
    },
    courierStatus: {
      type: String,
      enum: ['Pending', 'In-Transit', 'Delivered', 'Cancelled', 'Returned'],
      default: 'Pending',
    },
    courierProvider: {
      type: String,
      default: 'Steadfast',
    },
    courierTrackingCode: {
      type: String,
      default: '',
    },
    consignmentId: {
      type: String,
      default: '',
    },
    courierNotes: {
      type: String,
      default: '',
    },
    fraudScore: {
      type: Number,
      default: 0, // 0 = safe, 100 = high risk fake order
    },
    notes: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

orderSchema.index({ merchantId: 1, courierStatus: 1 });
orderSchema.index({ merchantId: 1, paymentStatus: 1 });

module.exports = mongoose.model('Order', orderSchema);
