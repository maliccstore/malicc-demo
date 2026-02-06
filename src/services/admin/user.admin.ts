import { AdminUser, UserRole } from '@/features/admin/users/users.types';
import { demoUser } from '@/data/users';

const USER_STORAGE_KEY = 'malicc_demo_users';

class UserManager {
  private getStoredUsers(): AdminUser[] {
    if (typeof window === 'undefined') return [];

    const stored = localStorage.getItem(USER_STORAGE_KEY);
    if (!stored) {
      const initial: AdminUser[] = [
        {
          ...demoUser,
          role: UserRole.ADMIN,
          isPhoneVerified: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ];
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }

    try {
      return JSON.parse(stored);
    } catch {
      return [];
    }
  }

  getAll(): AdminUser[] {
    return this.getStoredUsers();
  }

  add(user: AdminUser) {
    const users = this.getStoredUsers();
    users.push(user);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(users));
  }
}

export const userManager = new UserManager();

export const adminUserAPI = {
  getAll: async () => {
    await new Promise(resolve => setTimeout(resolve, 600));
    return { data: userManager.getAll() };
  },
};
