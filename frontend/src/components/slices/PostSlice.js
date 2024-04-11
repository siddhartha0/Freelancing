import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Jobapi from "../api/Jobapi";

export const fetchJobs = createAsyncThunk("job", async () => {
  try {
    const response = await Jobapi.fetchJobs();
    return response.data.JobPost;
  } catch (error) {
    return error;
  }
});

export const updateJob = createAsyncThunk("updateJob", async (data) => {
  try {
    const response = await Jobapi.updateJobDetails(data);
    return response.data.details;
  } catch (error) {
    return error;
  }
});

const JobSlice = createSlice({
  name: "Job",
  initialState: {
    jobs: [],
    loading: false,
    error: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading = false;

        state.jobs = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.jobs = [];
        state.error = true;
      })

      .addCase(updateJob.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateJob.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
      })
      .addCase(updateJob.rejected, (state, action) => {});
  },
});

export const getJobsPost = (state) => state.Job;

export default JobSlice.reducer;
