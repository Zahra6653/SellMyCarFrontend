import { createStore, combineReducers } from "redux";
import UserReducers from "./User/UserReducers";
import InventoryReducers from "./InventoryCars/InventoryReducers";


const rootReducer = combineReducers({
  user: UserReducers,
  inventoryCars:InventoryReducers,
  searchCars:InventoryReducers
});

const store = createStore(rootReducer);

export default store;
