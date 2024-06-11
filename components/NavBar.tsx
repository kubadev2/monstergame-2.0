import React, { useState } from 'react';
import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import styles from '../styles/NavBar.module.css';

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.navContainer}>
        <div className={styles.navLeft}>
          <button className={styles.hamburger} onClick={toggleMenu}>
            ☰
          </button>
          <div className={`${styles.menu} ${isOpen ? styles.menuOpen : ''}`}>
            <Link href="/" className={styles.link}>
              Fight
            </Link>
            <Link href="/leaderboard" className={styles.link}>
              Leaderboard
            </Link>
            <Link href="/shop" className={styles.link}>
              Shop
            </Link>
            <Link href="/quests" className={styles.link}>
              Quests
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
