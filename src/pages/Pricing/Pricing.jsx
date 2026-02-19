import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Chip, Switch } from '@heroui/react';
import {
  FaCheck,
  FaTimes,
  FaCrown,
  FaRocket,
  FaHeart,
  FaUsers,
  FaBookmark,
  FaShieldAlt,
  FaBolt,
  FaInfinity,
  FaStar,
  FaFire,
  FaGem,
  FaArrowRight,
  FaQuestionCircle,
  FaChevronDown,
  FaChevronUp,
  FaImage,
  FaComments,
  FaBell,
  FaPalette,
  FaLock,
  FaMedal,
} from 'react-icons/fa';
import { MdVerified } from 'react-icons/md';
import SEO from '../../component/SEO/SEO';

const PLANS = [
  {
    id: 'free',
    name: 'Free',
    tagline: 'Everything to get started',
    icon: FaHeart,
    monthlyPrice: 0,
    yearlyPrice: 0,
    gradient: 'from-gray-500 to-slate-600',
    accentColor: '#64748b',
    glow: 'rgba(100,116,139,0.2)',
    border: 'border-gray-200 dark:border-gray-700',
    cta: 'Get started free',
    ctaStyle:
      'border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:border-gray-400 dark:hover:border-gray-500',
    popular: false,
    features: [
      { label: 'Create & share posts', included: true },
      { label: 'Like & comment', included: true },
      { label: 'Follow up to 200 people', included: true },
      { label: '50 bookmarks', included: true },
      { label: 'Basic profile', included: true },
      { label: 'Photo uploads', included: true },
      { label: 'Explore feed', included: true },
      { label: 'Verified badge', included: false },
      { label: 'Priority in suggestions', included: false },
      { label: 'Advanced analytics', included: false },
      { label: 'Ad-free experience', included: false },
      { label: 'Custom profile themes', included: false },
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    tagline: 'For creators who mean business',
    icon: FaRocket,
    monthlyPrice: 9,
    yearlyPrice: 7,
    gradient: 'from-pink-500 to-indigo-600',
    accentColor: '#ec4899',
    glow: 'rgba(236,72,153,0.25)',
    border: 'border-pink-400/60 dark:border-pink-500/50',
    cta: 'Start Pro free trial',
    ctaStyle:
      'bg-linear-to-r from-pink-600 to-indigo-600 text-white hover:shadow-lg hover:shadow-pink-500/30',
    popular: true,
    features: [
      { label: 'Create & share posts', included: true },
      { label: 'Like & comment', included: true },
      { label: 'Follow unlimited people', included: true },
      { label: 'Unlimited bookmarks', included: true },
      { label: 'Enhanced profile', included: true },
      { label: 'Photo uploads', included: true },
      { label: 'Explore feed', included: true },
      { label: 'Verified badge', included: true },
      { label: 'Priority in suggestions', included: true },
      { label: 'Advanced analytics', included: true },
      { label: 'Ad-free experience', included: true },
      { label: 'Custom profile themes', included: false },
    ],
  },
  {
    id: 'elite',
    name: 'Elite',
    tagline: 'Unleash your full potential',
    icon: FaCrown,
    monthlyPrice: 19,
    yearlyPrice: 15,
    gradient: 'from-amber-500 to-orange-600',
    accentColor: '#f59e0b',
    glow: 'rgba(245,158,11,0.25)',
    border: 'border-amber-400/60 dark:border-amber-500/50',
    cta: 'Go Elite',
    ctaStyle:
      'bg-linear-to-r from-amber-500 to-orange-600 text-white hover:shadow-lg hover:shadow-amber-500/30',
    popular: false,
    features: [
      { label: 'Create & share posts', included: true },
      { label: 'Like & comment', included: true },
      { label: 'Follow unlimited people', included: true },
      { label: 'Unlimited bookmarks', included: true },
      { label: 'Enhanced profile', included: true },
      { label: 'Photo uploads', included: true },
      { label: 'Explore feed', included: true },
      { label: 'Verified badge', included: true },
      { label: 'Priority in suggestions', included: true },
      { label: 'Advanced analytics', included: true },
      { label: 'Ad-free experience', included: true },
      { label: 'Custom profile themes', included: true },
    ],
  },
];

const FAQS = [
  {
    q: 'Can I switch plans anytime?',
    a: "Absolutely. Upgrade or downgrade at any time. When upgrading, you're billed the prorated difference. When downgrading, your current plan continues until the end of the billing period.",
  },
  {
    q: 'Is there a free trial for paid plans?',
    a: 'Yes — Pro includes a 14-day free trial with no credit card required. Elite offers a 7-day trial. You can cancel anytime before the trial ends and pay nothing.',
  },
  {
    q: 'What does the Verified badge mean?',
    a: "The Verified badge (✓) appears on your profile and posts, showing other users that you're a Pro or Elite subscriber. It increases trust and boosts your visibility in the suggested people list.",
  },
  {
    q: 'What happens to my bookmarks if I downgrade?',
    a: "Your bookmarks are preserved but you'll only be able to view the first 50 on the Free plan. No data is deleted — upgrade again and all your bookmarks are instantly accessible.",
  },
  {
    q: 'Do you offer refunds?',
    a: "We offer a full refund within 7 days of your first payment if you're not satisfied. After that period, refunds are evaluated case by case. Contact support and we'll make it right.",
  },
  {
    q: 'Is my payment information secure?',
    a: 'Yes. Payments are processed through Stripe with end-to-end encryption. We never store your card details — Stripe handles all payment data with PCI-DSS Level 1 compliance.',
  },
];

const PERKS = [
  {
    icon: FaBolt,
    label: 'Instant setup',
    desc: 'No configuration, just sign up and go',
  },
  {
    icon: FaShieldAlt,
    label: 'Privacy first',
    desc: 'Your data is yours — always',
  },
  {
    icon: FaInfinity,
    label: 'No lock-in',
    desc: 'Export or leave anytime, zero penalty',
  },
  {
    icon: FaMedal,
    label: '24/7 support',
    desc: 'Real humans, not bots, for Pro & Elite',
  },
];

function PlanCard({ plan, isYearly, index }) {
  const Icon = plan.icon;
  const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
  const saving =
    plan.monthlyPrice > 0
      ? Math.round(
          ((plan.monthlyPrice - plan.yearlyPrice) / plan.monthlyPrice) * 100
        )
      : 0;

  return (
    <div
      className={`relative flex flex-col rounded-3xl border-2 ${plan.border} bg-white dark:bg-[#1E2939] overflow-hidden transition-all duration-500 hover:-translate-y-2 group`}
      style={{
        animationDelay: `${index * 120}ms`,
        boxShadow: plan.popular
          ? `0 0 0 1px ${plan.accentColor}30, 0 20px 60px ${plan.glow}`
          : undefined,
      }}
    >
      {/* Popular ribbon */}
      {plan.popular && (
        <div className="absolute top-0 left-0 right-0 z-20">
          <div className={`w-full h-1 bg-linear-to-r ${plan.gradient}`} />
          <div className="flex justify-center -mt-px">
            <div
              className={`bg-linear-to-r ${plan.gradient} text-white text-[10px] font-extrabold px-4 py-1 rounded-b-xl tracking-widest uppercase flex items-center gap-1.5 shadow-lg`}
            >
              <FaStar className="text-yellow-300 text-[9px]" /> Most Popular
            </div>
          </div>
        </div>
      )}

      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-3xl"
        style={{
          background: `radial-gradient(ellipse at top, ${plan.glow} 0%, transparent 70%)`,
        }}
      />

      <div
        className={`relative z-10 flex flex-col flex-1 p-7 ${plan.popular ? 'pt-10' : ''}`}
      >
        {/* Header */}
        <div className="mb-6">
          <div
            className={`w-12 h-12 rounded-2xl bg-linear-to-br ${plan.gradient} flex items-center justify-center mb-4 shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
          >
            <Icon className="text-white text-xl" />
          </div>
          <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-1">
            {plan.name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {plan.tagline}
          </p>
        </div>

        {/* Price */}
        <div className="mb-7 pb-7 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-end gap-2">
            <span className="text-5xl font-extrabold text-gray-900 dark:text-white leading-none">
              {price === 0 ? 'Free' : `$${price}`}
            </span>
            {price > 0 && (
              <span className="text-gray-400 text-sm mb-1.5">/ mo</span>
            )}
          </div>
          {isYearly && plan.monthlyPrice > 0 && (
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs text-gray-400 line-through">
                ${plan.monthlyPrice}/mo
              </span>
              <Chip
                size="sm"
                className={`bg-linear-to-r ${plan.gradient} text-white text-[10px] font-bold border-none`}
              >
                Save {saving}%
              </Chip>
            </div>
          )}
          {price === 0 && (
            <p className="text-xs text-gray-400 mt-1">
              Forever free, no card needed
            </p>
          )}
          {isYearly && price > 0 && (
            <p className="text-xs text-gray-400 mt-1">
              Billed ${price * 12}/year
            </p>
          )}
        </div>

        {/* Features */}
        <ul className="space-y-3 flex-1 mb-8">
          {plan.features.map((f, i) => (
            <li key={i} className="flex items-center gap-3">
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${f.included ? `bg-linear-to-br ${plan.gradient}` : 'bg-gray-100 dark:bg-gray-800'}`}
              >
                {f.included ? (
                  <FaCheck className="text-white text-[8px]" />
                ) : (
                  <FaTimes className="text-gray-400 text-[8px]" />
                )}
              </div>
              <span
                className={`text-sm ${f.included ? 'text-gray-700 dark:text-gray-200 font-medium' : 'text-gray-400 dark:text-gray-600'}`}
              >
                {f.label}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link
          to="/register"
          className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-sm transition-all duration-200 hover:scale-[1.02] active:scale-95 ${plan.ctaStyle}`}
        >
          {plan.cta}
          <FaArrowRight className="text-xs" />
        </Link>
      </div>
    </div>
  );
}

function FAQItem({ faq }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden transition-all duration-300 ${open ? 'bg-white dark:bg-[#1E2939] shadow-md' : 'bg-gray-50 dark:bg-gray-800/30 hover:bg-white dark:hover:bg-[#1E2939]'}`}
    >
      <button
        onClick={() => setOpen(p => !p)}
        className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
      >
        <span className="font-bold text-sm text-gray-800 dark:text-white">
          {faq.q}
        </span>
        <div
          className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${open ? 'bg-linear-to-br from-pink-500 to-indigo-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'}`}
        >
          {open ? (
            <FaChevronUp className="text-[10px]" />
          ) : (
            <FaChevronDown className="text-[10px]" />
          )}
        </div>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-48' : 'max-h-0'}`}
      >
        <p className="px-6 pb-5 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
          {faq.a}
        </p>
      </div>
    </div>
  );
}

