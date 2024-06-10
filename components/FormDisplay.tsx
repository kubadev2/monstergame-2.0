import React, { useState } from 'react';
import { useBalance, useAccount, useWriteContract } from 'wagmi';

interface FormDisplayProps {
  monsterName: string;
}

const FormDisplay: React.FC<FormDisplayProps> = ({ monsterName }) => {
  const [selectedOption, setSelectedOption] = useState<'Deposit' | 'Claim'>('Deposit');
  const [amount, setAmount] = useState<string>('');
  const { address: userAddress } = useAccount();

  const tokenAddress = monsterName === "Monster 1"
    ? process.env.NEXT_PUBLIC_MONSTER_1_TOKEN
    : process.env.NEXT_PUBLIC_MONSTER_2_TOKEN;

  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

  const { data: tokenBalance } = useBalance({
    address: userAddress,
    token: tokenAddress as `0x${string}`,
  });

  const claimText = monsterName === "Monster 1" ? "Available M1 to claim" : "Available M2 to claim";

  const monsterIndex = monsterName === "Monster 1" ? 0 : 1;

  const { writeContract } = useWriteContract();

  const handleMaxClick = () => {
    if (tokenBalance) {
      setAmount(tokenBalance.formatted);
    }
  };

  const handleDeposit = () => {
    if (amount && userAddress) {
      writeContract({
        abi: [],
        address: contractAddress as `0x${string}`,
        functionName: 'deposit',
        args: [BigInt(amount), BigInt(monsterIndex), userAddress],
      });
    }
  };

  return (
    <div>
      <div>
        <button onClick={() => setSelectedOption('Deposit')}>Deposit</button>
        <button onClick={() => setSelectedOption('Claim')}>Claim</button>
      </div>

      {selectedOption === 'Deposit' && (
        <div>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
          />
          <button onClick={handleMaxClick}>Max</button>
          <button onClick={handleDeposit}>Deposit</button>
          <p>Balance: {tokenBalance?.formatted} {monsterName === "Monster 1" ? "M1" : "M2"}</p>
        </div>
      )}

      {selectedOption === 'Claim' && (
        <div>
          <p>{claimText}</p>
          <button>Claim</button>
        </div>
      )}
    </div>
  );
};

export default FormDisplay;
