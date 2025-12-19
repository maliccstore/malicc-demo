import { Flex, Text } from '@radix-ui/themes';

export default function AdminHeader() {
  const visitorCount = 1;

  return (
    <Flex
      align="center"
      justify="center"
      className="h-10 bg-gray-50 dark:bg-gray-900 border-b"
    >
      <Text size="3" className="text-gray-700 dark:text-gray-300">
        Today Visitor Count:
      </Text>
      <Text
        size="5"
        weight="bold"
        className="ml-2 text-gray-900 dark:text-white"
      >
        {visitorCount}
      </Text>
    </Flex>
  );
}
