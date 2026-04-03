import { useState, useMemo } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { IoEye, IoEyeOff, IoMailOutline, IoCheckmarkCircle, IoMale, IoFemale, IoMaleFemale, IoChevronDown } from 'react-icons/io5';
import { useAuth } from '@/context/AuthContext';
import { pageVariants } from '@/utils/animations';

const GENDERS = [
  { value: 'male', label: 'Male', icon: IoMale },
  { value: 'female', label: 'Female', icon: IoFemale },
  { value: 'other', label: 'Other', icon: IoMaleFemale },
];

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

function getDaysInMonth(month, year) {
  if (!month || !year) return 31;
  return new Date(year, month, 0).getDate();
}

function DOBSelector({ day, month, year, onChange }) {
  const currentYear = new Date().getFullYear();
  const years = useMemo(() => {
    const arr = [];
    for (let y = currentYear; y >= currentYear - 120; y--) arr.push(y);
    return arr;
  }, [currentYear]);

  const maxDay = getDaysInMonth(month, year);
  const days = useMemo(() => {
    const arr = [];
    for (let d = 1; d <= maxDay; d++) arr.push(d);
    return arr;
  }, [maxDay]);

  const selectClass = 'flex-1 appearance-none px-3 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-md text-sm text-white focus:outline-none focus:border-white/20 transition-colors cursor-pointer';

  return (
    <div className="flex gap-2">
      <div className="relative flex-1">
        <select
          value={day}
          onChange={(e) => onChange('day', e.target.value)}
          className={selectClass}
        >
          <option value="" disabled className="bg-[#111] text-white/30">Day</option>
          {days.map((d) => (
            <option key={d} value={d} className="bg-[#111] text-white">{d}</option>
          ))}
        </select>
        <IoChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none" />
      </div>
      <div className="relative flex-[1.4]">
        <select
          value={month}
          onChange={(e) => onChange('month', e.target.value)}
          className={selectClass}
        >
          <option value="" disabled className="bg-[#111] text-white/30">Month</option>
          {MONTHS.map((m, i) => (
            <option key={m} value={i + 1} className="bg-[#111] text-white">{m}</option>
          ))}
        </select>
        <IoChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none" />
      </div>
      <div className="relative flex-1">
        <select
          value={year}
          onChange={(e) => onChange('year', e.target.value)}
          className={selectClass}
        >
          <option value="" disabled className="bg-[#111] text-white/30">Year</option>
          {years.map((y) => (
            <option key={y} value={y} className="bg-[#111] text-white">{y}</option>
          ))}
        </select>
        <IoChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none" />
      </div>
    </div>
  );
}

export default function SignUpPage() {
  const navigate = useNavigate();
  const { signup, user } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [dobDay, setDobDay] = useState('');
  const [dobMonth, setDobMonth] = useState('');
  const [dobYear, setDobYear] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  // Redirect if already logged in
  if (user) return <Navigate to="/" replace />;

  const handleDobChange = (field, value) => {
    if (field === 'day') setDobDay(value);
    if (field === 'month') setDobMonth(value);
    if (field === 'year') setDobYear(value);
  };

  const buildDobString = () => {
    if (!dobDay || !dobMonth || !dobYear) return '';
    const m = String(dobMonth).padStart(2, '0');
    const d = String(dobDay).padStart(2, '0');
    return `${dobYear}-${m}-${d}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim() || !email.trim() || !password.trim()) {
      setError('Please fill in all fields');
      return;
    }
    if (!gender) {
      setError('Please select your gender');
      return;
    }
    const dob = buildDobString();
    if (!dob) {
      setError('Please select your date of birth');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setSubmitting(true);
    const result = await signup(name.trim(), email.trim(), password, gender, dob);
    if (result.success) {
      if (result.needsConfirmation) {
        setEmailSent(true);
      } else {
        navigate('/');
      }
    } else {
      setError(result.error);
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

        {emailSent ? (
          /* Email Verification Sent State */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="bg-[#111111] border border-white/[0.06] rounded-lg p-8 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
              className="w-16 h-16 mx-auto mb-5 rounded-full bg-white/[0.05] border border-white/[0.08] flex items-center justify-center"
            >
              <IoMailOutline size={28} className="text-white/60" />
            </motion.div>

            <h2 className="text-xl font-bold font-heading text-white mb-2">Check Your Email</h2>
            <p className="text-sm text-white/40 mb-4 leading-relaxed">
              We've sent a verification link to
            </p>
            <p className="text-sm font-medium text-white/70 bg-white/[0.04] border border-white/[0.06] rounded-md px-3 py-2 mb-5 truncate">
              {email}
            </p>
            <div className="flex items-start gap-2.5 text-left bg-white/[0.02] border border-white/[0.04] rounded-md p-3 mb-6">
              <IoCheckmarkCircle size={16} className="text-white/30 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-white/30 leading-relaxed">
                Click the link in your email to verify your account. After verification, you can sign in and start exploring.
              </p>
            </div>

            <Link
              to="/login"
              className="inline-block w-full py-2.5 bg-white text-black text-sm font-bold rounded-md hover:bg-white/85 transition-all text-center active:scale-[0.98]"
            >
              Go to Sign In
            </Link>

            <p className="text-xs text-white/20 mt-4">
              Didn't receive an email? Check your spam folder.
            </p>
          </motion.div>
        ) : (
          <>
            {/* Card */}
            <div className="bg-[#111111] border border-white/[0.06] rounded-lg p-8">
              <h1 className="text-2xl font-bold font-heading text-white mb-1">Create Account</h1>
              <p className="text-sm text-white/35 mb-6">Join FLIMQ today</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-xs text-white/40 mb-1.5 font-medium">Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full px-3.5 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-md text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/20 transition-colors"
                  />
                </div>

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

                {/* Gender */}
                <div>
                  <label className="block text-xs text-white/40 mb-2 font-medium">Gender</label>
                  <div className="flex gap-2">
                    {GENDERS.map(({ value, label, icon: Icon }) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setGender(value)}
                        className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-md text-sm font-medium border transition-all ${
                          gender === value
                            ? 'bg-white text-black border-white'
                            : 'bg-white/[0.04] text-white/40 border-white/[0.08] hover:border-white/20 hover:text-white/60'
                        }`}
                      >
                        <Icon size={15} />
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Date of Birth */}
                <div>
                  <label className="block text-xs text-white/40 mb-2 font-medium">Date of Birth</label>
                  <DOBSelector
                    day={dobDay}
                    month={dobMonth}
                    year={dobYear}
                    onChange={handleDobChange}
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-xs text-white/40 mb-1.5 font-medium">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Min. 6 characters"
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

                {/* Error */}
                {error && (
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
                  {submitting ? 'Creating account...' : 'Sign Up'}
                </button>
              </form>
            </div>

            {/* Footer link */}
            <p className="text-center mt-6 text-sm text-white/30">
              Already have an account?{' '}
              <Link to="/login" className="text-white/70 hover:text-white transition-colors font-medium">
                Sign In
              </Link>
            </p>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}
