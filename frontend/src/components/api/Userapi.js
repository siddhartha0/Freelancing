import axios from "axios";
const Base_api = "https://dhandamela-server.vercel.app/user";

class Userapi {
  getallUser() {
    return axios.get(Base_api + "/getall");
  }

  getById(id) {
    return axios.get(Base_api + "/getById/" + id);
  }

  update(id, newDetails) {
    return axios.put(Base_api + "/update/" + id, newDetails);
  }
}

export default new Userapi();
