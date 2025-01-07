import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../config/contract';
import { parseEther } from 'viem';

export function useRegisterContest() {
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

  const registerForContest = async (contestId: string, amount: string) => {
    try {
      const result = await writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: CONTRACT_ABI,
        functionName: 'registerForContest',
        args: [BigInt(contestId)],
        value: parseEther(amount)
      });
      return result;
    } catch (error) {
      console.error('Error registering for contest:', error);
      throw error;
    }
  };

  return {
    registerForContest,
    isPending,
    isConfirming,
    isConfirmed,
    hash,
    error
  };
}