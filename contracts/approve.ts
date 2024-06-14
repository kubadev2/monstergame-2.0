import { waitForTransactionReceipt } from '@wagmi/core'
import { writeContract } from '@wagmi/core';
import { config } from './config';
import { abiM1,abiM2 } from '../gameContractABI';

declare const ethereum: any;
export async function approveTokens(tokenAddress: string, contractAddress: string, amountToApprove: bigint) {
    try {
        const abi = tokenAddress === process.env.NEXT_PUBLIC_MONSTER_1_TOKEN as string ? abiM1 : abiM2;
        const result = await writeContract(config, {
            abi,
            address: tokenAddress as `0x${string}`,
            functionName: 'approve',
            args: [contractAddress as `0x${string}`, BigInt(amountToApprove)],
          });
        console.log('Transaction to approve token has been sent:', result);
        const aproval = waitForTransactionReceipt(config, { 
            hash: result,
         });
         return aproval;
    } catch (error) {
        console.error('An error occurred:', error);
    }
}
