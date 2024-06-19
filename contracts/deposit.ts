import { writeContract } from '@wagmi/core';
import { config } from './config';
import { abi } from '../gameContractABI';
import { approveTokens } from './approve';

export async function deposit(amount: number, monsterindex: number, referral: string) {
  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
  let tokenAddress: string;

  if (monsterindex === 0) {
    tokenAddress = process.env.NEXT_PUBLIC_MONSTER_1_TOKEN || '';
  } else if (monsterindex === 1) {
    tokenAddress = process.env.NEXT_PUBLIC_MONSTER_2_TOKEN || '';
  } else {
    throw new Error('Invalid monsterindex');
  }

  if (!contractAddress || !tokenAddress) {
    throw new Error('Contract address or token address is not defined');
  }

  console.log("Starting deposit process...");
  console.log("Contract address:", contractAddress);
  console.log("Token address:", tokenAddress);
  console.log("Amount:", amount);
  console.log("Monster index:", monsterindex.toString());
  console.log("Referral address:", referral);

  const decimals = 18;
  const amountConverted = BigInt(Math.floor(amount * 10 ** decimals));

  try {
    console.log("Executing deposit on blockchain...");
    const hash = await writeContract(config, {
      abi: abi,
      address: contractAddress as `0x${string}`,
      functionName: 'deposit',
      args: [
        amountConverted,
        BigInt(monsterindex),
        referral as `0x${string}`
      ],
    });

    console.log("Transaction hash:", hash);
    console.log("Deposit completed successfully.");

    return hash;
  } catch (depositError) {
    console.error('An error occurred during deposit:', depositError);

    try {
      console.log("Approving tokens...");
      await approveTokens(tokenAddress, contractAddress, amount);

      console.log("Tokens approved");

      console.log("Executing deposit on blockchain...");
      const hash = await writeContract(config, {
        abi,
        address: contractAddress as `0x${string}`,
        functionName: 'deposit',
        args: [
          amountConverted,
          BigInt(monsterindex),
          referral as `0x${string}`
        ],
      });

      console.log("Transaction hash:", hash);
      console.log("Deposit completed successfully.");

      return hash;
    } catch (approvalError) {
      console.error('Error approving tokens and retrying deposit:', approvalError);
      throw approvalError;
    }
  }
}