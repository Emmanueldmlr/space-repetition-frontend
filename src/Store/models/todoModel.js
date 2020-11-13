import { action, debug, thunk } from "easy-peasy";
import {FetchTodoService, UpdateTodoService, DeleteTodoService, CreateTodoService
} from '../services/todoService'
import {item,sessionItem} from '../configs/index'
const todoModel = {
    todos:[],
    cards: [

        {   
            uuid: '2hwkhwiu27862722',
            title: "Learn Hooksjifodioddiodio",
            body: "Hooks are used in a functional components and work just like the life cycle methods in a class component",
            tags: [ 'React', 'Hooks'],
        },

        {
            uuid: 'jkhjkd82789299823',
            title: "Learn jkfjjfdjkdfdPHP intejkkd",
            body: "Hooks are used in a functional components and work just like the life cycle methods in a class component",
            tags: [ 'React', 'PHP'],
        }

    ],
    isLoading: false,
    requestResponse:null,

    fetchTodos: thunk((Actions, nill,helpers) => {
        const authActions = helpers.getStoreActions(Action => Action)
        Actions.toggleIsLoading();
        FetchTodoService()
          .then((data) => {
            if(data.status === 200){
                Actions.fetchSuccess(data.data.todos)
                Actions.toggleIsLoading(); 
                return
            }
            else if(data.status === 401){
                localStorage.removeItem(item)
                sessionStorage.removeItem(sessionItem)
                authActions.auth.logout()
                return
            }
            else{
                const payload = {
                type: "error",
                msg: data.error,
                };
                Actions.updateRequestResponse(payload);
                Actions.toggleIsLoading(); 
            }
          })
      }),

    updateTodos: thunk((Actions, payload,helpers) => {
        const authActions = helpers.getStoreActions(Action => Action)
        Actions.toggleIsLoading();
        UpdateTodoService(payload)
          .then((data) => {
            if(data.status === 200){
                Actions.fetchSuccess(data.data.todo)
                Actions.toggleIsLoading(); 
                return
            }
            else if(data.status === 401){
                localStorage.removeItem(item)
                sessionStorage.removeItem(sessionItem)
                authActions.auth.logout()
                return
            }
            else{
                const payload = {
                type: "error",
                msg: data.error,
                };
                Actions.updateRequestResponse(payload);
                Actions.toggleIsLoading(); 
            }
          })
      }),

    deleteTodo: thunk((Actions, id,helpers) => {
        const authActions = helpers.getStoreActions(Action => Action)
        Actions.toggleIsLoading();
        DeleteTodoService(id)
          .then((data) => {
            if(data.status === 200){
                Actions.fetchSuccess(data.data.todo)
                Actions.toggleIsLoading(); 
            
            }
            else if(data.status === 401){
                localStorage.removeItem(item)
                sessionStorage.removeItem(sessionItem)
                authActions.auth.logout()
            
            }
            else{
                const payload = {
                type: "error",
                msg: data.error,
                };
                Actions.updateRequestResponse(payload);
                Actions.toggleIsLoading(); 
            }
          })
      }),

    addTodo: thunk((Actions, formData,helpers) => {
        Actions.toggleIsLoading();
        const authActions = helpers.getStoreActions(Action => Action)
        if(formData.title ===''){
            const payload = {
                type: "error",
                msg: "Title Field is Required",
            };
            Actions.updateRequestResponse(payload);
            Actions.toggleIsLoading();
            return
        }
        if(formData.subTodo.length < 1){
            const payload = {
                type: "error",
                msg: "You need at Least One Todo to Submit Form",
            };
            Actions.updateRequestResponse(payload);
            Actions.toggleIsLoading();
            return
        }

        CreateTodoService(formData)
          .then((data) => {
            if(data.status === 200){
                Actions.fetchSuccess(data.data.todo)
                const payload = {
                    type: "success",
                    msg: data.data.message,
                };
                Actions.updateRequestResponse(payload);
                Actions.toggleIsLoading(); 
             
            }
            else if(data.status === 401){
                localStorage.removeItem(item)
                sessionStorage.removeItem(sessionItem)
                authActions.auth.logout()
               
            }
            else{
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

    fetchSuccess: action((state, payload)=> {
        state.todos = payload;
    }),

    addCard: action((state, payload)=>{
        state.cards = [...state.cards, ...payload];
    }),

    updateCardInput: action((state, payload) => {
        const index = state.cards.findIndex(card => card.uuid ===payload.load.uuid);
        const list =  [...state.cards]
        if(payload.name == 'title'){
            list[index][payload.name] = payload.load.title;
        } 
        else if( payload.name == 'body'){
            list[index][payload.name] = payload.load.body;
        }
        else{
            list[index][payload.name] = payload.load.tags;
        }
        state.cards = list
    })
}

export default todoModel;