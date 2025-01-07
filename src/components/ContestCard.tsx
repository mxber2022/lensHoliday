import React, { useState, useEffect } from 'react';
import { Trophy, Users, Timer, Coins, ArrowRight, AlertCircle, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { Contest } from '../types';
import { useAccount, useReadContract } from 'wagmi';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../config/contract';
import { ProofSubmissionModal } from './ProofSubmissionModal';
import { RegistrationModal } from './RegistrationModal';
import { ProofList } from './ProofList';

interface ContestCardProps {
  contest: Contest;
  onJoin: (contestId: string) => void;
}

function formatDateTime(date: Date) {
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
}

function formatTimeLeft(timeLeft: number) {
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  if (minutes > 0) return `${minutes}m ${seconds}s`;
  return `${seconds}s`;
}

export function ContestCard({ contest, onJoin }: ContestCardProps) {
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [showProofModal, setShowProofModal] = useState(false);
  const [showProofs, setShowProofs] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  
  const { address } = useAccount();
  const { data: isRegistered } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: 'registeredParticipants',
    args: [BigInt(contest.id), address],
    enabled: !!address
  });

  useEffect(() => {
    if (contest.status === 'pending_start') {
      const updateTimer = () => {
        const now = new Date().getTime();
        const start = contest.startDate.getTime();
        const remaining = start - now;
        setTimeLeft(remaining > 0 ? remaining : 0);
      };

      updateTimer();
      const interval = setInterval(updateTimer, 1000);
      return () => clearInterval(interval);
    }
  }, [contest.status, contest.startDate]);

  const progressPercentage = Math.min(100, (contest.totalStaked / (contest.minStake * 10)) * 100);

  const getStatusConfig = (status: Contest['status']) => {
    switch (status) {
      case 'upcoming':
        return {
          label: 'Registration Opens Soon',
          className: 'bg-yellow-100 text-yellow-800 border border-yellow-200'
        };
      case 'registration':
        return {
          label: 'Registration Open',
          className: 'bg-blue-100 text-blue-800 border border-blue-200'
        };
      case 'pending_start':
        return {
          label: `Starting in ${formatTimeLeft(timeLeft)}`,
          className: 'bg-purple-100 text-purple-800 border border-purple-200'
        };
      case 'active':
        return {
          label: 'Challenge in Progress',
          className: 'bg-green-100 text-green-800 border border-green-200'
        };
      case 'completed':
        return {
          label: 'Challenge Ended',
          className: 'bg-gray-100 text-gray-800 border border-gray-200'
        };
    }
  };

  const getActionButton = () => {
    if (!address) {
      return {
        label: 'Connect Wallet',
        disabled: true,
        action: null
      };
    }

    switch (contest.status) {
      case 'upcoming':
        return {
          label: 'Registration Opens Soon',
          disabled: true,
          action: null
        };
      case 'registration':
        return {
          label: isRegistered ? 'Registered' : 'Register Now',
          disabled: isRegistered,
          action: () => setShowRegistrationModal(true)
        };
      case 'pending_start':
        return {
          label: isRegistered ? `Starting in ${formatTimeLeft(timeLeft)}` : 'Registration Closed',
          disabled: true,
          action: null
        };
      case 'active':
        return {
          label: isRegistered ? 'Submit Proof' : 'Registration Required',
          disabled: !isRegistered,
          action: () => setShowProofModal(true)
        };
      default:
        return {
          label: 'Challenge Ended',
          disabled: true,
          action: null
        };
    }
  };

  const statusConfig = getStatusConfig(contest.status);
  const actionButton = getActionButton();

  return (
    <div className="glass-card rounded-2xl p-8 hover:scale-[1.02] transition-all duration-300">
      {/* Rest of the component remains the same */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-bold text-gray-800 group-hover:text-primary-600 transition-colors">
          {contest.title}
        </h3>
        <span className={`status-badge ${statusConfig.className}`}>
          {statusConfig.label}
        </span>
      </div>
      
      <p className="text-gray-600 mb-6 text-lg">{contest.description}</p>

      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-gray-600">Progress</span>
          <span className="text-sm font-medium text-primary-600">{progressPercentage.toFixed(1)}%</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary-500 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="flex items-center gap-3 group/item">
          <div className="p-3 rounded-xl bg-purple-50 group-hover/item:bg-purple-100 transition-colors border border-purple-100">
            <Trophy className="w-6 h-6 text-purple-500" />
          </div>
          <span className="text-base text-gray-700 font-medium">{contest.goal}</span>
        </div>
        <div className="flex items-center gap-3 group/item">
          <div className="p-3 rounded-xl bg-blue-50 group-hover/item:bg-blue-100 transition-colors border border-blue-100">
            <Users className="w-6 h-6 text-blue-500" />
          </div>
          <span className="text-base text-gray-700 font-medium">{contest.participants} participants</span>
        </div>
        <div className="flex items-center gap-3 group/item">
          <div className="p-3 rounded-xl bg-red-50 group-hover/item:bg-red-100 transition-colors border border-red-100">
            <Timer className="w-6 h-6 text-red-500" />
          </div>
          <div className="flex flex-col">
            <span className="text-base text-gray-700 font-medium">
              {formatDateTime(contest.endDate)}
            </span>
            <span className="text-sm text-gray-500">Challenge End</span>
          </div>
        </div>
        <div className="flex items-center gap-3 group/item">
          <div className="p-3 rounded-xl bg-yellow-50 group-hover/item:bg-yellow-100 transition-colors border border-yellow-100">
            <Calendar className="w-6 h-6 text-yellow-500" />
          </div>
          <div className="flex flex-col">
            <span className="text-base text-gray-700 font-medium">
              {formatDateTime(contest.registrationEndDate)}
            </span>
            <span className="text-sm text-gray-500">Registration Ends</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">Total Staked</p>
            <p className="text-2xl font-bold text-gray-800">Ξ {contest.totalStaked.toFixed(4)}</p>
          </div>
          <div className="flex items-center gap-2 text-primary-600">
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm font-medium">Min. Stake: Ξ {contest.minStake.toFixed(4)}</span>
          </div>
        </div>
        <button
          onClick={() => actionButton.action?.()}
          disabled={actionButton.disabled}
          className="btn-primary flex items-center group/btn disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {actionButton.label}
          <ArrowRight className="w-5 h-5 ml-2 transform group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="mt-8 border-t border-gray-100 pt-6">
        <button
          onClick={() => setShowProofs(!showProofs)}
          className="flex items-center justify-between w-full text-left"
        >
          <span className="text-lg font-medium text-gray-900">Submitted Proofs</span>
          {showProofs ? (
            <ChevronUp className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-500" />
          )}
        </button>
        
        {showProofs && (
          <div className="mt-4">
            <ProofList contestId={contest.id} />
          </div>
        )}
      </div>

      <RegistrationModal
        isOpen={showRegistrationModal}
        onClose={() => setShowRegistrationModal(false)}
        contest={contest}
      />

      <ProofSubmissionModal
        isOpen={showProofModal}
        onClose={() => setShowProofModal(false)}
        contest={contest}
      />
    </div>
  );
}