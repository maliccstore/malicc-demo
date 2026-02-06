export enum UserRole {
    CUSTOMER = 'CUSTOMER',
    ADMIN = 'ADMIN',
    SUPERADMIN = 'SUPERADMIN',
}

export interface AdminUser {
    id: string;
    username?: string;
    phoneNumber: string;
    isPhoneVerified: boolean;
    role: UserRole;
    isAdmin: boolean;
    email?: string;
    createdAt: string;
    updatedAt: string;
}
