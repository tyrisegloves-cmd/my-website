import { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useStore } from '../store';
import { mockUser, mockAdminUser } from '../data/mockData';
import { GoogleSignInButton } from './GoogleSignInButton';

interface LoginPageProps {
  onLoginSuccess?: (role: string) => void;
  onBack?: () => void;
}

type Mode = 'signin' | 'signup';
const ADMIN_EMAIL = 'tyrisegloves@gmail.com';

export function LoginPage({ onLoginSuccess = () => {}, onBack }: LoginPageProps = {}) {
  const [mode, setMode] = useState<Mode>('signin');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setCurrentUser } = useStore();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  });
  const showToast = useStore((s) => s.showToast);

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === 'signin') {
      if (!formData.email || !formData.password) {
        alert('Please fill in all fields');
        return;
      }
    } else {
      if (!formData.fullName || !formData.email || !formData.password) {
        alert('Please fill in all required fields');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match');
        return;
      }
    }

    setIsLoading(true);

    setTimeout(() => {
      const normalizedEmail = formData.email.trim().toLowerCase();
      const isAdmin = normalizedEmail === ADMIN_EMAIL;
      const assignedRole: 'user' | 'admin' = isAdmin ? 'admin' : 'user';
      const baseUser = isAdmin ? mockAdminUser : mockUser;
      const resolvedName = mode === 'signup'
        ? formData.fullName
        : isAdmin
          ? 'Tyrise Admin'
          : baseUser.name;

      const user = {
        ...baseUser,
        name: resolvedName,
        email: normalizedEmail,
        role: assignedRole,
      };

      setCurrentUser(user);
      showToast(isAdmin ? 'Admin access granted' : 'Signed in successfully', 'success');
      setIsLoading(false);
      onLoginSuccess(assignedRole);
    }, 900);
  };

  const toggleMode = () => {
    setMode(mode === 'signin' ? 'signup' : 'signin');
    setFormData({ fullName: '', email: '', password: '', confirmPassword: '', phone: '' });
  };

  const inputCls = 'w-full pl-10 pr-10 py-3 bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/10 rounded-xl text-white placeholder-white/40 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#00FF85]/50 focus:border-[#00FF85] transition-all';
  const labelCls = 'block text-xs font-semibold uppercase tracking-wider text-white/60 mb-2';

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/auth-bg.jpg)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0e1a]/85 via-[#0a0e1a]/70 to-[#00ff85]/10" />

      {/* Logo Badge */}
      <div className="absolute top-4 right-4 z-50 flex items-center gap-2 px-3 py-2 rounded-xl bg-black/30 backdrop-blur-md border border-white/10">
        <img src="/logo.png" alt="Igris" className="h-8 w-8 object-contain drop-shadow-[0_0_6px_rgba(0,255,133,0.6)]" />
        <span className="text-white font-bold hidden sm:block" style={{ fontFamily: 'Space Grotesk' }}>Igris</span>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col p-4 sm:p-6">
        {/* Back Button - Positioned underneath the header area */}
        {onBack && (
          <div className="max-w-7xl mx-auto w-full pt-20 sm:pt-24 mb-4">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-black/30 hover:bg-black/50 text-white border border-white/20 backdrop-blur-md transition-all duration-300 group shadow-lg"
            >
              <ArrowLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" />
              <span className="text-sm font-medium">Back</span>
            </button>
          </div>
        )}

        <div className={`flex-1 flex items-center justify-center ${onBack ? 'pb-12' : 'py-12'}`}>
          <div className="w-full max-w-md">
            <div className="bg-black/40 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden">
              {/* Card Header with Mode Toggle */}
              <div className="px-8 pt-8 pb-6">
                <div className="text-center mb-6">
                  <img src="/logo.png" alt="Igris" className="h-14 w-14 object-contain mx-auto mb-3 drop-shadow-[0_0_10px_rgba(0,255,133,0.5)]" />
                  <h1 className="text-3xl font-bold text-white mb-1" style={{ fontFamily: 'Space Grotesk' }}>
                    {mode === 'signin' ? 'Welcome Back' : 'Join Igris'}
                  </h1>
                  <p className="text-white/60 text-sm">
                    {mode === 'signin' ? 'Sign in to your account' : 'Create your account'}
                  </p>
                </div>

                {/* Mode Tabs */}
                <div className="flex bg-white/5 rounded-xl p-1 border border-white/10">
                  <button
                    onClick={() => mode !== 'signin' && toggleMode()}
                    className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                      mode === 'signin'
                        ? 'bg-[#00FF85] text-[#0b1e17] shadow-lg shadow-[#00FF85]/30'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => mode !== 'signup' && toggleMode()}
                    className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                      mode === 'signup'
                        ? 'bg-[#00FF85] text-[#0b1e17] shadow-lg shadow-[#00FF85]/30'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    Sign Up
                  </button>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-4">
                {mode === 'signup' && (
                  <div>
                    <label className={labelCls}>Full Name</label>
                    <div className="relative">
                      <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                      <input
                        type="text"
                        placeholder="John Doe"
                        value={formData.fullName}
                        onChange={(e) => updateField('fullName', e.target.value)}
                        className={inputCls}
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className={labelCls}>Email Address</label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      className={inputCls}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelCls}>Password</label>
                  <div className="relative">
                    <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => updateField('password', e.target.value)}
                      className={inputCls}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {mode === 'signup' && (
                  <div>
                    <label className={labelCls}>Confirm Password</label>
                    <div className="relative">
                      <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                      <input
                        type={showConfirm ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={(e) => updateField('confirmPassword', e.target.value)}
                        className={inputCls}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirm(!showConfirm)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                      >
                        {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                )}

                {mode === 'signin' && (
                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 text-white/70 cursor-pointer">
                      <input type="checkbox" className="rounded border-white/20 bg-white/10 text-[#00FF85] focus:ring-[#00FF85]" />
                      Remember me
                    </label>
                    <button type="button" className="text-[#00FF85] hover:text-[#22ff97] font-medium transition-colors">
                      Forgot password?
                    </button>
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-gradient-to-r from-[#00FF85] to-[#00d873] text-[#0b1e17] rounded-xl font-bold text-base shadow-lg shadow-[#00FF85]/30 hover:shadow-[#00FF85]/50 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-[#0b1e17] border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </span>
                  ) : mode === 'signin' ? 'Sign In' : 'Create Account'}
                </button>

                <div className="flex items-center gap-3 my-2">
                  <div className="flex-1 h-px bg-white/15" />
                  <span className="text-xs text-white/40 uppercase tracking-wider">or</span>
                  <div className="flex-1 h-px bg-white/15" />
                </div>

                {/* Google Sign-In (Official Google Identity Services) */}
                <GoogleSignInButton
                  onSuccess={(userInfo) => {
                    const normalizedEmail = userInfo.email.trim().toLowerCase();
                    const isAdmin = normalizedEmail === ADMIN_EMAIL;
                    const user = {
                      id: 'google-' + Date.now(),
                      name: userInfo.name,
                      email: normalizedEmail,
                      role: (isAdmin ? 'admin' : 'user') as 'user' | 'admin',
                      avatar: userInfo.avatar,
                    };
                    setCurrentUser(user);
                    showToast(
                      isAdmin
                        ? 'Google admin sign-in successful'
                        : 'Signed in with Google as ' + userInfo.name,
                      'success'
                    );
                    onLoginSuccess(user.role);
                  }}
                  onError={(err) => showToast(err || 'Google Sign-In failed', 'error')}
                />

                {/* Other providers */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => showToast('GitHub sign-in coming soon', 'info')}
                    className="flex items-center justify-center gap-2 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white/70 text-sm transition-all"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    <span className="text-xs">GitHub</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => showToast('Apple sign-in coming soon', 'info')}
                    className="flex items-center justify-center gap-2 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white/70 text-sm transition-all"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                      <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                    </svg>
                    <span className="text-xs">Apple</span>
                  </button>
                </div>

                {/* Play mode notice */}
                <div className="bg-[#00FF85]/10 border border-[#00FF85]/30 rounded-xl p-3 text-xs text-[#00FF85] text-center">
                  <strong>Play mode:</strong> any email & password works
                </div>
              </form>
            </div>

            {/* Footer */}
            <p className="text-center text-white/40 text-xs mt-6">
              By continuing, you agree to Igris'{' '}
              <a href="#" onClick={(e) => { e.preventDefault(); showToast('Privacy Policy coming soon', 'info'); }} className="text-[#00FF85] hover:underline">Terms</a> &{' '}
              <a href="#" onClick={(e) => { e.preventDefault(); showToast('Terms coming soon', 'info'); }} className="text-[#00FF85] hover:underline">Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
