import React, { useState } from 'react';
import {
  Package,
  Plus,
  Search,
  Sparkles,
  Edit2,
  Trash2,
  ExternalLink,
  X,
  CheckCircle,
} from 'lucide-react';
import { Product, AppView } from '../types';

interface ProductManagementViewProps {
  products: Product[];
  onAddProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  setCurrentView: (view: AppView) => void;
  onPrefillAiCopy: (title: string) => void;
}

export const ProductManagementView: React.FC<ProductManagementViewProps> = ({
  products,
  onAddProduct,
  onDeleteProduct,
  setCurrentView,
  onPrefillAiCopy,
}) => {
  const [filterTab, setFilterTab] = useState<'All' | 'Active' | 'Out of Stock'>('All');
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form state
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [compareAtPrice, setCompareAtPrice] = useState('');
  const [stock, setStock] = useState('20');
  const [category, setCategory] = useState('Clothing');
  const [imageUrl, setImageUrl] = useState(
    'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80'
  );
  const [description, setDescription] = useState('');

  const filtered = products.filter((p) => {
    const matchTab =
      filterTab === 'All'
        ? true
        : filterTab === 'Active'
        ? p.status === 'Active' && p.stock > 0
        : p.stock === 0 || p.status === 'Out of Stock';

    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());

    return matchTab && matchSearch;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !price) return;

    const newProd: Product = {
      id: `p_${Date.now()}`,
      title,
      price: Number(price),
      compareAtPrice: compareAtPrice ? Number(compareAtPrice) : 0,
      stock: Number(stock) || 0,
      category,
      image: imageUrl,
      description: description || 'প্রিমিয়াম কোয়ালিটির আকর্ষণীয় ফ্যাশন কালেকশন।',
      rating: 4.8,
      ratingCount: 1,
      status: Number(stock) > 0 ? 'Active' : 'Out of Stock',
      sku: `SKU-${Math.floor(1000 + Math.random() * 9000)}`,
    };

    onAddProduct(newProd);
    setIsModalOpen(false);
    setTitle('');
    setPrice('');
    setCompareAtPrice('');
    setDescription('');
  };

  return (
    <div className="space-y-6">
      {/* Header (Screen 7 Fidelity) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white">Products</h2>
          <p className="text-xs text-gray-400 mt-1">
            Manage your store inventory, pricing, and AI-optimized descriptions
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#00F2FE] to-[#4FACFE] text-[#0B0F19] text-xs sm:text-sm font-bold rounded-xl shadow-lg shadow-[#00F2FE]/20 hover:opacity-95 transition"
        >
          <Plus className="w-4 h-4" />
          <span>Add Product</span>
        </button>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 bg-gray-900/60 p-1 rounded-xl border border-gray-800 text-xs w-full sm:w-auto">
          {(['All', 'Active', 'Out of Stock'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilterTab(tab)}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                filterTab === tab
                  ? 'bg-[#00F2FE] text-[#0B0F19]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab === 'All' ? 'All Products' : tab}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-gray-500 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by title or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-gray-900 border border-gray-800 rounded-xl text-xs text-white focus:outline-none focus:border-[#00F2FE]"
          />
        </div>
      </div>

      {/* Products Table (Screen 7 Fidelity) */}
      <div className="bg-[#111827] border border-gray-800 rounded-3xl overflow-hidden shadow-xl">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead className="bg-gray-950/80 text-gray-400 uppercase text-[11px] font-semibold border-b border-gray-800">
            <tr>
              <th className="px-6 py-4">Product</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Stock</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800 text-gray-300">
            {filtered.map((p) => (
              <tr key={p.id} className="hover:bg-gray-800/30 transition">
                <td className="px-6 py-4 flex items-center gap-3">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-12 h-12 rounded-xl object-cover bg-gray-950 border border-gray-800 shrink-0"
                  />
                  <div>
                    <div className="font-bold text-white text-sm">{p.title}</div>
                    <div className="text-xs text-gray-500">{p.category} • {p.sku}</div>
                  </div>
                </td>
                <td className="px-6 py-4 font-extrabold text-[#00F2FE]">
                  ৳ {p.price.toLocaleString()}
                </td>
                <td className="px-6 py-4">
                  <span className={p.stock < 10 ? 'text-rose-400 font-bold' : 'text-gray-300'}>
                    {p.stock} units
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                      p.stock > 0
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                        : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        p.stock > 0 ? 'bg-emerald-400' : 'bg-rose-400'
                      }`}
                    />
                    {p.stock > 0 ? 'Active' : 'Out of Stock'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => {
                        onPrefillAiCopy(p.title);
                        setCurrentView('ai-generator');
                      }}
                      title="Generate AI Description"
                      className="p-1.5 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 transition"
                    >
                      <Sparkles className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDeleteProduct(p.id)}
                      title="Delete Product"
                      className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Product Modal (Screen 7 Fidelity) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#111827] border border-gray-800 rounded-3xl w-full max-w-xl p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-white p-1 rounded-lg bg-gray-800"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <Package className="w-5 h-5 text-[#00F2FE]" />
              Add New Product to Catalog
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block text-gray-300 font-semibold mb-1">Product Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Premium Cotton Casual Shirt"
                  className="w-full px-3.5 py-2.5 bg-gray-950 border border-gray-800 rounded-xl text-white focus:outline-none focus:border-[#00F2FE]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Price (৳ BDT) *</label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="799"
                    className="w-full px-3.5 py-2.5 bg-gray-950 border border-gray-800 rounded-xl text-white focus:outline-none focus:border-[#00F2FE]"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Compare Price (৳)</label>
                  <input
                    type="number"
                    value={compareAtPrice}
                    onChange={(e) => setCompareAtPrice(e.target.value)}
                    placeholder="1200"
                    className="w-full px-3.5 py-2.5 bg-gray-950 border border-gray-800 rounded-xl text-white focus:outline-none focus:border-[#00F2FE]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Stock Count</label>
                  <input
                    type="number"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    placeholder="25"
                    className="w-full px-3.5 py-2.5 bg-gray-950 border border-gray-800 rounded-xl text-white focus:outline-none focus:border-[#00F2FE]"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-gray-950 border border-gray-800 rounded-xl text-white focus:outline-none focus:border-[#00F2FE]"
                  >
                    <option value="Clothing">Clothing</option>
                    <option value="Footwear">Footwear</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Electronics">Electronics</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">Image URL</label>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-gray-950 border border-gray-800 rounded-xl text-white focus:outline-none focus:border-[#00F2FE]"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-gray-300 font-semibold">Description</label>
                  <button
                    type="button"
                    onClick={() => {
                      if (!title) {
                        alert('অনুগ্রহ করে আগে প্রোডাক্টের নাম লিখুন!');
                        return;
                      }
                      onPrefillAiCopy(title);
                      setIsModalOpen(false);
                      setCurrentView('ai-generator');
                    }}
                    className="text-xs text-[#00F2FE] hover:underline flex items-center gap-1"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Generate with AI</span>
                  </button>
                </div>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="প্রোডাক্টের বিবরণ লিখুন বা এআই দিয়ে জেনারেট করুন..."
                  className="w-full px-3.5 py-2.5 bg-gray-950 border border-gray-800 rounded-xl text-white focus:outline-none focus:border-[#00F2FE]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-xl font-semibold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-gradient-to-r from-[#00F2FE] to-[#4FACFE] text-[#0B0F19] font-bold rounded-xl shadow-lg shadow-[#00F2FE]/20 hover:opacity-95 transition"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
