declare const ethereum: any;
import {waitForTransaction } from '@wagmi/core';
export async function approveTokens(tokenAddress: string, contractAddress: string, amountToApprove: string) {
    try {
        if (typeof window.ethereum === 'undefined') {
            throw new Error('MetaMask is not installed');
        }

        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];

        const result = await ethereum.request({
            method: 'eth_sendTransaction',
            params: [{
                to: tokenAddress,
                from: account,
                data: `0x095ea7b3000000000000000000000000${contractAddress.toLowerCase().replace('0x', '')}${amountToApprove.padStart(64, '0')}`
            }]
        });
        //await waitForTransaction(result);
        console.log('Transaction to approve token has been sent:', result);
    } catch (error) {
        console.error('An error occurred:', error);
    }
}
