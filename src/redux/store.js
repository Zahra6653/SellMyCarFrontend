import { createStore, combineReducers } from "redux";
import UserReducers from "./User/UserReducers";

const rootReducer = combineReducers({
  user: UserReducers,
});

const store = createStore(rootReducer);

export default store;
