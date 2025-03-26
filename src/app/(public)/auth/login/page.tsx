'use client';

import { useState } from 'react';
import LoginForm from '@/components/login/LoginForm';
import { Box, Container, Flex } from '@radix-ui/themes';
export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <Flex
      align={'center'}
      justify={'center'}
      style={{ height: '100vh', width: '100vw' }}
    >
      <Box
        style={{
          background: 'var(--gray-a2)',
          borderRadius: 'var(--radius-3)',
        }}
      >
        <Container>
          <LoginForm
            handleSubmit={handleSubmit}
            setEmail={setEmail}
            setPassword={setPassword}
            email={email}
            password={password}
          />
        </Container>
      </Box>
    </Flex>
  );
}
