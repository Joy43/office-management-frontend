/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/baseApi";

// --- Interfaces ---
export interface ITenant {
  id: string;
  companyName: string;
  subdomain: string;
  companyEmail: string;
  status: string;
  isVerified: boolean;
  tenantLogo: string;
  isPaymentActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IBranchManager {
  id: string;
  branchId: string;
  managerId: string;
  manager: {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: string;
    profilePicture: string;
    status: string;
  };
}

export interface IBranch {
  id: string;
  branchName: string;
  subdomain: string;
  branchLogo: string;
  branchEmail: string;
  staffCount: string;
  tenantId: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  tenant?: ITenant;
  managers?: IBranchManager[];
  _count?: {
    users: number;
    sessions: number;
    programs: number;
  };
}

export interface IBranchResponse<T> {
  success: boolean;
  message: string;
  data: T;
  meta?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface ICreateBranchRequest {
  branchName: string;
  subdomain: string;
  branchEmail: string;
  staffCount: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "MANAGER" | "TRAINER" | "COACH" | "FRONT_LINE" | "EXECUTIVE";
  branchId: string;
  status: string;
  profilePicture?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IUserCreateRequest {
  email: string;
  name: string;
  role: string;
  branchId: string;
  phone: string;
}

export interface IApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// --- API Implementation ---
export const branchApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Branch Endpoints
    createBranch: builder.mutation<
      IBranchResponse<IBranch>,
      ICreateBranchRequest
    >({
      query: (body) => ({
        url: "/branch/create-branch",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Branches"],
    }),

    getAllBranches: builder.query<
      IBranchResponse<{ branches: IBranch[]; meta: any }>,
      { search?: string; page?: number; limit?: number } | void
    >({
      query: (params: any) => ({
        url: "/branch/get-all-branches",
        method: "GET",
        params,
      }),
      providesTags: ["Branches"],
    }),

    getSingleBranch: builder.query<IBranchResponse<IBranch>, string>({
      query: (id) => `/branch/${id}`,
      providesTags: ( id : any) => [{ type: "Branches", id }],
    }),

    updateBranch: builder.mutation<
      IBranchResponse<IBranch>,
      { id: string; body: Partial<ICreateBranchRequest> }
    >({
      query: ({ id, body }) => ({
        url: `/branch/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Branches"],
    }),

    deleteBranch: builder.mutation<IBranchResponse<null>, string>({
      query: (id) => ({
        url: `/branch/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Branches"],
    }),

    assignManagers: builder.mutation<
      IBranchResponse<any>,
      { id: string; managerIds: string[] }
    >({
      query: ({ id, managerIds }) => ({
        url: `/branch/${id}/assign-managers`,
        method: "POST",
        body: { managerIds },
      }),
      invalidatesTags: ["Branches"],
    }),

    getBranchUsers: builder.query<IBranchResponse<any[]>, string>({
      query: (id) => `/branch/${id}/users`,
    }),

    getBranchManagers: builder.query<IBranchResponse<any[]>, string>({
      query: (id) => `/branch/${id}/managers`,
    }),

    // User Management Endpoints
    createUser: builder.mutation<IApiResponse<IUser>, IUserCreateRequest>({
      query: (body) => ({
        url: "/client-admin/user-management/create-user",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Branches"],
    }),

    getSingleUser: builder.query<IApiResponse<IUser>, string>({
      query: (id) => `/client-admin/user-management/user/${id}`,
      providesTags: (id : any) => [{ type: "Branches", id }],
    }),

    updateUser: builder.mutation<
      IApiResponse<IUser>,
      { id: string; body: Partial<IUserCreateRequest> }
    >({
      query: ({ id, body }) => ({
        url: `/client-admin/user-management/update-user/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ({ id }: any) => [
        "Branches",
        { type: "Branches", id },
      ],
    }),

    deleteUser: builder.mutation<IApiResponse<null>, string>({
      query: (id) => ({
        url: `/client-admin/user-management/user-delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Branches"],
    }),
  }),
});

export const {
  useCreateBranchMutation,
  useGetAllBranchesQuery,
  useGetSingleBranchQuery,
  useUpdateBranchMutation,
  useDeleteBranchMutation,
  useAssignManagersMutation,
  useGetBranchUsersQuery,
  useGetBranchManagersQuery,
  useCreateUserMutation,
  useGetSingleUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = branchApi;
