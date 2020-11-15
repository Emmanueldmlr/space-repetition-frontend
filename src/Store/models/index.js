import todoModel from './todoModel'
import authModel from './authModel'
import cardModel from './cardModel'
import { createStore } from 'easy-peasy'

const storeModel = {
    todo: todoModel,
    auth : authModel,
    card : cardModel,
};

const store = createStore(storeModel);
export default store;