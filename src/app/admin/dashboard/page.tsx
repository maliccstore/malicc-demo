'use client';

import { useEffect, useState } from 'react';
import {
  TrendingUp,
  Users,
  ShoppingBag,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Activity,
  ChevronRight
} from 'lucide-react';
import {
  Flex,
  Box,
  Grid,
  Text,
  Heading,
  Card,
  Badge,
  Separator,
} from '@radix-ui/themes';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import {
  getDashboardStats,
  getRecentActivity,
  getRevenueData,
  DashboardStats,
  ActivityItem
} from '@/services/admin/dashboard.admin';

interface RevenueDataItem {
  month: string;
  revenue: number;
  orders: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [activity, setActivity] = useState<ActivityItem[]>([]);
  const [revenueData, setRevenueData] = useState<RevenueDataItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [s, a, r] = await Promise.all([
        getDashboardStats(),
        getRecentActivity(),
        getRevenueData()
      ]);
      setStats(s);
      setActivity(a);
      setRevenueData(r);
      setLoading(false);
    };
    fetchData();

    // Re-fetch data every 10 seconds to sync with localStorage
    const interval = setInterval(fetchData, 10000);

    return () => clearInterval(interval);
  }, []);

  if (loading || !stats) {
    return (
      <Flex align="center" justify="center" className="h-[60vh]">
        <Activity className="animate-spin text-indigo-600" size={32} />
      </Flex>
    );
  }

  return (
    <Box>
      <header className="mb-8">
        <Heading size="8" mb="2" className="tracking-tight text-slate-9 border-none">Dashboard Overview</Heading>
        <Text color="gray" size="3">Welcome back, Admin. Here&apos;s what&apos;s happening today.</Text>
      </header>

      {/* Stats Grid */}
      <Grid gap="4" mb="6">
        <StatsCard
          title="Total Revenue"
          value={`₹${stats.totalSales.toLocaleString()}`}
          growth={stats.salesGrowth}
          icon={<DollarSign className="text-emerald-500" />}
          color="emerald"
        />
        <StatsCard
          title="Total Orders"
          value={stats.totalOrders.toString()}
          growth={stats.ordersGrowth}
          icon={<ShoppingBag className="text-blue-500" />}
          color="blue"
        />
        <StatsCard
          title="Active Customers"
          value={stats.totalCustomers.toString()}
          growth={2.4}
          icon={<Users className="text-indigo-500" />}
          color="indigo"
        />
        <StatsCard
          title="Conversion Rate"
          value={`${stats.conversionRate}%`}
          growth={-0.5}
          icon={<TrendingUp className="text-purple-500" />}
          color="purple"
        />
      </Grid>

      <Grid gap="6">
        {/* Revenue Chart - Recharts Implementation */}
        <Card className="col-span-2 overflow-hidden bg-white/50 backdrop-blur-sm border-slate-200">
          <Flex direction="column" gap="4" p="5">
            <Flex justify="between" align="center">
              <Heading size="4">Revenue Insights</Heading>
              <Badge variant="soft" color="indigo">Last 6 Months</Badge>
            </Flex>
            <Box className="h-[300px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={revenueData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#64748b', fontSize: 12 }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#64748b', fontSize: 12 }}
                    tickFormatter={(value) => `₹${value}`}
                  />
                  <Tooltip
                    cursor={{ fill: '#f1f5f9' }}
                    contentStyle={{
                      borderRadius: '8px',
                      border: 'none',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                      backgroundColor: '#1e293b',
                      color: '#fff'
                    }}
                    formatter={(value: number | undefined) => [`₹${value ?? 0}`, 'Revenue']}
                  />
                  <Bar
                    dataKey="revenue"
                    fill="#6366f1"
                    radius={[4, 4, 0, 0]}
                    barSize={40}
                  />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Flex>
        </Card>

        {/* Activity Feed */}
        <Card className="bg-white/50 backdrop-blur-sm border-slate-200">
          <Flex direction="column" gap="4" p="5">
            <Heading size="4">Real-time Activity</Heading>
            <Flex direction="column" gap="4">
              {activity.length > 0 ? activity.map((item) => (
                <Flex key={item.id} gap="3" align="start">
                  <div className={`p-2 rounded-full ${item.type === 'order' ? 'bg-blue-50 text-blue-600' :
                    item.type === 'user' ? 'bg-emerald-50 text-emerald-600' :
                      'bg-slate-50 text-slate-600'
                    }`}>
                    {item.type === 'order' ? <ShoppingBag size={16} /> :
                      item.type === 'user' ? <Users size={16} /> :
                        <Activity size={16} />}
                  </div>
                  <Box>
                    <Text size="2" className="font-medium block leading-tight border-none">{item.message}</Text>
                    <Flex align="center" gap="1" mt="1">
                      <Clock size={12} className="text-slate-400" />
                      <Text size="1" color="gray">{new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                    </Flex>
                  </Box>
                </Flex>
              )) : (
                <Text size="2" color="gray" align="center" className="py-4 block">No recent activity</Text>
              )}
            </Flex>
            <Separator size="4" my="2" />
            <button className="text-indigo-600 text-sm font-medium flex items-center justify-center gap-1 hover:gap-2 transition-all border-none bg-transparent cursor-pointer">
              View all activity <ChevronRight size={14} />
            </button>
          </Flex>
        </Card>
      </Grid>
    </Box>
  );
}

interface StatsCardProps {
  title: string;
  value: string;
  growth: number;
  icon: React.ReactNode;
  color: string;
}

function StatsCard({ title, value, growth, icon, color }: StatsCardProps) {
  const isPositive = growth >= 0;
  return (
    <Card className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 bg-white/70 backdrop-blur-md border-slate-100">
      <Flex direction="column" gap="3" p="4">
        <Flex justify="between" align="center">
          <Text size="2" color="gray" className="font-medium uppercase tracking-wider">{title}</Text>
          <div className={`p-2 rounded-xl bg-${color}-50`}>
            {icon}
          </div>
        </Flex>
        <Flex direction="column" gap="1">
          <Text size="7" weight="bold" className="tracking-tight border-none">{value}</Text>
          <Flex align="center" gap="1">
            <div className={`flex items-center gap-0.5 text-xs font-bold ${isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
              {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              {Math.abs(growth)}%
            </div>
            <Text size="1" color="gray">vs last month</Text>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
}
