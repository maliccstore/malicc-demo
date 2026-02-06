import { Address } from '@/types/address';

export const demoAddresses: Address[] = [
    {
        id: 'addr-1',
        fullName: 'Demo User',
        phoneNumber: '9876543210',
        addressLine1: '123 Innovation Drive',
        addressLine2: 'Tech Park',
        city: 'Bangalore',
        state: 'Karnataka',
        postalCode: '560100',
        country: 'IN',
        isDefault: true,
    },
    {
        id: 'addr-2',
        fullName: 'Demo User (Office)',
        phoneNumber: '9876543210',
        addressLine1: '456 Business Hub',
        city: 'Mumbai',
        state: 'Maharashtra',
        postalCode: '400001',
        country: 'IN',
        isDefault: false,
    }
];
