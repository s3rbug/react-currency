import { createStore, combineReducers, applyMiddleware } from "redux";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import currency from "./reducers/currency";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from '@redux-devtools/extension';

const rootReducer = combineReducers({ currency: currency });
type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;
export const useTypedSelector: TypedUseSelectorHook<AppStateType> = useSelector;

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
);
export default store;
