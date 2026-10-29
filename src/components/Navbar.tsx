import React from 'react';
import {
  Sparkles,
  LayoutDashboard,
  Store,
  FileCode,
  Package,
  ShoppingCart,
  Key,
  MessageSquare,
  Layers,
  ChevronDown,
  ExternalLink,
} from 'lucide-react';
import { AppView } from '../types';

interface NavbarProps {
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  cartCount: number;
  unreadCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  setCurrentView,
  cartCount,
}) => {
  return (
    <nav className="sticky top-0 z-50 bg-[#0B0F19]/90 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          {/* Logo & Brand */}
          <div
            onClick={() => setCurrentView('landing')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#00F2FE] via-[#4FACFE] to-[#00F2FE] p-[2px] shadow-lg shadow-[#00F2FE]/20 group-hover:shadow-[#00F2FE]/40 transition">
              <div className="w-full h-full bg-[#0B0F19] rounded-[10px] flex items-center justify-center">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F2FE] to-[#4FACFE] font-black text-xl tracking-tighter">
                  S
                </span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg tracking-tight text-white group-hover:text-[#00F2FE] transition">
                  Sakib<span className="text-[#00F2FE]">AI</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-[#00F2FE]/10 text-[#00F2FE] border border-[#00F2FE]/30">
                  SaaS 2.0
                </span>
              </div>
              <p className="text-[10px] text-gray-400 hidden sm:block">
                E-Commerce & AI Automation Platform
              </p>
            </div>
          </div>

          {/* Center Navigation Shortcuts */}
          <div className="hidden lg:flex items-center gap-1 bg-gray-900/60 p-1 rounded-xl border border-gray-800 text-xs">
            <button
              onClick={() => setCurrentView('landing')}
              className={`px-3 py-1.5 rounded-lg font-medium transition ${
                currentView === 'landing'
                  ? 'bg-[#00F2FE] text-[#0B0F19] font-bold shadow-sm'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800'
              }`}
            >
              Public Landing
            </button>
            <button
              onClick={() => setCurrentView('storefront')}
              className={`px-3 py-1.5 rounded-lg font-medium transition flex items-center gap-1.5 ${
                currentView === 'storefront'
                  ? 'bg-[#00F2FE] text-[#0B0F19] font-bold shadow-sm'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800'
              }`}
            >
              <Store className="w-3.5 h-3.5" />
              <span>Public Store</span>
              {cartCount > 0 && (
                <span className="bg-[#0B0F19] text-[#00F2FE] text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setCurrentView('dashboard')}
              className={`px-3 py-1.5 rounded-lg font-medium transition flex items-center gap-1.5 ${
                [
                  'dashboard',
                  'products',
                  'orders',
                  'settings',
                  'ai-generator',
                  'messenger',
                ].includes(currentView)
                  ? 'bg-[#00F2FE] text-[#0B0F19] font-bold shadow-sm'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Merchant Suite</span>
            </button>
            <button
              onClick={() => setCurrentView('features-50')}
              className={`px-3 py-1.5 rounded-lg font-medium transition flex items-center gap-1.5 ${
                currentView === 'features-50'
                  ? 'bg-[#00F2FE] text-[#0B0F19] font-bold shadow-sm'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span>50+ Features</span>
            </button>
            <button
              onClick={() => setCurrentView('code-inspector')}
              className={`px-3 py-1.5 rounded-lg font-medium transition flex items-center gap-1.5 ${
                currentView === 'code-inspector'
                  ? 'bg-[#00F2FE] text-[#0B0F19] font-bold shadow-sm'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800'
              }`}
            >
              <FileCode className="w-3.5 h-3.5 text-emerald-400" />
              <span>11 Source Files</span>
            </button>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Quick View Selector Dropdown for Mobile / Tablet */}
            <div className="relative">
              <select
                aria-label="Select platform view"
                value={currentView}
                onChange={(e) => setCurrentView(e.target.value as AppView)}
                className="bg-gray-900 border border-gray-700 text-[#00F2FE] text-xs font-semibold rounded-xl px-3 py-2 pr-7 focus:outline-none focus:border-[#00F2FE] transition cursor-pointer appearance-none"
              >
                <optgroup label="Public Portal">
                  <option value="landing">1. Landing Page</option>
                  <option value="register">2. Register Merchant</option>
                  <option value="login">3. Merchant Login</option>
                  <option value="storefront">4. Public Storefront (Rahim Fashion)</option>
                </optgroup>
                <optgroup label="Merchant Dashboard & Operations">
                  <option value="dashboard">6. Main Dashboard</option>
                  <option value="products">7. Product Management</option>
                  <option value="orders">8. Order Management (Steadfast)</option>
                  <option value="settings">9. API Keys & PGW</option>
                  <option value="ai-generator">10. AI Description Generator</option>
                  <option value="messenger">11. Meta Messenger Simulator</option>
                </optgroup>
                <optgroup label="Architecture & Code">
                  <option value="features-50">🚀 50 Advanced Features Master</option>
                  <option value="code-inspector">📁 11 Production Source Files</option>
                </optgroup>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-3 pointer-events-none" />
            </div>

            {/* Quick Start button */}
            <button
              onClick={() => setCurrentView(currentView === 'dashboard' ? 'storefront' : 'dashboard')}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 bg-gradient-to-r from-[#00F2FE] to-[#4FACFE] text-[#0B0F19] text-xs font-bold rounded-xl shadow-md shadow-[#00F2FE]/20 hover:opacity-95 transition active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{currentView.startsWith('dashboard') || currentView === 'products' || currentView === 'orders' ? 'Open Store' : 'Dashboard'}</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