function Pricing() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <>
      <SEO
        title="Pricing"
        description="Simple, transparent pricing for every creator"
        path="/pricing"
      />

      <div className="w-full min-h-screen">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="text-center mb-14 relative">
            {/* Ambient glow */}
            <div className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none">
              <div className="w-[600px] h-[300px] bg-linear-to-r from-pink-500/10 via-purple-500/8 to-indigo-500/10 blur-3xl rounded-full" />
            </div>

            <div className="inline-flex items-center gap-2 bg-white dark:bg-[#1E2939] border border-gray-200 dark:border-gray-700 px-4 py-2 rounded-full shadow-md mb-6">
              <FaGem className="text-pink-500 text-sm" />
              <span className="text-xs font-bold bg-linear-to-r from-pink-600 to-indigo-600 bg-clip-text text-transparent tracking-wide uppercase">
                Simple pricing
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-none mb-5 tracking-tight">
              <span className="text-gray-900 dark:text-white">
                Pay for what
              </span>
              <br />
              <span className="bg-linear-to-r from-pink-600 via-purple-500 to-indigo-600 bg-clip-text text-transparent">
                you actually use.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-xl mx-auto leading-relaxed mb-10">
              No hidden fees, no surprise bills. Start free and upgrade when
              you're ready to unlock the full experience.
            </p>

            {/* Billing toggle */}
            <div className="inline-flex items-center gap-4 bg-white dark:bg-[#1E2939] border border-gray-200 dark:border-gray-700 rounded-2xl px-6 py-3.5 shadow-md">
              <span
                className={`text-sm font-bold transition-colors ${!isYearly ? 'text-gray-900 dark:text-white' : 'text-gray-400'}`}
              >
                Monthly
              </span>
              <Switch
                isSelected={isYearly}
                onValueChange={setIsYearly}
                classNames={{
                  wrapper:
                    'bg-linear-to-r from-pink-500 to-indigo-500 group-data-[selected=true]:bg-linear-to-r',
                }}
              />
              <span
                className={`text-sm font-bold transition-colors ${isYearly ? 'text-gray-900 dark:text-white' : 'text-gray-400'}`}
              >
                Yearly
              </span>
              {isYearly && (
                <Chip
                  size="sm"
                  className="bg-linear-to-r from-emerald-500 to-teal-500 text-white text-[10px] font-extrabold border-none animate-pulse"
                >
                  Save up to 21%
                </Chip>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            {PLANS.map((plan, i) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                isYearly={isYearly}
                index={i}
              />
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
            {PERKS.map((perk, i) => {
              const Icon = perk.icon;
              return (
                <div
                  key={i}
                  className="flex flex-col items-center text-center p-5 rounded-2xl bg-white dark:bg-[#1E2939] border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                >
                  <div className="w-11 h-11 rounded-xl bg-linear-to-br from-pink-500 to-indigo-500 flex items-center justify-center mb-3 shadow-md">
                    <Icon className="text-white text-base" />
                  </div>
                  <p className="text-sm font-extrabold text-gray-900 dark:text-white mb-1">
                    {perk.label}
                  </p>
                  <p className="text-xs text-gray-400 leading-snug">
                    {perk.desc}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mb-20">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white text-center mb-10">
              Compare plans
            </h2>

            <div className="overflow-x-auto rounded-3xl border border-gray-200 dark:border-gray-700 shadow-lg">
              <table className="w-full min-w-[540px]">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left px-6 py-5 text-sm font-bold text-gray-500 dark:text-gray-400 w-1/2">
                      Feature
                    </th>
                    {PLANS.map(plan => {
                      const Icon = plan.icon;
                      return (
                        <th key={plan.id} className="px-4 py-5 text-center">
                          <div className="flex flex-col items-center gap-1.5">
                            <div
                              className={`w-9 h-9 rounded-xl bg-linear-to-br ${plan.gradient} flex items-center justify-center shadow-md`}
                            >
                              <Icon className="text-white text-sm" />
                            </div>
                            <span className="text-sm font-extrabold text-gray-900 dark:text-white">
                              {plan.name}
                            </span>
                          </div>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {PLANS[0].features.map((f, fi) => (
                    <tr
                      key={fi}
                      className="bg-white dark:bg-[#1E2939] hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300 font-medium">
                        {f.label}
                      </td>
                      {PLANS.map(plan => (
                        <td key={plan.id} className="px-4 py-4 text-center">
                          <div className="flex justify-center">
                            {plan.features[fi].included ? (
                              <div
                                className={`w-6 h-6 rounded-full bg-linear-to-br ${plan.gradient} flex items-center justify-center shadow-sm`}
                              >
                                <FaCheck className="text-white text-[9px]" />
                              </div>
                            ) : (
                              <div className="w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                                <FaTimes className="text-gray-300 dark:text-gray-600 text-[9px]" />
                              </div>
                            )}
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                  {/* CTA row */}
                  <tr className="bg-gray-50 dark:bg-gray-800/30">
                    <td className="px-6 py-5 text-sm font-bold text-gray-500 dark:text-gray-400">
                      Get started
                    </td>
                    {PLANS.map(plan => (
                      <td key={plan.id} className="px-4 py-5 text-center">
                        <Link
                          to="/register"
                          className={`inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all hover:scale-105 active:scale-95 ${plan.popular ? `bg-linear-to-r ${plan.gradient} text-white shadow-md` : 'border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-gray-400'}`}
                        >
                          {plan.monthlyPrice === 0 ? 'Join free' : 'Try free'}
                          <FaArrowRight className="text-[9px]" />
                        </Link>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mb-20 max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 mb-3">
                <FaQuestionCircle className="text-pink-500" />
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                  FAQ
                </span>
              </div>
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
                Questions? We've got answers.
              </h2>
            </div>

            <div className="space-y-3">
              {FAQS.map((faq, i) => (
                <FAQItem key={i} faq={faq} index={i} />
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-pink-600 via-purple-600 to-indigo-600 p-px shadow-2xl">
            <div className="relative rounded-3xl bg-gray-950 px-8 py-14 text-center overflow-hidden">
              <div className="absolute top-6 left-10 w-1.5 h-1.5 bg-white/20 rounded-full" />
              <div className="absolute top-14 left-24 w-1 h-1 bg-white/15 rounded-full" />
              <div className="absolute top-8 right-16 w-1.5 h-1.5 bg-white/20 rounded-full" />
              <div className="absolute bottom-10 left-16 w-1 h-1 bg-white/10 rounded-full" />
              <div className="absolute bottom-6 right-10 w-2 h-2 bg-pink-400/30 rounded-full" />

              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/3 w-64 h-64 bg-pink-500/15 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/3 w-64 h-64 bg-indigo-500/15 rounded-full blur-3xl" />
              </div>

              <div className="relative z-10">
                <div className="flex items-center justify-center gap-2 mb-5">
                  <FaFire className="text-orange-400 text-xl" />
                  <MdVerified className="text-blue-400 text-xl" />
                  <FaCrown className="text-amber-400 text-xl" />
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3 leading-tight">
                  Start free.
                  <br />
                  <span className="bg-linear-to-r from-pink-400 to-indigo-400 bg-clip-text text-transparent">
                    Upgrade when you're ready.
                  </span>
                </h2>
                <p className="text-gray-400 mb-8 max-w-md mx-auto text-sm leading-relaxed">
                  No credit card required. No commitment. Just a social platform
                  that works the way you do.
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <Link
                    to="/register"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-linear-to-r from-pink-600 to-indigo-600 text-white font-bold text-sm shadow-lg hover:scale-105 hover:shadow-pink-500/30 transition-all duration-200"
                  >
                    <FaRocket className="text-xs" /> Get started free
                  </Link>
                  <Link
                    to="/features"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl border border-white/20 text-white/80 font-bold text-sm hover:border-white/40 hover:text-white hover:scale-105 transition-all duration-200"
                  >
                    See all features <FaArrowRight className="text-xs" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Pricing;
