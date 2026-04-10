import { baseApi } from "@/redux/baseApi";
export type PlanName = "STARTER" | "GROWTH" | "ENTERPRISE";
export type BillingCycle = "MONTHLY" | "YEARLY";
export type SubscribeStatus = "ACTIVE" | "INACTIVE" | "SUSPENDED";

export interface ISubscriptionPlan {
  id: string;
  planName: PlanName;
  planTitle: string;
  planFeatures: string[];
  subscribeStatus: SubscribeStatus;
  billingCycle: BillingCycle;
  amount: string;
  duration: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICreatePlanRequest {
  planName: PlanName;
  planTitle: string;
  planFeatures: string[];
  subscribeStatus: SubscribeStatus;
  billingCycle: BillingCycle;
  amount: string;
  duration: string;
}


export interface IApiResponse<T> {
  success: boolean;
  message: string;
  data: {
    statusCode: number;
    message: string;
    data: T;
  };
}
export const subscriptionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create Plan
    createPlan: builder.mutation<
      IApiResponse<ISubscriptionPlan>,
      ICreatePlanRequest
    >({
      query: (data) => ({
        url: "/subscription-plan/create-plan",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Jobs"],
    }),

    // Get All Plans
    getAllPlans: builder.query<IApiResponse<ISubscriptionPlan[]>, void>({
      query: () => ({
        url: "/subscription-plan",
        method: "GET",
      }),
      providesTags: ["Jobs"],
    }),

    // Get Single Plan
    getSinglePlan: builder.query<IApiResponse<ISubscriptionPlan>, string>({
      query: (id) => ({
        url: `/subscription-plan/single-plan/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Jobs", id }],
    }),

    // Update Plan
    updatePlan: builder.mutation<
      IApiResponse<ISubscriptionPlan>,
      { id: string; data: Partial<ICreatePlanRequest> }
    >({
      query: ({ id, data }) => ({
        url: `/subscription-plan/update-plan/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Jobs"],
    }),

    // Delete Plan
    deletePlan: builder.mutation<IApiResponse<null>, string>({
      query: (id) => ({
        url: `/subscription-plan/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Jobs"],
    }),
  }),
});

export const {
  useCreatePlanMutation,
  useGetAllPlansQuery,
  useGetSinglePlanQuery,
  useUpdatePlanMutation,
  useDeletePlanMutation,
} = subscriptionApi;
