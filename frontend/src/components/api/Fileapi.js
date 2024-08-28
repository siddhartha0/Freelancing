import axios from "axios";
const File_Url = "http://localhost:3333/upload";

class Fileapi {
  uploadDocs(file) {
    return axios.post(File_Url + "/document/", file);
  }
  uploadTasks(file) {
    return axios.post(File_Url + "/task/", file);
  }
  uploadCompletedTask(file) {
    return axios.post(File_Url + "/completedTask/", file);
  }
}
export default new Fileapi();
