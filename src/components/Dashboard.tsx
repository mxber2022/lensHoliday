import React from 'react';
import { TrendingUp, Award, Users } from 'lucide-react';
import { StakingStats } from '../types';

interface DashboardProps {
  stats: StakingStats;
}

export function Dashboard({ stats }: DashboardProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
      <div className="dashboard-card">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-2">Total Value Locked</p>
            <p className="text-3xl font-bold text-gray-800">
              ${stats.totalStaked.toLocaleString()}
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
            <p className="text-sm font-medium text-gray-600 mb-2">Total Yield Generated</p>
            <p className="text-3xl font-bold text-gray-800">
              ${stats.totalYieldGenerated.toLocaleString()}
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
            <p className="text-sm font-medium text-gray-600 mb-2">Active Participants</p>
            <p className="text-3xl font-bold text-gray-800">
              {stats.activeParticipants.toLocaleString()}
              <span className="text-sm font-medium text-gray-500 ml-2">
                ({stats.successRate}% success)
              </span>
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