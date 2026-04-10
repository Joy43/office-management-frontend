/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/baseApi";


export const trainerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ------------------ Dashboard Overview ------------------
    getTrainerDashboardOverview: builder.query({
      query: () => ({
        url: "/tainer-admin-dashboard",
        method: "GET",
      }),
      providesTags: ["TrainerDashboard"],
    }),

    // ------------------ Session Management ------------------
    getUpcomingSessions: builder.query({
      query: (params: { page?: number; limit?: number; search?: string }) => ({
        url: "/tainer-session-management/upcoming-sessions",
        method: "GET",
        params,
      }),
      providesTags: ["Sessions"],
    }),

    createTrainerSession: builder.mutation({
      query: (data) => ({
        url: "/tainer-session-management/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Sessions"],
    }),

    // ------------------ Habit & Team Management ------------------
    getAssignedTeamMembers: builder.query({
      query: (params: {
        page?: number;
        limit?: number;
        search?: string;
        status?: string;
      }) => ({
        url: "/habit-assignment/users-with-huddles-sessions", // Service logic-er endpoint
        method: "GET",
        params,
      }),
      providesTags: ["TeamMembers"],
    }),

    getUsersWithHuddlesAndSessions: builder.query({
      query: (params: {
        page?: number;
        limit?: number;
        search?: string;
        status?: string;
        includeCompleted?: boolean;
      }) => ({
        url: "/habit-assignment/users-events",
        method: "GET",
        params,
      }),
      providesTags: ["TeamEvents"],
    }),

    createScoreAndHabits: builder.mutation({
      query: (data) => ({
        url: "/habit-assignment/create-score",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["TeamMembers", "TrainerDashboard"],
    }),
    getAllUsersInBranch: builder.query<any, void>({
      query: () => ({
        url: "/auth/users",
        method: "GET",
      }),
      // provideTags: ["Users"], // Jodi automatic refetch lagbe mone koro
    }),
  }),
});

export const {
  useGetTrainerDashboardOverviewQuery,
  useGetUpcomingSessionsQuery,
  useCreateTrainerSessionMutation,
  useGetAssignedTeamMembersQuery,
  useGetUsersWithHuddlesAndSessionsQuery,
  useCreateScoreAndHabitsMutation,
  useGetAllUsersInBranchQuery,
} = trainerApi;
