import { apiSlice } from "./apiSlice";
const AUTH_URL = "/api/auth";
const User_URL = "/api/user";
const POST_URL = "/api/post";

export const ApiSlice = apiSlice.injectEndpoints({
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
    getposts: builder.mutation({
      query: (_id) => ({
        url: `${POST_URL}/getposts?userId=${_id}`,
        method: "GET",
      }),
    }),
    getpost: builder.mutation({
      query: (_id) => ({
        url: `${POST_URL}/getposts?postId=${_id}`,
        method: "GET",
      }),
    }),
    getpostsmore: builder.mutation({
      query: (_id, startIndex) => ({
        url: `${POST_URL}/getposts?userId=${_id}?&startIndex=${
          startIndex || 9
        }`,
        method: "GET",
      }),
    }),
    deletepost: builder.mutation({
      query: (params) => {
        const [userId, postId] = params;
        return {
          url: `${POST_URL}/deletepost/${postId}/${userId}`,
          method: "DELETE",
        };
      },
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
  useGetpostsMutation,
  useGetpostsmoreMutation,
  useDeletepostMutation,
  useGetpostMutation,
} = ApiSlice;
