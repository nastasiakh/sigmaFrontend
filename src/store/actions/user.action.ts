import {getAll, create, deleteOne, updateOne, getOne} from "../service/userService";
import { User } from "../../models/user";
import {ADD_USER, DELETE_USER, FETCH_USER_BY_ID, FETCH_USERS, UPDATE_USER} from "./types";

export const fetchUsers = () => async (dispatch: any) => {
    try {
        const res = await getAll();

        dispatch({
            type: FETCH_USERS,
            payload: res.data
        });
    } catch (err) {
        console.log(err)
    }
};

export const fetchUser = (userId: number) => async (dispatch: any)=> {
    try {
        const res = await getOne(userId);

        dispatch({
            type: FETCH_USER_BY_ID,
            payload: res.data
        });
    } catch (err) {
        console.log(err)
    }
}

export const addUser = (user: User) => async (dispatch: any) => {
    try {
        const res = await create(user);

        dispatch({
            type: ADD_USER,
            payload: res.data
        });
        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const updateUser = (userId: number, user: User) => async (dispatch: any)=> {
    try {
        const res = await updateOne(userId, user);

        dispatch({
            type: UPDATE_USER,
            payload: res.data
        })
        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const deleteUser = (userId: number) => async (dispatch: any)=> {
    try {
        const res = await deleteOne(userId);

        dispatch({
            type: DELETE_USER,
            payload: userId
        })
    } catch (err) {
        console.log(err);
    }
};
