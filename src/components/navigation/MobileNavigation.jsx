"use client";

import { useState, useEffect } from 'react';
import styles from './MobileNavigation.module.scss';

export default function MobileNavigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Define routes and their display names
  const routes = [
    { path: '/', label: 'HOME' },
    { path: '/about', label: 'ABOUT' },
    { path: '/skills', label: 'SKILLS' },
    { path: '/projects', label: 'PROJECT' },
    { path: '/contact', label: 'CONTACT' }
  ];

  // const toggleMenu = () => {
  //   if (!isNavigating) {
  //     setMenuOpen(!menuOpen);
  //   }
  // };

  // Return early if not mounted yet (prevents hydration issues)
  if (!mounted) return null;

  return (
    <header className={styles.header}>
      <div 
        className={styles.container}
      >
        {/* Logo */}
        <div className={styles.logoContainer}>
          <svg
            className={styles.logo}
            viewBox="0 0 34 4"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.93,0.68H0.98V3.31H7.93C8.04,3.31 8.14,3.27 8.21,3.21C8.28,3.14 8.32,3.05 8.32,2.95V1.05C8.32,0.94 8.28,0.85 8.21,0.78C8.14,0.72 8.04,0.68 7.93,0.68Z"
              fill="white"
            />
            <path
              d="M16.32,1.15H9.37C9.26,1.15 9.17,1.19 9.1,1.26C9.03,1.32 8.99,1.42 8.99,1.52V2.47C8.99,2.58 9.03,2.67 9.1,2.74C9.17,2.8 9.26,2.84 9.37,2.84H16.32C16.43,2.84 16.52,2.8 16.59,2.74C16.66,2.67 16.7,2.58 16.7,2.47V1.52C16.7,1.42 16.66,1.32 16.59,1.26C16.52,1.19 16.43,1.15 16.32,1.15Z"
              fill="white"
            />
            <path
              d="M18.04,2.21L18.04,2.69L19.52,2.69C19.63,2.69 19.72,2.65 19.79,2.58C19.86,2.5 19.9,2.41 19.9,2.31L19.9,1.29L19.66,1.29L19.66,2.31C19.66,2.35 19.65,2.38 19.62,2.41C19.59,2.43 19.56,2.45 19.52,2.45L18.28,2.45L18.28,2.21L18.04,2.21Z"
              fill="white"
            />
            <path
              d="M25.22,2.84H22.15V0.68H21.9V2.84H20.42V3.08H25.22V2.84Z"
              fill="white"
            />
            <path
              d="M28.01,2.84L31.17,2.84L31.17,3.08L27.76,3.08C27.65,3.08 27.56,3.04 27.49,2.98C27.42,2.91 27.38,2.82 27.38,2.71L27.38,0.68L27.63,0.68L27.63,2.71C27.63,2.75 27.64,2.78 27.67,2.81C27.7,2.83 27.73,2.84 27.76,2.84L28.01,2.84Z"
              fill="white"
            />
            <path
              d="M33.02,0.68L31.54,0.68V3.08L31.78,3.08L31.78,1.4L33.02,1.4C33.13,1.4 33.22,1.36 33.29,1.3C33.36,1.23 33.4,1.14 33.4,1.04C33.4,0.93 33.36,0.84 33.29,0.77C33.22,0.71 33.13,0.68 33.02,0.68Z"
              fill="white"
            />
          </svg>
        </div>

        {/* Menu Toggle Button */}
        <div 
          className={styles.menuIcon}
          // onClick={toggleMenu}
        >
          <div className={styles.menuIconBarContainer}>
            <span 
              className={styles.topBar}
            />
            <span 
              className={styles.bottomBar}
            />
          </div>
        </div>

        {/* Mobile Menu */}
          {menuOpen && (
            <div 
              className={styles.mobileMenu}
            >
              <ul className={styles.menuItems}>
                {routes.map((route, index) => (
                  <li
                  key={index}
                  >
                    <div 
                      className={`${styles.menuItem}`}
                    >
                      {route.label}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
      </div>
    </header>
  );
}