import axios from 'axios';
import {User} from "../../models/user";

const API_URL = 'http://127.0.0.1:8080';
const headers = {
    'Content-Type': 'application/json',
    "Access-Control-Allow-Credentials": "true",
    "Accept": "*/*"
}
const apiService = {

    getUsers:async (): Promise<User[]> => {
        const response = axios.get(`${API_URL}/users/`, {headers: headers});
        return response.then(response => response.data);
    },

    getUserById: async (userId: number): Promise<User> => {
        const response = axios.get(`${API_URL}/users/${userId}`, {headers: headers})
        return response.then(response => response.data)
    },

    addUser: async (user: User):Promise<User> => {
        try {
            const response = await axios.post<User>(`${API_URL}/users/`, user, {
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Credentials": "true",
                    "Accept": "*/*"
                }
            })
            return response.data;
        }
        catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    },

    updateUser: async (userId: number, updatedUser: User):Promise<User> => {
        try {
            const response = await axios.put(`${API_URL}/users/${userId}`, updatedUser, {headers: headers});
            return response.data;
        }
        catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    },

    deleteUser: async (userId: number):Promise<User> => {
        try{
            const response = await axios.delete(`${API_URL}/users/${userId}`,{headers: headers});
            return response.data;
        }
        catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    },
};

export default apiService;
