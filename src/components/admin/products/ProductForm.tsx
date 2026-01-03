'use client';

import { useState } from 'react';
import { AdminProduct } from '@/features/admin/products/product.types';

export default function ProductForm({ product }: { product?: AdminProduct }) {
  const [name, setName] = useState(product?.name ?? '');
  const [price, setPrice] = useState(product?.price ?? 0);
  const [stock, setStock] = useState(product?.stock ?? 0);

  return (
    <form className="space-y-4 max-w-xl">
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(+e.target.value)}
      />
      <input
        type="number"
        value={stock}
        onChange={(e) => setStock(+e.target.value)}
      />

      <button type="submit">Save Product</button>
    </form>
  );
}
