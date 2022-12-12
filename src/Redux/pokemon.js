// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  tagTypes: ["postlist"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://629dae743dda090f3c07dd7f.mockapi.io",
  }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query({
      //here builder.mutation for delete,update operation
      query: (name) => ({ url: "/fakeapi" }),
      providesTags: ["postlist"],
    }),
    deletePost: builder.mutation({
      //here builder.mutation for delete,update operation
      query: (id) => ({ url: `/fakeapi/${id}`, method: "DELETE" }),
      invalidatesTags: ["postlist"],
    }),
    editPost: builder.mutation({
      //here builder.mutation for delete,update operation
      query: (id) => ({ url: `/fakeapi/${id}`, method: "GET" }),
    }),
    updatePost: builder.mutation({
      //here builder.mutation for delete,update operation
      query: ({ ModelData, ids }) => ({
        url: `/fakeapi/${ids}`,
        method: "PUT",
        body: { name: ModelData },
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["postlist"],
    }),
    viewPost: builder.mutation({
      //here builder.mutation for delete,update operation
      query: (id) => ({
        url: `/fakeapi/${id}`,
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
    }),
    createPost: builder.mutation({
      //here builder.mutation for delete,update operation
      query: (payload) => ({
        url: `/fakeapi`,
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["postlist"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetPokemonByNameQuery,
  useDeletePostMutation,
  useEditPostMutation,
  useUpdatePostMutation,
  useViewPostMutation,
  useCreatePostMutation,
} = pokemonApi;
