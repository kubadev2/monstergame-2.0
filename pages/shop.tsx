import Head from 'next/head';
import NavBar from '../components/NavBar';
import styles from '../styles/Home.module.css'; // Import styles

export default function Shop() {
  return (
    <div className={styles.app}>
      <Head>
        <title>Shop - Monster Fight 2.0</title>
        <meta name="description" content="Shop" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <main className={styles.main}>
        <h1 className={styles.title}>Shop</h1>
        {/* Dodaj tutaj zawartość strony Shop */}
      </main>
    </div>
  );
}
