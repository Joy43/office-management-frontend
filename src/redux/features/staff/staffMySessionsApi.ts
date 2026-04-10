import { baseApi } from "@/redux/baseApi";


export const staffMySessionsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get My Huddles/Sessions with Pagination and Search
    getMyHuddles: builder.query({
      query: (params: { page?: number; limit?: number; search?: string }) => ({
        url: "/staff-sessions/get-my-huddles",
        method: "GET",
        params, // NestJS Query decorator e params gulo auto handle hobe
      }),
      providesTags: ["staff"],
    }),
  }),
});

export const { useGetMyHuddlesQuery } = staffMySessionsApi;