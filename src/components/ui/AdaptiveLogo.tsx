'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function AdaptiveLogo() {
  // Dark Mode
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check for dark mode preference
    const darkModeMediaQuery = window.matchMedia(
      '(prefers-color-scheme: dark)'
    );
    setIsDarkMode(darkModeMediaQuery.matches);
  }, []);

  return (
    <>
      {/* Conditional logo based on theme */}
      {!isDarkMode ? (
        <Image
          src={'/assets/images/maliccwhite.svg'}
          priority={true}
          alt="malicc.store"
          width={100}
          height={100}
        />
      ) : (
        <Image
          src={'/assets/images/malicc.svg'}
          alt="malicc.store"
          width={100}
          height={100}
        />
      )}
    </>
  );
}
