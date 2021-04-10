import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import currency from "./reducers/currency";
import thunkMiddleware from "redux-thunk";

const rootReducer = combineReducers({ currency: currency });
type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;
export const useTypedSelector: TypedUseSelectorHook<AppStateType> = useSelector;

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // required for Redux extension

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunkMiddleware))
);
export default store;
