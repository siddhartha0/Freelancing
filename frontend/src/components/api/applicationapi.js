import axios from "axios";

const appUrl = "http://localhost:3333/application";
class applicationapi {
  sendapplication(file) {
    return axios.post(appUrl + "/sendCv", file);
  }

  getapplication() {
    return axios.get(appUrl + "/showapplication");
  }

  rejectapplication(id) {
    return axios.delete(appUrl + "/rejectapplication/" + id);
  }

  getMyapplication(id) {
    return axios.get(appUrl + "/myapplication/" + id);
  }
}

export default new applicationapi();
