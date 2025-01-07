import React from 'react';
import { TrendingUp, Award, Users } from 'lucide-react';
import { useContractRead } from 'wagmi';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../config/contract';

export function Dashboard() {
  const { data: contestCount = 0n } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'contestCount'
  });

  const { data: contest } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getContest',
    args: [0n],
    enabled: contestCount > 0n
  });

  // Default values when data is loading
  const totalStaked = contest?.totalStaked ?? 0n;
  const participantCount = contest?.participantCount ?? 0n;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
      <div className="dashboard-card">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-2">Total Value Locked</p>
            <p className="text-3xl font-bold text-gray-800">
              Ξ {(Number(totalStaked) / 1e18).toFixed(2)}
            </p>
          </div>
          <div className="bg-purple-100 p-4 rounded-xl">
            <TrendingUp className="w-7 h-7 text-purple-600" />
          </div>
        </div>
      </div>

      <div className="dashboard-card">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-2">Active Contests</p>
            <p className="text-3xl font-bold text-gray-800">
              {Number(contestCount)}
            </p>
          </div>
          <div className="bg-green-100 p-4 rounded-xl">
            <Award className="w-7 h-7 text-green-600" />
          </div>
        </div>
      </div>

      <div className="dashboard-card">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-2">Total Participants</p>
            <p className="text-3xl font-bold text-gray-800">
              {Number(participantCount)}
            </p>
          </div>
          <div className="bg-blue-100 p-4 rounded-xl">
            <Users className="w-7 h-7 text-blue-600" />
          </div>
        </div>
      </div>
    </div>
  );
}