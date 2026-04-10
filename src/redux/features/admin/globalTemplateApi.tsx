/* eslint-disable @typescript-eslint/no-explicit-any */
/* Types definition */

import { baseApi } from "@/redux/baseApi";

export interface ITemplateField {
  label: string;
  type: string;
  required: boolean;
}

export interface ITemplateContent {
  title: string;
  fields: ITemplateField[];
}

export type TemplateStatus = "DARFT" | "PUBLISHED";

export interface ITemplate {
  id: string;
  templateName: string;
  type: string;
  timeLimit: string;
  content: ITemplateContent;
  templatestatus: TemplateStatus;
  isGlobal: boolean;
  createdBy: string;
  tenantId: string | null;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}

// API Response Interfaces
export interface IApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface ITemplateListResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    data: ITemplate[];
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
}



export const globalTemplateApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 1. Create Global Template
    createGlobalTemplate: builder.mutation<ITemplate, Partial<ITemplate>>({
      query: (data) => ({
        url: "/global-template/create-template",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Templates"],
    }),

    // 2. Get All Global Templates (with filters)
    getAllGlobalTemplates: builder.query<
      ITemplateListResponse,
      { search?: string; page?: number; limit?: number; isActive?: boolean }
    >({
      query: (params) => ({
        url: "/global-template/template",
        method: "GET",
        params,
      }),
      providesTags: ["Templates"],
    }),

    // 3. Get Single Template by ID
    getTemplateById: builder.query<IApiResponse<ITemplate>, string>({
      query: (id) => ({
        url: `/global-template/${id}`,
        method: "GET",
      }),
      providesTags: ( id: any) => [{ type: "Templates", id }],
    }),

    // 4. Update Global Template
    updateGlobalTemplate: builder.mutation<
      ITemplate,
      { id: string; data: Partial<ITemplate> }
    >({
      query: ({ id, data }) => ({
        url: `/global-template/update-template/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ({ id }: any) => [
        "Templates",
        { type: "Templates", id },
      ],
    }),

    // 5. Delete Template (Soft Delete)
    deleteGlobalTemplate: builder.mutation<IApiResponse<null>, string>({
      query: (id) => ({
        url: `/global-template/delete-template/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Templates"],
    }),

    // 6. Toggle Active Status
    toggleTemplateStatus: builder.mutation<IApiResponse<ITemplate>, string>({
      query: (id) => ({
        url: `/global-template/toggle-status/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ( id : any) => [
        "Templates",
        { type: "Templates", id },
      ],
    }),
  }),
});

export const {
  useCreateGlobalTemplateMutation,
  useGetAllGlobalTemplatesQuery,
  useGetTemplateByIdQuery,
  useUpdateGlobalTemplateMutation,
  useDeleteGlobalTemplateMutation,
  useToggleTemplateStatusMutation,
} = globalTemplateApi;
