import { baseApi } from "@/redux/baseApi";

export const executiveDashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 1. KPI Cards (CSAT, Complaints, Adoption, Repeat Customer)
    getExecutiveOverview: builder.query({
      query: () => ({
        url: "/executive/dashboard-overview",
        method: "GET",
      }),
      providesTags: ["ExecutiveOverview"],
    }),

    // 2. 90-Day Trend Data for Graphs
    getTrendGraph: builder.query({
      query: () => ({
        url: "/executive/90-days-trend",
        method: "GET",
      }),
    }),

    // 3. Paginated Branch Performance List (Table)
    getBranchPerformance: builder.query({
      query: (params) => ({
        url: "/executive/branch-performance",
        method: "GET",
        params, // supports page, limit, search
      }),
      providesTags: ["BranchPerformance"],
    }),

    // 4. Highest CSAT Scores Leaderboard
    getHighestCSATScores: builder.query({
      query: () => ({
        url: "/executive/top-performers/highest-csat",
        method: "GET",
      }),
    }),

    // 5. Fewest Complaints Leaderboard
    getFewestComplaints: builder.query({
      query: () => ({
        url: "/executive/top-performers/fewest-complaints",
        method: "GET",
      }),
    }),

    // 6. Best Adherence Leaderboard
    getBestAdherence: builder.query({
      query: () => ({
        url: "/executive/top-performers/best-adherence",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetExecutiveOverviewQuery,
  useGetTrendGraphQuery,
  useGetBranchPerformanceQuery,
  useGetHighestCSATScoresQuery,
  useGetFewestComplaintsQuery,
  useGetBestAdherenceQuery,
} = executiveDashboardApi;
