import React, { useEffect } from 'react';
import { X, AlertCircle, Info, CheckCircle2, Wallet } from 'lucide-react';
import { useRegisterContest } from '../hooks/useRegisterContest';
import { useContests } from '../hooks/useContests';
import { Contest } from '../types';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  contest: Contest;
}

export function RegistrationModal({ isOpen, onClose, contest }: RegistrationModalProps) {
  const { refetch } = useContests();
  const { 
    registerForContest, 
    isPending,
    isConfirming,
    isConfirmed,
    hash,
    error
  } = useRegisterContest();

  useEffect(() => {
    if (isConfirmed) {
      refetch(); // Refetch contest data after successful registration
      const timer = setTimeout(() => {
        onClose();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isConfirmed, onClose, refetch]);

  if (!isOpen) return null;

  const handleRegister = async () => {
    try {
      await registerForContest(contest.id, contest.minStake.toString());
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-900">Register for Challenge</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            disabled={isPending || isConfirming}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="mb-6 space-y-4">
          <div className="p-4 bg-primary-50 rounded-xl border border-primary-100">
            <h4 className="font-medium text-primary-900 mb-4">Challenge Details</h4>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Registration Fee</span>
                <span className="font-medium text-gray-900">Ξ {contest.minStake}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Registration Ends</span>
                <span className="font-medium text-gray-900">
                  {contest.registrationEndDate.toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Challenge Duration</span>
                <span className="font-medium text-gray-900">
                  {Math.ceil((contest.endDate.getTime() - contest.startDate.getTime()) / (1000 * 60 * 60 * 24))} days
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-2 text-sm text-gray-600">
            <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <p>
              By registering, you agree to stake Ξ {contest.minStake} ETH when the challenge begins. 
              This amount will be locked during the challenge and returned upon successful completion.
            </p>
          </div>
        </div>

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
                  Confirming registration...
                </p>
              )}
              {isConfirmed && (
                <p className="text-sm text-green-600 font-medium flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Successfully registered!
                </p>
              )}
            </div>
          )}

          <button
            onClick={handleRegister}
            disabled={isPending || isConfirming}
            className="w-full py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 
                     transition-all duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed
                     font-medium shadow-lg shadow-primary-500/20 hover:shadow-primary-600/30
                     flex items-center justify-center gap-2"
          >
            {isPending ? (
              <>
                <span className="animate-spin">⚡</span>
                Confirming...
              </>
            ) : isConfirming ? (
              <>
                <span className="animate-pulse">📝</span>
                Registering...
              </>
            ) : (
              <>
                <Wallet className="w-5 h-5" />
                Register Now
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}