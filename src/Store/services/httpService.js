import axios from "axios";
import { baseUrl,item} from "../configs/index";

class HttpService {

  postData = async (payload,url) => {
    const AuthStr = 'Bearer '.concat(localStorage.getItem(item)); 
    return axios.post(baseUrl + url, payload, { headers: { Authorization: AuthStr } })
    .then((res) => res)
    .catch((error) => error.response.data);
  };

  getData = async (url) => {
    const AuthStr = 'Bearer '.concat(localStorage.getItem(item)); 
    return axios.get(baseUrl + url, { headers: { Authorization: AuthStr } })
    .then((res) => res)
    .catch((error) => error.response.data);
  };

  putData = async (url,formData) => {
    const AuthStr = 'Bearer '.concat(localStorage.getItem(item)); 
    return axios.put(baseUrl + url, formData, { headers: { Authorization: AuthStr } })
    .then((res) => res)
    .catch((error) => error.response.data);
  };

  deleteData = async (url) => {
    const AuthStr = 'Bearer '.concat(localStorage.getItem(item)); 
    return axios.delete(baseUrl + url, { headers: { Authorization: AuthStr } })
    .then((res) => res)
    .catch((error) => error.response.data);
  };
}
export default HttpService;