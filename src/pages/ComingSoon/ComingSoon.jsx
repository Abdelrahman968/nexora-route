import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Input, Button } from '@heroui/react';
import {
  FaRocket,
  FaHeart,
  FaUsers,
  FaComments,
  FaBell,
  FaShare,
  FaStar,
  FaArrowRight,
  FaGithub,
  FaCheck,
  FaEnvelope,
  FaFire,
} from 'react-icons/fa';
import { MdVerified } from 'react-icons/md';
import SEO from '../../component/SEO/SEO';

const LAUNCH_DATE = new Date('2026-04-01T00:00:00');

const TEASERS = [
  {
    icon: FaComments,
    label: 'Live messaging',
    color: 'from-pink-500 to-rose-500',
  },
  {
    icon: FaUsers,
    label: 'Group spaces',
    color: 'from-violet-500 to-indigo-500',
  },
  {
    icon: FaStar,
    label: 'Creator analytics',
    color: 'from-amber-500 to-orange-500',
  },
  {
    icon: FaBell,
    label: 'Smart alerts',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    icon: FaShare,
    label: 'Cross-platform sharing',
    color: 'from-sky-500 to-blue-500',
  },
  {
    icon: FaHeart,
    label: 'Reaction system',
    color: 'from-pink-400 to-fuchsia-500',
  },
];

function useCountdown(target) {
  const calc = () => {
    const diff = Math.max(0, target - Date.now());
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    };
  };

  const [time, setTime] = useState(calc);

  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line
  }, []);

  return time;
}

function CountUnit({ value, label }) {
  const prev = useRef(value);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    if (prev.current !== value) {
      // eslint-disable-next-line
      setFlash(true);
      const t = setTimeout(() => setFlash(false), 400);
      prev.current = value;
      return () => clearTimeout(t);
    }
  }, [value]);

  return (
    <div className="flex flex-col items-center">
      <div
        className={`relative w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center overflow-hidden transition-all duration-300 ${flash ? 'scale-105' : 'scale-100'}`}
        style={{
          background:
            'linear-gradient(135deg, rgba(236,72,153,0.12), rgba(99,102,241,0.12))',
          border: '1px solid rgba(236,72,153,0.25)',
        }}
      >
        {/* Shimmer on tick */}
        <div
          className={`absolute inset-0 bg-linear-to-br from-pink-500/20 to-indigo-500/20  transition-opacity duration-300 ${flash ? 'opacity-100' : 'opacity-0'}`}
        />
        <span className="relative z-10 text-3xl md:text-4xl font-extrabold tabular-nums text-white leading-none">
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span className="mt-2 text-[11px] font-bold uppercase tracking-widest text-white">
        {label}
      </span>
    </div>
  );
}

function Orb({ className, style }) {
  return (
    <div
      className={`absolute rounded-full blur-3xl pointer-events-none animate-pulse ${className}`}
      style={style}
    />
  );
}

const DOTS = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  size: Math.random() * 3 + 1,
  delay: Math.random() * 4,
  duration: Math.random() * 4 + 3,
  opacity: Math.random() * 0.4 + 0.1,
}));

