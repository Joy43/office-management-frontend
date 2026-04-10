/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/baseApi";
import type { IApiResponse } from "./branchApi";


// --- Types Based on your Prisma Service ---
export interface ISubscription {
  id: string;
  planName: string;
  planTitle: string;
  planFeatures: string[];
  status: string;
  billingCycle: string;
  amount: string;
  duration: string;
  createdAt: string;
  updatedAt: string;
}

export interface IInvoice {
  id: string;
  amount: number;
  currency: string;
  status: string;
  dueDate: string;
  paidAt: string | null;
  stripeInvoiceId: string | null;
  createdAt: string;
  subscription: ISubscription;
  tenant: {
    companyName: string;
    companyEmail: string;
    subdomain: string;
  };
}

export const invoiceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ১. Get Payment History (Paginated & Filterable)
    // @Get('payment-history-client-admin')
    getPaymentHistory: builder.query<
      IApiResponse<IInvoice[]>,
      {
        search?: string;
        duration?: string;
        page?: number;
        limit?: number;
      } | void
    >({
      query: (params: any) => ({
        url: "/invoice-management/payment-history-client-admin",
        method: "GET",
        params,
      }),
      providesTags: ["Invoices"],
    }),

    // ২. Get Invoice Details By ID
    // @Get(':id/details-invoice-client-admin')
    getInvoiceDetails: builder.query<IApiResponse<IInvoice>, string>({
      query: (id) => `/invoice-management/${id}/details-invoice-client-admin`,
      providesTags: ( id : any) => [{ type: "Invoices", id }],
    }),

    // ৩. Get Tenant Subscription & All Other Plans
    // @Get('tenant-subscription-plan-client-admin')
    getTenantSubscriptionPlan: builder.query<
      IApiResponse<{
        Mysubscription: ISubscription;
        tenant: any;
        othersSubcriptionDetails: ISubscription[];
      }>,
      void
    >({
      query: () => "/invoice-management/tenant-subscription-plan-client-admin",
      providesTags: ["Invoices"],
    }),
  }),
});

export const {
  useGetPaymentHistoryQuery,
  useGetInvoiceDetailsQuery,
  useGetTenantSubscriptionPlanQuery,
} = invoiceApi;
