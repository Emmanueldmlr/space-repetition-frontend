import { action, thunk } from "easy-peasy";
import {FetchTodoService, 
} from '../services/todoService'
import {item,sessionItem} from '../configs/index'
const todoModel = {
    todos:[],
    isLoading: false,
    requestResponse:"",

    fetchTodos: thunk((Actions, nill,helpers) => {
        const authActions = helpers.getStoreActions(Action => Action)
        Actions.toggleIsLoading();
        FetchTodoService()
          .then((data) => {
            if(data.status === 200){
                Actions.fetchSuccess(data.data.todos)
                Actions.toggleIsLoading(); 
            }
            if(data.status === 401){
                localStorage.removeItem(item)
                sessionStorage.removeItem(sessionItem)
                authActions.auth.logout()
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

    fetchSuccess: action((state, payload)=> {
        state.todos = payload;
    }),

}

export default todoModel;