import { apiSlice } from "../api/apiSlice";
import { login } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: "/user/register",
        method: "POST",
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result && result?.data.token) {
            dispatch(login(result.data));
          }
        } catch (error) {}
      },
    }),

    verifyEmail: builder.query({
      query: (emailToken) => ({
        url: `/user/verify-email?verifyToken=${emailToken}`,
        method: "GET",
      }),
    }),

    resendVerifyEmail: builder.mutation({
      query: (data) => ({
        url: `/user/resend-verify-email`,
        method: "POST",
        body: data,
      }),
    }),

    login: builder.mutation({
      query: (data) => ({
        url: "/user/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result && result?.data.token) {
            dispatch(login(result?.data?.token));
          }
        } catch (error) {}
      },
    }),

    forgotPassword: builder.mutation({
      query: (data) => ({
        url: "/user/forgot-password",
        method: "POST",
        body: data,
      }),
    }),

    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/user/reset-password",
        method: "POST",
        body: data,
      }),
    }),

    changePassword: builder.mutation({
      query: (data) => ({
        url: "/user/change-password",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useVerifyEmailQuery,
  useResendVerifyEmailMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
} = authApi;
