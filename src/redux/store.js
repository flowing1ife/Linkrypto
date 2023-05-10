import { createStore, applyMiddleware } from "redux";
import WalletReducer from "../redux/reducers/WalletReducer";
import thunk from "redux-thunk";

const store = createStore(WalletReducer, applyMiddleware(thunk));
export default store;