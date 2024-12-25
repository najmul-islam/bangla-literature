import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout } from "../auth/authSlice";
import { userAction } from "../user/userSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  prepareHeaders: async (headers, { getState, endpoints }) => {
    const token = getState()?.auth?.token;

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: async (args, api, extraOption) => {
    let result = await baseQuery(args, api, extraOption);

    if (result?.error?.status === 401) {
      api.dispatch(logout());
      api.dispatch(userAction(undefined));
      localStorage.removeItem("token");
    }
    return result;
  },
  tagTypes: ["User"],
  endpoints: (builder) => ({}),
});
