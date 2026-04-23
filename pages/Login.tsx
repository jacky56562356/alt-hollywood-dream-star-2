
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { Lock, Mail, Loader2, Sparkles } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simulation of a production API call
      // In a real environment, this would call fetch('/api/auth/login')
      await new Promise(res => setTimeout(res, 1200)); 
      
      if (email === 'admin@althollywood.com' && password === 'admin123') {
        login('mock-jwt-token');
        navigate('/dashboard');
      } else {
        setError('Invalid industry credentials. Please contact your administrator.');
      }
    } catch (err) {
      setError('Connection failure. Hollywood systems are temporarily down.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-20 flex items-center justify-center">
      <div className="w-full max-w-md px-4">
        <div className="bg-white/5 border border-white/10 rounded-3xl p-10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 brand-bg"></div>
          
          <div className="text-center mb-10">
            <div className="w-16 h-16 brand-bg rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-brandCyan/20">
              <Lock size={28} className="text-white" />
            </div>
            <h2 className="text-3xl font-cinematic font-black mb-2 tracking-tight">Internal Portal</h2>
            <p className="text-brandGray text-xs uppercase tracking-widest font-bold">Authorized Personnel Only</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold rounded-xl text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[10px] text-brandGray uppercase font-black tracking-widest mb-2">Internal Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-brandGray" size={18} />
                <input 
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-brandBlack/50 border border-white/10 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-brandCyan/60 transition-all text-sm"
                  placeholder="admin@althollywood.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] text-brandGray uppercase font-black tracking-widest mb-2">Secure Key</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-brandGray" size={18} />
                <input 
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-brandBlack/50 border border-white/10 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-brandCyan/60 transition-all text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full py-5 brand-bg text-white font-black uppercase tracking-[0.3em] rounded-xl hover:scale-[1.02] transition-all shadow-xl shadow-brandCyan/20 flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isLoading ? <Loader2 className="animate-spin" size={20} /> : <><Sparkles size={18} /> Authenticate</>}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-[10px] text-brandGray font-medium leading-relaxed italic">
              Access is monitored by Hollywood Dream Star Security Compliance. Unofficial access attempts are logged.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
