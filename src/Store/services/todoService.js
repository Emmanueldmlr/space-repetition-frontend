import HttpService from './httpService'

export const FetchTodoService = () => {
  const http = new HttpService();
  const fetchUrl = "todos";
  return http.getData( fetchUrl)
        .then((data) => data)
        .catch((error) => error);
};
