import { EmailAuthCredential } from "firebase/auth";
import { apiSlice } from "./apiSlice";
const USERS_URL = "/api/auth";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
    googlelogin: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/google`,
        method: "POST",
        body: data,
      }),
    }),
    // update: builder.mutation({
    //   query: (data) => ({
    //     url: `${USERS_URL}/profile`,
    //     method: "PUT",
    //     body: data,
    //   }),
    // }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useGoogleloginMutation,
} = userApiSlice;
