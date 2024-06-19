import { waitForTransactionReceipt } from '@wagmi/core';
import { writeContract } from '@wagmi/core';
import { config } from './config';
import { abiM1, abiM2 } from '../gameContractABI';

declare const ethereum: any;

export async function approveTokens(tokenAddress: string, contractAddress: string, amountToApprove: number) {
    try {
        const abi = tokenAddress === process.env.NEXT_PUBLIC_MONSTER_1_TOKEN as string ? abiM1 : abiM2;

        // Zakładamy, że token używa 18 miejsc dziesiętnych, co jest standardem dla ERC-20
        const decimals = 18;
        const amountToApproveConverted = BigInt(Math.floor(amountToApprove * 10 ** decimals));

        const result = await writeContract(config, {
            abi,
            address: tokenAddress as `0x${string}`,
            functionName: 'approve',
            args: [contractAddress as `0x${string}`, amountToApproveConverted],
        });

        console.log('Transaction to approve token has been sent:', result);

        const approval = await waitForTransactionReceipt(config, { 
            hash: result,
        });

        return approval;
    } catch (error) {
        console.error('An error occurred:', JSON.stringify(error, null, 2));
        throw error;
    }
}
