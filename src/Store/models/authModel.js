import { action, thunk } from "easy-peasy";
import {LoginService, RegisterService, 
        EmailConfirmationService, ResendEmailService,
        ForgotPasswordService, ChangePasswordService
} from '../services/authService'
import {item,sessionItem} from '../configs/index'

const authModel = {
  requestResponse: null,
  isLoading: false,
  isAuthed: true,

  login: thunk((Actions, loginData) => {
    Actions.toggleIsLoading();
    LoginService(loginData.data)
      .then((data) => {
        if (data.status) {
          localStorage.setItem(item,data.data.token)
          sessionStorage.setItem(sessionItem,JSON.stringify(data.data.user))
          const newPayload = {
            type: "success",
            msg: data.data.message,
          };
          Actions.updateRequestResponse(newPayload)
          Actions.loginSuccess()
          Actions.toggleIsLoading();  
          if(data.data.user.isVerified === 0){
            loginData.history.push("/account-verification") 
          }else{
            loginData.history.push("/") 
          }
                
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
  resendToken: thunk((Actions, token) => {
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
    ResendEmailService(token)
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
  forgotPassword: thunk((Actions, forgotData) => {
    Actions.toggleIsLoading();
    if (forgotData.data.email ===''){
        const payload = {
          type: "error",
          msg: "Email Field Must be Filled",
        };
        Actions.updateRequestResponse(payload);
        Actions.toggleIsLoading();
        return
    }
    ForgotPasswordService(forgotData.data)
    .then((data) =>{
        if (data.status) {
          console.log(data)
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

  changePassword: thunk((Actions, changePasswordData) => {
    Actions.toggleIsLoading();
    if (changePasswordData.data.password ==='' || changePasswordData.data.password !== changePasswordData.data.confirmPassword || changePasswordData.data.token ===''){
        const payload = {
          type: "error",
          msg: "Kindly Ensure all Fields are Correctly Filled",
        };
        Actions.updateRequestResponse(payload);
        Actions.toggleIsLoading();
        return
    }
    ChangePasswordService(changePasswordData.data)
    .then((data) =>{
        if (data.status) {
          const payload = {
            type: "success",
            msg: data.data.message,
          };
          Actions.updateRequestResponse(payload);
          Actions.toggleIsLoading();
          changePasswordData.history.push('/login')
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

  loginSuccess: action((state)=> {
      state.isAuthed = true;
  })
};

export default authModel