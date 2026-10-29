import React from 'react';
import {
  ShoppingCart,
  DollarSign,
  Clock,
  Package,
  TrendingUp,
  ArrowRight,
  Send,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import { Product, Order, Merchant, AppView } from '../types';

interface DashboardViewProps {
  orders: Order[];
  products: Product[];
  merchant: Merchant;
  setCurrentView: (view: AppView) => void;
  onSendToSteadfast: (orderId: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  orders,
  products,
  merchant,
  setCurrentView,
  onSendToSteadfast,
}) => {
  const totalOrders = 248 + orders.length - 5;
  const totalSales = orders.reduce((acc, curr) => acc + curr.amount, 117000);
  const pendingCourier = orders.filter((o) => o.courierStatus === 'Pending').length + 29;
  const totalProducts = products.length + 19;

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white flex items-center gap-2">
            Dashboard
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-semibold">
              Live Store Connected
            </span>
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Welcome back, here&apos;s what&apos;s happening with {merchant.storeName}.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentView('storefront')}
            className="flex items-center gap-2 px-3.5 py-2 bg-gray-900 hover:bg-gray-800 text-gray-200 text-xs font-semibold rounded-xl border border-gray-800 transition"
          >
            <span>Visit Live Store</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#00F2FE]" />
          </button>
          <button
            onClick={() => setCurrentView('products')}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#00F2FE] to-[#4FACFE] text-[#0B0F19] text-xs font-bold rounded-xl shadow-md shadow-[#00F2FE]/20 hover:opacity-95 transition"
          >
            <span>+ Add Product</span>
          </button>
        </div>
      </div>

      {/* 4 Stat Metric Cards (Screen 6 Fidelity) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Orders */}
        <div className="p-5 rounded-2xl bg-[#111827] border border-gray-800 hover:border-[#00F2FE]/30 transition group shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-400">Total Orders</span>
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold">
              <ShoppingCart className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-white">{totalOrders}</span>
            <span className="text-xs text-emerald-400 font-semibold flex items-center">
              ↑ 12%
            </span>
          </div>
          <p className="text-[11px] text-gray-500 mt-1">From all channels (Store + Messenger)</p>
        </div>

        {/* Total Sales */}
        <div className="p-5 rounded-2xl bg-[#111827] border border-gray-800 hover:border-[#00F2FE]/30 transition group shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-400">Total Sales</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#00F2FE]">
              ৳ {totalSales.toLocaleString()}
            </span>
            <span className="text-xs text-emerald-400 font-semibold flex items-center">
              ↑ 18%
            </span>
          </div>
          <p className="text-[11px] text-gray-500 mt-1">bKash PGW + Cash on Delivery</p>
        </div>

        {/* Pending Courier */}
        <div className="p-5 rounded-2xl bg-[#111827] border border-gray-800 hover:border-[#00F2FE]/30 transition group shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-400">Pending Courier</span>
            <div className="w-9 h-9 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center font-bold">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-rose-400">
              {pendingCourier}
            </span>
            <span className="text-xs text-rose-400 font-semibold flex items-center">
              - 5%
            </span>
          </div>
          <p className="text-[11px] text-gray-500 mt-1">Awaiting Steadfast pickup</p>
        </div>

        {/* Total Products */}
        <div className="p-5 rounded-2xl bg-[#111827] border border-gray-800 hover:border-[#00F2FE]/30 transition group shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-400">Total Products</span>
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 text-[#00F2FE] flex items-center justify-center font-bold">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-white">{totalProducts}</span>
            <span className="text-xs text-emerald-400 font-semibold flex items-center">
              + 3%
            </span>
          </div>
          <p className="text-[11px] text-gray-500 mt-1">Active items in catalog</p>
        </div>
      </div>

      {/* Chart & Recent Orders Row (Screen 6 Fidelity) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Overview Chart */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-[#111827] border border-gray-800 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-white text-base">Sales Overview</h3>
              <p className="text-xs text-gray-400">Total Revenue Trends (BDT ৳)</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-gray-300 bg-gray-900 border border-gray-800 px-3 py-1.5 rounded-xl">
                This Month
              </span>
            </div>
          </div>

          {/* SVG Smooth Area Line Chart */}
          <div className="h-60 w-full relative flex items-end pt-4">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 500 160">
              <defs>
                <linearGradient id="sakibGlow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00F2FE" stopOpacity="0.45" />
                  <stop offset="70%" stopColor="#4FACFE" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="#0B0F19" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Horizontal grid lines */}
              <line x1="0" y1="30" x2="500" y2="30" stroke="#1F2937" strokeDasharray="3 3" />
              <line x1="0" y1="70" x2="500" y2="70" stroke="#1F2937" strokeDasharray="3 3" />
              <line x1="0" y1="110" x2="500" y2="110" stroke="#1F2937" strokeDasharray="3 3" />

              {/* Shaded Area */}
              <path
                d="M0,135 C60,120 100,50 160,85 C220,115 280,35 340,60 C400,80 440,25 500,45 L500,160 L0,160 Z"
                fill="url(#sakibGlow)"
              />

              {/* Primary Curve */}
              <path
                d="M0,135 C60,120 100,50 160,85 C220,115 280,35 340,60 C400,80 440,25 500,45"
                fill="none"
                stroke="#00F2FE"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {/* Accent Pulse Dot */}
              <circle cx="340" cy="60" r="5" fill="#00F2FE" className="animate-ping" />
              <circle cx="340" cy="60" r="4" fill="#FFFFFF" />
            </svg>
          </div>

          <div className="flex justify-between text-xs text-gray-500 pt-3 border-t border-gray-800">
            <span>1 Aug</span>
            <span>7 Aug</span>
            <span>14 Aug</span>
            <span>21 Aug</span>
            <span>28 Aug</span>
          </div>
        </div>

        {/* Recent Orders List (Screen 6 Fidelity) */}
        <div className="p-6 rounded-3xl bg-[#111827] border border-gray-800 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-white text-base">Recent Orders</h3>
            <button
              onClick={() => setCurrentView('orders')}
              className="text-xs text-[#00F2FE] hover:underline flex items-center gap-1 font-semibold"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {orders.slice(0, 5).map((ord) => (
              <div
                key={ord.id}
                className="p-3.5 rounded-2xl bg-gray-950/70 border border-gray-800/80 flex items-center justify-between text-xs hover:border-gray-700 transition"
              >
                <div className="space-y-1">
                  <div className="font-mono font-bold text-white flex items-center gap-1.5">
                    {ord.invoiceId}
                  </div>
                  <div className="text-gray-400 font-medium">{ord.customerName}</div>
                </div>

                <div className="text-right space-y-1">
                  <div className="font-extrabold text-[#00F2FE]">
                    ৳ {ord.amount.toLocaleString()}
                  </div>
                  <div className="flex items-center justify-end gap-1.5">
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                        ord.courierStatus === 'In-Transit'
                          ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                          : ord.courierStatus === 'Delivered'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                          : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                      }`}
                    >
                      {ord.courierStatus}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 mt-2 border-t border-gray-800 flex items-center justify-between text-xs text-gray-400">
            <span>Steadfast Webhook:</span>
            <span className="text-emerald-400 font-mono text-[11px]">Synced Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};
