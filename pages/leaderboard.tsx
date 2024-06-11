import Head from 'next/head';
import NavBar from '../components/NavBar';
import styles from '../styles/Home.module.css'; // Import styles

export default function Leaderboard() {
    return (
        <div className={styles.app}>
            <Head>
                <title>Leaderboard - Monster Fight 2.0</title>
                <meta name="description" content="Leaderboard" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <NavBar/>
            <main className={styles.main}>
                <h1 className={styles.title}>Leaderboard</h1>
                <p>Trzeba zmienić kontrakt, najlepiej zapytać arta</p>
            </main>
        </div>
    );
}
