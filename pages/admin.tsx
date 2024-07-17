import Head from 'next/head';
import { useState } from 'react';
import NavBar from '../components/NavBar';
import styles from '../styles/Home.module.css'; // Import stylów
import { changeMonster, rewardDistribution, transferOwnership, withdraw } from '../contracts/adminFunctions';

export default function Admin() {
    const [loading, setLoading] = useState(false); // Stan do obsługi ładowania
    const [newMonsterAddress, setNewMonsterAddress] = useState('');
    const [oldMonsterAddress, setOldMonsterAddress] = useState('');
    const [winner, setWinner] = useState<number>(1);
    const [ratio, setRatio] = useState<number>(50);
    const [newOwner, setNewOwner] = useState('');
    const [tokenAddress, setTokenAddress] = useState('');

    const handleAction = async (action: Function, ...args: any[]) => {
        setLoading(true);
        try {
            await action(...args);
            alert(`Action successful`);
        } catch (error: any) {
            alert(`Action failed: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.app}>
            <Head>
                <title>Admin Panel - Monster Fight 2.0</title>
                <meta name="description" content="Admin Panel" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <NavBar />
            <main className={styles.main}>
                <h1 className={styles.title}>Admin Panel</h1>

                <section className={`${styles.adminSection} ${styles.borderedSection}`}>
                    <div className={styles.adminItem}>
                        <h2>Change Monster</h2>
                        <input type="text" placeholder="New Monster Address" value={newMonsterAddress} onChange={(e) => setNewMonsterAddress(e.target.value)} />
                        <input type="text" placeholder="Old Monster Address" value={oldMonsterAddress} onChange={(e) => setOldMonsterAddress(e.target.value)} />
                        <button onClick={() => handleAction(changeMonster, newMonsterAddress, oldMonsterAddress)} disabled={loading}>
                            {loading ? 'Processing...' : 'Change Monster'}
                        </button>
                    </div>

                    <div className={styles.adminItem}>
                        <h2>Reward Distribution</h2>
                        <input type="number" placeholder="Winner (1 or 2)" min="1" max="2" value={winner} onChange={(e) => setWinner(Number(e.target.value))} />
                        <input type="number" placeholder="Ratio (1-100)" min="1" max="100" value={ratio} onChange={(e) => setRatio(Number(e.target.value))} />
                        <button onClick={() => handleAction(rewardDistribution, winner, ratio)} disabled={loading}>
                            {loading ? 'Processing...' : 'Distribute Reward'}
                        </button>
                    </div>

                    <div className={styles.adminItem}>
                        <h2>Transfer Ownership</h2>
                        <input type="text" placeholder="New Owner Address" value={newOwner} onChange={(e) => setNewOwner(e.target.value)} />
                        <button onClick={() => handleAction(transferOwnership, newOwner)} disabled={loading}>
                            {loading ? 'Processing...' : 'Transfer Ownership'}
                        </button>
                    </div>

                    <div className={styles.adminItem}>
                        <h2>Withdraw Tokens</h2>
                        <input type="text" placeholder="Token Address" value={tokenAddress} onChange={(e) => setTokenAddress(e.target.value)} />
                        <button onClick={() => handleAction(withdraw, tokenAddress)} disabled={loading}>
                            {loading ? 'Processing...' : 'Withdraw'}
                        </button>
                    </div>
                </section>
            </main>
        </div>
    );
}
