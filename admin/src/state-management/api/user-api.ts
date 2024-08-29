import { USER_URL } from "../../constant";
import { MainApi } from "./api-gateway";

const UserApi = MainApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserById: builder.query({
      query: (id) => ({
        url: `${USER_URL}/getById/${id}`,
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("token") as string
          )}`,
        },
      }),
    }),

    getAllUser: builder.query({
      query: () => ({
        url: `${USER_URL}/getall`,
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("token") as string
          )}`,
        },
      }),
    }),

    updateUser: builder.mutation({
      query: ({ id, ...body }) => ({
        method: "PUT",
        body: body,
        url: `${USER_URL}/update/${id}`,
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("token") as string
          )}`,
        },
      }),
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        url: `${USER_URL}/del/${id}`,
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("token") as string
          )}`,
        },
      }),
    }),
  }),
});

export const {
  useDeleteUserMutation,
  useGetAllUserQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
} = UserApi;
