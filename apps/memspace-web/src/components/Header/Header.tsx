import { HamburgerIcon } from '@chakra-ui/icons';
import {
  Box,
  Collapse,
  Flex,
  IconButton,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react';
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

  const { isOpen: isNavigationOpen, onToggle: onToggleNavigation } =
    useDisclosure();
  const isMobile = useBreakpointValue({ base: true, sm: false });

  const PrimaryNavigation = () => {
    return (
      <>
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
      </>
    );
  };

  return (
    <header className={styles.header} data-testid="Header">
      <Container>
        <nav>
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

            {isMobile && (
              <>
                <IconButton
                  icon={<HamburgerIcon />}
                  variant="outline"
                  aria-label="Toggle navigation"
                  onClick={() => onToggleNavigation()}
                />
                <Box width="full" className={styles.mobileNav}>
                  <Collapse in={isNavigationOpen} animateOpacity>
                    <Flex direction="column" pt="4">
                      <PrimaryNavigation />
                    </Flex>
                  </Collapse>
                </Box>
              </>
            )}

            {!isMobile && (
              <Flex className={styles.desktopNav}>
                <PrimaryNavigation />
              </Flex>
            )}
          </div>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
