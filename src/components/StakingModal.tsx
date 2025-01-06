import React, { useState } from 'react';
import { X } from 'lucide-react';

interface StakingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStake: (amount: number) => void;
}

export function StakingModal({ isOpen, onClose, onStake }: StakingModalProps) {
  const [amount, setAmount] = useState<string>('');

  if (!isOpen) return null;

  const handleStake = () => {
    const numAmount = parseFloat(amount);
    if (numAmount > 0) {
      onStake(numAmount);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">Stake Assets</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Amount to Stake (USDC)
          </label>
          <div className="relative">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="0.00"
              min="0"
              step="0.01"
            />
            <span className="absolute right-3 top-2 text-gray-500">USDC</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Your funds will be:</p>
            <ul className="list-disc list-inside text-sm text-gray-600 mt-2">
              <li>Safely staked in Aave</li>
              <li>Generating yield for contest rewards</li>
              <li>Fully refundable at contest end</li>
            </ul>
          </div>

          <button
            onClick={handleStake}
            disabled={!amount || parseFloat(amount) <= 0}
            className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:bg-gray-400"
          >
            Confirm Stake
          </button>
        </div>
      </div>
    </div>
  );
}