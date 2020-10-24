import todoModel from './todoModel'
import authModel from './authModel'
import { createStore } from 'easy-peasy'

const storeModel = {
    todo: todoModel,
    auth : authModel
};

const store = createStore(storeModel);
export default store;