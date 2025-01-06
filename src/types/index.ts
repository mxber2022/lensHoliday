export interface Contest {
  id: string;
  title: string;
  description: string;
  goal: string;
  totalStaked: number;
  yieldGenerated: number;
  startDate: Date;
  endDate: Date;
  participants: number;
  status: 'active' | 'completed' | 'upcoming';
}

export interface Participant {
  address: string;
  stakedAmount: number;
  joinedAt: Date;
  progress: number;
  achievedGoal: boolean;
}

export interface StakingStats {
  totalStaked: number;
  totalYieldGenerated: number;
  activeParticipants: number;
  successRate: number;
}