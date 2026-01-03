import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import Link from 'next/link';

export default function ProductRowActions({
  productId,
}: {
  productId: string;
}) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>•••</DropdownMenu.Trigger>
      <DropdownMenu.Content className="rounded bg-white shadow">
        <DropdownMenu.Item asChild>
          <Link href={`/admin/catalog/products/${productId}`}>Edit</Link>
        </DropdownMenu.Item>
        <DropdownMenu.Item className="text-red-600">Disable</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
