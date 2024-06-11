import { simulateContract, writeContract } from '@wagmi/core';
import { abi } from '../gameContractABI';
import { config } from './config';

export async function claim() { 
    const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
    // Wywołaj funkcję writeContract, aby wysłać żądanie na łańcuch bloków
    const hash = await writeContract(config, { 
        abi,
        address: contractAddress as `0x${string}`,
        functionName: 'claim',
      });
  }
  
