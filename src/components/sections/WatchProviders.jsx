import { motion } from 'framer-motion';
import { IoTv, IoCart, IoPricetag } from 'react-icons/io5';
import { getImageUrl, getUserRegion } from '@/api/endpoints';

const GROUP_CONFIG = {
  flatrate: {
    label: 'Stream',
    icon: IoTv,
    dot: 'bg-blue-400',
    badge: 'bg-blue-500/10 text-blue-300',
  },
  rent: {
    label: 'Rent',
    icon: IoPricetag,
    dot: 'bg-amber-400',
    badge: 'bg-amber-500/10 text-amber-300',
  },
  buy: {
    label: 'Buy',
    icon: IoCart,
    dot: 'bg-emerald-400',
    badge: 'bg-emerald-500/10 text-emerald-300',
  },
};

function ProviderCard({ provider, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05, type: 'spring', stiffness: 300, damping: 20 }}
      className="group flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-300"
    >
      <img
        src={getImageUrl(provider.logo_path, 'w92')}
        alt={provider.provider_name}
        className="w-9 h-9 rounded-lg ring-1 ring-white/10 group-hover:ring-white/25 transition-all shrink-0"
      />
      <span className="text-sm text-white/60 group-hover:text-white/90 transition-colors truncate">
        {provider.provider_name}
      </span>
    </motion.div>
  );
}

function ProviderGroup({ type, providers }) {
  if (!providers?.length) return null;
  const config = GROUP_CONFIG[type];
  const Icon = config.icon;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
        <Icon className="w-3.5 h-3.5 text-white/40" />
        <span className="text-xs font-semibold uppercase tracking-widest text-white/40">
          {config.label}
        </span>
        <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${config.badge} font-medium`}>
          {providers.length}
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {providers.map((p, i) => (
          <ProviderCard key={p.provider_id} provider={p} index={i} />
        ))}
      </div>
    </div>
  );
}

export default function WatchProviders({ watchProviders }) {
  if (!watchProviders?.results) return null;

  const region = getUserRegion();
  const regionData = watchProviders.results[region] || watchProviders.results['US'];
  if (!regionData) return null;

  const { flatrate, rent, buy } = regionData;
  if (!flatrate?.length && !rent?.length && !buy?.length) return null;

  const totalProviders = (flatrate?.length || 0) + (rent?.length || 0) + (buy?.length || 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="mt-14"
    >
      <div className="flex items-center gap-3 mb-5">
        <h2 className="text-xl md:text-2xl font-bold font-heading text-white">
          Where to Watch
        </h2>
        <span className="text-xs text-white/20 px-2 py-0.5 rounded-full border border-white/[0.06]">
          {region}
        </span>
      </div>

      <div className="p-5 md:p-6 rounded-2xl border border-white/[0.06] bg-white/[0.015] backdrop-blur-sm space-y-5">
        <div className="flex items-center gap-2 pb-4 border-b border-white/[0.06]">
          <span className="text-sm text-white/50">
            Available on <span className="text-white/80 font-medium">{totalProviders}</span> {totalProviders === 1 ? 'service' : 'services'}
          </span>
        </div>

        <ProviderGroup type="flatrate" providers={flatrate} />
        <ProviderGroup type="rent" providers={rent} />
        <ProviderGroup type="buy" providers={buy} />

        <p className="text-[10px] text-white/15 pt-2 border-t border-white/[0.04]">
          Data provided by JustWatch
        </p>
      </div>
    </motion.div>
  );
}
