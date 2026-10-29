import React, { useState } from 'react';
import {
  Layers,
  Search,
  CheckCircle2,
  Sparkles,
  Zap,
  Shield,
  CreditCard,
  Truck,
  Bot,
  Settings,
} from 'lucide-react';
import { MASTER_50_FEATURES, FeatureItem } from '../data/mockData';

export const Features50View: React.FC = () => {
  const [selectedPart, setSelectedPart] = useState<string>('All');
  const [search, setSearch] = useState<string>('');

  const parts = [
    'All',
    'Part 1: Storefront & E-Commerce',
    'Part 2: Localized Payment & Financials',
    'Part 3: Logistics & Courier Automation',
    'Part 4: AI Automation & Chatbot',
    'Part 5: Admin, Security & Scale',
  ];

  const filtered = MASTER_50_FEATURES.filter((item) => {
    const matchPart = selectedPart === 'All' || item.part === selectedPart;
    const matchSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.descriptionBangla.includes(search) ||
      item.badge.toLowerCase().includes(search.toLowerCase());
    return matchPart && matchSearch;
  });

  return (
    <div className="space-y-8 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00F2FE]/10 border border-[#00F2FE]/30 text-xs font-bold text-[#00F2FE] mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Complete Architecture Roadmap</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white">
            50 Advanced Enterprise Features Master List
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 mt-1 max-w-2xl">
            SaaS multi-vendor e-commerce & AI automation platform (Shopify + ManyChat + Steadfast + bKash PGW all in one).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-semibold">
            50 of 50 Features Mastered
          </span>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 w-full lg:w-auto scrollbar-none">
          {parts.map((p) => (
            <button
              key={p}
              onClick={() => setSelectedPart(p)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                selectedPart === p
                  ? 'bg-[#00F2FE] text-[#0B0F19] font-bold shadow-md shadow-[#00F2FE]/20'
                  : 'bg-gray-900 text-gray-400 hover:text-white border border-gray-800'
              }`}
            >
              {p.replace(/Part \d+: /, '')}
            </button>
          ))}
        </div>

        <div className="relative w-full lg:w-80">
          <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search feature or Bangla keyword..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-900 border border-gray-800 rounded-xl text-xs text-white focus:outline-none focus:border-[#00F2FE]"
          />
        </div>
      </div>

      {/* Grid of 50 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((f) => (
          <div
            key={f.id}
            className="p-6 rounded-3xl bg-[#111827] border border-gray-800 hover:border-[#00F2FE]/40 transition group flex flex-col justify-between space-y-4 shadow-lg hover:shadow-xl hover:shadow-[#00F2FE]/5"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-gray-500">
                  #{String(f.id).padStart(2, '0')}
                </span>
                <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#00F2FE]/10 text-[#00F2FE] border border-[#00F2FE]/30">
                  {f.badge}
                </span>
              </div>

              <h3 className="font-bold text-white text-base group-hover:text-[#00F2FE] transition">
                {f.title}
              </h3>

              <p className="text-xs text-gray-300 leading-relaxed font-bangla">
                {f.descriptionBangla}
              </p>
            </div>

            <div className="pt-3 border-t border-gray-800/80 flex items-center justify-between text-[11px] text-gray-400">
              <span className="text-gray-500 truncate max-w-[140px]">{f.part}</span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{f.status}</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
