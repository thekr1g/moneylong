import {combineReducers, createStore} from 'redux';
import userReducer from './userReducer';
import accountReducer from './accountReducer';
import accountTypeReducer from './accountTypeReducer';

let reducers = combineReducers({
  user: userReducer,
  account: accountReducer,
  accountType : accountTypeReducer
})

let store = createStore(reducers)

export default store