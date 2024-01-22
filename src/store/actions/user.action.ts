import userService from "../service/userService";
import { User } from "../../models/user";

export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USER_BY_ID_SUCCESS = 'FETCH_USER_BY_ID_SUCCESS';
export const ADD_USER_SUCCESS = 'ADD_USER_SUCCESS';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';

export const fetchUsers =  () => {
    return async (dispatch: any) => {
        try {
            const res = await userService.getUsers();
            dispatch({type: FETCH_USERS_SUCCESS, payload: res});
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }
};

export const fetchUserById = (userId: number) => {
    let res = userService.getUserById(userId)
    return {type: FETCH_USER_BY_ID_SUCCESS, payload: res}
}
export const addUser = (user: User) => {
    userService.addUser(user).then(r => r)
    return {type: ADD_USER_SUCCESS, payload: user};
}
export const updateUser = (userId: number, userData: User) => {
    userService.updateUser(userId, userData).then(r => r)
    return {type: UPDATE_USER_SUCCESS, payload: userData}
}

export const deleteUser = (userId: number) => {
    let res = userService.deleteUser(userId).then(r => r)
    return { type: DELETE_USER_SUCCESS, payload: res };

};
