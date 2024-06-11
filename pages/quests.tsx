import Head from 'next/head';
import NavBar from '../components/NavBar';
import styles from '../styles/Home.module.css'; // Import styles

export default function Quests() {
  return (
    <div className={styles.app}>
      <Head>
        <title>Quests - Monster Fight 2.0</title>
        <meta name="description" content="Quests" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <main className={styles.main}>
        <h1 className={styles.title}>Quests</h1>
        {/* Dodaj tutaj zawartość strony Quests */}
      </main>
    </div>
  );
}
