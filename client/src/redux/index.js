import {combineReducers} from "redux";
import {createStore, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import products from "./ducks/products";
import basket from "./ducks/basket";
import user from "./ducks/user";

/**
 * combineReducers собирает rootReducer
 */
export default createStore(
    combineReducers({
        products,
        basket,
        user
    }),
    {},
    composeWithDevTools(applyMiddleware(thunk))
);