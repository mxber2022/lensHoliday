import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Trophy, Users, Coins, FileCheck, Target, LockKeyhole } from 'lucide-react';

const slides = [
  {
    id: 'intro',
    title: 'DreamStake',
    subtitle: 'Turn Dreams into Reality through Stake-Based Accountability',
    content: (
      <div className="flex items-center justify-center">
        <Star className="w-24 h-24 text-primary-500 animate-pulse" />
      </div>
    )
  },
  {
    id: 'problem',
    title: 'The Challenge',
    content: (
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-800">Why do people fail to achieve their goals?</h3>
        <ul className="space-y-4">
          <li className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-red-100">
              <Users className="w-5 h-5 text-red-600" />
            </div>
            <span>Lack of accountability</span>
          </li>
          <li className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-orange-100">
              <Trophy className="w-5 h-5 text-orange-600" />
            </div>
            <span>Insufficient motivation</span>
          </li>
          <li className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-yellow-100">
              <Coins className="w-5 h-5 text-yellow-600" />
            </div>
            <span>No tangible incentives</span>
          </li>
        </ul>
      </div>
    )
  },
  {
    id: 'solution',
    title: 'Our Solution',
    content: (
      <div className="space-y-8">
        <div className="grid grid-cols-2 gap-6">
          <div className="glass-card p-4">
            <Target className="w-8 h-8 text-primary-500 mb-3" />
            <h3 className="font-semibold mb-2">Goal Setting</h3>
            <p className="text-sm text-gray-600">Clear, achievable goals with defined success criteria</p>
          </div>
          <div className="glass-card p-4">
            <LockKeyhole className="w-8 h-8 text-purple-500 mb-3" />
            <h3 className="font-semibold mb-2">Stake Assets</h3>
            <p className="text-sm text-gray-600">Commit ETH as stake during challenges</p>
          </div>
          <div className="glass-card p-4">
            <FileCheck className="w-8 h-8 text-green-500 mb-3" />
            <h3 className="font-semibold mb-2">Track Progress</h3>
            <p className="text-sm text-gray-600">Submit proofs and monitor achievements</p>
          </div>
          <div className="glass-card p-4">
            <Coins className="w-8 h-8 text-yellow-500 mb-3" />
            <h3 className="font-semibold mb-2">Earn Rewards</h3>
            <p className="text-sm text-gray-600">Get stake back plus yield on completion</p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'how-it-works',
    title: 'How It Works',
    content: (
      <div className="space-y-6">
        <div className="relative">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -z-10" />
          <div className="flex justify-between">
            {['Choose Challenge', 'Register & Stake', 'Submit Proofs', 'Complete & Earn'].map((step, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                  <span className="text-primary-600 font-semibold">{i + 1}</span>
                </div>
                <span className="text-sm font-medium text-gray-700">{step}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="glass-card p-6 mt-8">
          <h3 className="font-semibold mb-4">Key Benefits</h3>
          <ul className="space-y-3">
            <li className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 rounded-full bg-primary-500" />
              <span>Stake-based accountability</span>
            </li>
            <li className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 rounded-full bg-primary-500" />
              <span>Yield generation through Aave</span>
            </li>
            <li className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 rounded-full bg-primary-500" />
              <span>Community support and engagement</span>
            </li>
          </ul>
        </div>
      </div>
    )
  },
  {
    id: 'features',
    title: 'Key Features',
    content: (
      <div className="grid grid-cols-2 gap-6">
        <div className="col-span-2">
          <div className="glass-card p-6">
            <h3 className="font-semibold mb-4">Smart Contract Security</h3>
            <ul className="space-y-2 text-sm">
              <li>• Built on OpenZeppelin's secure foundations</li>
              <li>• Reentrancy protection</li>
              <li>• Role-based access control</li>
            </ul>
          </div>
        </div>
        <div className="glass-card p-6">
          <h3 className="font-semibold mb-4">Proof System</h3>
          <ul className="space-y-2 text-sm">
            <li>• Multi-file uploads</li>
            <li>• Progress tracking</li>
            <li>• Verification system</li>
          </ul>
        </div>
        <div className="glass-card p-6">
          <h3 className="font-semibold mb-4">Reward Mechanism</h3>
          <ul className="space-y-2 text-sm">
            <li>• Aave yield generation</li>
            <li>• Automated distribution</li>
            <li>• Transparent earnings</li>
          </ul>
        </div>
      </div>
    )
  }
];

export function Slides() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="glass-card rounded-2xl p-8 min-h-[600px] relative">
          <div className="absolute top-4 right-4 text-sm font-medium text-gray-500">
            {currentSlide + 1} / {slides.length}
          </div>
          
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{slides[currentSlide].title}</h2>
            {slides[currentSlide].subtitle && (
              <p className="text-lg text-gray-600">{slides[currentSlide].subtitle}</p>
            )}
          </div>

          <div className="flex-1">
            {slides[currentSlide].content}
          </div>

          <div className="absolute bottom-8 left-8 right-8 flex justify-between">
            <button
              onClick={prevSlide}
              className="p-2 rounded-lg bg-gray-100 hover:bg-primary-100 text-gray-600 hover:text-primary-600 transition-colors"
              disabled={currentSlide === 0}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="p-2 rounded-lg bg-gray-100 hover:bg-primary-100 text-gray-600 hover:text-primary-600 transition-colors"
              disabled={currentSlide === slides.length - 1}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}