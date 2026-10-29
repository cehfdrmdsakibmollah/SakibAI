import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { AppView } from '../types';

interface LoginPageProps {
  setCurrentView: (view: AppView) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ setCurrentView }) => {
  const [email, setEmail] = useState('rahim@example.com');
  const [password, setPassword] = useState('password123');
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setCurrentView('dashboard');
    }, 700);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-[#111827] border border-gray-800 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-6">
        {/* Brand header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#00F2FE] to-[#4FACFE] flex items-center justify-center font-extrabold text-[#0B0F19] text-xl mx-auto shadow-lg shadow-[#00F2FE]/20">
            S
          </div>
          <h2 className="text-2xl font-extrabold text-white">Welcome Back</h2>
          <p className="text-xs text-gray-400">
            Login to your SakibAI merchant account
          </p>
        </div>

        {/* Demo Quick Fill Hint */}
        <div className="p-3 bg-gradient-to-r from-[#00F2FE]/10 to-[#4FACFE]/10 border border-[#00F2FE]/20 rounded-xl text-xs text-gray-300 flex items-center justify-between">
          <span>Demo Account Loaded</span>
          <button
            type="button"
            onClick={() => {
              setEmail('rahim@example.com');
              setPassword('password123');
            }}
            className="text-[#00F2FE] font-bold hover:underline"
          >
            Auto Fill
          </button>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-500 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-950 border border-gray-800 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-[#00F2FE]"
                placeholder="••••••••••••"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-gray-400">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-gray-700 bg-gray-900 text-[#00F2FE] focus:ring-0"
              />
              <span>Remember me</span>
            </label>
            <button
              type="button"
              onClick={() => alert('Password reset link will be sent to your email.')}
              className="text-[#00F2FE] hover:underline"
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-[#00F2FE] to-[#4FACFE] text-[#0B0F19] font-bold rounded-xl shadow-lg shadow-[#00F2FE]/20 hover:opacity-95 transition flex items-center justify-center gap-2 text-sm disabled:opacity-50"
          >
            <span>{loading ? 'Authenticating...' : 'Login'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-800" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-3 bg-[#111827] text-gray-500">
              or continue with
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setCurrentView('dashboard')}
            className="py-2.5 px-4 bg-gray-950 hover:bg-gray-900 border border-gray-800 rounded-xl text-xs text-white font-medium flex items-center justify-center gap-2 transition"
          >
            <span className="text-red-400 font-bold">G</span>
            <span>Google</span>
          </button>
          <button
            type="button"
            onClick={() => setCurrentView('dashboard')}
            className="py-2.5 px-4 bg-gray-950 hover:bg-gray-900 border border-gray-800 rounded-xl text-xs text-white font-medium flex items-center justify-center gap-2 transition"
          >
            <span className="text-blue-400 font-bold">f</span>
            <span>Facebook</span>
          </button>
        </div>

        <div className="text-center text-xs text-gray-400 pt-2">
          Don&apos;t have an account?{' '}
          <button
            onClick={() => setCurrentView('register')}
            className="text-[#00F2FE] font-semibold hover:underline"
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
};
