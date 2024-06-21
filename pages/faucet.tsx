import Head from 'next/head';
import { useState } from 'react'; // Import useState do obsługi stanu
import NavBar from '../components/NavBar';
import styles from '../styles/Home.module.css'; // Import stylów
import { claim } from '../contracts/faucetClaim'; // Import funkcji claim

export default function Faucet() {
  const [loading, setLoading] = useState(false); // Stan do obsługi ładowania

  // Adresy tokenów pobierane z pliku .env
  const monster1TokenAddress = process.env.NEXT_PUBLIC_MONSTER_1_TOKEN;
  const monster2TokenAddress = process.env.NEXT_PUBLIC_MONSTER_2_TOKEN;

  // Funkcja do obsługi kliknięcia claim dla danego indeksu tokena
  const handleClaim = async (indexToken: number) => { // Dodaj typ dla indexToken
    setLoading(true); // Ustawienie stanu ładowania na true
    try {
      await claim(indexToken); // Wywołanie funkcji claim z odpowiednim indeksem
      alert(`Claim successful for Monster ${indexToken + 1}`); // Powiadomienie o sukcesie
    } catch (error: any) {
      // Obsługa błędu
      alert(`Claim failed: ${error.message}`); // Obsługa błędu w przypadku niepowodzenia
    } finally {
      setLoading(false); // Zakończenie ładowania (niezależnie od wyniku)
    }
  };

  return (
    <div className={styles.app}>
      <Head>
        <title>Faucet - Monster Fight 2.0</title>
        <meta name="description" content="Faucet" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <main className={styles.main}>
        <h1 className={styles.title}>Faucet</h1>
        
        <section className={`${styles.faucetSection} ${styles.borderedSection}`}>
          <div className={styles.faucetItem}>
            <h2>Token Monster 1</h2>
            <p>Contract address: {monster1TokenAddress}</p>
            {/* Obsługa kliknięcia na przycisk dla Monster 1 */}
            <button
              className={styles.claimButton}
              onClick={() => handleClaim(0)} // Wywołanie handleClaim z indeksem 0
              disabled={loading} // Wyłączenie przycisku podczas ładowania
            >
              {loading ? 'Claiming...' : 'Claim Monster 1 Tokens'}
            </button>
          </div>
          
          <div className={styles.faucetItem}>
            <h2>Token Monster 2</h2>
            <p>Contract address: {monster2TokenAddress}</p>
            {/* Obsługa kliknięcia na przycisk dla Monster 2 */}
            <button
              className={styles.claimButton}
              onClick={() => handleClaim(1)} // Wywołanie handleClaim z indeksem 1
              disabled={loading} // Wyłączenie przycisku podczas ładowania
            >
              {loading ? 'Claiming...' : 'Claim Monster 2 Tokens'}
            </button>
          </div>
        </section>

        {/* Dodaj napis i link */}
        <p className={styles.additionalInfo}>
          Do you need more tCRO? Click <a href="https://cronos.org/faucet" target="_blank" rel="noopener noreferrer">HERE</a>.
        </p>
        
      </main>
    </div>
  );
}
