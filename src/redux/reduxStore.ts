import { createStore, combineReducers } from "redux";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import currency from "./reducers/currency";

const rootReducer = combineReducers({ currency: currency });
type RootReducerType = typeof rootReducer;
type AppStateType = ReturnType<RootReducerType>;
export const useTypedSelector: TypedUseSelectorHook<AppStateType> = useSelector;

const store = createStore(rootReducer);
export default store;
