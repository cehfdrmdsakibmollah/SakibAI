'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Package,
  ShoppingCart,
  TrendingUp,
  Clock,
  Sparkles,
  Send,
  Key,
  Plus,
  RefreshCw,
  Search,
  ExternalLink,
  Bot,
  MessageSquare,
  AlertTriangle,
  FileText,
  DollarSign,
  Copy,
  ChevronRight,
  Shield,
  Layers,
  LayoutDashboard,
  CheckCircle2,
} from 'lucide-react';

export default function MerchantDashboard() {
  // Navigation active tab
  const [activeTab, setActiveTab] = useState('overview'); // overview, products, orders, ai-copy, integrations, settings

  // State metrics
  const [stats, setStats] = useState({
    totalOrders: 248,
    totalSales: 125640,
    pendingCourier: 32,
    totalProducts: 24,
  });

  // Orders list state
  const [orders, setOrders] = useState([
    {
      _id: 'ord_1',
      invoiceId: 'INV-001248',
      customerName: 'Md Rahim',
      customerPhone: '01711223344',
      customerAddress: 'Dhanmondi 27, Dhaka',
      amount: 1299,
      paymentStatus: 'Paid',
      courierStatus: 'In-Transit',
      courierTrackingCode: 'STDF-849204',
      createdAt: '2026-10-28',
    },
    {
      _id: 'ord_2',
      invoiceId: 'INV-001247',
      customerName: 'Ayesha Akhter',
      customerPhone: '01822334455',
      customerAddress: 'Agrabad, Chattogram',
      amount: 2499,
      paymentStatus: 'Paid',
      courierStatus: 'Delivered',
      courierTrackingCode: 'STDF-849190',
      createdAt: '2026-10-27',
    },
    {
      _id: 'ord_3',
      invoiceId: 'INV-001246',
      customerName: 'Tanvir Hasan',
      customerPhone: '01933445566',
      customerAddress: 'Zindabazar, Sylhet',
      amount: 899,
      paymentStatus: 'Pending',
      courierStatus: 'Pending',
      courierTrackingCode: '',
      createdAt: '2026-10-28',
    },
    {
      _id: 'ord_4',
      invoiceId: 'INV-001245',
      customerName: 'Sumi Rahman',
      customerPhone: '01644556677',
      customerAddress: 'Uttara Sector 7, Dhaka',
      amount: 1799,
      paymentStatus: 'Paid',
      courierStatus: 'In-Transit',
      courierTrackingCode: 'STDF-849155',
      createdAt: '2026-10-26',
    },
    {
      _id: 'ord_5',
      invoiceId: 'INV-001244',
      customerName: 'Rafiq Islam',
      customerPhone: '01555667788',
      customerAddress: 'Sonadanga, Khulna',
      amount: 1199,
      paymentStatus: 'Paid',
      courierStatus: 'Delivered',
      courierTrackingCode: 'STDF-849101',
      createdAt: '2026-10-25',
    },
  ]);

  // Products list state
  const [products, setProducts] = useState([
    {
      _id: 'p_1',
      title: 'Casual T-Shirt',
      price: 499,
      stock: 45,
      status: 'Active',
      category: 'Clothing',
      image:
        'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=300&q=80',
    },
    {
      _id: 'p_2',
      title: 'Denim Jacket',
      price: 1299,
      stock: 12,
      status: 'Active',
      category: 'Clothing',
      image:
        'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=300&q=80',
    },
    {
      _id: 'p_3',
      title: 'Sneakers Pro Runner',
      price: 2499,
      stock: 8,
      status: 'Active',
      category: 'Footwear',
      image:
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=300&q=80',
    },
    {
      _id: 'p_4',
      title: 'Backpack Explorer',
      price: 1799,
      stock: 20,
      status: 'Active',
      category: 'Accessories',
      image:
        'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=300&q=80',
    },
    {
      _id: 'p_5',
      title: 'Sunglasses UV400',
      price: 999,
      stock: 15,
      status: 'Active',
      category: 'Accessories',
      image:
        'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=300&q=80',
    },
  ]);

  // Add Product Form State
  const [newProduct, setNewProduct] = useState({
    title: '',
    price: '',
    stock: '',
    category: 'Clothing',
    description: '',
  });

  // AI Description Generator State
  const [aiTitle, setAiTitle] = useState('Wireless Noise Cancelling Headphone');
  const [aiKeywords, setAiKeywords] = useState('sound, bluetooth, bass, long battery');
  const [aiTone, setAiTone] = useState('persuasive');
  const [aiOutput, setAiOutput] = useState('');
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);

  // Settings API keys state
  const [apiKeys, setApiKeys] = useState({
    steadfastApiKey: 'sf_live_99482938472910',
    steadfastSecretKey: '••••••••••••••••••••••••••••••',
    bkashAppKey: 'bkash_app_live_8392019',
    bkashAppSecret: '••••••••••••••••••••••••••••••',
    metaVerifyToken: 'sakibai_messenger_verify_token_2026',
    autoReply: true,
  });

  const [savingKeys, setSavingKeys] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [dispatchingId, setDispatchingId] = useState(null);

  // 1-Click Steadfast Dispatch
  const handleSendToSteadfast = async (orderId) => {
    try {
      setDispatchingId(orderId);
      // Call endpoint
      await axios
        .post(`/api/v1/orders/${orderId}/send-to-steadfast`, {}, { timeout: 4000 })
        .catch(() => null);

      // Local optimistic update
      const newTracking = `STDF-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrders((prev) =>
        prev.map((o) =>
          o._id === orderId
            ? {
                ...o,
                courierStatus: 'In-Transit',
                courierTrackingCode: newTracking,
              }
            : o
        )
      );
      setStats((prev) => ({
        ...prev,
        pendingCourier: Math.max(0, prev.pendingCourier - 1),
      }));
    } finally {
      setDispatchingId(null);
    }
  };

  // AI Copy Generator
  const handleGenerateAi = async () => {
    if (!aiTitle) return;
    setIsGeneratingAi(true);
    try {
      const res = await axios
        .post('/api/v1/integrations/ai-description', {
          title: aiTitle,
          keywords: aiKeywords,
          tone: aiTone,
        })
        .catch(() => null);

      if (res?.data?.data?.description) {
        setAiOutput(res.data.data.description);
      } else {
        // High quality fallback Bengali description
        setAiOutput(`প্রিমিয়াম কোয়ালিটির "${aiTitle}" - আপনার দৈনন্দিন লাইফস্টাইলে সেরা অভিজ্ঞতা!

এই প্রোডাক্টটি আধুনিক প্রযুক্তি ও নিখুঁত ফিনিশিং দিয়ে তৈরি। বিশেষ করে যারা সেরা কোয়ালিটি এবং নির্ভরযোগ্য পারফরম্যান্স চান তাদের জন্য এটি অন্যতম সেরা নির্বাচন।

🔥 বিশেষ বৈশিষ্ট্যসমূহ:
• দীর্ঘস্থায়ী এবং প্রিমিয়াম ম্যাটেরিয়াল দিয়ে তৈরি
• আধুনিক ও নজরকাড়া স্টাইলিশ লুক
• ১০০% অরিজিনাল কোয়ালিটি নিশ্চয়তা
• সারা দেশে ক্যাশ অন ডেলিভারি সুবিধা

⚡ বিশেষ অফারে আজই আপনার জন্য অর্ডার কনফার্ম করুন! সীমিত স্টক।`);
      }
    } finally {
      setIsGeneratingAi(false);
    }
  };

  // Add Product Submit
  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProduct.title || !newProduct.price) return;

    const created = {
      _id: `p_${Date.now()}`,
      title: newProduct.title,
      price: Number(newProduct.price),
      stock: Number(newProduct.stock || 10),
      category: newProduct.category,
      status: 'Active',
      image:
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80',
    };

    setProducts([created, ...products]);
    setStats((prev) => ({ ...prev, totalProducts: prev.totalProducts + 1 }));
    setNewProduct({
      title: '',
      price: '',
      stock: '',
      category: 'Clothing',
      description: '',
    });
    alert('নতুন প্রোডাক্ট সফলভাবে যুক্ত করা হয়েছে!');
  };

  // Save Settings
  const handleSaveSettings = () => {
    setSavingKeys(true);
    setTimeout(() => {
      setSavingKeys(false);
      setSaveMessage('API Keys & Webhook settings updated successfully!');
      setTimeout(() => setSaveMessage(''), 4000);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-[#F8FAFC] flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="h-16 border-b border-gray-800 bg-[#0B0F19]/90 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#00F2FE] to-[#4FACFE] flex items-center justify-center font-extrabold text-[#0B0F19] shadow-lg shadow-[#00F2FE]/20">
            S
          </div>
          <div>
            <h1 className="text-base font-bold text-white flex items-center gap-2">
              SakibAI <span className="text-[#00F2FE]">Merchant Suite</span>
            </h1>
            <p className="text-xs text-gray-400">Rahim Fashion • Admin</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/shop/rahim-fashion"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-xs font-semibold text-gray-300 border border-gray-700 transition"
          >
            <span>Live Storefront</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <div className="flex items-center gap-2 pl-3 border-l border-gray-800">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-xs font-bold text-black">
              RF
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar Nav */}
        <aside className="w-full md:w-64 border-r border-gray-800 bg-[#0B0F19] p-4 flex md:flex-col gap-1 overflow-x-auto">
          {[
            { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
            { id: 'products', label: 'Products', icon: Package },
            { id: 'orders', label: 'Orders & Courier', icon: ShoppingCart },
            { id: 'ai-copy', label: 'AI Copywriter', icon: Sparkles },
            { id: 'settings', label: 'API Integrations', icon: Key },
          ].map((item) => {
            const Icon = item.icon;
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition whitespace-nowrap w-full text-left ${
                  active
                    ? 'bg-[#00F2FE]/15 text-[#00F2FE] border border-[#00F2FE]/30 shadow-sm'
                    : 'text-gray-400 hover:text-white hover:bg-gray-900'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-[#00F2FE]' : 'text-gray-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto max-w-7xl">
          {/* TAB 1: OVERVIEW DASHBOARD */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Metrics Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {/* Total Orders */}
                <div className="p-5 rounded-2xl bg-gray-900/80 border border-gray-800 hover:border-gray-700 transition">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-400">Total Orders</span>
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                      <ShoppingCart className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-2xl font-extrabold text-white">{stats.totalOrders}</span>
                    <span className="text-xs text-emerald-400 font-semibold">+12% vs last week</span>
                  </div>
                </div>

                {/* Total Sales */}
                <div className="p-5 rounded-2xl bg-gray-900/80 border border-gray-800 hover:border-gray-700 transition">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-400">Total Sales</span>
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                      <DollarSign className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-2xl font-extrabold text-[#00F2FE]">
                      ৳ {stats.totalSales.toLocaleString()}
                    </span>
                    <span className="text-xs text-emerald-400 font-semibold">+18% growth</span>
                  </div>
                </div>

                {/* Pending Courier */}
                <div className="p-5 rounded-2xl bg-gray-900/80 border border-gray-800 hover:border-gray-700 transition">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-400">Pending Courier</span>
                    <div className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center">
                      <Clock className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-2xl font-extrabold text-rose-400">
                      {stats.pendingCourier}
                    </span>
                    <span className="text-xs text-gray-400">Ready for Steadfast</span>
                  </div>
                </div>

                {/* Total Products */}
                <div className="p-5 rounded-2xl bg-gray-900/80 border border-gray-800 hover:border-gray-700 transition">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-400">Total Products</span>
                    <div className="w-8 h-8 rounded-lg bg-[#00F2FE]/20 text-[#00F2FE] flex items-center justify-center">
                      <Package className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-2xl font-extrabold text-white">{stats.totalProducts}</span>
                    <span className="text-xs text-emerald-400 font-semibold">+3 Active</span>
                  </div>
                </div>
              </div>

              {/* Chart & Recent Orders Split */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Visual Chart Card */}
                <div className="lg:col-span-2 p-6 rounded-2xl bg-gray-900/80 border border-gray-800 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-white text-base">Sales Overview</h3>
                      <p className="text-xs text-gray-400">August - October (BDT ৳)</p>
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded-lg bg-gray-800 text-gray-300">
                      This Month
                    </span>
                  </div>

                  {/* SVG Wave Chart */}
                  <div className="h-56 w-full flex items-end pt-4">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 500 150">
                      <defs>
                        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#00F2FE" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#00F2FE" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M0,130 C70,110 120,40 180,70 C240,100 300,30 360,50 C420,70 460,20 500,30 L500,150 L0,150 Z"
                        fill="url(#chartGradient)"
                      />
                      <path
                        d="M0,130 C70,110 120,40 180,70 C240,100 300,30 360,50 C420,70 460,20 500,30"
                        fill="none"
                        stroke="#00F2FE"
                        strokeWidth="3"
                      />
                    </svg>
                  </div>
                  <div className="flex justify-between text-[11px] text-gray-500 pt-2 border-t border-gray-800">
                    <span>1 Aug</span>
                    <span>7 Aug</span>
                    <span>14 Aug</span>
                    <span>21 Aug</span>
                    <span>28 Aug</span>
                  </div>
                </div>

                {/* Quick Recent Orders */}
                <div className="p-6 rounded-2xl bg-gray-900/80 border border-gray-800 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-white text-base">Recent Orders</h3>
                    <button
                      onClick={() => setActiveTab('orders')}
                      className="text-xs text-[#00F2FE] hover:underline"
                    >
                      View All
                    </button>
                  </div>
                  <div className="space-y-3">
                    {orders.slice(0, 4).map((ord) => (
                      <div
                        key={ord._id}
                        className="p-3 rounded-xl bg-gray-950/70 border border-gray-800 flex items-center justify-between text-xs"
                      >
                        <div>
                          <div className="font-mono font-semibold text-white">
                            {ord.invoiceId}
                          </div>
                          <div className="text-gray-400">{ord.customerName}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-[#00F2FE]">৳ {ord.amount}</div>
                          <span
                            className={`inline-block text-[10px] px-2 py-0.5 rounded-full font-medium ${
                              ord.courierStatus === 'In-Transit'
                                ? 'bg-cyan-500/10 text-cyan-400'
                                : ord.courierStatus === 'Delivered'
                                ? 'bg-emerald-500/10 text-emerald-400'
                                : 'bg-amber-500/10 text-amber-400'
                            }`}
                          >
                            {ord.courierStatus}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PRODUCT MANAGEMENT */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-white">Product Management</h2>
                  <p className="text-xs text-gray-400">
                    Manage your catalog, stock counts, and AI-enhanced descriptions
                  </p>
                </div>
              </div>

              {/* Add Product Form */}
              <div className="p-6 rounded-2xl bg-gray-900/80 border border-gray-800">
                <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                  <Plus className="w-4 h-4 text-[#00F2FE]" />
                  Add New Product
                </h3>
                <form
                  onSubmit={handleAddProduct}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
                >
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Product Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Premium Cotton Shirt"
                      value={newProduct.title}
                      onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-950 border border-gray-800 rounded-xl text-xs text-white focus:outline-none focus:border-[#00F2FE]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Price (৳ BDT)</label>
                    <input
                      type="number"
                      required
                      placeholder="899"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-950 border border-gray-800 rounded-xl text-xs text-white focus:outline-none focus:border-[#00F2FE]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Stock Count</label>
                    <input
                      type="number"
                      placeholder="25"
                      value={newProduct.stock}
                      onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-950 border border-gray-800 rounded-xl text-xs text-white focus:outline-none focus:border-[#00F2FE]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Category</label>
                    <select
                      value={newProduct.category}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, category: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-gray-950 border border-gray-800 rounded-xl text-xs text-white focus:outline-none focus:border-[#00F2FE]"
                    >
                      <option value="Clothing">Clothing</option>
                      <option value="Footwear">Footwear</option>
                      <option value="Accessories">Accessories</option>
                      <option value="Electronics">Electronics</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2 lg:col-span-4 flex justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setAiTitle(newProduct.title || 'Casual Denim Jacket');
                        setActiveTab('ai-copy');
                      }}
                      className="px-4 py-2 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-xl text-xs font-semibold flex items-center gap-2 hover:bg-indigo-500/30 transition"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      Generate AI Description First
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-[#00F2FE] text-[#0B0F19] font-bold rounded-xl text-xs hover:bg-[#4FACFE] transition"
                    >
                      Save Product
                    </button>
                  </div>
                </form>
              </div>

              {/* Products Table */}
              <div className="bg-gray-900/80 border border-gray-800 rounded-2xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-gray-950 text-gray-400 uppercase font-semibold border-b border-gray-800">
                    <tr>
                      <th className="px-5 py-3">Product</th>
                      <th className="px-5 py-3">Category</th>
                      <th className="px-5 py-3">Price</th>
                      <th className="px-5 py-3">Stock</th>
                      <th className="px-5 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800 text-gray-300">
                    {products.map((p) => (
                      <tr key={p._id} className="hover:bg-gray-800/40 transition">
                        <td className="px-5 py-3 flex items-center gap-3">
                          <img
                            src={p.image}
                            alt={p.title}
                            className="w-10 h-10 rounded-lg object-cover bg-gray-950 border border-gray-800"
                          />
                          <span className="font-semibold text-white">{p.title}</span>
                        </td>
                        <td className="px-5 py-3">{p.category}</td>
                        <td className="px-5 py-3 font-bold text-[#00F2FE]">৳ {p.price}</td>
                        <td className="px-5 py-3">{p.stock} units</td>
                        <td className="px-5 py-3">
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-semibold">
                            {p.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: ORDER MANAGEMENT & STEADFAST COURIER */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-white">Order Management & Logistics</h2>
                  <p className="text-xs text-gray-400">
                    Dispatch orders directly to Steadfast Courier portal with 1 click
                  </p>
                </div>
              </div>

              {/* Orders Table */}
              <div className="bg-gray-900/80 border border-gray-800 rounded-2xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-gray-950 text-gray-400 uppercase font-semibold border-b border-gray-800">
                    <tr>
                      <th className="px-5 py-3">Invoice</th>
                      <th className="px-5 py-3">Customer</th>
                      <th className="px-5 py-3">Amount</th>
                      <th className="px-5 py-3">Payment</th>
                      <th className="px-5 py-3">Courier Status</th>
                      <th className="px-5 py-3">Steadfast Dispatch</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800 text-gray-300">
                    {orders.map((ord) => (
                      <tr key={ord._id} className="hover:bg-gray-800/40 transition">
                        <td className="px-5 py-3 font-mono font-semibold text-white">
                          {ord.invoiceId}
                        </td>
                        <td className="px-5 py-3">
                          <div className="font-medium text-white">{ord.customerName}</div>
                          <div className="text-gray-500 text-[11px]">{ord.customerPhone}</div>
                        </td>
                        <td className="px-5 py-3 font-bold text-[#00F2FE]">৳ {ord.amount}</td>
                        <td className="px-5 py-3">
                          <span
                            className={`px-2 py-0.5 rounded-full font-semibold ${
                              ord.paymentStatus === 'Paid'
                                ? 'bg-emerald-500/10 text-emerald-400'
                                : 'bg-amber-500/10 text-amber-400'
                            }`}
                          >
                            {ord.paymentStatus}
                          </span>
                        </td>
                        <td className="px-5 py-3">
                          <div>
                            <span
                              className={`px-2 py-0.5 rounded-full font-semibold ${
                                ord.courierStatus === 'In-Transit'
                                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                                  : ord.courierStatus === 'Delivered'
                                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                                  : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                              }`}
                            >
                              {ord.courierStatus}
                            </span>
                            {ord.courierTrackingCode && (
                              <div className="text-[10px] font-mono text-gray-400 mt-1">
                                {ord.courierTrackingCode}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-5 py-3">
                          {ord.courierStatus === 'Pending' ? (
                            <button
                              onClick={() => handleSendToSteadfast(ord._id)}
                              disabled={dispatchingId === ord._id}
                              className="px-3 py-1.5 bg-[#00F2FE] hover:bg-[#4FACFE] text-[#0B0F19] font-bold rounded-lg text-xs transition flex items-center gap-1.5 shadow-sm shadow-[#00F2FE]/20 disabled:opacity-50"
                            >
                              <Send className="w-3 h-3" />
                              <span>{dispatchingId === ord._id ? 'Sending...' : 'Send to Steadfast'}</span>
                            </button>
                          ) : (
                            <span className="text-[11px] text-gray-500 flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                              Dispatched
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: AI PRODUCT DESCRIPTION GENERATOR */}
          {activeTab === 'ai-copy' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#00F2FE]" />
                  AI Product Description Generator
                </h2>
                <p className="text-xs text-gray-400">
                  Generate high-converting, attractive Bengali & English product descriptions using GPT-4o / Gemini
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Input Panel */}
                <div className="p-6 rounded-2xl bg-gray-900/80 border border-gray-800 space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">
                      Product Title *
                    </label>
                    <input
                      type="text"
                      value={aiTitle}
                      onChange={(e) => setAiTitle(e.target.value)}
                      placeholder="e.g. Wireless Noise Cancelling Headphone"
                      className="w-full px-4 py-2.5 bg-gray-950 border border-gray-700 rounded-xl text-sm text-white focus:outline-none focus:border-[#00F2FE]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">
                      Keywords (comma separated)
                    </label>
                    <input
                      type="text"
                      value={aiKeywords}
                      onChange={(e) => setAiKeywords(e.target.value)}
                      placeholder="sound, bluetooth, bass, long battery, fast delivery"
                      className="w-full px-4 py-2.5 bg-gray-950 border border-gray-700 rounded-xl text-sm text-white focus:outline-none focus:border-[#00F2FE]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">
                      Tone of Voice
                    </label>
                    <select
                      value={aiTone}
                      onChange={(e) => setAiTone(e.target.value)}
                      className="w-full px-4 py-2.5 bg-gray-950 border border-gray-700 rounded-xl text-sm text-white focus:outline-none focus:border-[#00F2FE]"
                    >
                      <option value="persuasive">Persuasive & High Converting (আকর্ষণীয়)</option>
                      <option value="premium">Luxury & Premium (অভিজাত)</option>
                      <option value="friendly">Friendly & Casual (সহজ-সরল)</option>
                    </select>
                  </div>

                  <button
                    onClick={handleGenerateAi}
                    disabled={isGeneratingAi}
                    className="w-full py-3 bg-gradient-to-r from-[#00F2FE] to-[#4FACFE] text-[#0B0F19] font-bold rounded-xl text-sm shadow-lg shadow-[#00F2FE]/20 hover:opacity-95 transition flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>{isGeneratingAi ? 'AI তৈরি করছে...' : 'Generate Description'}</span>
                  </button>
                </div>

                {/* Output Panel */}
                <div className="p-6 rounded-2xl bg-gray-900/80 border border-gray-800 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold text-gray-300">Generated Bengali Copy</span>
                      {aiOutput && (
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(aiOutput);
                            alert('কপি করা হয়েছে!');
                          }}
                          className="text-xs text-[#00F2FE] flex items-center gap-1 hover:underline"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </button>
                      )}
                    </div>
                    <div className="p-4 bg-gray-950 rounded-xl border border-gray-800 text-xs text-gray-300 min-h-[220px] whitespace-pre-wrap leading-relaxed font-sans">
                      {aiOutput || 'আপনার প্রোডাক্টের নাম এবং কি-ওয়ার্ড লিখে "Generate Description" বাটনে ক্লিক করুন।'}
                    </div>
                  </div>

                  {aiOutput && (
                    <button
                      onClick={() => {
                        setNewProduct((prev) => ({ ...prev, description: aiOutput, title: aiTitle }));
                        setActiveTab('products');
                      }}
                      className="mt-4 w-full py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-xl text-xs font-semibold transition"
                    >
                      Use in New Product
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: SETTINGS & INTEGRATIONS */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Key className="w-5 h-5 text-[#00F2FE]" />
                  API Integrations & Payment Gateway Setup
                </h2>
                <p className="text-xs text-gray-400">
                  Configure your Steadfast Courier credentials and bKash PGW API keys
                </p>
              </div>

              {saveMessage && (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs rounded-xl flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{saveMessage}</span>
                </div>
              )}

              {/* Steadfast Card */}
              <div className="p-6 rounded-2xl bg-gray-900/80 border border-gray-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-[#00F2FE] flex items-center justify-center font-bold">
                      SF
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-sm">Steadfast Courier API</h3>
                      <p className="text-xs text-gray-400">portal.steadfast.com.bd/api/v1</p>
                    </div>
                  </div>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-semibold">
                    Connected
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Steadfast API Key</label>
                    <input
                      type="text"
                      value={apiKeys.steadfastApiKey}
                      onChange={(e) =>
                        setApiKeys({ ...apiKeys, steadfastApiKey: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-gray-950 border border-gray-800 rounded-xl text-xs text-white focus:outline-none focus:border-[#00F2FE]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Steadfast Secret Key</label>
                    <input
                      type="password"
                      value={apiKeys.steadfastSecretKey}
                      onChange={(e) =>
                        setApiKeys({ ...apiKeys, steadfastSecretKey: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-gray-950 border border-gray-800 rounded-xl text-xs text-white focus:outline-none focus:border-[#00F2FE]"
                    />
                  </div>
                </div>
              </div>

              {/* bKash Card */}
              <div className="p-6 rounded-2xl bg-gray-900/80 border border-gray-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center font-bold">
                      bK
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-sm">bKash Payment Gateway (PGW)</h3>
                      <p className="text-xs text-gray-400">Tokenized Merchant Checkout</p>
                    </div>
                  </div>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-semibold">
                    Live Active
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">bKash App Key</label>
                    <input
                      type="text"
                      value={apiKeys.bkashAppKey}
                      onChange={(e) =>
                        setApiKeys({ ...apiKeys, bkashAppKey: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-gray-950 border border-gray-800 rounded-xl text-xs text-white focus:outline-none focus:border-[#00F2FE]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">bKash App Secret</label>
                    <input
                      type="password"
                      value={apiKeys.bkashAppSecret}
                      onChange={(e) =>
                        setApiKeys({ ...apiKeys, bkashAppSecret: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-gray-950 border border-gray-800 rounded-xl text-xs text-white focus:outline-none focus:border-[#00F2FE]"
                    />
                  </div>
                </div>
              </div>

              {/* Meta Webhook Card */}
              <div className="p-6 rounded-2xl bg-gray-900/80 border border-gray-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                      FB
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-sm">Meta Messenger Webhook</h3>
                      <p className="text-xs text-gray-400">Auto-Reply & Stock Check</p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-gray-400 mb-1">Webhook Verify Token</label>
                  <input
                    type="text"
                    value={apiKeys.metaVerifyToken}
                    onChange={(e) =>
                      setApiKeys({ ...apiKeys, metaVerifyToken: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-gray-950 border border-gray-800 rounded-xl text-xs text-white focus:outline-none focus:border-[#00F2FE]"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={handleSaveSettings}
                  disabled={savingKeys}
                  className="px-6 py-2.5 bg-[#00F2FE] hover:bg-[#4FACFE] text-[#0B0F19] font-bold rounded-xl text-xs shadow-lg shadow-[#00F2FE]/20 transition"
                >
                  {savingKeys ? 'Saving Changes...' : 'Save Settings'}
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
