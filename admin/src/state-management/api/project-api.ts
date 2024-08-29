import { Project_URL } from "../../constant";
import { MainApi } from "./api-gateway";

const ProjectApi = MainApi.injectEndpoints({
  endpoints: (builder) => ({
    getProjectById: builder.query({
      query: (id) => ({
        url: `${Project_URL}/getPostById/${id}`,
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("token") as string
          )}`,
        },
      }),
    }),

    getAllProject: builder.query({
      query: () => ({
        url: `${Project_URL}/getallPost`,
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("token") as string
          )}`,
        },
      }),
    }),

    updateProject: builder.mutation({
      query: ({ ...body }) => ({
        method: "PUT",
        body: body,
        url: `${Project_URL}/updateJobPost`,
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("token") as string
          )}`,
        },
      }),
    }),

    deleteProject: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        url: `${Project_URL}/deletePost/${id}`,
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
  useDeleteProjectMutation,
  useGetAllProjectQuery,
  useGetProjectByIdQuery,
  useUpdateProjectMutation,
} = ProjectApi;
