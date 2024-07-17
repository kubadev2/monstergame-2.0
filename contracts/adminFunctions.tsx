import { writeContract } from '@wagmi/core';
import { config } from './config';
import { abi} from '../gameContractABI'; // ABI z funkcjami administracyjnymi

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`;

export async function changeMonster(newMonsterAddress: string, oldMonsterAddress: string) {
  const hash = await writeContract(config, {
    abi,
    address: contractAddress,
    functionName: 'changeMonster',
    args: [newMonsterAddress as `0x${string}`, oldMonsterAddress as `0x${string}`],
  });

  return hash;
}

export async function rewardDistribution(winner: number, ratio: number) {
  const hash = await writeContract(config, {
    abi,
    address: contractAddress,
    functionName: 'rewardDistribution',
    args: [BigInt(winner), BigInt(ratio)],
  });

  return hash;
}

export async function transferOwnership(newOwner: string) {
  const hash = await writeContract(config, {
    abi,
    address: contractAddress,
    functionName: 'transferOwnership',
    args: [newOwner as `0x${string}`],
  });

  return hash;
}

export async function withdraw(tokenAddress: string) {
  const hash = await writeContract(config, {
    abi,
    address: contractAddress,
    functionName: 'withdraw',
    args: [tokenAddress as `0x${string}`],
  });

  return hash;
}
