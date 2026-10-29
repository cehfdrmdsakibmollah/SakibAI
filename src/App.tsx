/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { RegisterPage } from './components/RegisterPage';
import { LoginPage } from './components/LoginPage';
import { StorefrontView } from './components/StorefrontView';
import { DashboardView } from './components/DashboardView';
import { ProductManagementView } from './components/ProductManagementView';
import { OrderManagementView } from './components/OrderManagementView';
import { SettingsView } from './components/SettingsView';
import { AiCopywriterView } from './components/AiCopywriterView';
import { MetaMessengerView } from './components/MetaMessengerView';
import { Features50View } from './components/Features50View';
import { CodeInspectorView } from './components/CodeInspectorView';
import {
  INITIAL_MERCHANT,
  INITIAL_PRODUCTS,
  INITIAL_ORDERS,
} from './data/mockData';
import { AppView, Product, Order, Merchant } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('landing');
  const [merchant, setMerchant] = useState<Merchant>(INITIAL_MERCHANT);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [prefillAiTitle, setPrefillAiTitle] = useState<string>('Casual T-Shirt');

  // Order created in Storefront
  const handleOrderCreated = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
  };

  // 1-Click Steadfast Courier Dispatch
  const handleSendToSteadfast = (orderId: string) => {
    const trackingCode = `STDF-${Math.floor(100000 + Math.random() * 900000)}`;
    const consignmentId = `CS-${Math.floor(100000 + Math.random() * 900000)}`;

    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? {
              ...o,
              courierStatus: 'In-Transit',
              courierTrackingCode: trackingCode,
              consignmentId,
            }
          : o
      )
    );
  };

  // Add Product
  const handleAddProduct = (newProd: Product) => {
    setProducts((prev) => [newProd, ...prev]);
  };

  // Delete Product
  const handleDeleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  // Merchant Registration
  const handleMerchantCreated = (newMerchant: Merchant) => {
    setMerchant(newMerchant);
  };

  // Merchant API Keys Update
  const handleUpdateMerchant = (updated: Partial<Merchant>) => {
    setMerchant((prev) => ({ ...prev, ...updated }));
  };

  // Apply AI Copy to New Product
  const handleApplyAiCopy = (title: string, desc: string) => {
    const newProd: Product = {
      id: `p_${Date.now()}`,
      title,
      price: 999,
      compareAtPrice: 1499,
      stock: 30,
      category: 'Gadgets',
      image:
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
      description: desc,
      rating: 4.9,
      ratingCount: 1,
      status: 'Active',
      sku: `SKU-${Date.now().toString().slice(-4)}`,
    };
    setProducts((prev) => [newProd, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-[#F8FAFC] flex flex-col font-sans selection:bg-[#00F2FE]/30 selection:text-[#00F2FE]">
      {/* Top Main Navbar */}
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        cartCount={1}
      />

      {/* Main View Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {currentView === 'landing' && (
          <LandingPage setCurrentView={setCurrentView} />
        )}

        {currentView === 'register' && (
          <RegisterPage
            setCurrentView={setCurrentView}
            onMerchantCreated={handleMerchantCreated}
          />
        )}

        {currentView === 'login' && (
          <LoginPage setCurrentView={setCurrentView} />
        )}

        {currentView === 'storefront' && (
          <StorefrontView
            products={products}
            merchant={merchant}
            onOrderCreated={handleOrderCreated}
          />
        )}

        {currentView === 'dashboard' && (
          <DashboardView
            orders={orders}
            products={products}
            merchant={merchant}
            setCurrentView={setCurrentView}
            onSendToSteadfast={handleSendToSteadfast}
          />
        )}

        {currentView === 'products' && (
          <ProductManagementView
            products={products}
            onAddProduct={handleAddProduct}
            onDeleteProduct={handleDeleteProduct}
            setCurrentView={setCurrentView}
            onPrefillAiCopy={(t) => setPrefillAiTitle(t)}
          />
        )}

        {currentView === 'orders' && (
          <OrderManagementView
            orders={orders}
            onSendToSteadfast={handleSendToSteadfast}
          />
        )}

        {currentView === 'settings' && (
          <SettingsView
            merchant={merchant}
            onUpdateMerchant={handleUpdateMerchant}
          />
        )}

        {currentView === 'ai-generator' && (
          <AiCopywriterView
            initialTitle={prefillAiTitle}
            onApplyToNewProduct={handleApplyAiCopy}
            setCurrentView={setCurrentView}
          />
        )}

        {currentView === 'messenger' && (
          <MetaMessengerView
            merchant={merchant}
            products={products}
            setCurrentView={setCurrentView}
          />
        )}

        {currentView === 'features-50' && <Features50View />}

        {currentView === 'code-inspector' && <CodeInspectorView />}
      </main>

      {/* Bottom Global Footer */}
      <footer className="border-t border-gray-800/80 bg-[#0B0F19]/90 py-8 px-4 sm:px-6 lg:px-8 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-white">
              Sakib<span className="text-[#00F2FE]">AI</span>
            </span>
            <span>• Multi-Tenant E-Commerce & AI Automation SaaS</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-gray-400">
            <button
              onClick={() => setCurrentView('landing')}
              className="hover:text-[#00F2FE] transition"
            >
              Public Landing
            </button>
            <button
              onClick={() => setCurrentView('storefront')}
              className="hover:text-[#00F2FE] transition"
            >
              Public Store
            </button>
            <button
              onClick={() => setCurrentView('dashboard')}
              className="hover:text-[#00F2FE] transition"
            >
              Merchant Dashboard
            </button>
            <button
              onClick={() => setCurrentView('features-50')}
              className="hover:text-[#00F2FE] transition"
            >
              50+ Features Master
            </button>
            <button
              onClick={() => setCurrentView('code-inspector')}
              className="hover:text-[#00F2FE] transition"
            >
              11 Source Files
            </button>
          </div>

          <div className="text-gray-500">
            Powered by Steadfast, bKash PGW & Meta Messenger
          </div>
        </div>
      </footer>
    </div>
  );
}
