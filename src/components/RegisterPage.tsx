import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle,
  Sparkles,
  ArrowRight,
  Store,
  User,
  Mail,
  Lock,
  Globe,
  Headphones,
} from 'lucide-react';
import { AppView, Merchant } from '../types';

interface RegisterPageProps {
  setCurrentView: (view: AppView) => void;
  onMerchantCreated: (merchant: Merchant) => void;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({
  setCurrentView,
  onMerchantCreated,
}) => {
  const [formData, setFormData] = useState({
    name: 'Md Rahim',
    email: 'rahim@example.com',
    password: 'password123',
    storeName: 'Rahim Fashion',
    storeSubdomain: 'rahimfashion',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setSuccessMsg(true);

      const newMerchant: Merchant = {
        id: `m_${Date.now()}`,
        name: formData.name,
        email: formData.email,
        storeName: formData.storeName,
        storeSubdomain: formData.storeSubdomain.toLowerCase().replace(/[^a-z0-9-]/g, ''),
        steadfastApiKey: 'sf_live_demo_key',
        steadfastSecretKey: '••••••••••••••••••••••••••••••••',
        bkashAppKey: 'bkash_app_live_demo',
        bkashAppSecret: '••••••••••••••••••••••••••••••••',
        metaVerifyToken: 'sakibai_messenger_verify_token_2026',
        metaPageName: `${formData.storeName} Official`,
        autoReplyEnabled: true,
      };

      onMerchantCreated(newMerchant);

      setTimeout(() => {
        setCurrentView('dashboard');
      }, 1200);
    }, 800);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-[#111827] border border-gray-800 rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-2">
        {/* Left: Registration Form */}
        <div className="p-8 sm:p-12 flex flex-col justify-between space-y-8">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#00F2FE] to-[#4FACFE] flex items-center justify-center font-bold text-[#0B0F19]">
                S
              </div>
              <span className="font-extrabold text-white text-lg">
                Sakib<span className="text-[#00F2FE]">AI</span>
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Create Your Merchant Account
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-2">
              Join our platform and start your e-commerce journey today with AI automation.
            </p>

            {successMsg ? (
              <div className="mt-8 p-6 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-center space-y-3">
                <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="text-base font-bold text-white">Merchant Account Activated!</h4>
                <p className="text-xs text-gray-300">
                  Redirecting to your merchant dashboard...
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-gray-500 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-950 border border-gray-800 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-[#00F2FE]"
                      placeholder="Md Rahim"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Business Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-gray-500 absolute left-3.5 top-3.5" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-950 border border-gray-800 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-[#00F2FE]"
                      placeholder="rahim@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-gray-500 absolute left-3.5 top-3.5" />
                    <input
                      type="password"
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-950 border border-gray-800 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-[#00F2FE]"
                      placeholder="••••••••••••"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Store Name
                  </label>
                  <div className="relative">
                    <Store className="w-4 h-4 text-gray-500 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      required
                      value={formData.storeName}
                      onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-950 border border-gray-800 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-[#00F2FE]"
                      placeholder="Rahim Fashion"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Store Subdomain
                  </label>
                  <div className="flex items-center">
                    <div className="relative flex-1">
                      <Globe className="w-4 h-4 text-gray-500 absolute left-3.5 top-3.5" />
                      <input
                        type="text"
                        required
                        value={formData.storeSubdomain}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            storeSubdomain: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''),
                          })
                        }
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-950 border border-gray-800 rounded-l-xl text-xs sm:text-sm text-white focus:outline-none focus:border-[#00F2FE]"
                        placeholder="rahimfashion"
                      />
                    </div>
                    <span className="bg-gray-900 border border-l-0 border-gray-800 text-gray-400 text-xs px-3 py-2.5 rounded-r-xl">
                      .sakibai.app
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-gradient-to-r from-[#00F2FE] to-[#4FACFE] text-[#0B0F19] font-bold rounded-xl shadow-lg shadow-[#00F2FE]/20 hover:opacity-95 transition flex items-center justify-center gap-2 pt-3 disabled:opacity-50 text-sm"
                >
                  <span>{isLoading ? 'Creating Store...' : 'Create Account'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            <div className="mt-6 text-center text-xs text-gray-400">
              Already have an account?{' '}
              <button
                onClick={() => setCurrentView('login')}
                className="text-[#00F2FE] hover:underline font-semibold"
              >
                Login
              </button>
            </div>
          </div>

          {/* Footer Trust Badges (Screen 2 Fidelity) */}
          <div className="pt-6 border-t border-gray-800 grid grid-cols-3 gap-2 text-center text-[10px] sm:text-xs text-gray-400">
            <div className="flex flex-col items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Secure & Encrypted</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Store className="w-4 h-4 text-[#00F2FE]" />
              <span>Trusted by 10K+</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Headphones className="w-4 h-4 text-indigo-400" />
              <span>24/7 Support</span>
            </div>
          </div>
        </div>

        {/* Right: Graphic Banner (Screen 2 Fidelity) */}
        <div className="bg-gradient-to-br from-[#0B0F19] via-[#111827] to-[#0B0F19] p-8 sm:p-12 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-gray-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#00F2FE]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00F2FE]/15 border border-[#00F2FE]/30 text-xs font-semibold text-[#00F2FE]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Supercharged</span>
            </div>
            <h3 className="text-3xl font-extrabold text-white">
              Your Store <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F2FE] to-[#4FACFE]">
                Your Brand
              </span>
              <br />
              Our Technology
            </h3>
            <p className="text-xs sm:text-sm text-gray-300">
              One platform to manage products, automatic Steadfast delivery slip generation, bKash payments, and Facebook Messenger AI sales chatbot.
            </p>
          </div>

          {/* Visual Showcase Card */}
          <div className="relative my-8 p-5 bg-gray-900/90 border border-gray-700/60 rounded-2xl shadow-xl space-y-4">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-400">Live AI Assistant</span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Active
              </span>
            </div>
            <div className="p-3 bg-gray-950 rounded-xl border border-gray-800 text-xs text-gray-300">
              &quot;১০০% প্রিমিয়াম কটন ডেনিম জ্যাকেট। সীমিত সময়ের জন্য ২৫% ছাড়ে অর্ডার করুন!&quot;
            </div>
            <div className="flex items-center justify-between text-xs pt-1">
              <span className="text-gray-400">Steadfast API</span>
              <span className="text-[#00F2FE] font-mono">Sync Ready</span>
            </div>
          </div>

          <div className="text-xs text-gray-500">
            © 2026 SakibAI Platform. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
};
