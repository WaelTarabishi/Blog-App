import { apiSlice } from "./apiSlice";
const USERS_URL = "/api/users";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    update: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/update`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const { useUpdateMutation } = userApiSlice;
