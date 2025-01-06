import React from 'react';
import { Target, LockKeyhole, Coins, Trophy, ArrowRight, Sparkles } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      icon: <Target className="w-8 h-8 text-blue-500" />,
      title: "Choose Your Challenge",
      description: "Browse through curated challenges or create your own. Each challenge has specific goals and timeframes."
    },
    {
      icon: <LockKeyhole className="w-8 h-8 text-purple-500" />,
      title: "Stake Your Assets",
      description: "Lock your USDC as commitment. Your stake is securely held in Aave generating yield throughout the challenge."
    },
    {
      icon: <Sparkles className="w-8 h-8 text-yellow-500" />,
      title: "Complete Goals",
      description: "Work towards your goals while your stake generates yield. Track progress and stay accountable."
    },
    {
      icon: <Trophy className="w-8 h-8 text-green-500" />,
      title: "Earn Rewards",
      description: "Successfully complete the challenge to reclaim your stake plus earned yield rewards."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">How DreamStake Works</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Turn your goals into achievements through stake-based accountability and rewards
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {steps.map((step, index) => (
          <div key={index} className="glass-card p-6 relative">
            {index < steps.length - 1 && (
              <ArrowRight className="hidden lg:block w-6 h-6 text-gray-400 absolute -right-11 top-1/2 transform -translate-y-1/2" />
            )}
            <div className="mb-4">{step.icon}</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
            <p className="text-gray-600">{step.description}</p>
          </div>
        ))}
      </div>

      <div className="glass-card p-8 mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Yield Generation Model</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-start space-x-4">
            <div className="p-3 rounded-lg bg-blue-100">
              <Coins className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Secure Staking</h3>
              <p className="text-gray-600">Your USDC is staked in Aave, a leading DeFi protocol with proven security</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="p-3 rounded-lg bg-green-100">
              <Sparkles className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Yield Farming</h3>
              <p className="text-gray-600">Staked assets generate yield through Aave's lending markets</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="p-3 rounded-lg bg-purple-100">
              <Trophy className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Reward Distribution</h3>
              <p className="text-gray-600">Successful participants receive their stake plus generated yield</p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Start?</h2>
        <p className="text-gray-600 mb-6">Join a challenge and turn your goals into reality</p>
        <button className="btn-primary">
          Browse Challenges
        </button>
      </div>
    </div>
  );
}