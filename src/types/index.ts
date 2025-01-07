export interface Contest {
  id: string;
  title: string;
  description: string;
  goal: string;
  startDate: Date;
  endDate: Date;
  registrationStartDate: Date;
  registrationEndDate: Date;
  totalStaked: number;
  yieldGenerated: number;
  participants: number;
  minStake: number;
  status: 'registration' | 'upcoming' | 'pending_start' | 'active' | 'completed';
}

// ... rest of the types