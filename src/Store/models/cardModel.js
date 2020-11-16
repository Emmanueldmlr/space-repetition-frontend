import { action, debug, thunk } from "easy-peasy";
import {FetchCardService, UpdateTodoService, DeleteTodoService, CreateCardService
} from '../services/cardService'
import {item,sessionItem} from '../configs/index'

const cardModel = {
    cards: [],
    isLoading: false,
    requestResponse:null,

    fetchCards: thunk((Actions, nill,helpers) => {
        const authActions = helpers.getStoreActions(Action => Action)
        Actions.toggleIsLoading();
        FetchCardService()
          .then((data) => {
            if(data.status === 200){
                Actions.addCard(data.data.cards)
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

    createCard: thunk((Actions, history = null ,helpers) => {
        Actions.toggleIsLoading();
        const authActions = helpers.getStoreActions(Action => Action)
        CreateCardService()
          .then((data) => {
            if(data.status === 200){
                const result = data.data.card
                const payload = {
                    uuid: result.uuid,
                    title: result.title,
                    body:  result.body,
                    tags:  result.tags,
                    status: false
                }
                Actions.addCard([payload])
                history.history.push({
                    pathname: '/create-card/'.concat(result.uuid),
                    state: {
                        data: payload,
                    },
                })
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
        console.log(state.cards)
    })
}

export default cardModel;