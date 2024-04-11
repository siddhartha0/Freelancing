import axios from "axios";

const Base_api = "http://localhost:3333/job/";

class Jobapi {
  postJob(jobDetails) {
    return axios.post(Base_api + "postJob", jobDetails);
  }
  fetchJobs() {
    return axios.get(Base_api + "getallPost");
  }

  searchingJob(searchText) {
    return axios.get(Base_api + "getPostById/" + searchText);
  }
  updateJobDetails(jobDetails) {
    return axios.put(Base_api + "updateJobPost", jobDetails);
  }
  deleteJobDetails(jobDetails) {
    return axios.delete(Base_api + "deletePost", jobDetails);
  }
}

export default new Jobapi();
