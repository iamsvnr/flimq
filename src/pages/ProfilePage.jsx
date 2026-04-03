import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { IoShieldCheckmark, IoMailOutline, IoPersonOutline, IoCalendarOutline, IoCheckmarkCircle, IoCloseCircle, IoMale, IoFemale, IoMaleFemale, IoTrashOutline, IoWarning } from 'react-icons/io5';
import { useAuth } from '@/context/AuthContext';
import { pageVariants } from '@/utils/animations';

const GENDERS = [
  { value: 'male', label: 'Male', icon: IoMale },
  { value: 'female', label: 'Female', icon: IoFemale },
  { value: 'other', label: 'Other', icon: IoMaleFemale },
];

export default function ProfilePage() {
  const { user, adultEnabled, toggleAdult, updateProfile, updateGender, resetPassword, deleteAccount } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || '');
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState(null);

  const [selectedGender, setSelectedGender] = useState(user?.gender || 'other');
  const [savingGender, setSavingGender] = useState(false);
  const [genderMsg, setGenderMsg] = useState(null);

  const [sendingReset, setSendingReset] = useState(false);
  const [resetMsg, setResetMsg] = useState(null);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  if (!user) return <Navigate to="/login" replace />;

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    setSaving(true);
    setSaveMsg(null);
    const result = await updateProfile({ name: name.trim() });
    setSaveMsg(result.success ? { type: 'success', text: 'Profile updated' } : { type: 'error', text: result.error });
    setSaving(false);
  };

  const handleResetPassword = async () => {
    setSendingReset(true);
    setResetMsg(null);
    const result = await resetPassword(user.email);
    setResetMsg(result.success
      ? { type: 'success', text: 'Password reset link sent to your email' }
      : { type: 'error', text: result.error }
    );
    setSendingReset(false);
  };

  const handleGenderChange = async (gender) => {
    setSelectedGender(gender);
    setSavingGender(true);
    setGenderMsg(null);
    const result = await updateGender(gender);
    setGenderMsg(result.success
      ? { type: 'success', text: 'Gender & avatar updated' }
      : { type: 'error', text: result.error }
    );
    setSavingGender(false);
  };

  const handleDeleteAccount = async () => {
    setDeleting(true);
    await deleteAccount();
    navigate('/');
  };

  const genderLabel = user.gender === 'male' ? 'Male' : user.gender === 'female' ? 'Female' : 'Other';

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen bg-[#0a0a0a] px-4 py-24 md:py-28"
    >
      <div className="max-w-lg mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-2">
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="w-16 h-16 rounded-full ring-2 ring-white/10"
          />
          <div>
            <h1 className="text-2xl font-bold font-heading text-white">{user.name}</h1>
            <p className="text-sm text-white/30">{user.email}</p>
          </div>
        </div>

        {/* Info Card */}
        <div className="bg-[#111111] border border-white/[0.06] rounded-lg p-5 space-y-3">
          <h2 className="text-sm font-semibold text-white/60 uppercase tracking-wider flex items-center gap-2">
            <IoPersonOutline size={14} />
            Account Info
          </h2>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-white/30 text-xs">Gender</p>
              <p className="text-white/80">{genderLabel}</p>
            </div>
            <div>
              <p className="text-white/30 text-xs">Date of Birth</p>
              <p className="text-white/80 flex items-center gap-1.5">
                <IoCalendarOutline size={12} className="text-white/30" />
                {user.dob || 'Not set'}
              </p>
            </div>
            <div>
              <p className="text-white/30 text-xs">Age</p>
              <p className="text-white/80">{user.age} years</p>
            </div>
            <div>
              <p className="text-white/30 text-xs">Email Status</p>
              <p className="flex items-center gap-1.5">
                {user.emailVerified ? (
                  <>
                    <IoCheckmarkCircle size={13} className="text-emerald-400" />
                    <span className="text-emerald-400/80 text-sm">Verified</span>
                  </>
                ) : (
                  <>
                    <IoCloseCircle size={13} className="text-amber-400" />
                    <span className="text-amber-400/80 text-sm">Unverified</span>
                  </>
                )}
              </p>
            </div>
          </div>

          {/* Adult toggle */}
          {user.isAdult && (
            <div className="pt-3 border-t border-white/[0.06]">
              <button
                onClick={toggleAdult}
                className="flex items-center justify-between w-full py-1"
              >
                <div className="flex items-center gap-2">
                  <IoShieldCheckmark size={14} className="text-white/40" />
                  <span className="text-sm text-white/60">18+ Content</span>
                </div>
                <motion.div
                  className="w-9 h-5 rounded-full relative"
                  animate={{ backgroundColor: adultEnabled ? 'rgba(239,68,68,0.4)' : 'rgba(255,255,255,0.1)' }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="absolute top-[3px] w-[14px] h-[14px] rounded-full"
                    animate={{
                      left: adultEnabled ? 17 : 3,
                      backgroundColor: adultEnabled ? '#ffffff' : 'rgba(255,255,255,0.4)',
                      scale: [1, 1.2, 1],
                    }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                </motion.div>
              </button>
            </div>
          )}
        </div>

        {/* Edit Name */}
        <div className="bg-[#111111] border border-white/[0.06] rounded-lg p-5">
          <h2 className="text-sm font-semibold text-white/60 uppercase tracking-wider flex items-center gap-2 mb-4">
            <IoPersonOutline size={14} />
            Edit Profile
          </h2>
          <form onSubmit={handleSaveProfile} className="space-y-3">
            <div>
              <label className="block text-xs text-white/40 mb-1.5 font-medium">Display Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-md text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/20 transition-colors"
              />
            </div>
            {saveMsg && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className={`text-xs px-3 py-2 rounded-md border ${
                  saveMsg.type === 'success'
                    ? 'text-emerald-400/80 bg-emerald-400/[0.06] border-emerald-400/10'
                    : 'text-red-400/80 bg-red-400/[0.06] border-red-400/10'
                }`}
              >
                {saveMsg.text}
              </motion.p>
            )}
            <button
              type="submit"
              disabled={saving || name.trim() === user.name}
              className="py-2.5 px-5 bg-white text-black text-sm font-bold rounded-md hover:bg-white/85 transition-all disabled:opacity-30 disabled:cursor-not-allowed active:scale-[0.98]"
            >
              {saving ? 'Saving...' : 'Save'}
            </button>
          </form>
        </div>

        {/* Change Gender */}
        <div className="bg-[#111111] border border-white/[0.06] rounded-lg p-5">
          <h2 className="text-sm font-semibold text-white/60 uppercase tracking-wider flex items-center gap-2 mb-4">
            <IoPersonOutline size={14} />
            Gender
          </h2>
          <p className="text-xs text-white/30 mb-3">Changing gender will also update your avatar style</p>
          <div className="flex gap-2">
            {GENDERS.map(({ value, label, icon: Icon }) => (
              <button
                key={value}
                onClick={() => handleGenderChange(value)}
                disabled={savingGender}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-md text-sm font-medium border transition-all ${
                  selectedGender === value
                    ? 'bg-white text-black border-white'
                    : 'bg-white/[0.04] text-white/40 border-white/[0.08] hover:border-white/20 hover:text-white/60'
                } disabled:opacity-50`}
              >
                <Icon size={15} />
                {label}
              </button>
            ))}
          </div>
          {genderMsg && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-xs px-3 py-2 rounded-md border mt-3 ${
                genderMsg.type === 'success'
                  ? 'text-emerald-400/80 bg-emerald-400/[0.06] border-emerald-400/10'
                  : 'text-red-400/80 bg-red-400/[0.06] border-red-400/10'
              }`}
            >
              {genderMsg.text}
            </motion.p>
          )}
        </div>

        {/* Reset Password */}
        <div className="bg-[#111111] border border-white/[0.06] rounded-lg p-5">
          <h2 className="text-sm font-semibold text-white/60 uppercase tracking-wider flex items-center gap-2 mb-3">
            <IoMailOutline size={14} />
            Reset Password
          </h2>
          <p className="text-xs text-white/30 mb-4">
            We'll send a password reset link to <span className="text-white/50">{user.email}</span>
          </p>
          {resetMsg && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-xs px-3 py-2 rounded-md border mb-3 ${
                resetMsg.type === 'success'
                  ? 'text-emerald-400/80 bg-emerald-400/[0.06] border-emerald-400/10'
                  : 'text-red-400/80 bg-red-400/[0.06] border-red-400/10'
              }`}
            >
              {resetMsg.text}
            </motion.p>
          )}
          <button
            onClick={handleResetPassword}
            disabled={sendingReset}
            className="py-2.5 px-5 bg-white text-black text-sm font-bold rounded-md hover:bg-white/85 transition-all disabled:opacity-30 disabled:cursor-not-allowed active:scale-[0.98]"
          >
            {sendingReset ? 'Sending...' : 'Send Reset Link'}
          </button>
        </div>

        {/* Delete Account */}
        <div className="bg-[#111111] border border-red-500/10 rounded-lg p-5">
          <h2 className="text-sm font-semibold text-red-400/60 uppercase tracking-wider flex items-center gap-2 mb-3">
            <IoTrashOutline size={14} />
            Danger Zone
          </h2>
          <p className="text-xs text-white/30 mb-4">
            Permanently delete your account and all associated data. This action cannot be undone.
          </p>
          {!showDeleteConfirm ? (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="py-2.5 px-5 bg-red-500/10 text-red-400 text-sm font-bold rounded-md hover:bg-red-500/20 transition-all border border-red-500/20 active:scale-[0.98]"
            >
              Delete Account
            </button>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              <div className="flex items-start gap-2.5 bg-red-500/[0.06] border border-red-500/15 rounded-md px-3 py-2.5">
                <IoWarning size={16} className="text-red-400/70 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-red-400/70">
                  Are you sure? Your watchlist, preferences, and profile data will be permanently deleted.
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleDeleteAccount}
                  disabled={deleting}
                  className="py-2.5 px-5 bg-red-500 text-white text-sm font-bold rounded-md hover:bg-red-600 transition-all disabled:opacity-50 active:scale-[0.98]"
                >
                  {deleting ? 'Deleting...' : 'Yes, Delete'}
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="py-2.5 px-5 bg-white/[0.04] text-white/60 text-sm font-medium rounded-md hover:bg-white/[0.08] transition-all border border-white/[0.08]"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
