'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import ProductRowActions from './ProductRowActions';

export default function ProductTable() {
  const { list, loading } = useSelector(
    (state: RootState) => state.adminProducts
  );

  if (loading) return <div>Loading products…</div>;
  if (!list.length) return <div>No products yet.</div>;

  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="border-b">
          <th>Name</th>
          <th>Price</th>
          <th>Stock</th>
          <th>Status</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {list.map((p) => (
          <tr key={p.id} className="border-b">
            <td>{p.name}</td>
            <td>₹{p.price}</td>
            <td>{p.stock}</td>
            <td>{p.status}</td>
            <td>
              <ProductRowActions productId={p.id} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
