import { useReadContract, useReadContracts } from 'wagmi';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../config/contract';
import { Contest } from '../types';

export function useContests() {
  const { 
    data: contestCount = 0n,
    error: countError,
    isPending: isCountLoading,
    refetch: refetchCount
  } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: 'contestCount',
  });

  const contestConfigs = Array.from({ length: Number(contestCount) }, (_, i) => ({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: 'getContest',
    args: [BigInt(i)]
  }));

  const { 
    data: contestsData,
    error: contestsError,
    isPending: isContestsLoading,
    refetch: refetchContests
  } = useReadContracts({
    contracts: contestConfigs,
    enabled: contestCount > 0n
  });

  const formatContest = (contestData: any, id: number): Contest => {
    if (!contestData?.result) return {} as Contest;
    
    const [
      title, 
      description, 
      goal,
      startTime,
      endTime,
      registrationStartTime,
      registrationEndTime,
      totalStaked, 
      minStake, 
      participantCount, 
      active
    ] = contestData.result;
    
    const now = Date.now() / 1000;
    let status: Contest['status'];
    
    if (now < Number(registrationStartTime)) {
      status = 'upcoming';
    } else if (now >= Number(registrationStartTime) && now <= Number(registrationEndTime)) {
      status = 'registration';
    } else if (now > Number(registrationEndTime) && now < Number(startTime)) {
      status = 'pending_start';
    } else if (now >= Number(startTime) && now <= Number(endTime)) {
      status = 'active';
    } else {
      status = 'completed';
    }

    return {
      id: id.toString(),
      title,
      description,
      goal,
      startDate: new Date(Number(startTime) * 1000),
      endDate: new Date(Number(endTime) * 1000),
      registrationStartDate: new Date(Number(registrationStartTime) * 1000),
      registrationEndDate: new Date(Number(registrationEndTime) * 1000),
      totalStaked: Number(totalStaked) / 1e18,
      minStake: Number(minStake) / 1e18,
      participants: Number(participantCount),
      status,
      yieldGenerated: 0,
    };
  };

  const error = countError || contestsError;
  const isLoading = isCountLoading || isContestsLoading;

  const contests = contestsData?.map((data, index) => 
    formatContest(data, index)
  ).filter(Boolean) || [];

  const refetch = async () => {
    await Promise.all([refetchCount(), refetchContests()]);
  };

  return {
    contests,
    isLoading,
    error,
    contestCount: Number(contestCount),
    refetch
  };
}