/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/baseApi";
import type { IApiResponse } from "./subscriptionApi";

export type TenantStatus = "ACTIVE" | "INACTIVE" | "SUSPENDED";

export interface ITenant {
  id: string;
  companyName: string;
  subdomain: string;
  companyEmail: string;
  status: TenantStatus;
  locale: string;
  timezone: string;
  isVerified: boolean;
  tenantLogo: string;
  isPaymentActive: boolean;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
}

// আপনার নতুন রেসপন্স ফরম্যাট
export interface ITenantsResponse {
  tenants: ITenant[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}

export interface ICreateTenantRequest {
  companyName: string;
  subdomain: string;
  companyEmail: string;
  status: TenantStatus;
  locale: string;
  planId: string;
  timezone: string;
  tenantLogo?: string;
}

export interface ITenantQueryParams {
  search?: string;
  page?: number;
  limit?: number;
}

export const tenantApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ১. Get All Tenants (আপডেটেড টাইপ)
    getAllTenants: builder.query<
      IApiResponse<ITenantsResponse>,
      ITenantQueryParams | void
    >({
      query: (params) => ({
        url: "/tenant",
        method: "GET",
        params: params || {},
      }),
      providesTags: ["Admin"],
    }),

    // ২. Get Single Tenant
    getSingleTenant: builder.query<IApiResponse<ITenant>, string>({
      query: (id) => ({
        url: `/tenant/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Admin", id }],
    }),

    // ৩. Create Tenant
    createTenant: builder.mutation<IApiResponse<any>, ICreateTenantRequest>({
      query: (data) => ({
        url: "/tenant/create-tenant",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Admin"],
    }),

    // ৪. Update Tenant
    updateTenant: builder.mutation<
      IApiResponse<ITenant>,
      { id: string; data: Partial<ICreateTenantRequest> }
    >({
      query: ({ id, data }) => ({
        url: `/tenant/update-tenant/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Admin"],
    }),

    // ৫. Permanent Delete
    deleteTenant: builder.mutation<IApiResponse<null>, string>({
      query: (id) => ({
        url: `/tenant/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Admin"],
    }),

    // ৬. Soft Delete
    softDeleteTenant: builder.mutation<IApiResponse<null>, string>({
      query: (id) => ({
        url: `/tenant/soft-delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Admin"],
    }),
  }),
});

export const {
  useGetAllTenantsQuery,
  useGetSingleTenantQuery,
  useCreateTenantMutation,
  useUpdateTenantMutation,
  useDeleteTenantMutation,
  useSoftDeleteTenantMutation,
} = tenantApi;
