import React, { useState } from 'react';
import {
  Sparkles,
  Copy,
  Check,
  Package,
  ArrowRight,
  Bot,
  RefreshCw,
  Wand2,
} from 'lucide-react';
import { generateProductDescription } from '../services/aiService';
import { Product, AppView } from '../types';

interface AiCopywriterViewProps {
  initialTitle?: string;
  onApplyToNewProduct: (title: string, desc: string) => void;
  setCurrentView: (view: AppView) => void;
}

export const AiCopywriterView: React.FC<AiCopywriterViewProps> = ({
  initialTitle = 'Wireless Headphone',
  onApplyToNewProduct,
  setCurrentView,
}) => {
  const [title, setTitle] = useState(initialTitle || 'Wireless Headphone');
  const [keywords, setKeywords] = useState('sound, bluetooth, bass, long battery, noise cancelling');
  const [tone, setTone] = useState('persuasive');
  const [output, setOutput] = useState(
    `প্রিমিয়াম কোয়ালিটির ওয়্যারলেস হেডফোন - উপভোগ করুন ক্রিস্টাল ক্লিয়ার সাউন্ড এবং ডিপ বেস!

আধুনিক অ্যাক্টিভ নয়েজ ক্যান্সেলেশন (ANC) প্রযুক্তি সম্বলিত এই ওয়্যারলেস হেডফোন আপনাকে বাইরের কোলাহল মুক্ত মিউজিকের নিখুঁত অভিজ্ঞতা প্রদান করবে। এর সফট মেমোরি ফোম এয়ারকুশন দীর্ঘক্ষণ ব্যবহারের পরও রাখে সম্পূর্ণ আরামদায়ক।

🔥 বিশেষ ফিচারসমূহ:
• ডিপ বেস ও হাই-রেজুলেশন ট্রু স্টেরিও সাউন্ড
• একবার চার্জে ৪০ ঘণ্টা পর্যন্ত মিউজিক প্লেব্যাক
• ব্লুটুথ ৫.৩ স্টেবল ও ল্যাগ-ফ্রি কানেক্টিভিটি
• টাইপ-সি ফাস্ট চার্জিং ও ইনবিল্ট এইচডি মাইক্রোফোন

⚡ স্টক সীমিত! বিশেষ ডিসকাউন্টে আপনার পছন্দের গ্যাজেটটি সংগ্রহ করতে এখনই অর্ডার করুন।`
  );
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!title) return;
    setLoading(true);
    try {
      const generated = await generateProductDescription(title, keywords, tone);
      setOutput(generated);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header (Screen 10 Fidelity) */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#00F2FE] to-[#4FACFE] flex items-center justify-center font-bold text-[#0B0F19] shadow-lg shadow-[#00F2FE]/20">
          <Sparkles className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-extrabold text-white">
            AI Product Description Generator
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Generate attractive, high-converting Bangla product descriptions using AI.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Inputs (Screen 10 Fidelity) */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-[#111827] border border-gray-800 shadow-xl space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">
              Product Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Wireless Headphone"
              className="w-full px-3.5 py-2.5 bg-gray-950 border border-gray-800 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-[#00F2FE]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">
              Keywords (comma separated)
            </label>
            <input
              type="text"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="sound, bluetooth, bass, long battery"
              className="w-full px-3.5 py-2.5 bg-gray-950 border border-gray-800 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-[#00F2FE]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">
              Tone of Voice
            </label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-gray-950 border border-gray-800 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-[#00F2FE]"
            >
              <option value="persuasive">High Converting (আকর্ষণীয় ও বিক্রয়মুখী)</option>
              <option value="luxury">Luxury & Premium (অভিজাত)</option>
              <option value="casual">Casual & Friendly (সহজ-সাবলীল)</option>
              <option value="seo">SEO Optimized with Tags (এসইও ফোকাসড)</option>
            </select>
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-[#00F2FE] to-[#4FACFE] text-[#0B0F19] font-bold rounded-xl text-xs sm:text-sm shadow-lg shadow-[#00F2FE]/25 hover:opacity-95 transition flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>AI তৈরি করছে...</span>
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4" />
                <span>Generate Description</span>
              </>
            )}
          </button>
        </div>

        {/* Right Output Panel (Screen 10 Fidelity) */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-[#111827] border border-gray-800 shadow-xl flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-gray-300">
                Generated Description
              </span>
              <span className="text-xs text-gray-500 font-mono">
                {output.length} characters
              </span>
            </div>

            <div className="p-4 bg-gray-950 rounded-2xl border border-gray-800/80 text-xs sm:text-sm text-gray-200 leading-relaxed min-h-[260px] whitespace-pre-wrap font-sans">
              {output}
            </div>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-gray-800">
            <button
              onClick={handleCopy}
              className="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-gray-200 text-xs font-semibold rounded-xl border border-gray-700 transition flex items-center gap-1.5"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#00F2FE]" />
                  <span>Copy Description</span>
                </>
              )}
            </button>

            <button
              onClick={() => {
                onApplyToNewProduct(title, output);
                setCurrentView('products');
              }}
              className="px-4 py-2 bg-[#00F2FE] text-[#0B0F19] text-xs font-bold rounded-xl hover:opacity-90 transition flex items-center gap-1.5"
            >
              <span>Apply to New Product</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
