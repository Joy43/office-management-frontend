/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/baseApi";
import type { IApiResponse } from "../user-admin/branchApi";
// import { IApiResponse, IMeta } from "@/types";

export interface IHuddle {
  id: string;
  topic: string;
  startTime: string;
  selectedDate: string;
  duration: string;
  meetLink?: string;
  HuddleStatus: "scheduled" | "completed" | "cancelled";
  creatorId: string;
  branchId: string;
  createdAt: string;
  myStatus?: "joined" | "completed" | "absent" | "pending"; // For User specific view
  statistics?: {
    totalParticipants: number;
    completedCount: number;
    completionRate: number;
  };
}

export const huddleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ১. Create Huddle (MANAGER only)
    createHuddle: builder.mutation<IApiResponse<IHuddle>, any>({
      query: (data) => ({
        url: "/MANAGER-dashboard/create-huddles",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Huddles"],
    }),

    // ২. Get All Huddles with Pagination & Filters (Public/Manager)
    getAllHuddles: builder.query<
      IApiResponse<{ data: IHuddle[]; pagination: any }>,
      any
    >({
      query: (params) => ({
        url: "/MANAGER-dashboard/get-all-huddles",
        method: "GET",
        params, // search, status, selectedDate, page, limit
      }),
      providesTags: ["Huddles"],
    }),

    // ৩. Get My Huddles (User specific)
    getMyHuddles: builder.query<IApiResponse<IHuddle[]>, void>({
      query: () => "/MANAGER-dashboard/my-huddles",
      providesTags: ["Huddles"],
    }),

    // ৪. Get All User Huddles with Stats (MANAGER only)
    getAllUserHuddles: builder.query<IApiResponse<IHuddle[]>, void>({
      query: () => "/MANAGER-dashboard/get-all-user-huddles",
      providesTags: ["Huddles"],
    }),

    // ৫. Update Huddle (MANAGER only)
    updateHuddle: builder.mutation<
      IApiResponse<IHuddle>,
      { id: string; data: any }
    >({
      query: ({ id, data }) => ({
        url: `/MANAGER-dashboard/update-huddles/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Huddles"],
    }),

    // ৬. Complete Own Huddle (User/Participant)
    completeOwnHuddle: builder.mutation<IApiResponse<any>, string>({
      query: (huddleId) => ({
        url: `/MANAGER-dashboard/complete-own-huddles/${huddleId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Huddles"],
    }),

    // ৭. Delete Huddle (MANAGER only)
    deleteHuddle: builder.mutation<IApiResponse<any>, string>({
      query: (id) => ({
        url: `/MANAGER-dashboard/delete-huddles/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Huddles"],
    }),

    // ৮. Get Huddle by ID
    getHuddleById: builder.query<IApiResponse<IHuddle>, string>({
      query: (id) => `/MANAGER-dashboard/get-huddles/${id}`,
      providesTags: ( id : any) => [{ type: "Huddles", id }],
    }),
  }),
});

export const {
  useCreateHuddleMutation,
  useGetAllHuddlesQuery,
  useGetMyHuddlesQuery,
  useGetAllUserHuddlesQuery,
  useUpdateHuddleMutation,
  useCompleteOwnHuddleMutation,
  useDeleteHuddleMutation,
  useGetHuddleByIdQuery,
} = huddleApi;
