/* eslint-disable @typescript-eslint/no-explicit-any */
/* --- Types Definition --- */

export interface IUserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  locationLon: string;
  locationLat: string;
  about: string;
  username: string | null;
  address: string | null;
  dateOfBirth: string | null;
  role: "SUPER_ADMIN" | "ADMIN" | "USER";
  status: "ACTIVE" | "INACTIVE";
  coverPhoto: string | null;
  isVerified: boolean;
  profilePicture: string;
  isLoginAlertsNotification: boolean;
  is2FAEnabled: boolean;
  isEmailNotificationsEnabled: boolean;
  isSmsNotificationsEnabled: boolean;
  isPushNotificationsEnabled: boolean;
  isReceiveWhatsAppNotifications: boolean;
  isDasktopNotificationsEnabled: boolean;
  isReceiveSlackNotifications: boolean;
  isDailySummariesEnabled: boolean;
  tenantId: string | null;
  createdAt: string;
  updatedAt: string;
  // ... অন্যান্য অ্যারেগুলো প্রয়োজন অনুযায়ী স্ট্রিং বা স্পেসিফিক টাইপ দিতে পারেন
}

export interface IApiResponse<T> {
  [x: string]: string | File | undefined;
  success: boolean | undefined | any;
  message: string;
  data: T | any;
}

// প্রোফাইল আপডেটের জন্য টাইপ (Partial কারণ সব ফিল্ড অপশনাল হতে পারে)
export interface IUpdateProfileRequest {
  name?: string;
  image?: File | string; // multipart এর জন্য File হতে পারে
  phone?: string;
  isLoginAlertsNotification?: boolean;
  is2FAEnabled?: boolean;
  isEmailNotificationsEnabled?: boolean;
  isSmsNotificationsEnabled?: boolean;
  isPushNotificationsEnabled?: boolean;
  isReceiveWhatsAppNotifications?: boolean;
  isDasktopNotificationsEnabled?: boolean;
  isReceiveSlackNotifications?: boolean;
  isDailySummariesEnabled?: boolean;
}

/* --- API Implementation --- */

import { baseApi } from "@/redux/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // --- Auth Endpoints ---
    login: builder.mutation<IApiResponse<any>, any>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),

    verifyOtp: builder.mutation<IApiResponse<any>, any>({
      query: (data) => ({
        url: "/auth/verify-otp",
        method: "POST",
        body: data,
      }),
    }),

    resendOtp: builder.mutation<IApiResponse<any>, any>({
      query: (data) => ({
        url: "/auth/resend-otp",
        method: "POST",
        body: data,
      }),
    }),

    logout: builder.mutation<IApiResponse<null>, any>({
      query: (data) => ({ url: "/auth/logout", method: "POST", body: data }),
      invalidatesTags: ["Profile"],
    }),

    // --- Password Management ---
    changePassword: builder.mutation<IApiResponse<any>, any>({
      query: (data) => ({
        url: "/auth/password/change",
        method: "POST",
        body: data,
      }),
    }),

    forgotPassword: builder.mutation<IApiResponse<any>, any>({
      query: (data) => ({
        url: "/auth/password/forgot",
        method: "POST",
        body: data,
      }),
    }),

    resetPassword: builder.mutation<IApiResponse<any>, any>({
      query: (data) => ({
        url: "/auth/password/reset",
        method: "POST",
        body: data,
      }),
    }),

    // --- Profile Management ---
    getProfile: builder.query<IApiResponse<IUserProfile>, void>({
      query: () => "/auth/profile",
      providesTags: ["Profile"],
    }),

    updateProfile: builder.mutation<
      IApiResponse<IUserProfile>,
      { id: string; body: FormData | IUpdateProfileRequest }
    >({
      query: ({ id, body }) => ({
        url: `/auth/${id}`,
        method: "PATCH",
        body, // যদি ইমেজ পাঠান তবে FormData পাঠাতে হবে
      }),
      invalidatesTags: ["Profile"],
    }),

    deleteAccount: builder.mutation<IApiResponse<null>, string>({
      query: (id) => ({ url: `/auth/${id}`, method: "DELETE" }),
    }),

    // --- Admin/User Lists ---
    getUsers: builder.query<IApiResponse<IUserProfile[]>, void>({
      query: () => "/auth/users",
      providesTags: ["Admin"],
    }),

    getManagers: builder.query<IApiResponse<IUserProfile[]>, void>({
      query: () => "/auth/managers",
      providesTags: ["Admin"],
    }),

    // --- AWS File Upload Endpoints ---
    uploadSingleFile: builder.mutation<IApiResponse<{ url: string }>, FormData>(
      {
        query: (data) => ({
          url: "/aws-file-upload/upload-s3",
          method: "POST",
          body: data,
        }),
      },
    ),

    uploadMultipleFiles: builder.mutation<
      IApiResponse<{ urls: string[] }>,
      FormData
    >({
      query: (data) => ({
        url: "/aws-file-upload/upload-s3-multiple",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useVerifyOtpMutation,
  useResendOtpMutation,
  useLogoutMutation,
  useChangePasswordMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useDeleteAccountMutation,
  useGetUsersQuery,
  useGetManagersQuery,
  useUploadSingleFileMutation,
  useUploadMultipleFilesMutation,
} = authApi;
