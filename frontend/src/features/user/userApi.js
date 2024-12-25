import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    user: builder.query({
      query: () => ({
        url: "/user/profile",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: "/user/change-password",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useUserQuery, useChangePasswordMutation } = userApi;
