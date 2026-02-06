'use client'; // Essential for client-side hooks and Redux

import { useParams } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { Product } from '@/types/product';
import { Box, Container, Heading, Text } from '@radix-ui/themes';
import ProductDetailsSkeleton from '@/components/products/ProductDetailsSkeleton';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { addToCart, removeFromCart } from '@/store/slices/cartSlice';
import { Image as ImageIcon } from 'lucide-react';
import { useEffect } from 'react';
import { fetchProducts } from '@/store/slices/productSlice';
import { AppDispatch } from '@/store';

const ProductPage = () => {
  const params = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const id = params.id;
  const productId = Array.isArray(id) ? id[0] : id;

  const { products, loading } = useSelector((state: RootState) => state.products);

  // Get product from Redux store - Use loose comparison or string conversion to be safe
  const product = products.find((p: Product) => String(p.id) === String(productId));

  const cartItem = useSelector((state: RootState) =>
    product ? state.cart.items.find(item => item.id === product.id) : undefined
  );

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  const handleAddToCart = () => {
    if (product) {
      console.log(product);
      dispatch(addToCart(product));
    }
  };

  if (loading) {
    return <ProductDetailsSkeleton />;
  }

  if (!product) {
    return (
      <Container className="product-page p-4 text-center">
        <Heading as="h1" size="4" className="font-bold line-clamp-1">
          Product not found
        </Heading>
        <Text as="p" size="2" color="gray">
          The product you are looking for does not exist.
        </Text>
      </Container>
    );
  }

  return (
    <Container className="product-page p-4">
      <Box className="w-full h-96 flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden mb-6">
        {product.image ? (
          <Image
            width={400}
            height={300}
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain"
          />
        ) : (
          <ImageIcon className="text-gray-300" size={96} />
        )}
      </Box>
      <div className='mb-4'>
        <Heading as="h1" size="4" className="font-bold line-clamp-1">
          {product.name}
        </Heading>
        <Text as="p" size="2" color="gray">
          {product.description}
        </Text>
      </div>
      <div className="sticky bottom-12 flex justify-center">
        {cartItem ? (
          <div className="flex items-center justify-between max-w-[200px] w-full border border-gray-200 rounded-lg bg-white shadow-sm overflow-hidden">
            <Button
              onClick={() => dispatch(removeFromCart(String(product.id)))}
              className="h-12 w-14 !p-0 !bg-transparent !text-gray-600 hover:!bg-gray-50 flex items-center justify-center rounded-none border-r border-gray-100 transition-colors"
            >
              -
            </Button>
            <span className="text-lg font-semibold w-12 text-center text-gray-900">
              {cartItem.quantity}
            </span>
            <Button
              onClick={() => dispatch(addToCart(product))}
              className="h-12 w-14 !p-0 !bg-transparent !text-gray-600 hover:!bg-gray-50 flex items-center justify-center rounded-none border-l border-gray-100 transition-colors"
            >
              +
            </Button>
          </div>
        ) : (
          <Button
            onClick={handleAddToCart}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors max-w-md w-full"
          >
            Add to Cart
          </Button>
        )}
      </div>
    </Container>
  );
};

export default ProductPage;
