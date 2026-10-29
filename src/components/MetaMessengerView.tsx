import React, { useState } from 'react';
import {
  MessageCircle,
  Send,
  Bot,
  User,
  CheckCircle2,
  ExternalLink,
  ShoppingBag,
  RefreshCw,
  Sparkles,
} from 'lucide-react';
import { Product, Merchant, AppView } from '../types';
import { simulateMessengerResponse } from '../services/aiService';

interface MetaMessengerViewProps {
  merchant: Merchant;
  products: Product[];
  setCurrentView: (view: AppView) => void;
}

export const MetaMessengerView: React.FC<MetaMessengerViewProps> = ({
  merchant,
  products,
  setCurrentView,
}) => {
  const [verifyToken, setVerifyToken] = useState('123456');
  const [autoReplyEnabled, setAutoReplyEnabled] = useState(true);
  const [welcomeMessage, setWelcomeMessage] = useState(
    'Hi! Thanks for messaging Rahim Fashion. How can I help you today?'
  );

  // Chat simulator state (Screen 11 Fidelity)
  const [messages, setMessages] = useState<
    {
      sender: 'user' | 'bot';
      text: string;
      productCard?: Product;
    }[]
  >([
    {
      sender: 'user',
      text: 'Hi! Do you have this Casual T-Shirt in stock?',
    },
    {
      sender: 'bot',
      text: 'Yes! We have it in stock (Price: ৳ 499, Stock: 45 units). Here is the product link to order directly:',
      productCard: products[0],
    },
  ]);

  const [inputMsg, setInputMsg] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    const userText = inputMsg;
    setInputMsg('');
    setMessages((prev) => [...prev, { sender: 'user', text: userText }]);

    setIsBotTyping(true);
    setTimeout(() => {
      const { text, matchedProduct } = simulateMessengerResponse(
        userText,
        products,
        merchant.storeSubdomain
      );
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text,
          productCard: matchedProduct,
        },
      ]);
      setIsBotTyping(false);
    }, 600);
  };

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header (Screen 11 Fidelity) */}
      <div>
        <h2 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <MessageCircle className="w-6 h-6 text-[#00F2FE]" />
          Meta Messenger Integration
        </h2>
        <p className="text-xs text-gray-400 mt-1">
          Connect your Facebook Page & Instagram to automate customer support and 24/7 AI sales.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Settings Column (Screen 11 Fidelity) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Page Connection Box */}
          <div className="p-6 rounded-3xl bg-[#111827] border border-gray-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold">
                  FB
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">
                    {merchant.metaPageName || 'Rahim Fashion Official'}
                  </h3>
                  <p className="text-xs text-emerald-400 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Connected & Syncing
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => alert('Facebook Page connection is managed by SakibAI OAuth gateway.')}
                className="px-3 py-1.5 bg-gray-900 hover:bg-gray-800 text-gray-300 text-xs font-semibold rounded-xl border border-gray-700 transition"
              >
                Disconnect
              </button>
            </div>
          </div>

          {/* Webhook Setup */}
          <div className="p-6 rounded-3xl bg-[#111827] border border-gray-800 shadow-xl space-y-4">
            <h3 className="font-bold text-white text-sm">Webhook Setup</h3>
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">
                Verify Token
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={verifyToken}
                  onChange={(e) => setVerifyToken(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 bg-gray-950 border border-gray-800 rounded-xl text-xs text-white font-mono focus:outline-none focus:border-[#00F2FE]"
                />
                <button
                  type="button"
                  onClick={() => alert('Webhook verify token updated!')}
                  className="px-4 py-2.5 bg-gradient-to-r from-[#00F2FE] to-[#4FACFE] text-[#0B0F19] text-xs font-bold rounded-xl hover:opacity-90 transition"
                >
                  Update
                </button>
              </div>
            </div>
          </div>

          {/* Auto Reply Settings */}
          <div className="p-6 rounded-3xl bg-[#111827] border border-gray-800 shadow-xl space-y-4">
            <h3 className="font-bold text-white text-sm">Auto Reply Settings</h3>

            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <div>
                <div className="text-xs font-semibold text-white">Enable Auto Reply</div>
                <div className="text-[11px] text-gray-400">
                  Allow AI agent to reply to customer product inquiries
                </div>
              </div>
              <input
                type="checkbox"
                checked={autoReplyEnabled}
                onChange={(e) => setAutoReplyEnabled(e.target.checked)}
                className="w-5 h-5 accent-[#00F2FE] cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">
                Welcome Message
              </label>
              <textarea
                rows={2}
                value={welcomeMessage}
                onChange={(e) => setWelcomeMessage(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-gray-950 border border-gray-800 rounded-xl text-xs text-white focus:outline-none focus:border-[#00F2FE]"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => alert('Settings saved successfully!')}
                className="px-6 py-2.5 bg-gray-800 hover:bg-gray-700 text-white text-xs font-bold rounded-xl transition"
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>

        {/* Right Interactive Messenger Simulator (Screen 11 Fidelity) */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-[#111827] border border-gray-800 shadow-xl flex flex-col justify-between h-[540px]">
          <div>
            <div className="flex items-center justify-between border-b border-gray-800 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-xs font-bold text-white">
                  RF
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Test Messenger</div>
                  <div className="text-[10px] text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Rahim Fashion • Active Now
                  </div>
                </div>
              </div>

              <button
                onClick={() =>
                  setMessages([
                    {
                      sender: 'bot',
                      text: welcomeMessage,
                    },
                  ])
                }
                title="Reset Test Chat"
                className="text-xs text-gray-500 hover:text-white"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="space-y-3 overflow-y-auto max-h-[360px] pr-1">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${
                    m.sender === 'user' ? 'items-end' : 'items-start'
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs ${
                      m.sender === 'user'
                        ? 'bg-[#00F2FE] text-[#0B0F19] font-medium rounded-br-xs'
                        : 'bg-gray-900 border border-gray-800 text-gray-200 rounded-bl-xs'
                    }`}
                  >
                    {m.text}
                  </div>

                  {/* Product card inside bot message (Screen 11 Fidelity) */}
                  {m.productCard && (
                    <div className="mt-2 w-56 rounded-2xl bg-gray-950 border border-gray-800 overflow-hidden shadow-lg">
                      <img
                        src={m.productCard.image}
                        alt={m.productCard.title}
                        className="w-full h-24 object-cover"
                      />
                      <div className="p-2.5 space-y-1.5">
                        <div className="text-xs font-bold text-white truncate">
                          {m.productCard.title}
                        </div>
                        <div className="text-xs font-extrabold text-[#00F2FE]">
                          ৳ {m.productCard.price}
                        </div>
                        <button
                          onClick={() => setCurrentView('storefront')}
                          className="w-full py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-bold rounded-lg transition"
                        >
                          View Product
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {isBotTyping && (
                <div className="flex items-center gap-1.5 text-xs text-gray-500 italic">
                  <Bot className="w-3.5 h-3.5 text-[#00F2FE]" />
                  <span>AI Agent is checking stock & typing...</span>
                </div>
              )}
            </div>
          </div>

          {/* Quick Question Chips & Input */}
          <div className="pt-3 border-t border-gray-800 space-y-2">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[10px]">
              <button
                type="button"
                onClick={() => setInputMsg('Do you have Casual T-Shirt in stock?')}
                className="px-2 py-1 bg-gray-900 hover:bg-gray-800 text-gray-300 rounded-lg whitespace-nowrap border border-gray-800"
              >
                Stock Check
              </button>
              <button
                type="button"
                onClick={() => setInputMsg('How much for Denim Jacket?')}
                className="px-2 py-1 bg-gray-900 hover:bg-gray-800 text-gray-300 rounded-lg whitespace-nowrap border border-gray-800"
              >
                Ask Price
              </button>
              <button
                type="button"
                onClick={() => setInputMsg('How can I order?')}
                className="px-2 py-1 bg-gray-900 hover:bg-gray-800 text-gray-300 rounded-lg whitespace-nowrap border border-gray-800"
              >
                Order Info
              </button>
            </div>

            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Type a message..."
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                className="flex-1 px-3.5 py-2 bg-gray-950 border border-gray-800 rounded-xl text-xs text-white focus:outline-none focus:border-[#00F2FE]"
              />
              <button
                type="submit"
                className="p-2 bg-[#00F2FE] hover:bg-[#4FACFE] text-[#0B0F19] rounded-xl transition"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
