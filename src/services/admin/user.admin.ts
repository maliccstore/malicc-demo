import { AdminUser, UserRole } from '@/features/admin/users/users.types';
import { demoUser } from '@/data/users';

// Maintain local state
// Adding a few extra fake users for list view
const adminUsers: AdminUser[] = [
  {
    ...demoUser,
    role: UserRole.ADMIN,
    isPhoneVerified: true, // Ensuring type compatibility if needed
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'user-demo-2',
    username: 'John Doe',
    email: 'john@example.com',
    phoneNumber: '9988776655',
    role: UserRole.CUSTOMER,
    isAdmin: false,
    isPhoneVerified: true,
    createdAt: new Date(Date.now() - 100000000).toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'user-demo-3',
    username: 'Alice Smith',
    email: 'alice@test.com',
    phoneNumber: '1122334455',
    role: UserRole.CUSTOMER,
    isAdmin: false,
    isPhoneVerified: false,
    createdAt: new Date(Date.now() - 200000000).toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const adminUserAPI = {
  getAll: async () => {
    await new Promise(resolve => setTimeout(resolve, 600));
    return { data: [...adminUsers] };
  },
};
