// import { baseApi } from "../../api/baseApi"; // Tomar baseApi path onujayi change koro
import { baseApi } from "@/redux/baseApi";
// import { TAG_TYPES } from "../../api/tagTypes";

export const staffDashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 1. Get Dashboard Summary Stats
    getStaffDashboardData: builder.query({
      query: () => ({
        url: "/staff/dashboard",
        method: "GET",
      }),
      providesTags: ["staff"],
    }),

    // 2. Get Habit Analysis Graph Data (Weekly, Monthly, Yearly)
    getHabitAnalysis: builder.query({
      query: (filter: { period?: string }) => ({
        url: "/staff/dashboard/habit-analysis",
        method: "GET",
        params: filter,
      }),
      providesTags: ["staff"],
    }),

    // 3. Get Today's Huddles
    getTodayHuddles: builder.query({
      query: () => ({
        url: "/staff/dashboard/today-huddle",
        method: "GET",
      }),
      providesTags: ["staff"],
    }),
  }),
});

export const {
  useGetStaffDashboardDataQuery,
  useGetHabitAnalysisQuery,
  useGetTodayHuddlesQuery,
} = staffDashboardApi;
