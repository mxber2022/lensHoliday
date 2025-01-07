import React, { useState, useEffect } from 'react';
import { Calendar, ArrowLeft, Trophy, Users, Coins } from 'lucide-react';
import { useCreateContest } from '../hooks/useCreateContest';
import { parseEther } from 'viem';

interface ContestFormData {
  title: string;
  description: string;
  goal: string;
  registrationStartDate: string;
  registrationEndDate: string;
  startDate: string;
  endDate: string;
  minStake: string;
}

export function CreateContestForm({ onBack }: { onBack: () => void }) {
  const [formData, setFormData] = useState<ContestFormData>({
    title: '',
    description: '',
    goal: '',
    registrationStartDate: '',
    registrationEndDate: '',
    startDate: '',
    endDate: '',
    minStake: '',
  });

  const [dateError, setDateError] = useState<string>('');
  const { createContest, isPending, isConfirming, isConfirmed, hash, error } = useCreateContest();

  useEffect(() => {
    validateDates();
  }, [formData.registrationStartDate, formData.registrationEndDate, formData.startDate, formData.endDate]);

  const validateDates = () => {
    if (!formData.registrationStartDate || !formData.registrationEndDate || 
        !formData.startDate || !formData.endDate) {
      return true; // Skip validation if dates are not all set
    }

    const regStart = new Date(formData.registrationStartDate).getTime();
    const regEnd = new Date(formData.registrationEndDate).getTime();
    const start = new Date(formData.startDate).getTime();
    const end = new Date(formData.endDate).getTime();
    const now = Date.now();

    if (regStart < now) {
      setDateError('Registration start must be in the future');
      return false;
    }
    if (regEnd >= start) {
      setDateError('Registration must end before the challenge starts');
      return false;
    }
    if (regStart >= regEnd) {
      setDateError('Registration end must be after registration start');
      return false;
    }
    if (start >= end) {
      setDateError('Challenge end must be after challenge start');
      return false;
    }
    
    setDateError('');
    return true;
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof ContestFormData) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateDates()) return;

    try {
      const registrationStartTime = Math.floor(new Date(formData.registrationStartDate).getTime() / 1000);
      const registrationEndTime = Math.floor(new Date(formData.registrationEndDate).getTime() / 1000);
      const startTime = Math.floor(new Date(formData.startDate).getTime() / 1000);
      const endTime = Math.floor(new Date(formData.endDate).getTime() / 1000);
      const minStakeWei = parseEther(formData.minStake);

      await createContest([
        formData.title,
        formData.description,
        formData.goal,
        BigInt(startTime),
        BigInt(endTime),
        BigInt(registrationStartTime),
        BigInt(registrationEndTime),
        minStakeWei
      ]);
    } catch (error) {
      console.error('Error creating contest:', error);
    }
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
          <h1 className="text-2xl font-bold text-white font-display">Create New Challenge</h1>
          <p className="text-primary-100 mt-2">Launch a new challenge and inspire others to achieve their goals</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-display">
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
                <label className="block text-sm font-medium text-gray-700 mb-2 font-display">
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
                <label className="block text-sm font-medium text-gray-700 mb-2 font-display">
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

            <div className="space-y-8">
              <div className="space-y-6">
                <h3 className="font-medium text-gray-900 font-display">Registration Period</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-display">
                      Registration Start
                    </label>
                    <div className="relative">
                      <input
                        type="datetime-local"
                        value={formData.registrationStartDate}
                        onChange={(e) => handleDateChange(e, 'registrationStartDate')}
                        className="input-primary !pr-10 !appearance-none w-full h-12 text-base"
                        required
                      />
                      <Calendar className="absolute right-3 top-3.5 w-5 h-5 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-display">
                      Registration End
                    </label>
                    <div className="relative">
                      <input
                        type="datetime-local"
                        value={formData.registrationEndDate}
                        onChange={(e) => handleDateChange(e, 'registrationEndDate')}
                        className="input-primary !pr-10 !appearance-none w-full h-12 text-base"
                        required
                      />
                      <Calendar className="absolute right-3 top-3.5 w-5 h-5 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="font-medium text-gray-900 font-display">Challenge Period</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-display">
                      Challenge Start
                    </label>
                    <div className="relative">
                      <input
                        type="datetime-local"
                        value={formData.startDate}
                        onChange={(e) => handleDateChange(e, 'startDate')}
                        className="input-primary !pr-10 !appearance-none w-full h-12 text-base"
                        required
                      />
                      <Calendar className="absolute right-3 top-3.5 w-5 h-5 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-display">
                      Challenge End
                    </label>
                    <div className="relative">
                      <input
                        type="datetime-local"
                        value={formData.endDate}
                        onChange={(e) => handleDateChange(e, 'endDate')}
                        className="input-primary !pr-10 !appearance-none w-full h-12 text-base"
                        required
                      />
                      <Calendar className="absolute right-3 top-3.5 w-5 h-5 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-display">
                  Minimum Stake (ETH)
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
                <h3 className="font-medium text-primary-800 font-display">Challenge Features</h3>
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

          {dateError && (
            <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg">
              {dateError}
            </div>
          )}

          {error && (
            <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg">
              {error.message}
            </div>
          )}

          <div className="mt-8 flex items-center justify-between gap-4">
            <div>
              {hash && <div className="text-sm text-gray-600">Transaction Hash: {hash}</div>}
              {isConfirming && <div className="text-sm text-blue-600">Confirming transaction...</div>}
              {isConfirmed && <div className="text-sm text-green-600">Challenge created successfully!</div>}
            </div>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={onBack}
                className="px-6 py-2.5 text-gray-700 hover:text-gray-900 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isPending || isConfirming}
                className="btn-primary"
              >
                {isPending ? 'Confirming...' : isConfirming ? 'Creating...' : 'Create Challenge'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}