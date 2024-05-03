import axios from "axios";

const authApi = "https://dhandamela-server.vercel.app/auth/";

class AuthApi {
  register(userDetails) {
    return axios.post(authApi + "register", userDetails);
  }
  login(userDetails) {
    return axios.post(authApi + "login", userDetails);
  }
}

export default new AuthApi();
