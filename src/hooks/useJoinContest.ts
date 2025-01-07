import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../config/contract';
import { parseEther } from 'viem';

export function useJoinContest() {
  const { 
    data: hash,
    isPending,
    writeContract,
    error
  } = useWriteContract();

  const { 
    isLoading: isConfirming,
    isSuccess: isConfirmed
  } = useWaitForTransactionReceipt({
    hash,
  });

  const joinContest = async (contestId: string, amount: string) => {
    try {
      const result = await writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: CONTRACT_ABI,
        functionName: 'joinContest',
        args: [BigInt(contestId)],
        value: parseEther(amount)
      });
      return result;
    } catch (error) {
      console.error('Error joining contest:', error);
      throw error;
    }
  };

  return {
    joinContest,
    isPending,
    isConfirming,
    isConfirmed,
    hash,
    error
  };
}