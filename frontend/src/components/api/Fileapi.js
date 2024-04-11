import axios from "axios";
const File_Url = "http://localhost:3333/upload";

class Fileapi {
  uploadDocs(file) {
    return axios.post(File_Url + "/document/", file);
  }
}

export default new Fileapi();
