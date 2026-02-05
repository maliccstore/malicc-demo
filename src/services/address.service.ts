import { Address, CreateAddressInput, UpdateAddressInput } from "../types/address";
import { demoAddresses } from "../data/addresses";

// Maintain local state for addresses
let userAddresses: Address[] = [...demoAddresses];

export const addressAPI = {
    getUserAddresses: async (): Promise<Address[]> => {
        await new Promise(resolve => setTimeout(resolve, 400));
        return userAddresses;
    },

    createAddress: async (input: CreateAddressInput): Promise<Address> => {
        await new Promise(resolve => setTimeout(resolve, 600));

        const newAddress: Address = {
            id: `addr-${Date.now()}`,
            ...input,
            addressLine2: input.addressLine2 || '',
            country: input.country || "IN",
            isDefault: input.isDefault || false
        };

        if (newAddress.isDefault) {
            userAddresses = userAddresses.map(addr => ({ ...addr, isDefault: false }));
        }

        userAddresses.push(newAddress);
        return newAddress;
    },

    updateAddress: async (id: string, input: UpdateAddressInput): Promise<Address> => {
        await new Promise(resolve => setTimeout(resolve, 600));

        const index = userAddresses.findIndex(a => a.id === id);
        if (index === -1) throw new Error("Address not found");

        if (input.isDefault) {
            userAddresses = userAddresses.map(addr => ({ ...addr, isDefault: false }));
        }

        userAddresses[index] = {
            ...userAddresses[index],
            ...input
        };

        return userAddresses[index];
    },

    deleteAddress: async (id: string): Promise<boolean> => {
        await new Promise(resolve => setTimeout(resolve, 400));
        const initialLength = userAddresses.length;
        userAddresses = userAddresses.filter(a => a.id !== id);
        return userAddresses.length < initialLength;
    },

    setDefaultAddress: async (id: string): Promise<Address> => {
        return await addressAPI.updateAddress(id, { isDefault: true });
    }
};
