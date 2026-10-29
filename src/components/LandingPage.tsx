import React from 'react';
import {
  Sparkles,
  ArrowRight,
  Play,
  ShieldCheck,
  Zap,
  Globe,
  Bot,
  Truck,
  CreditCard,
  MessageCircle,
  Database,
  BarChart3,
  Lock,
  Headphones,
  CheckCircle2,
} from 'lucide-react';
import { AppView } from '../types';

interface LandingPageProps {
  setCurrentView: (view: AppView) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ setCurrentView }) => {
  return (
    <div className="space-y-20 py-8 pb-20">
      {/* Hero Section (Screen 1 Fidelity) */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Glow backdrop */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-[#00F2FE]/20 via-[#4FACFE]/20 to-transparent blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#00F2FE]/10 to-[#4FACFE]/10 border border-[#00F2FE]/30 text-xs font-semibold text-[#00F2FE] shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>All-in-One E-Commerce & AI Automation Platform</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
            Build Your Online Store{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F2FE] via-[#4FACFE] to-cyan-300">
              Automate with AI
            </span>{' '}
            Grow Faster
          </h1>

          <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            The complete enterprise solution for modern Bangladeshi and global merchants.
            Create instant storefronts, manage orders, 1-click dispatch to Steadfast Courier, accept bKash PGW, and auto-reply on Meta Messenger.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => setCurrentView('register')}
              className="px-7 py-3.5 bg-gradient-to-r from-[#00F2FE] to-[#4FACFE] text-[#0B0F19] font-bold rounded-2xl shadow-xl shadow-[#00F2FE]/25 hover:opacity-95 transition flex items-center gap-2 transform active:scale-95"
            >
              <span>Start Free Trial</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentView('storefront')}
              className="px-6 py-3.5 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-2xl border border-gray-700 transition flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-white text-white" />
              <span>Explore Live Store</span>
            </button>
          </div>

          {/* 4 Stats Chips (Screen 1) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-10 border-t border-gray-800/80">
            <div className="p-4 rounded-2xl bg-gray-900/50 border border-gray-800">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#00F2FE]">50+</div>
              <div className="text-xs text-gray-400 mt-1">Advanced Features</div>
            </div>
            <div className="p-4 rounded-2xl bg-gray-900/50 border border-gray-800">
              <div className="text-2xl sm:text-3xl font-extrabold text-white">10K+</div>
              <div className="text-xs text-gray-400 mt-1">Happy Merchants</div>
            </div>
            <div className="p-4 rounded-2xl bg-gray-900/50 border border-gray-800">
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">99.9%</div>
              <div className="text-xs text-gray-400 mt-1">Uptime Guarantee</div>
            </div>
            <div className="p-4 rounded-2xl bg-gray-900/50 border border-gray-800">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#4FACFE]">24/7</div>
              <div className="text-xs text-gray-400 mt-1">Priority Support</div>
            </div>
          </div>
        </div>

        {/* Hero Interactive Device Collage Mockup */}
        <div className="mt-14 relative rounded-3xl p-3 bg-gradient-to-b from-gray-800 to-gray-950 border border-gray-800 shadow-2xl overflow-hidden max-w-5xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden bg-[#0B0F19] p-6 border border-gray-800/80">
            <div className="flex items-center justify-between border-b border-gray-800 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="text-xs text-gray-400 font-mono ml-2">sakibai.app/dashboard</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Live Steadfast & bKash Synced
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="p-4 rounded-xl bg-gray-900/90 border border-gray-800 space-y-2">
                <div className="text-xs text-gray-400">Today&apos;s Revenue</div>
                <div className="text-2xl font-bold text-[#00F2FE]">৳ 125,640</div>
                <div className="text-[11px] text-emerald-400">↑ 18% vs yesterday</div>
              </div>
              <div className="p-4 rounded-xl bg-gray-900/90 border border-gray-800 space-y-2">
                <div className="text-xs text-gray-400">Steadfast Dispatches</div>
                <div className="text-2xl font-bold text-white">248 Orders</div>
                <div className="text-[11px] text-cyan-400">32 ready for courier</div>
              </div>
              <div className="p-4 rounded-xl bg-gray-900/90 border border-gray-800 space-y-2">
                <div className="text-xs text-gray-400">AI Messenger Conversions</div>
                <div className="text-2xl font-bold text-[#4FACFE]">94.2%</div>
                <div className="text-[11px] text-emerald-400">Auto-reply stock check</div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3 justify-center">
              <button
                onClick={() => setCurrentView('dashboard')}
                className="px-5 py-2.5 bg-[#00F2FE] text-[#0B0F19] text-xs font-bold rounded-xl hover:opacity-90 transition flex items-center gap-2"
              >
                <span>Open Interactive Merchant Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setCurrentView('features-50')}
                className="px-5 py-2.5 bg-gray-900 hover:bg-gray-800 text-white text-xs font-semibold rounded-xl border border-gray-800 transition"
              >
                Browse All 50 Enterprise Features
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Powerful Integrations Bar (Screen 1 Fidelity) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h3 className="text-xs uppercase tracking-widest text-gray-400 font-bold">
            Built-in Integrations
          </h3>
          <p className="text-sm text-gray-300 mt-1">Pre-configured with industry standard APIs</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {/* OpenAI GPT-4o */}
          <div className="p-4 rounded-2xl bg-gray-900/60 border border-gray-800 flex items-center gap-3 hover:border-[#00F2FE]/40 transition">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">OpenAI GPT-4o</div>
              <div className="text-[11px] text-gray-400">AI Bangla Copy</div>
            </div>
          </div>

          {/* Steadfast Courier */}
          <div className="p-4 rounded-2xl bg-gray-900/60 border border-gray-800 flex items-center gap-3 hover:border-[#00F2FE]/40 transition">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-[#00F2FE] flex items-center justify-center font-bold">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Steadfast</div>
              <div className="text-[11px] text-gray-400">1-Click Dispatch</div>
            </div>
          </div>

          {/* bKash PGW */}
          <div className="p-4 rounded-2xl bg-gray-900/60 border border-gray-800 flex items-center gap-3 hover:border-[#00F2FE]/40 transition">
            <div className="w-10 h-10 rounded-xl bg-pink-500/10 text-pink-400 flex items-center justify-center font-bold">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">bKash PGW</div>
              <div className="text-[11px] text-gray-400">Automated Token</div>
            </div>
          </div>

          {/* Meta Messenger */}
          <div className="p-4 rounded-2xl bg-gray-900/60 border border-gray-800 flex items-center gap-3 hover:border-[#00F2FE]/40 transition">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Meta Webhook</div>
              <div className="text-[11px] text-gray-400">Chatbot Assistant</div>
            </div>
          </div>

          {/* MongoDB */}
          <div className="p-4 rounded-2xl bg-gray-900/60 border border-gray-800 flex items-center gap-3 hover:border-[#00F2FE]/40 transition col-span-2 sm:col-span-1">
            <div className="w-10 h-10 rounded-xl bg-green-500/10 text-green-400 flex items-center justify-center font-bold">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">MongoDB</div>
              <div className="text-[11px] text-gray-400">Mongoose Scalable</div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Grid (Screen 1 Fidelity) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Key Features</h2>
          <p className="text-sm text-gray-400 mt-2">
            Everything your brand needs to scale from zero to millions in monthly turnover
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-gray-900/70 border border-gray-800 hover:border-[#00F2FE]/40 transition space-y-3">
            <div className="w-11 h-11 rounded-xl bg-cyan-500/10 text-[#00F2FE] flex items-center justify-center">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Multi-Tenant Stores</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Subdomains and custom domain routing. Launch storename.sakibai.app in seconds with isolated database schema and secure tokens.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-gray-900/70 border border-gray-800 hover:border-[#00F2FE]/40 transition space-y-3">
            <div className="w-11 h-11 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">AI Product Descriptions</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              GPT-4o and Gemini engine creates persuasive Bengali and English SEO copy, highlights benefits, specifications, and urgency call-to-actions.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-gray-900/70 border border-gray-800 hover:border-[#00F2FE]/40 transition space-y-3">
            <div className="w-11 h-11 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <MessageCircle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Automated Marketing</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Meta Messenger auto-responder checks live database stock counts and sends checkout links directly inside Facebook chat.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-gray-900/70 border border-gray-800 hover:border-[#00F2FE]/40 transition space-y-3">
            <div className="w-11 h-11 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Advanced Analytics</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Real-time revenue metrics, courier transit statuses, profit & loss reports, and fake order detection to minimize return rates.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-gray-900/70 border border-gray-800 hover:border-[#00F2FE]/40 transition space-y-3">
            <div className="w-11 h-11 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Secure & Scalable</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Bcryptjs password hashing, JWT bearer token authorization, rate limiting, and enterprise architecture built to handle millions.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-gray-900/70 border border-gray-800 hover:border-[#00F2FE]/40 transition space-y-3">
            <div className="w-11 h-11 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center">
              <Headphones className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">24/7 Support</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Dedicated merchant onboarding support for Steadfast API approvals and bKash merchant token configuration in Bangladesh.
            </p>
          </div>
        </div>
      </section>

      {/* Ready to Start CTA Banner (Screen 1 Fidelity) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-gray-900 via-[#111827] to-[#0B0F19] border border-[#00F2FE]/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Ready to Start Your Journey?
            </h3>
            <p className="text-sm text-gray-300 max-w-xl">
              Join thousands of successful merchants and take your e-commerce business to the next level with SakibAI.
            </p>
          </div>
          <button
            onClick={() => setCurrentView('register')}
            className="px-8 py-3.5 bg-gradient-to-r from-[#00F2FE] to-[#4FACFE] text-[#0B0F19] font-extrabold rounded-xl shadow-lg shadow-[#00F2FE]/25 hover:opacity-90 transition active:scale-95 whitespace-nowrap"
          >
            Get Started Free
          </button>
        </div>
      </section>
    </div>
  );
};
