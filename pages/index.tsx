import dynamic from 'next/dynamic';
import Head from 'next/head';
import NavBar from '../components/NavBar'; // Import NavBar
import MonsterDisplay from '../components/MonsterDisplay'; // Import MonsterDisplay
import styles from '../styles/Home.module.css'; // Import styles

const EpochDisplay = dynamic(() => import('../components/EpochDisplay'), { ssr: false });

export default function Home() {
  return (
    <div className={styles.app}>
      <Head>
        <title>Monster Fight 2.0</title>
        <meta name="description" content="Monster Fight Game" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <main className={styles.main}>
        <h1 className={styles.title}>Witaj w Monster Fight 2.0</h1>
        <EpochDisplay />
        <div className={styles.monsterContainer}>
          <MonsterDisplay monsterName="Monster 1" /> {/* Dodano wyświetlenie MonsterDisplay dla Monster 1 */}
          <MonsterDisplay monsterName="Monster 2" /> {/* Dodano wyświetlenie MonsterDisplay dla Monster 2 */}
        </div>
      </main>
    </div>
  );
}
