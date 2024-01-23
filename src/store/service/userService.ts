import http from "../../apiInstance";
import {User} from "../../models/user";


export const getAll = () => {
    return http.get("/users/")
};

export const getOne = (userId: number) => {
    return http.get(`/users/${userId}`);
}

export const create = (user: User) => {
    return http.post("/users/", user);
};

export const updateOne = (userId: number, user: User) => {
    return http.put(`/users/${userId}`, user)
}

export const deleteOne = (userId: number) => {
    return http.delete(`/users/${userId}`);
}
