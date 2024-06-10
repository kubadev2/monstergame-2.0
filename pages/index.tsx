import dynamic from 'next/dynamic';
import Head from 'next/head';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import MonsterDisplay from '../components/MonsterDisplay'; // Import MonsterDisplay
import FormDisplay from '../components/FormDisplay';

const EpochDisplay = dynamic(() => import('../components/EpochDisplay'), { ssr: false });

export default function Home() {
  return (
    <div>
      <ConnectButton />
      <Head>
        <title>Monster Fight 2.0</title>
        <meta name="description" content="Monster Fight Game" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Witaj w Monster Fight 2.0</h1>
        <EpochDisplay />
        <div>
        <MonsterDisplay monsterName="Monster 1" /> {/* Dodano wyświetlenie MonsterDisplay dla Monster 1 */}
          
        </div>
        <div>
          <MonsterDisplay monsterName="Monster 2" /> {/* Dodano wyświetlenie MonsterDisplay dla Monster 2 */}
        </div>
      </main>
    </div>
  );
}

