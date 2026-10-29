const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import controllers & middleware
const { protect } = require('./middleware/auth');
const authController = require('./controllers/authController');
const productController = require('./controllers/productController');
const orderController = require('./controllers/orderController');
const integrationController = require('./controllers/integrationController');

const app = express();

// Middleware setup
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- ROUTES SETUP ---

// 1. Auth Routes (/api/v1/auth)
const authRouter = express.Router();
authRouter.post('/register', authController.registerMerchant);
authRouter.post('/login', authController.loginMerchant);
authRouter.get('/me', protect, authController.getMe);
authRouter.put('/api-keys', protect, authController.updateApiKeys);
app.use('/api/v1/auth', authRouter);

// 2. Product Routes (/api/v1/products)
const productRouter = express.Router();
productRouter.post('/', protect, productController.createProduct);
productRouter.get('/merchant', protect, productController.getMerchantProducts);
productRouter.get('/store/:storeSubdomain', productController.getPublicStoreProducts);
productRouter.put('/:id', protect, productController.updateProduct);
productRouter.delete('/:id', protect, productController.deleteProduct);
app.use('/api/v1/products', productRouter);

// 3. Order Routes (/api/v1/orders)
const orderRouter = express.Router();
orderRouter.post('/create', orderController.createOrder);
orderRouter.get('/', protect, orderController.getMerchantOrders);
orderRouter.get('/dashboard-stats', protect, orderController.getDashboardStats);
orderRouter.post('/:id/send-to-steadfast', protect, orderController.sendToSteadfast);
app.use('/api/v1/orders', orderRouter);

// 4. Integration Routes (/api/v1/integrations)
const integrationRouter = express.Router();
integrationRouter.post('/ai-description', protect, integrationController.generateAiDescription);
integrationRouter.get('/webhook/messenger', integrationController.verifyMessengerWebhook);
integrationRouter.post('/webhook/messenger', integrationController.handleMessengerWebhook);
integrationRouter.post('/bkash/create-payment', integrationController.createBkashPayment);
app.use('/api/v1/integrations', integrationRouter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    platform: 'SakibAI SaaS Backend',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Database Connection
const MONGO_URI =
  process.env.MONGO_URI ||
  process.env.MONGODB_URI ||
  'mongodb://127.0.0.1:27017/sakibai_ecommerce';

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected successfully to SakibAI database');
  })
  .catch((err) => {
    console.warn('⚠️ MongoDB connection warning (running in standalone/dev mode):', err.message);
  });

// Start listening
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`🚀 SakibAI SaaS Backend server running on port ${PORT}`);
  console.log(`🔗 Health check available at: http://localhost:${PORT}/api/health`);
});

module.exports = { app, server };
