import React, { useState } from 'react';
import { ContestCard } from './components/ContestCard';
import { StakingModal } from './components/StakingModal';
import { Dashboard } from './components/Dashboard';
import { CreateContestForm } from './components/CreateContestForm';
import { HowItWorks } from './components/HowItWorks';
import { Footer } from './components/Footer';
import { CustomConnectButton } from './components/CustomConnectButton';
import { Star } from 'lucide-react';
import { Contest, StakingStats } from './types';

// Mock data for development
const mockStats: StakingStats = {
  totalStaked: 1250000,
  totalYieldGenerated: 75000,
  activeParticipants: 1200,
  successRate: 85
};

const mockContests: Contest[] = [
  {
    id: '1',
    title: '30-Day Coding Challenge',
    description: 'Complete daily coding challenges to improve your problem-solving skills',
    goal: '30 challenges',
    totalStaked: 500000,
    yieldGenerated: 25000,
    startDate: new Date('2024-03-01'),
    endDate: new Date('2024-03-31'),
    participants: 450,
    status: 'active'
  },
  {
    id: '2',
    title: 'Full-Stack Project Sprint',
    description: 'Build and deploy a full-stack application with specified features',
    goal: 'Complete project',
    totalStaked: 750000,
    yieldGenerated: 50000,
    startDate: new Date('2024-03-15'),
    endDate: new Date('2024-04-15'),
    participants: 750,
    status: 'active'
  }
];

function App() {
  const [isStakingModalOpen, setIsStakingModalOpen] = useState(false);
  const [selectedContestId, setSelectedContestId] = useState<string | null>(null);
  const [showCreateContest, setShowCreateContest] = useState(false);
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  const handleJoinContest = (contestId: string) => {
    setSelectedContestId(contestId);
    setIsStakingModalOpen(true);
  };

  const handleStake = (amount: number) => {
    console.log('Staking amount:', amount, 'for contest:', selectedContestId);
    setIsStakingModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <nav className="nav-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center cursor-pointer" onClick={() => {
              setShowCreateContest(false);
              setShowHowItWorks(false);
            }}>
              <Star className="w-10 h-10 text-primary-500" />
              <div className="ml-3">
                <span className="text-2xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-500">
                  DreamStake
                </span>
                <span className="text-sm text-primary-600 block -mt-1">
                  Stake to Achieve
                </span>
              </div>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => {
                  setShowCreateContest(false);
                  setShowHowItWorks(true);
                }}
                className="btn-secondary"
              >
                How It Works
              </button>
              <button
                onClick={() => {
                  setShowCreateContest(true);
                  setShowHowItWorks(false);
                }}
                className="btn-secondary"
              >
                Create Challenge
              </button>
              <CustomConnectButton />
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showHowItWorks ? (
          <HowItWorks />
        ) : showCreateContest ? (
          <CreateContestForm onBack={() => setShowCreateContest(false)} />
        ) : (
          <>
            <Dashboard stats={mockStats} />
            <div className="mb-8">
              <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">Active Contests</h2>
              <div className="contest-grid">
                {mockContests.map((contest) => (
                  <ContestCard
                    key={contest.id}
                    contest={contest}
                    onJoin={handleJoinContest}
                  />
                ))}
              </div>
            </div>
          </>
        )}

        <StakingModal
          isOpen={isStakingModalOpen}
          onClose={() => setIsStakingModalOpen(false)}
          onStake={handleStake}
        />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;