function ComingSoon() {
  const { days, hours, minutes, seconds } = useCountdown(LAUNCH_DATE);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleNotify = () => {
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  return (
    <>
      <SEO
        title="Coming Soon — Nexora"
        description="Something big is launching soon. Get notified when Nexora 3.0 drops."
        path="/soon"
      />

      <div className="fixed inset-0 w-full h-full bg-gray-950 overflow-x-hidden">
        {/* Ambient orbs */}
        <Orb
          className="top-[-200px] left-[-150px] opacity-30"
          style={{
            background: 'radial-gradient(circle, #ec4899 0%, transparent 70%)',
          }}
        />
        <Orb
          className="bottom-[-150px] right-[-100px] opacity-25"
          style={{
            background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)',
            animationDelay: '1.5s',
          }}
        />
        <Orb
          className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10"
          style={{
            background: 'radial-gradient(circle, #a855f7 0%, transparent 70%)',
            animationDelay: '3s',
          }}
        />

        {/* Particle dots */}
        {DOTS.map(d => (
          <div
            key={d.id}
            className="absolute rounded-full bg-white"
            style={{
              top: d.top,
              left: d.left,
              width: d.size,
              height: d.size,
              opacity: d.opacity,
              animation: `pulse ${d.duration}s ease-in-out ${d.delay}s infinite`,
            }}
          />
        ))}

        {/* Diagonal grid lines */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, #fff 0px, #fff 1px, transparent 1px, transparent 60px)',
          }}
        />

        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-16">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 rounded-2xl bg-linear-to-br from-pink-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-pink-500/30">
              <FaRocket className="text-white text-base" />
            </div>
            <span className="text-white font-extrabold text-xl tracking-tight">
              Nexora
            </span>
            <MdVerified className="text-blue-400 text-lg" />
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 border border-pink-500/30 bg-pink-500/10 backdrop-blur-sm px-4 py-2 rounded-full mb-8">
            <FaFire className="text-orange-400 text-xs animate-bounce" />
            <span className="text-xs font-bold text-pink-300 uppercase tracking-widest">
              Something big is coming
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-center font-extrabold leading-none tracking-tight mb-5">
            <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white mb-2">
              We're launching
            </span>
            <span
              className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl"
              style={{
                background:
                  'linear-gradient(135deg, #f9a8d4 0%, #ec4899 35%, #a855f7 65%, #6366f1 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Nexora 3.0
            </span>
          </h1>

          <p className="text-gray-400 text-center max-w-lg text-base md:text-lg leading-relaxed mb-12">
            A complete reimagining of how you connect, share, and grow — with
            live messaging, group spaces, creator analytics, and much more.
          </p>

          <div className=" items-start gap-4 sm:gap-6 mb-14 hidden md:flex">
            <CountUnit value={days} label="Days" />
            <div className="text-3xl text-white md:text-4xl font-extrabold mt-5 select-none animate-pulse">
              :s
            </div>
            <CountUnit value={hours} label="Hours" />
            <div className="text-3xl text-white md:text-4xl font-extrabold mt-5 select-none animate-pulse">
              :
            </div>
            <CountUnit value={minutes} label="Minutes" />
            <div className="text-3xl text-white md:text-4xl font-extrabold mt-5 select-none animate-pulse">
              :
            </div>
            <CountUnit value={seconds} label="Seconds" />
          </div>

          <div className="w-full max-w-md mb-14">
            {submitted ? (
              <div className="flex flex-col items-center gap-3 py-5 px-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-sm">
                <div className="w-12 h-12 rounded-full bg-linear-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg">
                  <FaCheck className="text-white text-base" />
                </div>
                <p className="text-emerald-300 font-bold text-sm text-center">
                  You're on the list! We'll notify you at launch. 🚀
                </p>
              </div>
            ) : (
              <>
                <p className="text-center text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
                  Get notified at launch
                </p>
                <div className="flex flex-col md:flex-row gap-2">
                  <div className="flex-1">
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={e => {
                        setEmail(e.target.value);
                        setError('');
                      }}
                      startContent={
                        <FaEnvelope className="text-gray-500 text-sm" />
                      }
                      classNames={{
                        input: 'text-white placeholder:text-gray-600',
                        inputWrapper:
                          'bg-white/5 border border-white/10 hover:border-pink-500/50 focus-within:border-pink-500/70 backdrop-blur-sm',
                      }}
                      onKeyDown={e => e.key === 'Enter' && handleNotify()}
                    />
                    {error && (
                      <p className="text-red-400 text-xs mt-1.5 ml-1">
                        {error}
                      </p>
                    )}
                  </div>
                  <Button
                    onPress={handleNotify}
                    className="bg-linear-to-r from-pink-600 to-indigo-600 text-white font-bold px-5 shadow-lg shadow-pink-500/20 hover:scale-105 active:scale-95 transition-transform shrink-0"
                    endContent={<FaArrowRight className="text-xs" />}
                  >
                    Notify me
                  </Button>
                </div>
              </>
            )}
          </div>

          <div className="w-full max-w-2xl mb-14">
            <p className="text-center text-xs font-bold text-gray-600 uppercase tracking-widest mb-5">
              What's coming in 3.0
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {TEASERS.map((t, i) => {
                const Icon = t.icon;
                return (
                  <div
                    key={i}
                    className="flex items-center gap-3 px-4 py-3 rounded-2xl border border-white/8 bg-white/5 backdrop-blur-sm hover:bg-white/8 hover:border-white/15 transition-all duration-200 group"
                  >
                    <div
                      className={`w-8 h-8 rounded-xl bg-linear-to-br ${t.color} flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="text-white text-xs" />
                    </div>
                    <span className="text-xs font-semibold text-gray-300 leading-tight">
                      {t.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="w-full max-w-sm mb-10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-500 font-semibold">
                Development progress
              </span>
              <span className="text-xs font-extrabold text-pink-400">28%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-linear-to-r from-pink-500 to-indigo-500 shadow-lg shadow-pink-500/30"
                style={{ width: '28%', transition: 'width 1s ease' }}
              />
            </div>
            <p className="text-[10px] text-gray-600 mt-2 text-center">
              Final polish & QA — almost there
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
            <Link
              to="/"
              className="text-gray-500 hover:text-pink-400 transition-colors font-semibold"
            >
              ← Back to Nexora
            </Link>
            <span className="text-gray-700">·</span>
            <a
              href="https://github.com/Abdelrahman968/nexora-route"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-gray-500 hover:text-white transition-colors font-semibold"
            >
              <FaGithub /> GitHub
            </a>
            <span className="text-gray-700">·</span>
            <Link
              to="/contact"
              className="text-gray-500 hover:text-pink-400 transition-colors font-semibold"
            >
              Contact
            </Link>
            <span className="text-gray-700">·</span>
            <Link
              to="/updates"
              className="text-gray-500 hover:text-pink-400 transition-colors font-semibold"
            >
              Changelog
            </Link>
          </div>

          <p className="mt-6 text-gray-700 text-[11px]">
            © {new Date().getFullYear()} Nexora · Made with ❤️ by{' '}
            <a
              href="https://github.com/Abdelrahman968"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-pink-400 transition-colors"
            >
              Abdelrahman
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

export default ComingSoon;
