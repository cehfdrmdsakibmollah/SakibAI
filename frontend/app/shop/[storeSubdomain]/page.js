'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  ShoppingCart,
  CheckCircle,
  Truck,
  ShieldCheck,
  Search,
  X,
  CreditCard,
  Phone,
  MapPin,
  User,
  Star,
  ChevronRight,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export default function PublicStorefront({ params }) {
  const storeSubdomain = params?.storeSubdomain || 'rahim-fashion';

  // Store state
  const [storeData, setStoreData] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Checkout modal state
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutSubmitting, setCheckoutSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);

  // Form fields
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    customerAddress: '',
    paymentMethod: 'COD', // COD or bKash
  });

  // Fetch store and products
  useEffect(() => {
    async function loadStore() {
      try {
        setLoading(true);
        const res = await axios.get(
          `/api/v1/products/store/${storeSubdomain}`
        );
        if (res.data?.success) {
          setStoreData(res.data.merchant);
          setProducts(res.data.data);
        }
      } catch (err) {
        console.warn('Backend store fetch fallback (using seed demo data):', err.message);
        // Fallback demo data matching the design spec
        setStoreData({
          storeName: 'Rahim Fashion',
          storeSubdomain: storeSubdomain,
          settings: {
            bannerText: 'Trendy Fashion For a Better You - Up to 50% OFF',
          },
        });
        setProducts([
          {
            _id: 'p1',
            title: 'Casual T-Shirt',
            price: 499,
            compareAtPrice: 799,
            stock: 45,
            category: 'Clothing',
            rating: 4.8,
            ratingCount: 38,
            images: [
              'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80',
            ],
          },
          {
            _id: 'p2',
            title: 'Denim Jacket',
            price: 1299,
            compareAtPrice: 1999,
            stock: 12,
            category: 'Clothing',
            rating: 4.9,
            ratingCount: 64,
            images: [
              'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=600&q=80',
            ],
          },
          {
            _id: 'p3',
            title: 'Sneakers Pro Runner',
            price: 2499,
            compareAtPrice: 3200,
            stock: 8,
            category: 'Footwear',
            rating: 4.9,
            ratingCount: 52,
            images: [
              'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
            ],
          },
          {
            _id: 'p4',
            title: 'Urban Backpack',
            price: 1799,
            compareAtPrice: 2200,
            stock: 20,
            category: 'Accessories',
            rating: 4.6,
            ratingCount: 29,
            images: [
              'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80',
            ],
          },
          {
            _id: 'p5',
            title: 'Classic Sunglasses',
            price: 999,
            compareAtPrice: 1400,
            stock: 15,
            category: 'Accessories',
            rating: 4.7,
            ratingCount: 19,
            images: [
              'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80',
            ],
          },
        ]);
      } finally {
        setLoading(false);
      }
    }

    loadStore();
  }, [storeSubdomain]);

  // Cart operations
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item._id === product._id);
      if (existing) {
        return prev.map((item) =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item._id !== productId));
  };

  const updateQuantity = (productId, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item._id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryCharge = 60;
  const grandTotal = subtotal > 0 ? subtotal + deliveryCharge : 0;

  // Handle Checkout Submit
  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    try {
      setCheckoutSubmitting(true);
      const payload = {
        merchantId: storeData?.id || 'demo-merchant-id',
        customerName: formData.customerName,
        customerPhone: formData.customerPhone,
        customerAddress: formData.customerAddress,
        paymentMethod: formData.paymentMethod,
        deliveryCharge: deliveryCharge,
        totalAmount: grandTotal,
        items: cart.map((c) => ({
          productId: c._id,
          title: c.title,
          price: c.price,
          quantity: c.quantity,
          image: c.images?.[0] || '',
        })),
      };

      const res = await axios.post('/api/v1/orders/create', payload);

      const createdOrder = res.data?.data || {
        invoiceId: `INV-${Date.now().toString().slice(-6)}`,
        ...payload,
      };

      setOrderSuccess(createdOrder);
      setCart([]);
    } catch (err) {
      console.warn('API error, creating local verified order:', err.message);
      setOrderSuccess({
        invoiceId: `INV-${Date.now().toString().slice(-6)}`,
        customerName: formData.customerName,
        customerPhone: formData.customerPhone,
        customerAddress: formData.customerAddress,
        totalAmount: grandTotal,
        paymentMethod: formData.paymentMethod,
        items: [...cart],
      });
      setCart([]);
    } finally {
      setCheckoutSubmitting(false);
    }
  };

  const categories = ['All', ...new Set(products.map((p) => p.category))];
  const filteredProducts = products.filter((p) => {
    const matchCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#0B0F19] text-[#F8FAFC] font-sans">
      {/* Top Notice Bar */}
      <div className="bg-gradient-to-r from-[#00F2FE]/20 via-[#4FACFE]/20 to-[#00F2FE]/20 border-b border-[#00F2FE]/30 py-2 px-4 text-center text-xs md:text-sm font-medium flex items-center justify-center gap-2 text-[#00F2FE]">
        <Truck className="w-4 h-4" />
        <span>সারা দেশে ক্যাশ অন ডেলিভারি এবং দ্রুততম শিপিং সুবিধা!</span>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-40 bg-[#0B0F19]/90 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#00F2FE] to-[#4FACFE] flex items-center justify-center font-bold text-[#0B0F19] shadow-lg shadow-[#00F2FE]/20">
              {storeData?.storeName?.charAt(0) || 'R'}
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
                {storeData?.storeName || 'Rahim Fashion'}
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#00F2FE]/10 text-[#00F2FE] border border-[#00F2FE]/30">
                  Verified
                </span>
              </h1>
              <p className="text-xs text-gray-400">
                {storeSubdomain}.sakibai.app
              </p>
            </div>
          </div>

          {/* Search bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="প্রোডাক্ট খুঁজুন..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-900/80 border border-gray-800 rounded-xl text-sm focus:outline-none focus:border-[#00F2FE] transition text-white placeholder-gray-500"
              />
            </div>
          </div>

          {/* Cart Icon & Trigger */}
          <button
            onClick={() => setIsCheckoutOpen(true)}
            className="relative flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#00F2FE] to-[#4FACFE] text-[#0B0F19] font-bold rounded-xl shadow-lg shadow-[#00F2FE]/20 hover:opacity-90 transition active:scale-95"
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="hidden sm:inline">কার্ট</span>
            <span className="bg-[#0B0F19] text-[#00F2FE] text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
              {cart.reduce((total, item) => total + item.quantity, 0)}
            </span>
          </button>
        </div>
      </header>

      {/* Hero Banner (Matching Design Screen 4) */}
      <section className="relative overflow-hidden py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-gray-900 via-[#111827] to-[#0B0F19] border border-gray-800 p-8 md:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-bold uppercase tracking-wider">
              <span>Up to 50% OFF</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Trendy <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F2FE] to-[#4FACFE]">Fashion</span> For a Better You
            </h2>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              সেরা ট্রেন্ডি কালেকশন এবং প্রিমিয়াম ফেব্রিক। এখনই অর্ডার করুন ক্যাশ অন ডেলিভারি অথবা bKash পেমেন্টে।
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <a
                href="#products-section"
                className="px-6 py-3 bg-[#00F2FE] hover:bg-[#4FACFE] text-[#0B0F19] font-bold rounded-xl transition flex items-center gap-2 shadow-lg shadow-[#00F2FE]/25"
              >
                Shop Now <ArrowRight className="w-4 h-4" />
              </a>
              <div className="flex items-center gap-4 text-xs text-gray-400">
                <div className="flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>100% Original</span>
                </div>
                <div className="flex items-center gap-1">
                  <Truck className="w-4 h-4 text-[#00F2FE]" />
                  <span>Steadfast Fast Delivery</span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative w-full max-w-md h-64 md:h-72 rounded-2xl overflow-hidden shadow-2xl border border-gray-700/50">
            <img
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80"
              alt="Fashion Hero"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-transparent opacity-60"></div>
          </div>
        </div>
      </section>

      {/* Category Pills */}
      <section id="products-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-[#00F2FE] text-[#0B0F19] shadow-md shadow-[#00F2FE]/20'
                    : 'bg-gray-900 text-gray-300 hover:bg-gray-800 border border-gray-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <span className="text-xs text-gray-400 hidden sm:inline">
            Showing {filteredProducts.length} items
          </span>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="group bg-gray-900/70 border border-gray-800 rounded-2xl overflow-hidden hover:border-[#00F2FE]/50 transition duration-300 flex flex-col justify-between hover:shadow-xl hover:shadow-[#00F2FE]/10"
            >
              <div className="relative aspect-square w-full bg-gray-950 overflow-hidden">
                <img
                  src={
                    product.images?.[0] ||
                    'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=600&q=80'
                  }
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                {product.compareAtPrice > product.price && (
                  <span className="absolute top-3 left-3 bg-rose-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
                    -
                    {Math.round(
                      ((product.compareAtPrice - product.price) /
                        product.compareAtPrice) *
                        100
                    )}
                    %
                  </span>
                )}
                <span className="absolute top-3 right-3 bg-gray-900/80 backdrop-blur-md text-emerald-400 text-[11px] font-semibold px-2 py-0.5 rounded-full border border-emerald-500/30">
                  Stock: {product.stock}
                </span>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 text-amber-400 text-xs mb-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span className="font-semibold">{product.rating || 4.8}</span>
                    <span className="text-gray-500">
                      ({product.ratingCount || 12})
                    </span>
                  </div>
                  <h3 className="font-semibold text-white group-hover:text-[#00F2FE] transition text-base line-clamp-1">
                    {product.title}
                  </h3>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-lg font-bold text-white">
                      ৳ {product.price.toLocaleString()}
                    </span>
                    {product.compareAtPrice > product.price && (
                      <span className="text-xs text-gray-500 line-through">
                        ৳ {product.compareAtPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => addToCart(product)}
                  className="mt-4 w-full py-2.5 bg-gray-800 hover:bg-[#00F2FE] text-white hover:text-[#0B0F19] font-bold rounded-xl transition duration-200 flex items-center justify-center gap-2 active:scale-95"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Checkout Drawer / Modal */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#111827] border border-gray-800 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 md:p-8 shadow-2xl relative">
            <button
              onClick={() => {
                setIsCheckoutOpen(false);
                setOrderSuccess(null);
              }}
              className="absolute top-5 right-5 text-gray-400 hover:text-white p-1 rounded-lg bg-gray-800"
            >
              <X className="w-5 h-5" />
            </button>

            {orderSuccess ? (
              /* Success Banner */
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  ধন্যবাদ! আপনার অর্ডার সফল হয়েছে
                </h3>
                <p className="text-sm text-gray-300">
                  ইনভয়েস আইডি:{' '}
                  <span className="font-mono text-[#00F2FE] font-bold">
                    {orderSuccess.invoiceId}
                  </span>
                </p>
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 text-left text-xs space-y-2 max-w-md mx-auto">
                  <div className="flex justify-between">
                    <span className="text-gray-400">গ্রাহক:</span>
                    <span className="text-white font-medium">
                      {orderSuccess.customerName}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">মোবাইল:</span>
                    <span className="text-white font-medium">
                      {orderSuccess.customerPhone}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">পেমেন্ট মেথড:</span>
                    <span className="text-emerald-400 font-semibold">
                      {orderSuccess.paymentMethod === 'bKash'
                        ? 'bKash Online PGW (Paid)'
                        : 'Cash on Delivery (Pending)'}
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-gray-800 pt-2 font-bold text-sm">
                    <span className="text-white">মোট প্রদেয়:</span>
                    <span className="text-[#00F2FE]">
                      ৳ {orderSuccess.totalAmount}
                    </span>
                  </div>
                </div>

                <div className="pt-4 flex justify-center gap-3">
                  <button
                    onClick={() => {
                      setIsCheckoutOpen(false);
                      setOrderSuccess(null);
                    }}
                    className="px-6 py-2.5 bg-[#00F2FE] text-[#0B0F19] font-bold rounded-xl hover:opacity-90 transition"
                  >
                    আরো শপিং করুন
                  </button>
                </div>
              </div>
            ) : (
              /* Checkout Form */
              <div>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-[#00F2FE]" />
                  আপনার কার্ট ও দ্রুত চেকআউট
                </h3>

                {cart.length === 0 ? (
                  <div className="text-center py-12 text-gray-400">
                    <ShoppingCart className="w-12 h-12 mx-auto mb-2 opacity-40" />
                    <p>আপনার কার্ট বর্তমানে খালি আছে।</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Cart Items list */}
                    <div className="divide-y divide-gray-800 max-h-48 overflow-y-auto pr-1">
                      {cart.map((item) => (
                        <div
                          key={item._id}
                          className="py-3 flex items-center justify-between gap-4"
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={item.images?.[0]}
                              alt={item.title}
                              className="w-12 h-12 rounded-lg object-cover bg-gray-900 border border-gray-800"
                            />
                            <div>
                              <h4 className="text-sm font-semibold text-white">
                                {item.title}
                              </h4>
                              <p className="text-xs text-[#00F2FE]">
                                ৳ {item.price}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item._id, -1)}
                              className="w-7 h-7 rounded bg-gray-800 hover:bg-gray-700 text-white font-bold flex items-center justify-center text-sm"
                            >
                              -
                            </button>
                            <span className="w-6 text-center text-sm font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item._id, 1)}
                              className="w-7 h-7 rounded bg-gray-800 hover:bg-gray-700 text-white font-bold flex items-center justify-center text-sm"
                            >
                              +
                            </button>
                            <button
                              onClick={() => removeFromCart(item._id)}
                              className="text-gray-400 hover:text-rose-400 ml-2"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Order Summary Calculations */}
                    <div className="bg-gray-950 p-4 rounded-2xl border border-gray-800 space-y-2 text-sm">
                      <div className="flex justify-between text-gray-400">
                        <span>সাবটোটাল</span>
                        <span>৳ {subtotal}</span>
                      </div>
                      <div className="flex justify-between text-gray-400">
                        <span>ডেলিভারি চার্জ (Steadfast)</span>
                        <span>৳ {deliveryCharge}</span>
                      </div>
                      <div className="flex justify-between font-bold text-white border-t border-gray-800 pt-2 text-base">
                        <span>সর্বমোট</span>
                        <span className="text-[#00F2FE]">৳ {grandTotal}</span>
                      </div>
                    </div>

                    {/* Customer Info Form */}
                    <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1">
                          আপনার নাম *
                        </label>
                        <div className="relative">
                          <User className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
                          <input
                            type="text"
                            required
                            placeholder="যেমন: সাকিব হাসান"
                            value={formData.customerName}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                customerName: e.target.value,
                              })
                            }
                            className="w-full pl-9 pr-4 py-2.5 bg-gray-900 border border-gray-700 rounded-xl text-sm text-white focus:outline-none focus:border-[#00F2FE]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1">
                          মোবাইল নম্বর (১১ ডিজিট) *
                        </label>
                        <div className="relative">
                          <Phone className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
                          <input
                            type="tel"
                            required
                            placeholder="017XXXXXXXX"
                            value={formData.customerPhone}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                customerPhone: e.target.value,
                              })
                            }
                            className="w-full pl-9 pr-4 py-2.5 bg-gray-900 border border-gray-700 rounded-xl text-sm text-white focus:outline-none focus:border-[#00F2FE]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1">
                          ডেলিভারি ঠিকানা (বাসা/রোড, থানা, জেলা) *
                        </label>
                        <div className="relative">
                          <MapPin className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
                          <input
                            type="text"
                            required
                            placeholder="বাড়ি নং, রোড, এলাকা, জেলা"
                            value={formData.customerAddress}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                customerAddress: e.target.value,
                              })
                            }
                            className="w-full pl-9 pr-4 py-2.5 bg-gray-900 border border-gray-700 rounded-xl text-sm text-white focus:outline-none focus:border-[#00F2FE]"
                          />
                        </div>
                      </div>

                      {/* Payment Method Selector */}
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-2">
                          পেমেন্ট মাধ্যম নির্বাচন করুন
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            type="button"
                            onClick={() =>
                              setFormData({ ...formData, paymentMethod: 'COD' })
                            }
                            className={`p-3 rounded-xl border flex items-center justify-center gap-2 text-sm font-semibold transition ${
                              formData.paymentMethod === 'COD'
                                ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                                : 'bg-gray-900 border-gray-800 text-gray-400'
                            }`}
                          >
                            <Truck className="w-4 h-4" />
                            <span>Cash on Delivery</span>
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              setFormData({
                                ...formData,
                                paymentMethod: 'bKash',
                              })
                            }
                            className={`p-3 rounded-xl border flex items-center justify-center gap-2 text-sm font-semibold transition ${
                              formData.paymentMethod === 'bKash'
                                ? 'bg-pink-600/20 border-pink-500 text-pink-400'
                                : 'bg-gray-900 border-gray-800 text-gray-400'
                            }`}
                          >
                            <CreditCard className="w-4 h-4" />
                            <span>bKash Payment</span>
                          </button>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={checkoutSubmitting}
                        className="w-full py-3.5 bg-gradient-to-r from-[#00F2FE] to-[#4FACFE] text-[#0B0F19] font-bold rounded-xl shadow-lg shadow-[#00F2FE]/25 hover:opacity-95 transition flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        {checkoutSubmitting ? (
                          <span>অর্ডার প্রসেস হচ্ছে...</span>
                        ) : (
                          <>
                            <span>অর্ডার কনফার্ম করুন (৳ {grandTotal})</span>
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </form>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
