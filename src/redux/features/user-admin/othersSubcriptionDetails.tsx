/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/baseApi";
import type { IApiResponse } from "./branchApi";


export interface IInvoice {
  id: string;
  planName: string;
  planTitle: string;
  amount: string;
  billingCycle: string;
  duration: string;
  status: string;
  createdAt: string;
}

export const invoiceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPaymentHistory: builder.query<
      IApiResponse<{ invoices: IInvoice[]; meta: any }>,
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


    getInvoiceDetails: builder.query<IApiResponse<any>, string>({
      query: (id) => `/invoice-management/${id}/details-invoice-client-admin`,
      providesTags: ( id : any) => [{ type: "Invoices", id }],
    }),

    getTenantSubscriptionDetails: builder.query<IApiResponse<any>, void>({
      query: () => "/invoice-management/tenant-subscription-plan-client-admin",
      providesTags: ["Invoices"],
    }),
  }),
});

export const {
  useGetPaymentHistoryQuery,
  useGetInvoiceDetailsQuery,
  useGetTenantSubscriptionDetailsQuery,
} = invoiceApi;
