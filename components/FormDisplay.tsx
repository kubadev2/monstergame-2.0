import React, { useState } from 'react';
import { useBalance, useAccount, useWriteContract } from 'wagmi';
import { abi } from '../gameContractABI';
import { writeContract } from '@wagmi/core'; // Importuj tylko writeContract
import { claim } from '../contracts/claim'; // Importuj funkcję claim

interface FormDisplayProps {
  monsterName: string;
}

const FormDisplay: React.FC<FormDisplayProps> = ({monsterName}) => { 
  const [selectedOption, setSelectedOption] = useState<'Deposit' | 'Claim'>('Deposit');
  const [amount, setAmount] = useState<string>('');
  const { address: userAddress } = useAccount();

  const tokenAddress = monsterName === "Monster 1"
    ? process.env.NEXT_PUBLIC_MONSTER_1_TOKEN
    : process.env.NEXT_PUBLIC_MONSTER_2_TOKEN;


  const { data: tokenBalance } = useBalance({
    address: userAddress,
    token: tokenAddress as `0x${string}`,
  });

  const claimText = monsterName === "Monster 1" ? "Available M1 to claim" : "Available M2 to claim";

  const monsterIndex = monsterName === "Monster 1" ? 0 : 1;

  const handleMaxClick = () => {
    if (tokenBalance) {
      setAmount(tokenBalance.formatted);
    }
  };

  const handleClaim = async () => { // Wywołaj funkcję claim asynchronicznie
    try {
      await claim(); // Wywołaj funkcję claim
    } catch (error) {
      console.error("Claim error:", error);
    }
  };

  return (
    <div className="form-display">
      <div className="button-group">
        <button onClick={() => setSelectedOption('Deposit')}>Deposit</button>
        <button onClick={() => setSelectedOption('Claim')}>Claim</button>
      </div>

      {selectedOption === 'Deposit' && (
        <div className="deposit-section">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
          />
          <button onClick={handleMaxClick}>Max</button>
          <button>Deposit</button>
          <p>Balance: {tokenBalance?.formatted} {monsterName === "Monster 1" ? "M1" : "M2"}</p>
        </div>
      )}

      {selectedOption === 'Claim' && (
        <div className="claim-section">
          <p>{claimText}</p>
          <button onClick={handleClaim}>Claim</button> {/* Wywołaj handleClaim po kliknięciu */}
        </div>
      )}
    </div>
  );
};

export default FormDisplay;
