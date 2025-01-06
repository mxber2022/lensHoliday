import React, { useState } from 'react';
import { Calendar, ArrowLeft, Trophy, Users, Coins } from 'lucide-react';

interface ContestFormData {
  title: string;
  description: string;
  goal: string;
  startDate: string;
  endDate: string;
  minStake: string;
}

export function CreateContestForm({ onBack }: { onBack: () => void }) {
  const [formData, setFormData] = useState<ContestFormData>({
    title: '',
    description: '',
    goal: '',
    startDate: '',
    endDate: '',
    minStake: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contest data:', formData);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <button 
        onClick={onBack}
        className="flex items-center text-primary-600 hover:text-primary-700 mb-6 group"
      >
        <ArrowLeft className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" />
        Back to Contests
      </button>

      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="bg-primary-600 px-8 py-6">
          <h1 className="text-2xl font-bold text-white">Create New Challenge</h1>
          <p className="text-primary-100 mt-2">Launch a new challenge and inspire others to achieve their goals</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Challenge Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="input-primary"
                  placeholder="e.g., 30-Day Fitness Challenge"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="input-primary min-h-[120px]"
                  placeholder="Describe your challenge and its rules..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Goal
                </label>
                <input
                  type="text"
                  value={formData.goal}
                  onChange={(e) => setFormData({...formData, goal: e.target.value})}
                  className="input-primary"
                  placeholder="e.g., Complete 30 workouts"
                  required
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                      className="input-primary"
                      required
                    />
                    <Calendar className="absolute right-3 top-3 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                      className="input-primary"
                      required
                    />
                    <Calendar className="absolute right-3 top-3 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum Stake (USDC)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={formData.minStake}
                    onChange={(e) => setFormData({...formData, minStake: e.target.value})}
                    className="input-primary pl-12"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    required
                  />
                  <Coins className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                </div>
              </div>

              <div className="bg-primary-50 rounded-xl p-6 space-y-4">
                <h3 className="font-medium text-primary-800">Challenge Features</h3>
                <div className="flex items-start space-x-3 text-sm text-primary-700">
                  <Trophy className="w-5 h-5 text-primary-500 flex-shrink-0" />
                  <p>Set achievable goals with clear success criteria</p>
                </div>
                <div className="flex items-start space-x-3 text-sm text-primary-700">
                  <Users className="w-5 h-5 text-primary-500 flex-shrink-0" />
                  <p>Foster community engagement and mutual support</p>
                </div>
                <div className="flex items-start space-x-3 text-sm text-primary-700">
                  <Coins className="w-5 h-5 text-primary-500 flex-shrink-0" />
                  <p>Generate rewards through yield farming</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-end gap-4">
            <button
              type="button"
              onClick={onBack}
              className="px-6 py-2.5 text-gray-700 hover:text-gray-900 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
            >
              Create Challenge
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}