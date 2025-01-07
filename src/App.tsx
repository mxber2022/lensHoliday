import React, { useState } from 'react';
import { ContestCard } from './components/ContestCard';
import { StakingModal } from './components/StakingModal';
import { Dashboard } from './components/Dashboard';
import { CreateContestForm } from './components/CreateContestForm';
import { HowItWorks } from './components/HowItWorks';
import { Footer } from './components/Footer';
import { CustomConnectButton } from './components/CustomConnectButton';
import { Star, Menu, X } from 'lucide-react';
import { useContests } from './hooks/useContests';
import { LensLogo } from './components/LensLogo';
import { Slides } from './components/Slides';

export default function App() {
  const [isStakingModalOpen, setIsStakingModalOpen] = useState(false);
  const [selectedContestId, setSelectedContestId] = useState<string | null>(null);
  const [showCreateContest, setShowCreateContest] = useState(false);
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [showSlides, setShowSlides] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { contests, isLoading, error } = useContests();

  const handleJoinContest = (contestId: string) => {
    setSelectedContestId(contestId);
    setIsStakingModalOpen(true);
  };

  const handleNavigation = (view: 'home' | 'howItWorks' | 'createContest' | 'slides') => {
    setShowCreateContest(view === 'createContest');
    setShowHowItWorks(view === 'howItWorks');
    setShowSlides(view === 'slides');
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <nav className="nav-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div 
              className="nav-logo cursor-pointer" 
              onClick={() => handleNavigation('home')}
            >
              <Star className="w-8 h-8 text-primary-500" />
              <div>
                <span className="text-xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-500">
                  DreamStake
                </span>
                <span className="text-xs text-primary-600 block -mt-1">
                  Stake Earn Achieve
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Powered by</span>
                <LensLogo />
              </div>
              <button
                onClick={() => handleNavigation('slides')}
                className="btn-secondary"
              >
                Presentation
              </button>
              <button
                onClick={() => handleNavigation('howItWorks')}
                className="btn-secondary"
              >
                How It Works
              </button>
              <button
                onClick={() => handleNavigation('createContest')}
                className="btn-secondary"
              >
                Create Challenge
              </button>
              <CustomConnectButton />
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg text-gray-600 hover:text-primary-600 hover:bg-primary-50"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 space-y-4 border-t border-gray-100">
              <div className="flex items-center gap-2 px-2">
                <span className="text-sm text-gray-600">Powered by</span>
                <LensLogo />
              </div>
              <div className="space-y-2">
                <button
                  onClick={() => handleNavigation('slides')}
                  className="w-full text-left px-2 py-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg"
                >
                  Presentation
                </button>
                <button
                  onClick={() => handleNavigation('howItWorks')}
                  className="w-full text-left px-2 py-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg"
                >
                  How It Works
                </button>
                <button
                  onClick={() => handleNavigation('createContest')}
                  className="w-full text-left px-2 py-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg"
                >
                  Create Challenge
                </button>
                <div className="px-2 pt-2">
                  <CustomConnectButton />
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {showCreateContest ? (
          <CreateContestForm onBack={() => handleNavigation('home')} />
        ) : showHowItWorks ? (
          <HowItWorks />
        ) : showSlides ? (
          <Slides />
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