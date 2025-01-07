import React, { useState } from 'react';
import { ContestCard } from './components/ContestCard';
import { StakingModal } from './components/StakingModal';
import { Dashboard } from './components/Dashboard';
import { CreateContestForm } from './components/CreateContestForm';
import { HowItWorks } from './components/HowItWorks';
import { Footer } from './components/Footer';
import { CustomConnectButton } from './components/CustomConnectButton';
import { Star } from 'lucide-react';
import { useContests } from './hooks/useContests';
import { LensLogo } from './components/LensLogo';

export default function App() {
  const [isStakingModalOpen, setIsStakingModalOpen] = useState(false);
  const [selectedContestId, setSelectedContestId] = useState<string | null>(null);
  const [showCreateContest, setShowCreateContest] = useState(false);
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  const { contests, isLoading, error } = useContests();

  const handleJoinContest = (contestId: string) => {
    setSelectedContestId(contestId);
    setIsStakingModalOpen(true);
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
                  Stake toward achieving dreams without risk
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Powered by</span>
                <LensLogo />
              </div>
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {showCreateContest ? (
          <CreateContestForm onBack={() => setShowCreateContest(false)} />
        ) : showHowItWorks ? (
          <HowItWorks />
        ) : (
          <>
            <Dashboard />
            <div className="contest-grid">
              {isLoading ? (
                <div className="text-center col-span-full py-12">Loading contests...</div>
              ) : error ? (
                <div className="text-center col-span-full py-12 text-red-600">
                  Error loading contests: {error.message}
                </div>
              ) : contests.length === 0 ? (
                <div className="text-center col-span-full py-12">
                  No contests available. Create one to get started!
                </div>
              ) : (
                contests.map((contest) => (
                  <ContestCard
                    key={contest.id}
                    contest={contest}
                    onJoin={handleJoinContest}
                  />
                ))
              )}
            </div>
          </>
        )}
      </main>

      <StakingModal
        isOpen={isStakingModalOpen}
        onClose={() => setIsStakingModalOpen(false)}
        contestId={selectedContestId}
      />

      <Footer />
    </div>
  );
}