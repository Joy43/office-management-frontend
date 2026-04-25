/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "./ReduxStore";


export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dabuke-gyedu.ssjoy.me",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [
    "Auth",
    "Profile",
    "Admin",
    "Image",
    "Jobs",
    "Templates",
    "Revenue",
    "Orders",
    "Branches",
    "DashboardTemplates",
    "Invoices",
    "Huddles",
    "Sessions",
    "BranchPerformance",
    "ExecutiveOverview",
    "TrainerDashboard",
    "TeamMembers",
    "TeamEvents",
    "staff",
    "Notifications"
  ],
  endpoints: () => ({}),
});
