/* eslint-disable @typescript-eslint/no-explicit-any */
/* --- Types Definition --- */

import { baseApi } from "@/redux/baseApi";

export interface ITenantShort {
  id: string;
  companyName: string;
  subdomain: string;
  companyEmail: string;
  status: string;
  locale: string;
  timezone: string;
  isVerified: boolean;
  tenantLogo: string;
  isPaymentActive: boolean;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
}

export interface ISubscriptionShort {
  id: string;
  planName: string;
  planTitle: string;
  planFeatures: string[];
  subscribeStatus: string;
  billingCycle: "MONTHLY" | "ANNUAL";
  amount: string;
  duration: string;
  createdAt: string;
  updatedAt: string;
}

export interface IOrder {
  id: string;
  tenantId: string;
  subscriptionId: string | null;
  amount: string;
  currency: string;
  status: "paid" | "pending" | "failed";
  dueDate: string;
  paidAt: string;
  stripeInvoiceId: string | null;
  createdAt: string;
  updatedAt: string;
  tenant: any;
  subscription: ISubscriptionShort | null;
}

export interface IRevenueDashboard {
  totalSelling: { amount: string }[];
  totalRevenue: number;
  monthlyRevenue: number;
  netProfit: number;
  totalTenants: number;
}

export interface IPlatformOverview {
  activeTenants: number;
  totalTenants: number;
  totalRevenue: number;
}

export interface ISellingSource {
  planName: string;
  total: number;
  percentage: number;
}

export interface IRevenueGraph {
  filter: "MONTHLY" | "YEARLY";
  data: { label: string; total: number }[];
}

export interface IOrderListResponse {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  data: IOrder[];
}

export const platformRevenueApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 1. Dashboard Overview (Cards like Net Profit, Monthly Revenue)
    getRevenueDashboard: builder.query<IRevenueDashboard, void>({
      query: () => "/platform-revenue/revenue-dashboard",
      providesTags: ["Revenue"],
    }),

    // 2. Platform Overview (Active Tenants, Total Revenue)
    getPlatformOverview: builder.query<IPlatformOverview, void>({
      query: () => "/platform-revenue/platform-overview",
      providesTags: ["Revenue"],
    }),

    // 3. Selling Source (Pie Chart data: Starter, Growth, Enterprise)
    getSellingSource: builder.query<
      ISellingSource[],
      { filter: "MONTHLY" | "YEARLY" }
    >({
      query: (params) => ({
        url: "/platform-revenue/selling-source",
        method: "GET",
        params,
      }),
      providesTags: ["Revenue"],
    }),

    // 4. Revenue Graph (Line/Bar Chart data)
    getRevenueGraph: builder.query<
      IRevenueGraph,
      { filter: "MONTHLY" | "YEARLY" }
    >({
      query: (params) => ({
        url: "/platform-revenue/revenue-graph",
        method: "GET",
        params,
      }),
      providesTags: ["Revenue"],
    }),

    // 5. Total Orders (Invoices Table with Pagination)
    getTotalOrders: builder.query<
      IOrderListResponse,
      { search?: string; page?: number; limit?: number }
    >({
      query: (params) => ({
        url: "/platform-revenue/total-orders",
        method: "GET",
        params,
      }),
      providesTags: ["Orders"],
    }),
  }),
});

export const {
  useGetRevenueDashboardQuery,
  useGetPlatformOverviewQuery,
  useGetSellingSourceQuery,
  useGetRevenueGraphQuery,
  useGetTotalOrdersQuery,
} = platformRevenueApi;
