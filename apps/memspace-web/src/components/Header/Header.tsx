import React from 'react';
import { useIsLoggedIn } from '../../hooks/authentication/use-is-logged-in';
import { useLogout } from '../../hooks/authentication/use-logout';
import ActiveLink from '../ActiveLink/ActiveLink';
import Container from '../Container/Container';
import Link from '../Link/Link';
import styles from './Header.module.css';

type HeaderProps = {};

const Header = ({}: HeaderProps) => {
  const isLoggedIn = useIsLoggedIn();

  const logout = useLogout();

  return (
    <div className={styles.header} data-testid="Header">
      <Container>
        <div className={styles.content}>
          <Link href={{ pathname: '/' }} passHref>
            <a>
              <img
                className={styles.logo}
                src="/logo.svg"
                alt="Memspace Logo"
              />
            </a>
          </Link>

          <nav>
            <ActiveLink
              href={{ pathname: '/' }}
              className={styles.navItem}
              activeClassName={styles.active}
            >
              Home
            </ActiveLink>

            {!isLoggedIn && (
              <ActiveLink
                href={{ pathname: '/login' }}
                className={styles.navItem}
                activeClassName={styles.active}
              >
                Login
              </ActiveLink>
            )}

            {isLoggedIn && (
              <button className={styles.navItem} onClick={logout}>
                Logout
              </button>
            )}
          </nav>
        </div>
      </Container>
    </div>
  );
};

export default Header;
