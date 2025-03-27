'use client';

import { Container, Flex } from '@radix-ui/themes';

import { User } from 'lucide-react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import AdaptiveLogo from '../ui/AdaptiveLogo';

export default function Header() {
  // Hydration
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Hydration
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const handleOnUserClick = () => {
    localStorage.setItem('user', 'Shahzer');
    console.log(localStorage.getItem('user'));
  };
  return (
    <header>
      <Container style={{ margin: '10px' }}>
        <Flex justify={'between'} align={'center'}>
          <Link href={'/'}>
            <AdaptiveLogo />
          </Link>
          <Link href={'/auth/login'}>
            <User onClick={handleOnUserClick} />
          </Link>
        </Flex>
      </Container>
    </header>
  );
}
