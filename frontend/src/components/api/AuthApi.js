import axios from "axios";

const authApi = "http://localhost:3333/auth/";

class AuthApi {
  register(userDetails) {
    return axios.post(authApi + "register", userDetails);
  }
  login(userDetails) {
    return axios.post(authApi + "login", userDetails);
  }
}

export default new AuthApi();
