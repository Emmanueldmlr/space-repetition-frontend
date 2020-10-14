import { action, thunk } from "easy-peasy";
import {LoginService, RegisterService, EmailConfirmationService} from '../services/authService'
import {item} from '../configs/index'

const authModel = {
  user: null,
  requestResponse: null,
  isLoading: false,
  isAuthed: true,

  login: thunk((Actions, loginData) => {
    Actions.toggleIsLoading();
    LoginService(loginData.data)
      .then((data) => {
        if (data.status) {
          localStorage.setItem(item,data.data.token)
          const newPayload = {
            type: "success",
            msg: data.data.message,
          };
          Actions.updateRequestResponse(newPayload)
          Actions.loginSuccess(data)
          Actions.toggleIsLoading();  
          console.log("its here") 
          loginData.history.push("/") 
           
        }
         else {
            const payload = {
                type: 'error',
                msg:data.error
            }
            Actions.updateRequestResponse(payload);
            Actions.toggleIsLoading();
        }
      })
  }),

  register: thunk((Actions, registerData) => {
    Actions.toggleIsLoading();
    if (registerData.data.password !== registerData.data.confirmPassword) {
        const payload = {
          type: "error",
          msg: "Passwords do not match",
        };
        Actions.updateRequestResponse(payload);
        Actions.toggleIsLoading();
        return
    }
    RegisterService(registerData.data)
    .then((data) =>{
        if (data.status) {
          const payload = {
            type: "success",
            msg: data.data.message,
          };
          Actions.updateRequestResponse(payload);
          Actions.toggleIsLoading();
          registerData.history.push("/registration-success-notification");
        }
         else {
          const payload = {
            type: "error",
            msg: data.error,
          };
          Actions.updateRequestResponse(payload);
          Actions.toggleIsLoading();
        }
    })
  }),

  confirmEmail: thunk((Actions, token) => {
    Actions.toggleIsLoading();
    if (token ===''){
        const payload = {
          type: "error",
          msg: "Invalid Token",
        };
        Actions.updateRequestResponse(payload);
        Actions.toggleIsLoading();
        return
    }
    EmailConfirmationService(token)
    .then((data) =>{
        if (data.status) {
          const payload = {
            type: "success",
            msg: data.data.message,
          };
          Actions.updateRequestResponse(payload);
          Actions.toggleIsLoading();
        }
         else {
          const payload = {
            type: "error",
            msg: data.error,
          };
          Actions.updateRequestResponse(payload);
          Actions.toggleIsLoading();
        }
    })
  }),

  //actions
  toggleIsLoading: action((state) => {
    state.isLoading = !state.isLoading;
  }),

  updateRequestResponse: action((state, payload) => {
    state.requestResponse = payload;
  }),

  clearResponse: action((state) => {
    state.requestResponse = null;
  }),

  loginSuccess: action((state,payload)=> {
      state.user = payload.user;
      state.isAuthed = true;
  })
};

export default authModel