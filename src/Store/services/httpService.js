import axios from "axios";
import { baseUrl, header } from "../configs/index";

const requestOption = header();
class HttpService {
  postData = async (item, url) => {
    return axios({
      method: "post",
      url: baseUrl + url,
      data: item,
      requestOption,
    })
      .then((res) => res)
      .catch((error) => error.response.data);
  };

  getData = async (url) => {
    return axios({
      method: "get",
      url: baseUrl + url,
      requestOption,
    })
      .then((res) => res)
      .catch((error) => error.response.data);
  };
}
export default HttpService;