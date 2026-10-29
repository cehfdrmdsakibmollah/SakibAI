import React, { useState } from 'react';
import {
  ShoppingCart,
  Star,
  Search,
  Truck,
  ShieldCheck,
  CheckCircle,
  X,
  CreditCard,
  User,
  Phone,
  MapPin,
  ArrowRight,
  QrCode,
  Printer,
  Sparkles,
} from 'lucide-react';
import { Product, Order, Merchant } from '../types';

interface StorefrontViewProps {
  products: Product[];
  merchant: Merchant;
  onOrderCreated: (order: Order) => void;
}

export const StorefrontView: React.FC<StorefrontViewProps> = ({
  products,
  merchant,
  onOrderCreated,
}) => {
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([
    { product: products[0], quantity: 1 },
  ]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState<Order | null>(null);

  // Form fields
  const [name, setName] = useState('Md Sakib Molla');
  const [phone, setPhone] = useState('01712345678');
  const [address, setAddress] = useState('House 24, Road 11, Dhanmondi, Dhaka');
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'bKash'>('COD');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = ['All', ...Array.from(new Set(products.map((p) => p.category)))];

  const filteredProducts = products.filter((p) => {
    const matchCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const idx = prev.findIndex((item) => item.product.id === product.id);
      if (idx > -1) {
        const copy = [...prev];
        copy[idx].quantity += 1;
        return copy;
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCheckoutOpen(true);
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as { product: Product; quantity: number }[]
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const subtotal = cart.reduce((acc, curr) => acc + curr.product.price * curr.quantity, 0);
  const deliveryCharge = 60;
  const grandTotal = subtotal > 0 ? subtotal + deliveryCharge : 0;
  const totalCartCount = cart.reduce((acc, curr) => acc + curr.quantity, 0);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);

      const invoiceId = `INV-${Math.floor(100000 + Math.random() * 900000)}`;
      const newOrder: Order = {
        id: `ord_${Date.now()}`,
        invoiceId,
        customerName: name,
        customerPhone: phone,
        customerAddress: address,
        items: cart.map((c) => ({
          productId: c.product.id,
          title: c.product.title,
          price: c.product.price,
          quantity: c.quantity,
          image: c.product.image,
        })),
        amount: grandTotal,
        deliveryCharge,
        paymentMethod,
        paymentStatus: paymentMethod === 'bKash' ? 'Paid' : 'Pending',
        courierStatus: 'Pending',
        createdAt: new Date().toISOString().split('T')[0],
        fraudScore: 4,
      };

      onOrderCreated(newOrder);
      setOrderConfirmed(newOrder);
      setCart([]);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-[#F8FAFC]">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#00F2FE]/20 via-[#4FACFE]/20 to-[#00F2FE]/20 border-b border-[#00F2FE]/30 py-2 px-4 text-center text-xs font-semibold text-[#00F2FE] flex items-center justify-center gap-2">
        <Truck className="w-4 h-4" />
        <span>Steadfast Courier এর মাধ্যমে সারা দেশে ৩ দিনে হোম ডেলিভারি!</span>
      </div>

      {/* Store Header (Screen 4 Fidelity) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 border-b border-gray-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#00F2FE] to-[#4FACFE] flex items-center justify-center font-bold text-[#0B0F19] shadow-lg shadow-[#00F2FE]/20">
            {merchant.storeName.charAt(0)}
          </div>
          <div>
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              {merchant.storeName}
              <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                Live Store
              </span>
            </h1>
            <p className="text-xs text-gray-400">
              {merchant.storeSubdomain}.sakibai.app
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-md mx-2">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-gray-900 border border-gray-800 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-[#00F2FE]"
            />
          </div>
        </div>

        {/* Cart Trigger */}
        <button
          onClick={() => setIsCheckoutOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#00F2FE] to-[#4FACFE] text-[#0B0F19] font-bold rounded-xl text-xs sm:text-sm shadow-lg shadow-[#00F2FE]/20 hover:opacity-95 transition"
        >
          <ShoppingCart className="w-4 h-4" />
          <span>Cart</span>
          <span className="bg-[#0B0F19] text-[#00F2FE] text-xs px-2 py-0.5 rounded-full font-extrabold">
            {totalCartCount}
          </span>
        </button>
      </div>

      {/* Hero Banner (Screen 4 Fidelity) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-gray-900 via-[#111827] to-[#0B0F19] border border-gray-800 p-8 sm:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl space-y-4">
            <span className="inline-block px-3 py-1 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-bold uppercase tracking-wider">
              Up to 50% OFF
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
              Trendy{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F2FE] to-[#4FACFE]">
                Fashion
              </span>{' '}
              For a Better You
            </h2>
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
              সেরা ফেব্রিক ও আধুনিক ডিজাইনের সমন্বয়ে প্রস্তুতকৃত এক্সক্লুসিভ কালেকশন। দ্রুত হোম ডেলিভারি ও ক্যাশ অন ডেলিভারি সুবিধা উপভোগ করুন।
            </p>
            <div className="pt-2">
              <a
                href="#catalog"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#00F2FE] text-[#0B0F19] font-bold rounded-xl text-xs sm:text-sm hover:bg-[#4FACFE] transition shadow-lg shadow-[#00F2FE]/25"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="relative w-full max-w-sm h-64 rounded-2xl overflow-hidden shadow-2xl border border-gray-800">
            <img
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=700&q=80"
              alt="Fashion banner"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-transparent opacity-60" />
          </div>
        </div>
      </div>

      {/* Categories & Product Grid (Screen 4 Fidelity) */}
      <div id="catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                  selectedCategory === cat
                    ? 'bg-[#00F2FE] text-[#0B0F19] font-bold'
                    : 'bg-gray-900 text-gray-300 hover:bg-gray-800 border border-gray-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <span className="text-xs text-gray-400">
            {filteredProducts.length} items
          </span>
        </div>

        {/* 4 Cards Grid Matching Screen 4 (Casual T-Shirt, Denim Jacket, Sneakers, Backpack) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((p) => (
            <div
              key={p.id}
              className="group bg-gray-900/80 border border-gray-800 rounded-2xl overflow-hidden hover:border-[#00F2FE]/50 transition duration-300 flex flex-col justify-between hover:shadow-xl hover:shadow-[#00F2FE]/10"
            >
              <div className="relative aspect-square w-full bg-gray-950 overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <span className="absolute top-3 left-3 bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Sale
                </span>
                <span className="absolute top-3 right-3 bg-gray-900/80 backdrop-blur-md text-emerald-400 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-emerald-500/30">
                  Stock: {p.stock}
                </span>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center gap-1 text-amber-400 text-xs mb-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span className="font-semibold">{p.rating}</span>
                    <span className="text-gray-500">({p.ratingCount})</span>
                  </div>
                  <h3 className="font-bold text-white text-sm group-hover:text-[#00F2FE] transition">
                    {p.title}
                  </h3>
                  <p className="text-xs text-gray-400 line-clamp-1 mt-1">
                    {p.description}
                  </p>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-base font-extrabold text-white">
                      ৳ {p.price.toLocaleString()}
                    </span>
                    {p.compareAtPrice && (
                      <span className="text-xs text-gray-500 line-through">
                        ৳ {p.compareAtPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => addToCart(p)}
                  className="w-full py-2.5 bg-gray-800 hover:bg-[#00F2FE] text-white hover:text-[#0B0F19] font-bold rounded-xl text-xs transition flex items-center justify-center gap-2 active:scale-95"
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Checkout Modal (COD / bKash) */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#111827] border border-gray-800 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => {
                setIsCheckoutOpen(false);
                setOrderConfirmed(null);
              }}
              className="absolute top-5 right-5 text-gray-400 hover:text-white p-1 rounded-lg bg-gray-800"
            >
              <X className="w-5 h-5" />
            </button>

            {orderConfirmed ? (
              /* Receipt & Confirmation View */
              <div className="text-center py-6 space-y-4">
                <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-extrabold text-white">
                  অর্ডার সফলভাবে গ্রহণ করা হয়েছে!
                </h3>
                <p className="text-xs text-gray-400">
                  আপনার ইনভয়েস নম্বর:{' '}
                  <span className="font-mono text-[#00F2FE] font-bold">
                    {orderConfirmed.invoiceId}
                  </span>
                </p>

                {/* Printable Invoice Card */}
                <div className="p-5 bg-gray-950 border border-gray-800 rounded-2xl text-left text-xs space-y-3 max-w-md mx-auto">
                  <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                    <span className="font-bold text-white">Rahim Fashion Invoice</span>
                    <span className="font-mono text-[10px] text-gray-400">
                      {orderConfirmed.createdAt}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-400">গ্রাহক:</span>
                    <span className="text-white font-medium">
                      {orderConfirmed.customerName}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">মোবাইল:</span>
                    <span className="text-white font-medium">
                      {orderConfirmed.customerPhone}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">ঠিকানা:</span>
                    <span className="text-white font-medium text-right max-w-[200px] truncate">
                      {orderConfirmed.customerAddress}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">পেমেন্ট মেথড:</span>
                    <span className="text-emerald-400 font-semibold">
                      {orderConfirmed.paymentMethod === 'bKash'
                        ? 'bKash PGW (Paid)'
                        : 'Cash on Delivery (Pending)'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">কুরিয়ার স্ট্যাটাস:</span>
                    <span className="text-cyan-400 font-semibold">
                      Pending Steadfast Pickup
                    </span>
                  </div>

                  <div className="border-t border-gray-800 pt-2 flex justify-between font-bold text-sm">
                    <span className="text-white">সর্বমোট প্রদেয়:</span>
                    <span className="text-[#00F2FE]">
                      ৳ {orderConfirmed.amount.toLocaleString()}
                    </span>
                  </div>

                  {/* QR & Barcode Illustration */}
                  <div className="pt-2 flex items-center justify-between border-t border-gray-800 text-[10px] text-gray-400">
                    <div className="flex items-center gap-1.5">
                      <QrCode className="w-5 h-5 text-gray-400" />
                      <span>Scan for Steadfast Live Status</span>
                    </div>
                    <span className="font-mono tracking-widest">||| | |||| | |||</span>
                  </div>
                </div>

                <div className="pt-2 flex justify-center gap-3">
                  <button
                    onClick={() => window.print()}
                    className="px-4 py-2 bg-gray-800 text-gray-200 text-xs font-semibold rounded-xl flex items-center gap-2 hover:bg-gray-700 transition"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Invoice</span>
                  </button>
                  <button
                    onClick={() => {
                      setIsCheckoutOpen(false);
                      setOrderConfirmed(null);
                    }}
                    className="px-5 py-2 bg-[#00F2FE] text-[#0B0F19] text-xs font-bold rounded-xl hover:opacity-90 transition"
                  >
                    আরো শপিং করুন
                  </button>
                </div>
              </div>
            ) : (
              /* Checkout Form */
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-gray-800 pb-3">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5 text-[#00F2FE]" />
                    Quick Checkout & Cart
                  </h3>
                  <span className="text-xs text-gray-400">{cart.length} items</span>
                </div>

                {cart.length === 0 ? (
                  <div className="text-center py-10 text-gray-400 space-y-2">
                    <ShoppingCart className="w-10 h-10 mx-auto opacity-30" />
                    <p className="text-sm">আপনার কার্ট খালি আছে।</p>
                  </div>
                ) : (
                  <>
                    {/* Cart Items list */}
                    <div className="divide-y divide-gray-800 max-h-44 overflow-y-auto pr-1">
                      {cart.map((item) => (
                        <div
                          key={item.product.id}
                          className="py-2.5 flex items-center justify-between gap-3 text-xs"
                        >
                          <div className="flex items-center gap-2.5">
                            <img
                              src={item.product.image}
                              alt={item.product.title}
                              className="w-10 h-10 rounded-lg object-cover bg-gray-900 border border-gray-800"
                            />
                            <div>
                              <div className="font-semibold text-white">
                                {item.product.title}
                              </div>
                              <div className="text-[#00F2FE] font-bold">
                                ৳ {item.product.price}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.product.id, -1)}
                              className="w-6 h-6 rounded bg-gray-800 hover:bg-gray-700 text-white font-bold flex items-center justify-center text-xs"
                            >
                              -
                            </button>
                            <span className="w-4 text-center font-bold">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, 1)}
                              className="w-6 h-6 rounded bg-gray-800 hover:bg-gray-700 text-white font-bold flex items-center justify-center text-xs"
                            >
                              +
                            </button>
                            <button
                              onClick={() => removeFromCart(item.product.id)}
                              className="text-gray-500 hover:text-rose-400 ml-1"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Summary Box */}
                    <div className="bg-gray-950 p-3.5 rounded-xl border border-gray-800 text-xs space-y-1.5">
                      <div className="flex justify-between text-gray-400">
                        <span>উপ-মোট (Subtotal)</span>
                        <span>৳ {subtotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-gray-400">
                        <span>ডেলিভারি চার্জ (Steadfast)</span>
                        <span>৳ {deliveryCharge}</span>
                      </div>
                      <div className="flex justify-between font-bold text-white border-t border-gray-800 pt-2 text-sm">
                        <span>সর্বমোট (Grand Total)</span>
                        <span className="text-[#00F2FE]">
                          ৳ {grandTotal.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Checkout Form */}
                    <form onSubmit={handleCheckout} className="space-y-3.5 text-xs">
                      <div>
                        <label className="block font-semibold text-gray-300 mb-1">
                          আপনার নাম *
                        </label>
                        <div className="relative">
                          <User className="w-3.5 h-3.5 text-gray-500 absolute left-3 top-3" />
                          <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="যেমন: সাকিব হাসান"
                            className="w-full pl-8 pr-3 py-2 bg-gray-950 border border-gray-800 rounded-xl text-white focus:outline-none focus:border-[#00F2FE]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-semibold text-gray-300 mb-1">
                          মোবাইল নম্বর (১১ ডিজিট) *
                        </label>
                        <div className="relative">
                          <Phone className="w-3.5 h-3.5 text-gray-500 absolute left-3 top-3" />
                          <input
                            type="tel"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="017XXXXXXXX"
                            className="w-full pl-8 pr-3 py-2 bg-gray-950 border border-gray-800 rounded-xl text-white focus:outline-none focus:border-[#00F2FE]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-semibold text-gray-300 mb-1">
                          ডেলিভারি ঠিকানা (বাসা/রোড, থানা, জেলা) *
                        </label>
                        <div className="relative">
                          <MapPin className="w-3.5 h-3.5 text-gray-500 absolute left-3 top-3" />
                          <input
                            type="text"
                            required
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="বাড়ি নং, রোড, থানা, জেলা"
                            className="w-full pl-8 pr-3 py-2 bg-gray-950 border border-gray-800 rounded-xl text-white focus:outline-none focus:border-[#00F2FE]"
                          />
                        </div>
                      </div>

                      {/* Payment Method Selector */}
                      <div>
                        <label className="block font-semibold text-gray-300 mb-1.5">
                          পেমেন্ট মেথড
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            type="button"
                            onClick={() => setPaymentMethod('COD')}
                            className={`p-2.5 rounded-xl border flex items-center justify-center gap-2 font-semibold transition ${
                              paymentMethod === 'COD'
                                ? 'bg-emerald-500/15 border-emerald-500 text-emerald-400'
                                : 'bg-gray-950 border-gray-800 text-gray-400'
                            }`}
                          >
                            <Truck className="w-4 h-4" />
                            <span>Cash on Delivery</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setPaymentMethod('bKash')}
                            className={`p-2.5 rounded-xl border flex items-center justify-center gap-2 font-semibold transition ${
                              paymentMethod === 'bKash'
                                ? 'bg-pink-600/20 border-pink-500 text-pink-400'
                                : 'bg-gray-950 border-gray-800 text-gray-400'
                            }`}
                          >
                            <CreditCard className="w-4 h-4" />
                            <span>bKash Payment</span>
                          </button>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 bg-gradient-to-r from-[#00F2FE] to-[#4FACFE] text-[#0B0F19] font-extrabold rounded-xl text-xs sm:text-sm shadow-lg shadow-[#00F2FE]/25 hover:opacity-95 transition flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
                      >
                        {isSubmitting ? (
                          <span>অর্ডার প্রসেস হচ্ছে...</span>
                        ) : (
                          <>
                            <span>অর্ডার কনফার্ম করুন (৳ {grandTotal.toLocaleString()})</span>
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </form>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
