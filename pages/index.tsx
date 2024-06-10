import dynamic from 'next/dynamic';
import Head from 'next/head';
import { ConnectButton } from '@rainbow-me/rainbowkit';

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
      </main>
    </div>
  );
}
