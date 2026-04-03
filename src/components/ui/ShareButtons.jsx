import { IoShareSocial, IoLogoTwitter, IoLogoWhatsapp, IoCopy, IoCheckmark } from 'react-icons/io5';
import { useState } from 'react';

export default function ShareButtons({ title, mediaType }) {
  const [copied, setCopied] = useState(false);
  const url = window.location.href;
  const text = `Check out "${title}" on FLIMQ`;

  const share = (platform) => {
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    };
    window.open(urls[platform], '_blank', 'noopener,noreferrer,width=600,height=400');
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => share('twitter')}
        className="p-2.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-white/40 hover:text-white/80 hover:bg-white/[0.08] transition-all"
        title="Share on X"
      >
        <IoLogoTwitter size={16} />
      </button>
      <button
        onClick={() => share('whatsapp')}
        className="p-2.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-white/40 hover:text-white/80 hover:bg-white/[0.08] transition-all"
        title="Share on WhatsApp"
      >
        <IoLogoWhatsapp size={16} />
      </button>
      <button
        onClick={copyLink}
        className="p-2.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-white/40 hover:text-white/80 hover:bg-white/[0.08] transition-all"
        title="Copy link"
      >
        {copied ? <IoCheckmark size={16} className="text-emerald-400" /> : <IoCopy size={16} />}
      </button>
    </div>
  );
}
