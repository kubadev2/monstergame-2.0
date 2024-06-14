import { writeContract } from '@wagmi/core'; // Zakładam, że biblioteka obsługuje interakcje z blockchain
import { config } from './config'; // Zaimportowane konfiguracje dla sieci blockchain
import { abiM1, abiM2 } from '../gameContractABI';

export async function claim(monsterIndex: number) {
    const tokenAddress = monsterIndex === 0
    ? process.env.NEXT_PUBLIC_MONSTER_1_TOKEN
    : process.env.NEXT_PUBLIC_MONSTER_2_TOKEN;
    const amountToClaim = monsterIndex === 0
    ? 100
    : 1000;
    const abi = monsterIndex === 0
    ? abiM1
    : abiM2;
  const hash = await writeContract(config, {
    abi,
    address: tokenAddress as `0x${string}`,
    functionName: `mint`,
    args: [BigInt(amountToClaim)],
  });

  return hash; // Zwracamy hash transakcji
}
