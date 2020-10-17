import HttpService from './httpService'

export const FetchTodoService = () => {
  const http = new HttpService();
  const fetchUrl = "todos";
  return http.getData( fetchUrl)
        .then((data) => data)
        .catch((error) => error);
};
export const UpdateTodoService = (payload) => {
  const http = new HttpService();
  const updateUrl = "todos/" + payload.id;
  return http.putData( updateUrl, payload.formData)
        .then((data) => data)
        .catch((error) => error);
};
export const DeleteTodoService = (id) => {
  const http = new HttpService();
  const deleteUrl = "todos/" + id;
  return http.deleteData( deleteUrl)
        .then((data) => data)
        .catch((error) => error);
};
export const CreateTodoService = (payload) => {
  const http = new HttpService();
  const createUrl = "todos";
  return http.postData(payload,createUrl)
    .then((data) => data)
    .catch((error) => error);
};

