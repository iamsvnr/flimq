import { useState } from 'react';
import { Link, useNavigate, useSearchParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { IoEye, IoEyeOff, IoMailOutline, IoArrowBack } from 'react-icons/io5';
import { useAuth } from '@/context/AuthContext';
import { pageVariants } from '@/utils/animations';

export default function LoginPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login, resetPassword, user } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [needsVerification, setNeedsVerification] = useState(false);
  const [forgotMode, setForgotMode] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [resetMsg, setResetMsg] = useState(null);

  // Redirect if already logged in
  if (user) return <Navigate to="/" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setNeedsVerification(false);

    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields');
      return;
    }

    setSubmitting(true);
    const result = await login(email, password);
    if (result.success) {
      navigate('/');
    } else {
      if (result.error.includes('confirm') || result.error.includes('verify')) {
        setNeedsVerification(true);
      }
      setError(result.error);
    }
    setSubmitting(false);
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setResetMsg({ type: 'error', text: 'Please enter your email address' });
      return;
    }
    setSubmitting(true);
    setResetMsg(null);
    const result = await resetPassword(email.trim());
    if (result.success) {
      setResetSent(true);
      setResetMsg({ type: 'success', text: 'Password reset link sent to your email' });
    } else {
      setResetMsg({ type: 'error', text: result.error });
    }
    setSubmitting(false);
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4 py-20"
    >
      {/* Background texture */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.02)_0%,_transparent_70%)]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="relative z-10 w-full max-w-sm"
      >
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-10">
          <div className="w-9 h-9 bg-white flex items-center justify-center rounded-sm">
            <span className="text-black font-black text-lg font-heading leading-none">F</span>
          </div>
          <span className="text-xl font-bold font-heading text-white tracking-wider">FLIMQ</span>
        </div>

        {/* Card */}
        <div className="bg-[#111111] border border-white/[0.06] rounded-lg p-8">
          {forgotMode ? (
            <>
              <button
                onClick={() => { setForgotMode(false); setResetMsg(null); setResetSent(false); }}
                className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition-colors mb-4"
              >
                <IoArrowBack size={14} />
                Back to Sign In
              </button>
              <h1 className="text-2xl font-bold font-heading text-white mb-1">Forgot Password</h1>
              <p className="text-sm text-white/35 mb-6">Enter your email to receive a reset link</p>

              {resetSent ? (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div className="flex items-start gap-2.5 bg-emerald-500/[0.06] border border-emerald-500/15 rounded-md px-3 py-3">
                    <IoMailOutline size={16} className="text-emerald-400/70 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-medium text-emerald-400/80">Reset link sent</p>
                      <p className="text-[11px] text-emerald-400/50 mt-0.5">Check your inbox at {email} for the password reset link.</p>
                    </div>
                  </div>
                  <button
                    onClick={() => { setForgotMode(false); setResetSent(false); setResetMsg(null); }}
                    className="w-full py-2.5 bg-white text-black text-sm font-bold rounded-md hover:bg-white/85 transition-all active:scale-[0.98]"
                  >
                    Back to Sign In
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleForgotPassword} className="space-y-4">
                  <div>
                    <label className="block text-xs text-white/40 mb-1.5 font-medium">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full px-3.5 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-md text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/20 transition-colors"
                    />
                  </div>

                  {resetMsg && resetMsg.type === 'error' && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-red-400/80 bg-red-400/[0.06] border border-red-400/10 rounded-md px-3 py-2"
                    >
                      {resetMsg.text}
                    </motion.p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-2.5 bg-white text-black text-sm font-bold rounded-md hover:bg-white/85 transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
                  >
                    {submitting ? 'Sending...' : 'Send Reset Link'}
                  </button>
                </form>
              )}
            </>
          ) : (
            <>
          <h1 className="text-2xl font-bold font-heading text-white mb-1">Sign In</h1>
          <p className="text-sm text-white/35 mb-6">Welcome back to FLIMQ</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-xs text-white/40 mb-1.5 font-medium">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-3.5 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-md text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/20 transition-colors"
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs text-white/40 font-medium">Password</label>
                <button
                  type="button"
                  onClick={() => { setForgotMode(true); setError(''); setNeedsVerification(false); }}
                  className="text-xs text-white/30 hover:text-white/60 transition-colors"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-3.5 py-2.5 pr-10 bg-white/[0.04] border border-white/[0.08] rounded-md text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/20 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/50 transition-colors"
                >
                  {showPassword ? <IoEyeOff size={16} /> : <IoEye size={16} />}
                </button>
              </div>
            </div>

            {/* Verification needed banner */}
            {needsVerification && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-2.5 bg-amber-500/[0.06] border border-amber-500/15 rounded-md px-3 py-2.5"
              >
                <IoMailOutline size={16} className="text-amber-400/70 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-medium text-amber-400/80">Email not verified</p>
                  <p className="text-[11px] text-amber-400/50 mt-0.5">Please check your inbox and click the verification link to continue.</p>
                </div>
              </motion.div>
            )}

            {/* Error */}
            {error && !needsVerification && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-red-400/80 bg-red-400/[0.06] border border-red-400/10 rounded-md px-3 py-2"
              >
                {error}
              </motion.p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-2.5 bg-white text-black text-sm font-bold rounded-md hover:bg-white/85 transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
            >
              {submitting ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
            </>
          )}
        </div>

        {/* Footer link */}
        <p className="text-center mt-6 text-sm text-white/30">
          New to FLIMQ?{' '}
          <Link to="/signup" className="text-white/70 hover:text-white transition-colors font-medium">
            Sign Up
          </Link>
        </p>
      </motion.div>
    </motion.div>
  );
}
