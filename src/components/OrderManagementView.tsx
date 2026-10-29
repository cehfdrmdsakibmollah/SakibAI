import React, { useState } from 'react';
import {
  ShoppingCart,
  Send,
  CheckCircle2,
  Clock,
  Search,
  ExternalLink,
  ShieldAlert,
  ShieldCheck,
  Truck,
  Filter,
} from 'lucide-react';
import { Order } from '../types';

interface OrderManagementViewProps {
  orders: Order[];
  onSendToSteadfast: (orderId: string) => void;
}

export const OrderManagementView: React.FC<OrderManagementViewProps> = ({
  orders,
  onSendToSteadfast,
}) => {
  const [statusFilter, setStatusFilter] = useState<'All' | 'Pending' | 'In-Transit' | 'Delivered'>('All');
  const [search, setSearch] = useState('');
  const [dispatchingId, setDispatchingId] = useState<string | null>(null);

  const filteredOrders = orders.filter((o) => {
    const matchStatus = statusFilter === 'All' ? true : o.courierStatus === statusFilter;
    const matchSearch =
      o.invoiceId.toLowerCase().includes(search.toLowerCase()) ||
      o.customerName.toLowerCase().includes(search.toLowerCase()) ||
      o.customerPhone.includes(search);
    return matchStatus && matchSearch;
  });

  const handleDispatch = (orderId: string) => {
    setDispatchingId(orderId);
    setTimeout(() => {
      onSendToSteadfast(orderId);
      setDispatchingId(null);
    }, 700);
  };

  return (
    <div className="space-y-6">
      {/* Header (Screen 8 Fidelity) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white">Orders</h2>
          <p className="text-xs text-gray-400 mt-1">
            Track customer orders and dispatch parcels directly to Steadfast Courier portal
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400">Steadfast API:</span>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Connected (Auto-Sync)
          </span>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 bg-gray-900/60 p-1 rounded-xl border border-gray-800 text-xs w-full sm:w-auto overflow-x-auto">
          {(['All', 'Pending', 'In-Transit', 'Delivered'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={`px-4 py-2 rounded-lg font-semibold transition whitespace-nowrap ${
                statusFilter === tab
                  ? 'bg-[#00F2FE] text-[#0B0F19]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab === 'All' ? 'All Orders' : tab}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-gray-500 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by Invoice, Name, Phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-gray-900 border border-gray-800 rounded-xl text-xs text-white focus:outline-none focus:border-[#00F2FE]"
          />
        </div>
      </div>

      {/* Orders Table (Screen 8 Fidelity) */}
      <div className="bg-[#111827] border border-gray-800 rounded-3xl overflow-hidden shadow-xl">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead className="bg-gray-950/80 text-gray-400 uppercase text-[11px] font-semibold border-b border-gray-800">
            <tr>
              <th className="px-6 py-4">Invoice ID</th>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Payment</th>
              <th className="px-6 py-4">Courier Status</th>
              <th className="px-6 py-4">Fraud Risk</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800 text-gray-300">
            {filteredOrders.map((ord) => (
              <tr key={ord.id} className="hover:bg-gray-800/30 transition">
                <td className="px-6 py-4 font-mono font-bold text-white">
                  {ord.invoiceId}
                  <div className="text-[10px] text-gray-500 font-sans">{ord.createdAt}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="font-bold text-white">{ord.customerName}</div>
                  <div className="text-xs text-gray-400">{ord.customerPhone}</div>
                  <div className="text-[11px] text-gray-500 truncate max-w-[160px]">
                    {ord.customerAddress}
                  </div>
                </td>
                <td className="px-6 py-4 font-extrabold text-[#00F2FE]">
                  ৳ {ord.amount.toLocaleString()}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                      ord.paymentStatus === 'Paid'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                    }`}
                  >
                    {ord.paymentStatus}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                        ord.courierStatus === 'In-Transit'
                          ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                          : ord.courierStatus === 'Delivered'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                          : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                      }`}
                    >
                      <Truck className="w-3 h-3" />
                      <span>{ord.courierStatus}</span>
                    </span>
                    {ord.courierTrackingCode && (
                      <div className="font-mono text-[10px] text-[#00F2FE] mt-1 font-semibold">
                        {ord.courierTrackingCode}
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                      (ord.fraudScore || 0) > 30
                        ? 'bg-rose-500/10 text-rose-400'
                        : 'bg-emerald-500/10 text-emerald-400'
                    }`}
                  >
                    {(ord.fraudScore || 0) > 30 ? (
                      <ShieldAlert className="w-3 h-3" />
                    ) : (
                      <ShieldCheck className="w-3 h-3" />
                    )}
                    <span>{(ord.fraudScore || 0) > 30 ? 'Moderate Risk' : 'Verified Safe'}</span>
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  {ord.courierStatus === 'Pending' ? (
                    <button
                      onClick={() => handleDispatch(ord.id)}
                      disabled={dispatchingId === ord.id}
                      className="px-3.5 py-1.5 bg-[#00F2FE] hover:bg-[#4FACFE] text-[#0B0F19] text-xs font-bold rounded-xl transition flex items-center gap-1.5 shadow-md shadow-[#00F2FE]/20 ml-auto disabled:opacity-50"
                    >
                      <Send className="w-3 h-3" />
                      <span>{dispatchingId === ord.id ? 'Sending...' : 'Send to Steadfast'}</span>
                    </button>
                  ) : (
                    <div className="text-xs text-gray-400 flex items-center justify-end gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Dispatched</span>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
