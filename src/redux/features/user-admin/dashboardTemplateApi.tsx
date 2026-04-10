/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/baseApi";
import type { IApiResponse } from "./branchApi";


export interface ITemplate {
  id: string;
  templateName: string;
  templateLayout: any;
  templatestatus: "DRAFT" | "PUBLISHED" | "ARCHIVED"; // আপনার Prisma Enum অনুযায়ী
  isGlobal: boolean;
  isActive: boolean;
  tenantId?: string;
  createdAt: string;
  updatedAt: string;
}

export const dashboardTemplateApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ১. Get Tenant's Active Plan & Subscription Details
    getTenantActivePlan: builder.query<IApiResponse<any>, void>({
      query: () => "/dashboard-template/active-plan-organization",
      providesTags: ["DashboardTemplates"],
    }),

    // ২. Get All Templates (Own + Global) with Pagination
    getOwnTemplates: builder.query<
      IApiResponse<{ templates: ITemplate[]; meta: any }>,
      any
    >({
      query: (params) => ({
        url: "/dashboard-template/own-templates",
        method: "GET",
        params, // search, page, limit
      }),
      providesTags: ["DashboardTemplates"],
    }),

    // ৩. Select a Template for Tenant
    selectTemplate: builder.mutation<
      IApiResponse<{ template: ITemplate }>,
      string
    >({
      query: (templateId) => ({
        url: `/dashboard-template/select-template/${templateId}`,
        method: "POST",
      }),
      invalidatesTags: ["DashboardTemplates"],
    }),

    // ৪. Update Template Status (DRAFT, PUBLISHED etc)
    updateTemplateStatus: builder.mutation<
      IApiResponse<{ template: ITemplate }>,
      { templateId: string; status: string }
    >({
      query: ({ templateId, status }) => ({
        url: `/dashboard-template/update-status/${templateId}`,
        method: "PATCH",
        body: { templatestatus: status },
      }),
      invalidatesTags: ({ templateId } : any) => [
        "DashboardTemplates",
        { type: "DashboardTemplates", id: templateId },
      ],
    }),

    // ৫. Delete Template
    deleteTemplate: builder.mutation<IApiResponse<null>, string>({
      query: (templateId) => ({
        url: `/dashboard-template/delete-template/${templateId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["DashboardTemplates"],
    }),
  }),
});

export const {
  useGetTenantActivePlanQuery,
  useGetOwnTemplatesQuery,
  useSelectTemplateMutation,
  useUpdateTemplateStatusMutation,
  useDeleteTemplateMutation,
} = dashboardTemplateApi;
