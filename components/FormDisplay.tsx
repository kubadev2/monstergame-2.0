// components/FormDisplay.tsx

import React, { useState } from 'react';
import { useBalance, useAccount } from 'wagmi';
import { abi } from '../gameContractABI';
import { claim } from '../contracts/claim'; // Import claim function
import { deposit } from '../contracts/deposit'; // Import deposit function

interface FormDisplayProps {
  monsterName: string;
  playerLevel: number;
}

const FormDisplay: React.FC<FormDisplayProps> = ({ monsterName, playerLevel }) => {
  const [selectedOption, setSelectedOption] = useState<'Deposit' | 'Claim'>('Deposit');
  const [amount, setAmount] = useState<number>(0);
  const { address: userAddress } = useAccount();

  const tokenAddress = monsterName === "Monster 1"
    ? process.env.NEXT_PUBLIC_MONSTER_1_TOKEN
    : process.env.NEXT_PUBLIC_MONSTER_2_TOKEN;

  const monsterIndex = monsterName === "Monster 1" ? 0 : 1;

  const { data: tokenBalance } = useBalance({
    address: userAddress,
    token: tokenAddress as `0x${string}`,
  });

  const claimText = monsterName === "Monster 1" ? "Available M1 to claim" : "Available M2 to claim";

  const handleMaxClick = () => {
    if (tokenBalance) {
      setAmount(parseFloat(tokenBalance.formatted));
    }
  };

  const handleClaim = async () => {
    try {
      await claim();
    } catch (error) {
      console.error("Claim error:", error);
    }
  };

  const handleDeposit = async () => {
    try {
      let referralAddress = "0x0000000000000000000000000000000000000000";
    
      if (playerLevel === 0) {
        const referralInput = document.getElementById("referral-input") as HTMLInputElement;
        if (referralInput) {
          const referralValue = referralInput.value.trim();
          if (referralValue !== "") {
            referralAddress = referralValue;
          }
        } else {
          console.error("Referral input element not found");
        }
      }
    
      if (!process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || !tokenAddress) {
        throw new Error("Contract address or token address is not defined");
      }
    
      await deposit(amount, monsterIndex, referralAddress);
    } catch (error) {
      console.error("Deposit error:", error);
    }
    
  };

  return (
    <div className="form-display">
      <div className="button-group">
        <button className={selectedOption === 'Deposit' ? 'active' : ''} onClick={() => setSelectedOption('Deposit')}>
          Deposit
        </button>
        <button className={selectedOption === 'Claim' ? 'active' : ''} onClick={() => setSelectedOption('Claim')}>
          Claim
        </button>
      </div>

      {selectedOption === 'Deposit' && (
        <div className="deposit-section">
          {playerLevel === 0 && (
            <div className="referral-section">
              <input type="text" id="referral-input" placeholder="Enter referral address" />
            </div>
          )}
          <div className="input-wrapper">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value))}
              placeholder="Enter amount"
            />
            <button onClick={handleMaxClick}>Max</button>
          </div>
          <p className="balance-info">Balance: {tokenBalance?.formatted} {monsterName === "Monster 1" ? "M1" : "M2"}</p>
          <button className="deposit-button" onClick={handleDeposit}>Deposit</button>
        </div>
      )}

      {selectedOption === 'Claim' && (
        <div className="claim-section">
          <p>{claimText}</p>
          <button className="claim-button" onClick={handleClaim}>Claim</button>
        </div>
      )}
    </div>
  );
};

export default FormDisplay;
