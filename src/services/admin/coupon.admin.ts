import { AdminCoupon, CreateCouponInput, UpdateCouponInput, DiscountType } from '@/features/admin/coupons/coupon.types';

const STORAGE_KEY = 'malicc_mock_coupons';

const initialCoupons: AdminCoupon[] = [
    {
        id: '1',
        code: 'DISCOUNT10',
        discountType: DiscountType.PERCENTAGE,
        discountValue: 10,
        validFrom: new Date().toISOString(),
        validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        isActive: true,
        usedCount: 45,
        usageLimit: 100,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: '2',
        code: 'SAVE20',
        discountType: DiscountType.FIXED,
        discountValue: 500,
        minOrderValue: 2000,
        validFrom: new Date().toISOString(),
        validUntil: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
        isActive: true,
        usedCount: 12,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    }
];

const getStoredCoupons = (): AdminCoupon[] => {
    if (typeof window === 'undefined') return initialCoupons;
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialCoupons));
        return initialCoupons;
    }
    return JSON.parse(stored);
};

const saveCoupons = (coupons: AdminCoupon[]) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(coupons));
    }
};

export const adminCouponAPI = {
    getAll: async (): Promise<{ data: AdminCoupon[] }> => {
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
        return { data: getStoredCoupons() };
    },

    getById: async (id: string): Promise<{ data: AdminCoupon }> => {
        await new Promise(resolve => setTimeout(resolve, 300));
        const coupons = getStoredCoupons();
        const coupon = coupons.find(c => c.id === id);
        if (!coupon) throw new Error('Coupon not found');
        return { data: coupon };
    },

    create: async (input: CreateCouponInput): Promise<{ data: AdminCoupon }> => {
        await new Promise(resolve => setTimeout(resolve, 800));
        const coupons = getStoredCoupons();
        const newCoupon: AdminCoupon = {
            ...input,
            id: Math.random().toString(36).substr(2, 9),
            isActive: true,
            usedCount: 0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        const updatedCoupons = [newCoupon, ...coupons];
        saveCoupons(updatedCoupons);
        return { data: newCoupon };
    },

    update: async (id: string, input: UpdateCouponInput): Promise<{ data: AdminCoupon }> => {
        await new Promise(resolve => setTimeout(resolve, 800));
        const coupons = getStoredCoupons();
        const index = coupons.findIndex(c => c.id === id);
        if (index === -1) throw new Error('Coupon not found');

        const updatedCoupon = {
            ...coupons[index],
            ...input,
            updatedAt: new Date().toISOString(),
        };

        coupons[index] = updatedCoupon;
        saveCoupons(coupons);
        return { data: updatedCoupon };
    },

    disable: async (id: string): Promise<{ success: boolean }> => {
        await new Promise(resolve => setTimeout(resolve, 500));
        const coupons = getStoredCoupons();
        const index = coupons.findIndex(c => c.id === id);
        if (index === -1) throw new Error('Coupon not found');

        coupons[index].isActive = false;
        coupons[index].updatedAt = new Date().toISOString();
        saveCoupons(coupons);
        return { success: true };
    },

    validate: async (code: string, totalAmount: number): Promise<{ data: AdminCoupon; discountAmount: number }> => {
        await new Promise(resolve => setTimeout(resolve, 600));
        const coupons = getStoredCoupons();
        const coupon = coupons.find(c => c.code.toUpperCase() === code.toUpperCase());

        if (!coupon) {
            throw new Error('Invalid coupon code');
        }

        if (!coupon.isActive) {
            throw new Error('This coupon is no longer active');
        }

        const now = new Date();
        if (now < new Date(coupon.validFrom) || now > new Date(coupon.validUntil)) {
            throw new Error('This coupon has expired');
        }

        if (coupon.minOrderValue && totalAmount < coupon.minOrderValue) {
            throw new Error(`Minimum order value of ₹${coupon.minOrderValue} required for this coupon`);
        }

        if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
            throw new Error('This coupon has reached its usage limit');
        }

        let discountAmount = 0;
        if (coupon.discountType === DiscountType.PERCENTAGE) {
            discountAmount = totalAmount * (coupon.discountValue / 100);
            if (coupon.maxDiscount && discountAmount > coupon.maxDiscount) {
                discountAmount = coupon.maxDiscount;
            }
        } else {
            discountAmount = coupon.discountValue;
        }

        // Ensure discount doesn't exceed total amount
        discountAmount = Math.min(discountAmount, totalAmount);

        return { data: coupon, discountAmount };
    }
};
