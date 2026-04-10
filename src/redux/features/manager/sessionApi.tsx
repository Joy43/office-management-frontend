/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/baseApi";

export const sessionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 1. Get All Sessions (Using Mutation because backend is @Post)
    getAllSessions: builder.mutation({
      query: (filter: {
        page?: number;
        limit?: number;
        search?: string;
        status?: string;
        sessionType?: string;
      }) => ({
        url: "/MANAGER-dashboard/get-all-sessions",
        method: "POST",
        body: filter,
      }),
      invalidatesTags: ["Sessions"],
    }),

    // 2. Create a Session
    createSession: builder.mutation({
      query: (payload) => ({
        url: "/MANAGER-dashboard/session-create",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Sessions"],
    }),

    // 3. Get Session By ID
    getSessionById: builder.query({
      query: (id: string) => ({
        url: `/MANAGER-dashboard/get-session-by-id`,
        method: "GET",
        params: { id },
      }),
      providesTags: ( id : any) => [{ type: "Sessions", id }],
    }),

    // 4. Get Own Sessions (Paginated)
    getOwnSessions: builder.query({
      query: (params: { page?: number; limit?: number }) => ({
        url: "/MANAGER-dashboard/get-own-sessions",
        method: "GET",
        params,
      }),
      providesTags: ["Sessions"],
    }),

    // 5. Update Session (General)
    updateSession: builder.mutation({
      query: ({ id, data }: { id: string; data: any }) => ({
        url: `/MANAGER-dashboard/update-session`,
        method: "PATCH",
        params: { id },
        body: data,
      }),
      invalidatesTags: ["Sessions"],
    }),

    // 6. Update Session Status & Compliance
    updateSessionStatus: builder.mutation({
      query: ({
        id,
        data,
      }: {
        id: string;
        data: { sessionstatus: string; sessioncompliance: string };
      }) => ({
        url: `/MANAGER-dashboard/update-session-status`,
        method: "PATCH",
        params: { id },
        body: data,
      }),
      invalidatesTags: ["Sessions"],
    }),

    // 7. Delete Session
    deleteSession: builder.mutation({
      query: (id: string) => ({
        url: `/MANAGER-dashboard/delete-session`,
        method: "DELETE",
        params: { id },
      }),
      invalidatesTags: ["Sessions"],
    }),

    // 8. Get Manager's Employees (With filters for the participant dropdown)
    getManagerEmployees: builder.query({
      query: (params: {
        searchName?: string;
        status?: string;
        page?: number;
        limit?: number;
      }) => ({
        url: "/MANAGER-dashboard/get-manager-employee",
        method: "GET",
        params,
      }),
    }),
  }),
});

export const {
  useGetAllSessionsMutation,
  useCreateSessionMutation,
  useGetSessionByIdQuery,
  useGetOwnSessionsQuery,
  useUpdateSessionMutation,
  useUpdateSessionStatusMutation,
  useDeleteSessionMutation,
  useGetManagerEmployeesQuery,
} = sessionApi;
