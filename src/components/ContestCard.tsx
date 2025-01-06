import React from 'react';
import { Trophy, Users, Timer, Coins, ArrowRight } from 'lucide-react';
import { Contest } from '../types';

interface ContestCardProps {
  contest: Contest;
  onJoin: (contestId: string) => void;
}

export function ContestCard({ contest, onJoin }: ContestCardProps) {
  const timeLeft = new Date(contest.endDate).getTime() - new Date().getTime();
  const daysLeft = Math.ceil(timeLeft / (1000 * 60 * 60 * 24));

  return (
    <div className="glass-card rounded-2xl p-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-800 group-hover:text-primary-600 transition-colors">
          {contest.title}
        </h3>
        <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${
          contest.status === 'active' ? 'bg-green-100 text-green-800' :
          contest.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {contest.status.charAt(0).toUpperCase() + contest.status.slice(1)}
        </span>
      </div>
      
      <p className="text-gray-600 mb-8 text-lg">{contest.description}</p>
      
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="flex items-center gap-3 group/item">
          <div className="p-3 rounded-xl bg-purple-50 group-hover/item:bg-purple-100 transition-colors">
            <Trophy className="w-6 h-6 text-purple-500" />
          </div>
          <span className="text-base text-gray-700 font-medium">{contest.goal}</span>
        </div>
        <div className="flex items-center gap-3 group/item">
          <div className="p-3 rounded-xl bg-blue-50 group-hover/item:bg-blue-100 transition-colors">
            <Users className="w-6 h-6 text-blue-500" />
          </div>
          <span className="text-base text-gray-700 font-medium">{contest.participants} participants</span>
        </div>
        <div className="flex items-center gap-3 group/item">
          <div className="p-3 rounded-xl bg-red-50 group-hover/item:bg-red-100 transition-colors">
            <Timer className="w-6 h-6 text-red-500" />
          </div>
          <span className="text-base text-gray-700 font-medium">{daysLeft} days left</span>
        </div>
        <div className="flex items-center gap-3 group/item">
          <div className="p-3 rounded-xl bg-yellow-50 group-hover/item:bg-yellow-100 transition-colors">
            <Coins className="w-6 h-6 text-yellow-500" />
          </div>
          <span className="text-base text-gray-700 font-medium">{contest.yieldGenerated.toFixed(2)} USDC yield</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">Total Staked</p>
          <p className="text-2xl font-bold text-gray-800">${contest.totalStaked.toLocaleString()}</p>
        </div>
        <button
          onClick={() => onJoin(contest.id)}
          className="btn-primary flex items-center group/btn"
        >
          Join Contest
          <ArrowRight className="w-5 h-5 ml-2 transform group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}