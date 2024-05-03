import axios from "axios";
const File_Url = "https://dhandamela-server.vercel.app/upload";

class Fileapi {
  uploadDocs(file) {
    return axios.post(File_Url + "/document/", file);
  }
}

export default new Fileapi();
