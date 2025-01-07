import React, { useState, useEffect } from 'react';
import { X, AlertCircle, Info, CheckCircle2 } from 'lucide-react';
import { useJoinContest } from '../hooks/useJoinContest';
import { useContests } from '../hooks/useContests';

interface StakingModalProps {
  isOpen: boolean;
  onClose: () => void;
  contestId: string | null;
}

export function StakingModal({ isOpen, onClose, contestId }: StakingModalProps) {
  const [amount, setAmount] = useState<string>('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { contests } = useContests();
  const contest = contests.find(c => c.id === contestId);
  
  const { 
    joinContest, 
    isPending,
    isConfirming,
    isConfirmed,
    hash,
    error
  } = useJoinContest();

  useEffect(() => {
    if (!isOpen) {
      setAmount('');
      setShowConfirmation(false);
    } else if (contest) {
      setAmount(contest.minStake.toString());
    }
  }, [isOpen, contest]);

  useEffect(() => {
    if (isConfirmed) {
      const timer = setTimeout(() => {
        onClose();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isConfirmed, onClose]);

  if (!isOpen || !contest) return null;

  const handleStake = async () => {
    if (!contestId || !amount) return;
    
    if (!showConfirmation) {
      setShowConfirmation(true);
      return;
    }
    
    try {
      await joinContest(contestId, amount);
      setShowConfirmation(false);
    } catch (error) {
      console.error('Error staking:', error);
    }
  };

  const isAmountValid = parseFloat(amount) >= contest.minStake;
  const estimatedYield = parseFloat(amount) * 0.05;
  const durationInDays = Math.ceil((contest.endDate.getTime() - contest.startDate.getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-900">Join Challenge</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            disabled={isPending || isConfirming}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {!showConfirmation ? (
          <>
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Stake Amount (ETH)
                </label>
                <span className="text-sm text-primary-600">
                  Balance: Ξ 0.00
                </span>
              </div>
              <div className="relative">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="0.00"
                  min={contest.minStake}
                  step="0.01"
                  disabled={isPending || isConfirming}
                />
                <span className="absolute right-4 top-3 text-gray-500 font-medium">ETH</span>
              </div>
              {!isAmountValid && (
                <div className="mt-2 flex items-center gap-2 text-red-600">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm">Minimum stake is Ξ {contest.minStake}</span>
                </div>
              )}
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Estimated APY</span>
                <span className="font-medium text-gray-900">5.00%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Estimated Yield</span>
                <span className="font-medium text-gray-900">Ξ {estimatedYield.toFixed(4)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Challenge Duration</span>
                <span className="font-medium text-gray-900">{durationInDays} days</span>
              </div>
            </div>
          </>
        ) : (
          <div className="mb-6 space-y-4">
            <div className="p-4 bg-primary-50 rounded-xl border border-primary-100">
              <h4 className="font-medium text-primary-900 mb-2">Confirmation</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-primary-700">
                  <CheckCircle2 className="w-4 h-4 text-primary-500" />
                  You're staking Ξ {amount} ETH
                </li>
                <li className="flex items-center gap-2 text-sm text-primary-700">
                  <CheckCircle2 className="w-4 h-4 text-primary-500" />
                  Estimated yield: Ξ {estimatedYield.toFixed(4)} ETH
                </li>
                <li className="flex items-center gap-2 text-sm text-primary-700">
                  <CheckCircle2 className="w-4 h-4 text-primary-500" />
                  Duration: {durationInDays} days
                </li>
              </ul>
            </div>
            
            <div className="flex items-start gap-2 text-sm text-gray-600">
              <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <p>
                By confirming, your stake will be locked for the duration of the challenge. 
                You can claim it back along with any earned yield upon successful completion.
              </p>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-100 text-red-700 rounded-xl text-sm">
            {error.message}
          </div>
        )}

        <div className="space-y-4">
          {(hash || isConfirming || isConfirmed) && (
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 space-y-2">
              {hash && (
                <p className="text-sm text-gray-600 break-all">
                  <span className="font-medium">Transaction:</span> {hash}
                </p>
              )}
              {isConfirming && (
                <p className="text-sm text-blue-600 animate-pulse">
                  Confirming your stake...
                </p>
              )}
              {isConfirmed && (
                <p className="text-sm text-green-600 font-medium">
                  🎉 Successfully joined the challenge!
                </p>
              )}
            </div>
          )}

          <button
            onClick={handleStake}
            disabled={!isAmountValid || !amount || isPending || isConfirming}
            className="w-full py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 
                     transition-all duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed
                     font-medium shadow-lg shadow-primary-500/20 hover:shadow-primary-600/30"
          >
            {isPending ? 'Confirming...' : 
             isConfirming ? 'Joining...' : 
             showConfirmation ? 'Confirm Stake' : 'Continue'}
          </button>

          {showConfirmation && (
            <button
              onClick={() => setShowConfirmation(false)}
              className="w-full py-3 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Back
            </button>
          )}
        </div>
      </div>
    </div>
  );
}