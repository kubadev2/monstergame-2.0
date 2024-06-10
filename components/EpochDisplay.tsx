import { useReadContract, useAccount } from 'wagmi';
import { useEffect } from 'react';
import { abi } from '../gameContractABI';

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

const EpochDisplay = () => {
  const { address, isConnecting, isDisconnected } = useAccount(); // Hook to get the connected account's address

  const { data: currentEpoch, error: epochError, isLoading: epochLoading } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi,
    functionName: 'epoch',
  });

  const { data: playerLevel, error: levelError, isLoading: levelLoading } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: abi,
    functionName: 'level',
    args: [address as `0x${string}`], // Pass the connected account's address
  });

  useEffect(() => {
    if (epochError) {
      console.error("Error fetching epoch:", epochError);
    }
    if (levelError) {
      console.error("Error fetching player level:", levelError);
    }
  }, [epochError, levelError]);

  if (isConnecting) return <div>Connecting...</div>;
  if (isDisconnected) return <div>Please connect your wallet</div>;
  if (epochLoading || levelLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Current Epoch: {currentEpoch?.toString()}</h1>
      <h2>Player Level: {playerLevel?.toString()}</h2>
    </div>
  );
};

export default EpochDisplay;
