import { apiSlice } from "./apiSlice";
const AUTH_URL = "/api/auth";
const User_URL = "/api/user";
const POST_URL = "/api/post";
export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Auth Api
    login: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${AUTH_URL}/logout`,
        method: "POST",
      }),
    }),
    googlelogin: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/google`,
        method: "POST",
        body: data,
      }),
    }),
    // User Api
    update: builder.mutation({
      query: (data, _id) => ({
        url: `${User_URL}/update/${_id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteUser: builder.mutation({
      query: (_id) => ({
        url: `${User_URL}/delete/${_id}`,
        method: "DELETE",
      }),
    }),
    // Post Api
    createpost: builder.mutation({
      query: (data) => ({
        url: `${POST_URL}/create`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useGoogleloginMutation,
  useUpdateMutation,
  useDeleteUserMutation,
  useCreatepostMutation,
} = userApiSlice;
