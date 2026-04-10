import { baseApi } from "@/redux/baseApi";


export const staffHabitsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 1. Get My Habits (Grouped by Coach)
    getMyHabits: builder.query({
      query: (params: { search?: string; status?: string }) => ({
        url: "/staff/my-habits",
        method: "GET",
        params,
      }),
      providesTags: ["staff"],
    }),

    // 2. Get Habits by Coach
    getHabitsByCoach: builder.query({
      query: (coachId: string) => ({
        url: `/staff/my-habits/coach/${coachId}`,
        method: "GET",
      }),
      providesTags: ["staff"],
    }),

    // 3. Mark Habit as Completed (Mutation)
    markHabitCompleted: builder.mutation({
      query: ({
        habitId,
        proofUrl,
      }: {
        habitId: string;
        proofUrl?: string;
      }) => ({
        url: `/staff/my-habits/${habitId}/complete`,
        method: "POST",
        body: { proofUrl },
      }),
      invalidatesTags: ["staff"], // Dashboard summary o update hobe
    }),

    // 4. Unmark Habit (Mutation)
    unmarkHabitCompleted: builder.mutation({
      query: (habitId: string) => ({
        url: `/staff/my-habits/${habitId}/uncomplete`,
        method: "PATCH",
      }),
      invalidatesTags: ["staff"],
    }),

    // 5. Get My Scored Habits (With Pagination)
    getMyScoredHabits: builder.query({
      query: (params: {
        page?: number;
        limit?: number;
        search?: string;
        startDate?: string;
        endDate?: string;
        status?: string;
      }) => ({
        url: "/staff/my-habits/scored",
        method: "GET",
        params,
      }),
      providesTags: ["staff"],
    }),
  }),
});

export const {
  useGetMyHabitsQuery,
  useGetHabitsByCoachQuery,
  useMarkHabitCompletedMutation,
  useUnmarkHabitCompletedMutation,
  useGetMyScoredHabitsQuery,
} = staffHabitsApi;
