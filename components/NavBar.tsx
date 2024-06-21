// components/NavBar.tsx

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import styles from '../styles/NavBar.module.css';

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.navContainer}>
        <div className={styles.navLeft}>
          <button className={styles.hamburger} onClick={toggleMenu}>
            ☰
          </button>
          <div className={`${styles.menu} ${isOpen ? styles.menuOpen : ''}`}>
            <Link href="/" className={`${styles.link} ${router.pathname === '/' ? styles.active : ''}`} onClick={closeMenu}>
              Fight
            </Link>
            <Link href="/leaderboard" className={`${styles.link} ${router.pathname === '/leaderboard' ? styles.active : ''}`} onClick={closeMenu}>
              Leaderboard
            </Link>
            <Link href="/shop" className={`${styles.link} ${router.pathname === '/shop' ? styles.active : ''}`} onClick={closeMenu}>
              Shop
            </Link>
            <Link href="/quests" className={`${styles.link} ${router.pathname === '/quests' ? styles.active : ''}`} onClick={closeMenu}>
              Quests
            </Link>
            <Link href="/faucet" className={`${styles.link} ${router.pathname === '/faucet' ? styles.active : ''}`} onClick={closeMenu}>
              Faucet
            </Link>
          </div>
        </div>
        <div className={styles.navRight}>
          <ConnectButton />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
