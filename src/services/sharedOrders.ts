import { demoOrders } from "@/data/orders";
import { Order } from "@/types/orders";

const STORAGE_KEY = 'malicc_demo_orders';

class OrderManager {
    private getStoredOrders(): Order[] {
        if (typeof window === 'undefined') return [...demoOrders]; // Server-side fallback

        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) {
            // Initialize with demo data if nothing in storage
            // Only do this if we actually have demo data, otherwise empty array
            const initial = [...demoOrders];
            // We don't necessarily need to save it immediately, but it helps consistency
            // localStorage.setItem(STORAGE_KEY, JSON.stringify(initial)); 
            return initial;
        }

        try {
            const parsed = JSON.parse(stored);
            // Simple validation: check if it's an array
            return Array.isArray(parsed) ? parsed : [...demoOrders];
        } catch (e) {
            console.error("Failed to parse orders from storage", e);
            return [...demoOrders];
        }
    }

    private saveOrders(orders: Order[]) {
        if (typeof window !== 'undefined') {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
        }
    }

    getAll(): Order[] {
        return this.getStoredOrders();
    }

    getById(id: string): Order | undefined {
        return this.getStoredOrders().find(o => o.id === id);
    }

    add(order: Order): void {
        const orders = this.getStoredOrders();
        // Add to beginning (unshift)
        const newOrders = [order, ...orders];
        this.saveOrders(newOrders);
    }

    update(orderId: string, updates: Partial<Order>): Order {
        const orders = this.getStoredOrders();
        const index = orders.findIndex(o => o.id === orderId);

        if (index === -1) throw new Error("Order not found");

        const updatedOrder = { ...orders[index], ...updates };
        orders[index] = updatedOrder;

        this.saveOrders(orders);
        return updatedOrder;
    }
}

export const orderManager = new OrderManager();
// Backward compatibility for a moment, but we should refactor usages.
// We cannot export 'sharedOrders' as a live array because it won't react to LS changes.
// We must update the consumers to call methods.
