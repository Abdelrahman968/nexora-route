import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaHeart,
  FaDollarSign,
  FaCreditCard,
  FaPaypal,
  FaBitcoin,
  FaStar,
  FaCheckCircle,
  FaGift,
  FaCoffee,
  FaPizzaSlice,
  FaRocket,
  FaTrophy,
  FaArrowLeft,
  FaUsers,
  FaHandHoldingHeart,
  FaChartLine,
} from 'react-icons/fa';
import { MdVerified } from 'react-icons/md';
import {
  Card,
  CardBody,
  Button,
  Input,
  Chip,
  RadioGroup,
  Radio,
} from '@heroui/react';
import SEO from '../SEO/SEO';

function Donation() {
  const [selectedAmount, setSelectedAmount] = useState('10');
  const [customAmount, setCustomAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [donationComplete, setDonationComplete] = useState(false);

  const donationTiers = [
    {
      amount: '5',
      label: 'Coffee',
      icon: <FaCoffee className="text-2xl" />,
      description: 'Buy us a coffee',
      gradient: 'from-yellow-500 to-orange-500',
      popular: false,
    },
    {
      amount: '10',
      label: 'Pizza',
      icon: <FaPizzaSlice className="text-2xl" />,
      description: 'Support our work',
      gradient: 'from-orange-500 to-red-500',
      popular: true,
    },
    {
      amount: '25',
      label: 'Supporter',
      icon: <FaHeart className="text-2xl" />,
      description: 'Generous supporter',
      gradient: 'from-pink-500 to-rose-500',
      popular: false,
    },
    {
      amount: '50',
      label: 'Champion',
      icon: <FaTrophy className="text-2xl" />,
      description: 'Amazing champion',
      gradient: 'from-purple-500 to-indigo-500',
      popular: false,
    },
    {
      amount: '100',
      label: 'Hero',
      icon: <FaRocket className="text-2xl" />,
      description: 'Extraordinary hero',
      gradient: 'from-blue-500 to-cyan-500',
      popular: false,
    },
  ];

  const paymentMethods = [
    {
      id: 'card',
      name: 'Credit Card',
      icon: <FaCreditCard className="text-xl" />,
      gradient: 'from-blue-500 to-indigo-500',
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: <FaPaypal className="text-xl" />,
      gradient: 'from-blue-600 to-blue-400',
    },
    {
      id: 'crypto',
      name: 'Crypto',
      icon: <FaBitcoin className="text-xl" />,
      gradient: 'from-yellow-500 to-orange-500',
    },
  ];

  const topDonors = [
    {
      name: 'Sarah Martinez',
      username: '@sarahmtz',
      amount: '$500',
      avatar: 'from-pink-500 to-rose-500',
      verified: true,
      badge: 'Hero',
    },
    {
      name: 'Alex Chen',
      username: '@alexchen',
      amount: '$250',
      avatar: 'from-blue-500 to-cyan-500',
      verified: true,
      badge: 'Champion',
    },
    {
      name: 'Emma Wilson',
      username: '@emmawilson',
      amount: '$100',
      avatar: 'from-green-500 to-emerald-500',
      verified: false,
      badge: 'Supporter',
    },
  ];

  const stats = [
    {
      value: '$125K+',
      label: 'Total Raised',
      icon: <FaDollarSign />,
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      value: '5.2K+',
      label: 'Donors',
      icon: <FaUsers />,
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      value: '98%',
      label: 'Goal Reached',
      icon: <FaChartLine />,
      gradient: 'from-purple-500 to-pink-500',
    },
  ];

  const handleDonate = () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setDonationComplete(true);
      setTimeout(() => {
        setDonationComplete(false);
        setSelectedAmount('10');
        setCustomAmount('');
      }, 5000);
    }, 2000);
  };

  const getSelectedAmountValue = () => {
    return selectedAmount === 'custom' ? customAmount : selectedAmount;
  };

  return (
    <>
      <SEO
        title="Support Us"
        description="Support our platform and help us continue to provide amazing features"
        path="/donation"
      />

      <div className="w-full min-h-screen">
        <div className="max-w-7xl mx-auto py-8 px-4">
          {/* Header */}
          <div className="mb-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 transition-colors mb-6 group"
            >
              <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
              <span className="font-semibold">Back to Home</span>
            </Link>

            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-white dark:bg-[#1E2939] px-4 py-2 rounded-full shadow-lg mb-6">
                <FaStar className="text-yellow-500" />
                <span className="text-sm font-semibold bg-linear-to-r from-pink-600 to-indigo-600 bg-clip-text text-transparent">
                  Help Us Grow & Improve
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-4">
                <span className="bg-linear-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Support Our Mission
                </span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
                Your generous donation helps us maintain and improve our
                platform, keeping it free and accessible for everyone.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="bg-white dark:bg-[#1E2939] shadow-lg hover:scale-105 transition-all cursor-pointer"
              >
                <CardBody className="p-6">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-16 h-16 rounded-2xl bg-linear-to-r ${stat.gradient} flex items-center justify-center text-white shadow-lg`}
                    >
                      <div className="text-3xl">{stat.icon}</div>
                    </div>
                    <div>
                      <div className="text-3xl font-extrabold text-gray-900 dark:text-white">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 font-semibold">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Donation Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Donation Complete Message */}
              {donationComplete && (
                <Card className="bg-linear-to-r from-green-500 to-emerald-500 text-white shadow-2xl animate-pulse">
                  <CardBody className="p-8 text-center">
                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FaCheckCircle className="text-5xl" />
                    </div>
                    <h2 className="text-3xl font-extrabold mb-2">Thank You!</h2>
                    <p className="text-xl text-white/90">
                      Your generous donation of ${getSelectedAmountValue()} has
                      been received!
                    </p>
                  </CardBody>
                </Card>
              )}

              {/* Donation Amount Selection */}
              <Card className="bg-white dark:bg-[#1E2939] shadow-xl">
                <CardBody className="p-0">
                  <div className="p-6 bg-linear-to-r from-pink-600 via-purple-600 to-indigo-600 text-white">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                        <FaGift className="text-2xl" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold">
                          Choose Your Support Level
                        </h2>
                        <p className="text-white/80">
                          Every contribution makes a difference
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 space-y-6">
                    {/* Donation Tiers */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {donationTiers.map(tier => (
                        <button
                          key={tier.amount}
                          onClick={() => setSelectedAmount(tier.amount)}
                          className="group relative"
                        >
                          {tier.popular && (
                            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                              <Chip
                                size="sm"
                                className="bg-linear-to-r from-yellow-500 to-orange-500 text-white font-bold"
                              >
                                Popular
                              </Chip>
                            </div>
                          )}
                          <Card
                            className={`${
                              selectedAmount === tier.amount
                                ? `bg-linear-to-r ${tier.gradient} text-white border-4 border-transparent scale-105`
                                : 'bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 group-hover:border-pink-600 dark:group-hover:border-pink-400'
                            } transition-all cursor-pointer shadow-lg`}
                          >
                            <CardBody className="p-4 text-center">
                              <div
                                className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 ${
                                  selectedAmount === tier.amount
                                    ? 'bg-white/20'
                                    : `bg-linear-to-r ${tier.gradient} text-white`
                                }`}
                              >
                                {tier.icon}
                              </div>
                              <div className="text-3xl font-extrabold mb-1">
                                ${tier.amount}
                              </div>
                              <div
                                className={`text-sm font-bold mb-1 ${
                                  selectedAmount === tier.amount
                                    ? 'text-white'
                                    : 'text-gray-900 dark:text-white'
                                }`}
                              >
                                {tier.label}
                              </div>
                              <div
                                className={`text-xs ${
                                  selectedAmount === tier.amount
                                    ? 'text-white/80'
                                    : 'text-gray-500 dark:text-gray-400'
                                }`}
                              >
                                {tier.description}
                              </div>
                            </CardBody>
                          </Card>
                        </button>
                      ))}

                      {/* Custom Amount */}
                      <button
                        onClick={() => setSelectedAmount('custom')}
                        className="group"
                      >
                        <Card
                          className={`${
                            selectedAmount === 'custom'
                              ? 'bg-linear-to-r from-indigo-600 to-purple-600 text-white border-4 border-transparent scale-105'
                              : 'bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 group-hover:border-pink-600 dark:group-hover:border-pink-400'
                          } transition-all cursor-pointer shadow-lg`}
                        >
                          <CardBody className="p-4 text-center">
                            <div
                              className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 ${
                                selectedAmount === 'custom'
                                  ? 'bg-white/20'
                                  : 'bg-linear-to-r from-indigo-600 to-purple-600 text-white'
                              }`}
                            >
                              <FaDollarSign className="text-2xl" />
                            </div>
                            <div className="text-2xl font-extrabold mb-1">
                              Custom
                            </div>
                            <div
                              className={`text-sm font-bold mb-1 ${
                                selectedAmount === 'custom'
                                  ? 'text-white'
                                  : 'text-gray-900 dark:text-white'
                              }`}
                            >
                              Any Amount
                            </div>
                            <div
                              className={`text-xs ${
                                selectedAmount === 'custom'
                                  ? 'text-white/80'
                                  : 'text-gray-500 dark:text-gray-400'
                              }`}
                            >
                              Your choice
                            </div>
                          </CardBody>
                        </Card>
                      </button>
                    </div>

                    {/* Custom Amount Input */}
                    {selectedAmount === 'custom' && (
                      <div className="animate-fadeIn">
                        <Input
                          type="number"
                          label="Custom Amount"
                          placeholder="Enter amount"
                          size="lg"
                          variant="bordered"
                          startContent={
                            <div className="text-gray-400 text-xl font-bold">
                              $
                            </div>
                          }
                          value={customAmount}
                          onChange={e => setCustomAmount(e.target.value)}
                          classNames={{
                            input: 'text-xl font-bold',
                            inputWrapper:
                              'border-2 hover:border-pink-600 focus-within:border-pink-600 dark:hover:border-pink-400 dark:focus-within:border-pink-400',
                          }}
                        />
                      </div>
                    )}
                  </div>
                </CardBody>
              </Card>

              {/* Payment Method */}
              <Card className="bg-white dark:bg-[#1E2939] shadow-xl">
                <CardBody className="p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <FaCreditCard className="text-pink-600 dark:text-pink-400" />
                    Payment Method
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {paymentMethods.map(method => (
                      <button
                        key={method.id}
                        onClick={() => setPaymentMethod(method.id)}
                        className="group"
                      >
                        <Card
                          className={`${
                            paymentMethod === method.id
                              ? `bg-linear-to-r ${method.gradient} text-white scale-105`
                              : 'bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
                          } transition-all cursor-pointer`}
                        >
                          <CardBody className="p-4">
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                  paymentMethod === method.id
                                    ? 'bg-white/20'
                                    : `bg-linear-to-r ${method.gradient} text-white`
                                }`}
                              >
                                {method.icon}
                              </div>
                              <span className="font-bold">{method.name}</span>
                            </div>
                          </CardBody>
                        </Card>
                      </button>
                    ))}
                  </div>
                </CardBody>
              </Card>

              {/* Donate Button */}
              <Button
                size="lg"
                className="w-full bg-linear-to-r from-pink-600 via-purple-600 to-indigo-600 text-white font-bold text-xl py-8 shadow-2xl hover:scale-105 transition-all"
                startContent={!isProcessing && <FaHeart />}
                isLoading={isProcessing}
                isDisabled={
                  isProcessing ||
                  donationComplete ||
                  (selectedAmount === 'custom' && !customAmount)
                }
                onClick={handleDonate}
              >
                {isProcessing
                  ? 'Processing...'
                  : `Donate $${getSelectedAmountValue()}`}
              </Button>

              {/* Trust Badges */}
              <Card className="bg-linear-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-200 dark:border-green-800">
                <CardBody className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <FaCheckCircle className="text-green-600 text-2xl" />
                    <h3 className="font-bold text-lg">Secure & Trusted</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <FaCheckCircle className="text-green-600" />
                      <span>SSL Encrypted</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaCheckCircle className="text-green-600" />
                      <span>PCI Compliant</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaCheckCircle className="text-green-600" />
                      <span>100% Secure</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaCheckCircle className="text-green-600" />
                      <span>Tax Deductible</span>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Impact Card */}
              <Card className="bg-linear-to-r from-pink-600 to-rose-600 text-white shadow-xl">
                <CardBody className="p-6">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4">
                    <FaHandHoldingHeart className="text-4xl" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Your Impact</h3>
                  <p className="text-white/90 leading-relaxed mb-4">
                    Every donation helps us maintain servers, develop new
                    features, and keep the platform free for everyone.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <FaCheckCircle className="text-white/90" />
                      <span className="text-sm">Server maintenance</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaCheckCircle className="text-white/90" />
                      <span className="text-sm">New feature development</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaCheckCircle className="text-white/90" />
                      <span className="text-sm">Community support</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaCheckCircle className="text-white/90" />
                      <span className="text-sm">Bug fixes & improvements</span>
                    </div>
                  </div>
                </CardBody>
              </Card>

              {/* Top Donors */}
              <Card className="bg-white dark:bg-[#1E2939] shadow-xl">
                <CardBody className="p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <FaTrophy className="text-yellow-500" />
                    Top Supporters
                  </h3>
                  <div className="space-y-4">
                    {topDonors.map((donor, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
                      >
                        <div className="relative">
                          <div
                            className={`w-12 h-12 rounded-full bg-linear-to-r ${donor.avatar} flex items-center justify-center text-white font-bold text-lg`}
                          >
                            {donor.name.charAt(0)}
                          </div>
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center border-2 border-white dark:border-gray-800">
                            <span className="text-xs font-bold">
                              #{index + 1}
                            </span>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1">
                            <span className="font-bold text-sm truncate">
                              {donor.name}
                            </span>
                            {donor.verified && (
                              <MdVerified className="text-blue-500 text-sm shrink-0" />
                            )}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {donor.badge} • {donor.amount}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>

              {/* FAQ */}
              <Card className="bg-white dark:bg-[#1E2939] shadow-xl">
                <CardBody className="p-6">
                  <h3 className="text-xl font-bold mb-4">Common Questions</h3>
                  <div className="space-y-4 text-sm">
                    <div>
                      <h4 className="font-bold mb-1">Is my donation secure?</h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        Yes! All transactions are encrypted and processed
                        through secure payment gateways.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">Is it tax deductible?</h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        Yes, donations are tax deductible. You'll receive a
                        receipt via email.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">
                        Can I cancel my donation?
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        Contact our support team within 24 hours for refund
                        requests.
                      </p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Donation;
