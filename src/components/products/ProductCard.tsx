'use client';
import Image from 'next/image';
import { Button } from '../ui/button';
import { Product } from '@/types/product';
export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="w-64 border rounded-lg overflow-hidden">
      <Image
        src={product.image}
        alt={product.name}
        width={300}
        height={300}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-bold">{product.name}</h3>
        <p className="text-gray-600">${product.price}</p>
        <Button onClick={() => console.log(product)}></Button>
      </div>
    </div>
  );
}
