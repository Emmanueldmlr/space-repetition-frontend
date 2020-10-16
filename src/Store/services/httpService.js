import axios from "axios";
import { baseUrl,item} from "../configs/index";

class HttpService {
  postData = async (item, url) => {
    return axios({
      method: "post",
      url: baseUrl + url,
      data: item,
    })
      .then((res) => res)
      .catch((error) => error.response.data);
  };

  getData = async (url) => {
    const AuthStr = 'Bearer '.concat(localStorage.getItem(item)); 
    return axios.get(baseUrl + url, { headers: { Authorization: AuthStr } })
    .then((res) => res)
    .catch((error) => error.response.data);
  };
}
export default HttpService;