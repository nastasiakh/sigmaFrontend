import {configureStore} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";
import rootReducer from "./reducers";


const store = configureStore({
    reducer: rootReducer
});
type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch;
export default store;

