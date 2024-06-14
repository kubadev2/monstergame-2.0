// components/MonsterDisplay.tsx

import React, { useEffect } from 'react';
import { useReadContract, useAccount } from 'wagmi';
import { abi } from '../gameContractABI';
import FormDisplay from './FormDisplay';
import styles from '../styles/Home.module.css'; // Import styles
import Image from 'next/image'; // Import Next.js Image component

interface MonsterDisplayProps {
  monsterName: string;
}

const MonsterDisplay: React.FC<MonsterDisplayProps> = ({ monsterName }) => {
  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
  const { address: userAddress } = useAccount(); // Pobranie adresu użytkownika

  // Nazwa funkcji w zależności od wartości monsterName
  const totalXPFunctionName = monsterName === "Monster 1" ? "totalM1XP" : "totalM2XP";
  const playerXPFunctionName = monsterName === "Monster 1" ? "m1xpBalancesPerEpoch" : "m2xpBalancesPerEpoch";

  // Hook do odczytu wartości totalXP z kontraktu
  const { data: totalXP, error: totalXPError, isLoading: totalXPLoading } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi,
    functionName: totalXPFunctionName,
  });

  const { data: currentEpoch, error: epochError, isLoading: epochLoading } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi,
    functionName: 'epoch',
  });

  const epochValue = currentEpoch ? BigInt(currentEpoch) : BigInt(0); // Konwersja lub ustawienie domyślnej wartości

  // Hook do odczytu poziomu gracza z kontraktu
  const { data: playerLevel, error: playerLevelError, isLoading: playerLevelLoading } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi,
    functionName: 'level', // Upewnij się, że jest to prawidłowa nazwa funkcji w ABI
    args: [userAddress as `0x${string}`], // Użyj adresu użytkownika
  });

  // Hook do odczytu wartości Your XP z kontraktu
  const { data: playerXP, error: playerXPError, isLoading: playerXPLoading } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi,
    functionName: playerXPFunctionName,
    args: [epochValue, userAddress as `0x${string}`], // Użyj aktualnej epoki i adresu użytkownika
  });

  useEffect(() => {
    if (totalXPError) {
      console.error("Error fetching totalXP:", totalXPError);
    }
    if (playerXPError) {
      console.error("Error fetching playerXP:", playerXPError);
    }
    if (playerLevelError) {
      console.error("Error fetching playerLevel:", playerLevelError);
    }
  }, [totalXPError, playerXPError, playerLevelError]);

  if (epochLoading || totalXPLoading || playerXPLoading || playerLevelLoading) return <div>Loading...</div>;

  // Sprawdzenie, czy totalXP jest zdefiniowane przed użyciem
  if (totalXP === undefined || playerXP === undefined || playerLevel === undefined) return <div>Data not available</div>;

  // Obliczanie wartości procentowej totalXP w stosunku do playerXP
  const totalXPBigInt = BigInt(totalXP.toString());
  const playerXPBigInt = BigInt(playerXP.toString());
  const yourShare = totalXPBigInt !== BigInt(0)
    ? (playerXPBigInt * BigInt(100)) / totalXPBigInt
    : BigInt(0);

  // Logika do wyświetlania odpowiedniego obrazu w zależności od zakresu wartości totalXP
  const getImageForTotalXP = (xp: bigint, monsterName: string) => {
    const cleanedMonsterName = monsterName.replace(/\s+/g, '').toLowerCase();
    if (xp < BigInt(10)) return `/images/${cleanedMonsterName}level/1.png`;
    if (xp < BigInt(50)) return `/images/${cleanedMonsterName}level/10.png`;
    return `/images/${cleanedMonsterName}level/50.png`;
  };

  const imageSrc = getImageForTotalXP(totalXPBigInt, monsterName);

  return (
    <div className={styles.monsterDisplay}>
      {imageSrc && (
        <div className={styles.monsterImageContainer}>
          <Image
            src={imageSrc}
            alt={`${monsterName} Level ${totalXPBigInt}`}
            layout="fill" // Ustawienie obrazka na pełne wymiary rodzica
            objectFit="cover" // Dopasowanie obrazka, aby wypełnił cały kontener
            className={styles.monsterImage} // Dodanie klasy CSS
          />
        </div>
      )}
      <h2>{monsterName}</h2>
      <div className={styles.xpInfo}>
        <p>Total {monsterName === "Monster 1" ? "M1XP" : "M2XP"}: {totalXP.toString()}</p>
        <p>Your {monsterName === "Monster 1" ? "M1XP" : "M2XP"}: {playerXP.toString()}</p>
        <p>Your Share: {yourShare.toString()}%</p>
        <FormDisplay monsterName={monsterName} playerLevel={parseInt(playerLevel.toString())} />
      </div>
    </div>
  );
};

export default MonsterDisplay;
