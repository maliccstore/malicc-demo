'use client';
import { Box, Flex } from '@radix-ui/themes';
import { Home, Folder, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BottomNavigation() {
  const pathName = usePathname();

  const navItems = [
    {
      icon: <Home size={20} />,
      activeIcon: <Home size={20} className="text-crimson-11" />,
      label: 'Home',
      path: '/',
    },
    {
      icon: <Folder size={20} />,
      activeIcon: <Folder size={20} className="text-crimson-11" />,
      label: 'Category',
      path: '/category',
    },
    {
      icon: <ShoppingCart size={20} />,
      activeIcon: <ShoppingCart size={20} className="text-crimson-11" />,
      label: 'Cart',
      path: '/cart',
    },
  ];
  return (
    <Box className="md:fixed md:bottom-1 md:left-1/2 md:-translate-x-1/2 md:w-5/12 fixed bottom-0 left-1/2 -translate-x-1/2 w-full bg-white border-t shadow-md flex justify-around py-3 px-5">
      <Flex justify={'between'} align={'center'}>
        {navItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className="flex flex-col items-center"
          >
            {pathName === item.path ? item.activeIcon : item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </Flex>
    </Box>
  );
}
