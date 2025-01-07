import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../config/contract';

export function useCreateContest() {
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

  const createContest = async (args: any[]) => {
    try {
      const result = await writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: CONTRACT_ABI,
        functionName: 'createContest',
        args,
      });
      return result;
    } catch (error) {
      console.error('Error creating contest:', error);
      throw error;
    }
  };

  return {
    createContest,
    isPending,
    isConfirming,
    isConfirmed,
    hash,
    error
  };
}