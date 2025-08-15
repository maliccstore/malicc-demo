'use client'; // Essential for client-side hooks and Redux

import { useParams } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { Product } from '@/types/product';
import { Box, Container } from '@radix-ui/themes';
import Image from 'next/image';
import { addToCart } from '@/store/slices/cartSlice';

const ProductPage = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const id = Number(params.id); // Convert to number explicitly

  // Get product from Redux store
  const product = useSelector((state: RootState) =>
    state.products.products.find((p: Product) => p.id === id)
  );

  const handleAddToCart = () => {
    if (product) {
      console.log(product);
      dispatch(addToCart(product));
    }
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <Container className="product-page p-4">
      <Box>
        <Image
          width={400} // fixed numeric value
          height={300} // fixed numeric value
          src={product.image}
          alt={product.name}
          className="w-full max-h-96 object-contain"
        />
      </Box>
      <div>
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <p className="text-lg my-4">${product.price}</p>
        <p className="text-gray-700">{product.description}</p>
      </div>
      <div className="sticky bottom-12 flex justify-center">
        <button
          onClick={handleAddToCart}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors max-w-md w-full"
        >
          Add to Cart
        </button>
      </div>
    </Container>
  );
};

export default ProductPage;
