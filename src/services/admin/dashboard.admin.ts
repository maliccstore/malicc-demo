import { orderManager } from '../sharedOrders';
import { userManager } from './user.admin';

export interface DashboardStats {
    totalSales: number;
    totalOrders: number;
    totalCustomers: number;
    conversionRate: number;
    salesGrowth: number;
    ordersGrowth: number;
}

export interface ActivityItem {
    id: string;
    type: 'order' | 'user' | 'product';
    message: string;
    timestamp: string;
}

export const getDashboardStats = async (): Promise<DashboardStats> => {
    const orders = orderManager.getAll();
    const users = userManager.getAll();

    // Calculate real stats
    const totalSales = orders.reduce((sum, order) => sum + order.totalAmount, 0);
    const totalOrders = orders.length;
    const totalCustomers = users.filter(u => !u.isAdmin).length;

    // Growth calculations (simulated for demo, but could be derived from date comparisons)
    const salesGrowth = 12.5;
    const ordersGrowth = 8.2;

    return {
        totalSales,
        totalOrders,
        totalCustomers: totalCustomers || 1, // Fallback to 1 for UI
        conversionRate: 3.5,
        salesGrowth,
        ordersGrowth,
    };
};

export const getRecentActivity = async (): Promise<ActivityItem[]> => {
    const orders = orderManager.getAll().slice(0, 5);
    const users = userManager.getAll().slice(0, 5);

    const activity: ActivityItem[] = [];

    orders.forEach(order => {
        activity.push({
            id: `order-${order.id}`,
            type: 'order',
            message: `Order #${order.id} for ₹${order.totalAmount}`,
            timestamp: typeof order.createdAt === 'number' ? new Date(order.createdAt).toISOString() : order.createdAt
        });
    });

    users.forEach(user => {
        activity.push({
            id: `user-${user.id}`,
            type: 'user',
            message: `New customer: ${user.username || user.phoneNumber}`,
            timestamp: user.createdAt
        });
    });

    // Sort by timestamp desc
    return activity.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0, 10);
};

export const getRevenueData = async () => {
    const orders = orderManager.getAll();

    // Group orders by month
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const revenueMap: Record<string, { revenue: number, orders: number }> = {};

    // Initialize last 6 months
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const monthName = months[d.getMonth()];
        revenueMap[monthName] = { revenue: 0, orders: 0 };
    }

    orders.forEach(order => {
        const date = new Date(order.createdAt);
        const monthName = months[date.getMonth()];
        if (revenueMap[monthName]) {
            revenueMap[monthName].revenue += order.totalAmount;
            revenueMap[monthName].orders += 1;
        }
    });

    return Object.entries(revenueMap).map(([month, data]) => ({
        month,
        revenue: data.revenue,
        orders: data.orders
    }));
};
