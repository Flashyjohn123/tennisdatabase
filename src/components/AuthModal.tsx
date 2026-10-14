import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, ShieldCheck, LogOut, Mail, Lock, CheckCircle2, AlertCircle, Cloud } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { user, isConfigured, signIn, signUp, signOut } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);
    setLoading(true);

    try {
      if (isSignUp) {
        const res = await signUp(email, password);
        if (!res.success) {
          setError(res.error || 'Failed to create account.');
        } else {
          setSuccessMsg('Account created successfully!');
          setTimeout(() => onClose(), 800);
        }
      } else {
        const res = await signIn(email, password);
        if (!res.success) {
          setError(res.error || 'Invalid email or credentials.');
        } else {
          setSuccessMsg('Signed in successfully!');
          setTimeout(() => onClose(), 800);
        }
      }
    } catch (err: any) {
      setError(err?.message || 'Authentication error.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md rounded-2xl bg-[#090b10] border border-white/[0.1] shadow-2xl p-6 sm:p-7 relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow ambient accent */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] relative z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/25 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white tracking-wide">
                {user ? 'Circuit Account' : isSignUp ? 'Create Cloud Account' : 'Sign In to Circuit Pro'}
              </h2>
              <div className="flex items-center gap-1.5 mt-0.5">
                <Cloud className="w-3 h-3 text-emerald-400" />
                <span className="text-[10px] font-mono text-white/50 uppercase tracking-widest">
                  {isConfigured ? 'Supabase Cloud Sync' : 'Local Sandbox Storage'}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-white/60 hover:text-white flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Logged in state */}
        {user ? (
          <div className="pt-6 space-y-5 relative z-10">
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/50 font-mono">Authenticated User</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-400/10 border border-emerald-400/30 text-emerald-300">
                  Active
                </span>
              </div>
              <p className="text-sm font-medium text-white truncate font-mono">
                {user.email}
              </p>
              <p className="text-[11px] text-white/40">
                Starred athletes, custom match scorecards, and bracket predictions are synced to this account.
              </p>
            </div>

            <button
              onClick={handleSignOut}
              className="w-full py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 hover:border-rose-500/50 text-rose-300 text-xs font-mono font-medium transition flex items-center justify-center gap-2"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign Out of Account
            </button>
          </div>
        ) : (
          /* Sign In / Sign Up Form */
          <form onSubmit={handleSubmit} className="pt-5 space-y-4 relative z-10">
            {error && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{error}</span>
              </div>
            )}
            {successMsg && (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>{successMsg}</span>
              </div>
            )}

            <div>
              <label className="block text-[11px] font-mono text-white/60 mb-1.5 uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="analyst@circuitpro.tennis"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.05] focus:bg-white/[0.07] border border-white/[0.1] focus:border-amber-400/50 text-xs text-white placeholder-white/25 focus:outline-none transition font-sans"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono text-white/60 mb-1.5 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <Lock className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.05] focus:bg-white/[0.07] border border-white/[0.1] focus:border-amber-400/50 text-xs text-white placeholder-white/25 focus:outline-none transition font-sans"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl bg-amber-400/15 hover:bg-amber-400/25 border border-amber-400/40 hover:border-amber-400/60 text-amber-300 font-mono text-xs font-semibold tracking-wider uppercase transition shadow-[0_0_15px_rgba(251,191,36,0.15)] disabled:opacity-50"
            >
              {loading ? 'Authenticating...' : isSignUp ? 'Create Account' : 'Sign In'}
            </button>

            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError(null);
                }}
                className="text-[11px] font-mono text-white/50 hover:text-white transition"
              >
                {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Create one"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
