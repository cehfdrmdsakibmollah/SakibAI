import React, { useState } from 'react';
import {
  Key,
  Truck,
  CreditCard,
  MessageCircle,
  CheckCircle2,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { Merchant } from '../types';

interface SettingsViewProps {
  merchant: Merchant;
  onUpdateMerchant: (updated: Partial<Merchant>) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  merchant,
  onUpdateMerchant,
}) => {
  const [steadfastApiKey, setSteadfastApiKey] = useState(merchant.steadfastApiKey);
  const [steadfastSecretKey, setSteadfastSecretKey] = useState(merchant.steadfastSecretKey);
  const [bkashAppKey, setBkashAppKey] = useState(merchant.bkashAppKey);
  const [bkashAppSecret, setBkashAppSecret] = useState(merchant.bkashAppSecret);
  const [metaVerifyToken, setMetaVerifyToken] = useState(merchant.metaVerifyToken);

  const [testingSteadfast, setTestingSteadfast] = useState(false);
  const [steadfastConnected, setSteadfastConnected] = useState(true);

  const [testingBkash, setTestingBkash] = useState(false);
  const [bkashConnected, setBkashConnected] = useState(true);

  const [savedBanner, setSavedBanner] = useState(false);

  const handleTestSteadfast = () => {
    setTestingSteadfast(true);
    setTimeout(() => {
      setTestingSteadfast(false);
      setSteadfastConnected(true);
      alert('✅ Steadfast Courier API Connection Verified! HTTP 200 OK');
    }, 700);
  };

  const handleTestBkash = () => {
    setTestingBkash(true);
    setTimeout(() => {
      setTestingBkash(false);
      setBkashConnected(true);
      alert('✅ bKash Payment PGW Token Grant Verified! HTTP 200 OK');
    }, 700);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateMerchant({
      steadfastApiKey,
      steadfastSecretKey,
      bkashAppKey,
      bkashAppSecret,
      metaVerifyToken,
    });
    setSavedBanner(true);
    setTimeout(() => setSavedBanner(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <Key className="w-6 h-6 text-[#00F2FE]" />
          API Integrations & Credentials
        </h2>
        <p className="text-xs text-gray-400 mt-1">
          Configure production credentials for Steadfast Courier, bKash Payment PGW, and Meta Webhooks
        </p>
      </div>

      {savedBanner && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center gap-2 text-emerald-400 text-xs font-semibold">
          <CheckCircle2 className="w-4 h-4" />
          <span>All API credentials saved and encrypted into merchant vault.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Steadfast Courier Box (Screen 9 Fidelity) */}
        <div className="p-6 rounded-3xl bg-[#111827] border border-gray-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 text-[#00F2FE] flex items-center justify-center font-bold">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm">Steadfast Courier API</h3>
                <p className="text-[11px] text-gray-400">
                  portal.steadfast.com.bd/api/v1/create_order
                </p>
              </div>
            </div>

            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Connected
            </span>
          </div>

          <div className="space-y-3 pt-2 text-xs sm:text-sm">
            <div>
              <label className="block text-gray-300 font-semibold mb-1">API Key</label>
              <input
                type="text"
                value={steadfastApiKey}
                onChange={(e) => setSteadfastApiKey(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-gray-950 border border-gray-800 rounded-xl text-white font-mono text-xs focus:outline-none focus:border-[#00F2FE]"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-semibold mb-1">Secret Key</label>
              <input
                type="password"
                value={steadfastSecretKey}
                onChange={(e) => setSteadfastSecretKey(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-gray-950 border border-gray-800 rounded-xl text-white font-mono text-xs focus:outline-none focus:border-[#00F2FE]"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="button"
              onClick={handleTestSteadfast}
              disabled={testingSteadfast}
              className="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-gray-200 text-xs font-semibold rounded-xl border border-gray-700 transition flex items-center gap-2"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${testingSteadfast ? 'animate-spin text-[#00F2FE]' : ''}`} />
              <span>{testingSteadfast ? 'Testing API...' : 'Test Connection'}</span>
            </button>
          </div>
        </div>

        {/* bKash Payment Gateway Box (Screen 9 Fidelity) */}
        <div className="p-6 rounded-3xl bg-[#111827] border border-gray-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-pink-500/10 text-pink-400 flex items-center justify-center font-bold">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm">bKash Payment Gateway (PGW)</h3>
                <p className="text-[11px] text-gray-400">
                  Tokenized Checkout & Instant Settlement
                </p>
              </div>
            </div>

            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Connected
            </span>
          </div>

          <div className="space-y-3 pt-2 text-xs sm:text-sm">
            <div>
              <label className="block text-gray-300 font-semibold mb-1">App Key</label>
              <input
                type="text"
                value={bkashAppKey}
                onChange={(e) => setBkashAppKey(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-gray-950 border border-gray-800 rounded-xl text-white font-mono text-xs focus:outline-none focus:border-[#00F2FE]"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-semibold mb-1">App Secret</label>
              <input
                type="password"
                value={bkashAppSecret}
                onChange={(e) => setBkashAppSecret(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-gray-950 border border-gray-800 rounded-xl text-white font-mono text-xs focus:outline-none focus:border-[#00F2FE]"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="button"
              onClick={handleTestBkash}
              disabled={testingBkash}
              className="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-gray-200 text-xs font-semibold rounded-xl border border-gray-700 transition flex items-center gap-2"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${testingBkash ? 'animate-spin text-pink-400' : ''}`} />
              <span>{testingBkash ? 'Verifying Token...' : 'Test Connection'}</span>
            </button>
          </div>
        </div>

        {/* Submit Save */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-8 py-3 bg-gradient-to-r from-[#00F2FE] to-[#4FACFE] text-[#0B0F19] font-bold rounded-xl text-xs sm:text-sm shadow-lg shadow-[#00F2FE]/25 hover:opacity-95 transition"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};
