import React, { useEffect } from 'react';
import { useReadContract, useAccount, useBalance } from 'wagmi';
import { abi } from '../gameContractABI';
import FormDisplay from './FormDisplay';

interface MonsterDisplayProps {
  monsterName: string;
}

const MonsterDisplay: React.FC<MonsterDisplayProps> = ({ monsterName }) => {
  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
  const { address: userAddress } = useAccount(); // Pobranie adresu użytkownika

  // Nazwa funkcji w zależności od wartości monsterName
  const functionName = monsterName === "Monster 1" ? "totalM1XP" : "totalM2XP";

  // Hook do odczytu wartości totalXP z kontraktu
  const { data: totalXP, error: totalXPError, isLoading: totalXPLoading } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi,
    functionName: functionName,
  });

  const { data: currentEpoch, error: epochError, isLoading: epochLoading } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi,
    functionName: 'epoch',
  });

  const epochValue = currentEpoch ? BigInt(currentEpoch) : BigInt(0); // Konwersja lub ustawienie domyślnej wartości
  
  // Hook do odczytu wartości Your M1XP z kontraktu
  const { data: playerXP, error: playerXPError, isLoading: playerXPLoading } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi,
    functionName: "m1xpBalancesPerEpoch",
    args: [epochValue, userAddress as `0x${string}`], // Użyj aktualnej epoki i adresu użytkownika
  });

  useEffect(() => {
    if (totalXPError) {
      console.error("Error fetching totalXP:", totalXPError);
    }
    if (playerXPError) {
      console.error("Error fetching playerXP:", playerXPError);
    }
  }, [totalXPError, playerXPError]);

  if (epochLoading || totalXPLoading || playerXPLoading) return <div>Loading...</div>;

  // Sprawdzenie, czy totalXP jest zdefiniowane przed użyciem
  if (totalXP === undefined || playerXP === undefined) return <div>Data not available</div>;

  // Obliczanie wartości procentowej totalXP w stosunku do playerXP
  const totalXPBigInt = BigInt(totalXP.toString());
  const playerXPBigInt = BigInt(playerXP.toString());
  const yourShare = playerXPBigInt !== BigInt(0) ? (playerXPBigInt * BigInt(100)) / totalXPBigInt : BigInt(0);

  return (
    <div>
      <h2>{monsterName}</h2>
      <div>
        <p>Total XP: {totalXP.toString()}</p>
        <p>Your M1XP: {playerXP.toString()}</p>
        <p>Your Share: {yourShare.toString()}%</p>
        <FormDisplay monsterName={monsterName} />
      </div>
    </div>
  );
};

export default MonsterDisplay;
