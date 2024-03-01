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
      query: (data, idUpdate) => ({
        url: `${User_URL}/update/${idUpdate}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteUser: builder.mutation({
      query: (deleteparams) => {
        const [post_id, actualUser] = deleteparams;
        return {
          url: `${User_URL}/delete/${post_id}/${actualUser}`,
          method: "DELETE",
        };
      },
    }),
    getusers: builder.mutation({
      query: () => ({
        url: `${User_URL}/getusers`,
        method: "GET",
      }),
    }),
    getmoreusers: builder.mutation({
      query: (indexToStart) => {
        return {
          url: `${User_URL}/getusers?&startIndex=${indexToStart}`,
          method: "GET",
        };
      },
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
      query: () => ({
        url: `${POST_URL}/getposts`,
        method: "GET",
      }),
    }),
    getpost: builder.mutation({
      query: (idTogetPost) => ({
        url: `${POST_URL}/getposts?postId=${idTogetPost}`,
        method: "GET",
      }),
    }),
    getpostsmore: builder.mutation({
      query: (starterIndex) => ({
        url: `${POST_URL}/getposts?&startIndex=${starterIndex}`,
        method: "GET",
      }),
    }),
    updatepost: builder.mutation({
      query: (sa) => {
        const [post_id, idu, data] = sa;
        return {
          url: `${POST_URL}/update/${post_id}/${idu}`,
          method: "PUT",
          body: data,
        };
      },
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
  useGetusersMutation,
  useGetmoreusersMutation,
  useDeleteUserMutation,
  useCreatepostMutation,
  useUpdatepostMutation,
  useGetpostsMutation,
  useGetpostsmoreMutation,
  useDeletepostMutation,
  useGetpostMutation,
} = ApiSlice;
