import { baseApi } from "@/redux/baseApi";


export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Huddle Alerts
    getHuddleAlerts: builder.query({
      query: () => ({
        url: "/MANAGER-dashboard/get-huddle-alert",
        method: "GET",
      }),
      providesTags: ["Huddles"],
    }),

    // Recent Coaching Logs
    getRecentSessions: builder.query({
      query: () => ({
        url: "/MANAGER-dashboard/get-recent-coaching-logs",
        method: "GET",
      }),
      providesTags: ["Sessions"],
    }),

    // Coaching Logs Overview (Stats)
    getCoachingOverview: builder.query({
      query: () => ({
        url: "/MANAGER-dashboard/get-coaching-logs-overview",
        method: "GET",
      }),
      providesTags: ["Sessions"],
    }),

    // Organization Overview
    getOrganizationOverview: builder.query({
      query: () => ({
        url: "/MANAGER-dashboard/get-organization-overview",
        method: "GET",
      }),
      providesTags: ["Sessions", "Huddles"],
    }),
  }),
});

export const {
  useGetHuddleAlertsQuery,
  useGetRecentSessionsQuery,
  useGetCoachingOverviewQuery,
  useGetOrganizationOverviewQuery,
} = dashboardApi;
