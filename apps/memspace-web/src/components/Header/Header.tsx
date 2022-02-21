import Link from 'next/link';
import React from 'react';
import { useIsLoggedIn } from '../../hooks/authentication/use-is-logged-in';
import { useLogout } from '../../hooks/authentication/use-logout';
import styles from './Header.module.css';

type HeaderProps = {};

const Header = ({}: HeaderProps) => {
  const isLoggedIn = useIsLoggedIn();

  const logout = useLogout();

  return (
    <div className={styles.header} data-testid="Header">
      <div className="container">
        <div className={styles.content}>
          <Link href="/" passHref>
            <a>
              <img
                className={styles.logo}
                src="/logo.svg"
                alt="Memspace Logo"
              />
            </a>
          </Link>

          {!isLoggedIn && (
            <Link href="/login">
              <a className={styles.loginButton}>Login</a>
            </Link>
          )}

          {isLoggedIn && (
            <button className={styles.navItem} onClick={logout}>
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
