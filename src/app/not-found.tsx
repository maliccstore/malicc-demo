import Link from 'next/link';
import { Container, Text } from '@radix-ui/themes';

// pages/404.js
export default function Custom404() {
  return (
    <Container style={{ textAlign: 'center', marginTop: '50px' }}>
      <Text>404 - Page Not Found</Text>
      <Text>
        &quot;Sorry, the page you&apos;re looking for doesn&apos;t exist.
      </Text>
      <Link href="/">Return to Home</Link>
    </Container>
  );
}
