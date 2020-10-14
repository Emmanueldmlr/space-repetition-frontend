import HttpService from './httpService'

export const RegisterService = (credentials) => {
  const http = new HttpService();
  const signUpUrl = "register";
  return http.postData(credentials, signUpUrl)
        .then((data) => data)
        .catch((error) => error);
};

export const LoginService = (credentials) => {
  const http = new HttpService();
  const loginUrl = "login";
  return http
    .postData(credentials, loginUrl)
    .then((data) => data)
    .catch((error) => error);
};