import apiClient from './apiClient';

export interface ProductStatus {
  data: {
    products: {
      success: boolean;
      message: string;
      totalCount: number;
      products: Product[];
    };
  };
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  isActive: boolean;
  imageUrl: string[];
}
export const productAPI = {
  fetchProducts: async (): Promise<ProductStatus> => {
    try {
      const query = `
        query GetProducts {
          products {
            success
            message
            totalCount
            products {
              id
              name
              price
              description
              category
              isActive
              imageUrl
            }
          }
        }
      `;

      const response = await apiClient.post('/graphql', {
        query,
      });

      if (response.data.errors) {
        throw new Error(response.data.errors[0].message);
      }
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw new Error(
        `Fetch products failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  },
};
