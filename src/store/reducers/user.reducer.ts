import {User} from "../../models/user";

export type UserState = {
    users: User[];
    user: User | null;
};

const initialState: UserState = {
    users: [],
    user: null
};

export type UserAction =
    | { type: 'FETCH_USERS'; payload: User[] }
    | { type: 'FETCH_USERS_FAILURE'; payload: string }
    | { type: 'FETCH_USER_BY_ID'; payload: User }
    | { type: 'FETCH_USER_BY_ID_FAILURE'; payload: string }
    | { type: 'ADD_USER'; payload: User }
    | { type: 'ADD_USER_FAILURE'; payload: string }
    | { type: 'UPDATE_USER'; payload: User }
    | { type: 'UPDATE_USER_FAILURE'; payload: string }
    | { type: 'DELETE_USER'; payload: number }
    | { type: 'DELETE_USER_FAILURE'; payload: string };


const userReducer = (state = initialState, action: UserAction) => {

    switch (action.type) {

        case 'FETCH_USERS':
            return {...state, users: action.payload};
        case 'FETCH_USERS_FAILURE':
            return {...state, users: []};

        case 'FETCH_USER_BY_ID':
            return {...state, user: action.payload};
        case 'FETCH_USER_BY_ID_FAILURE':
            return {...state, user: null};

        case 'ADD_USER':
            if (!state.users) {
                state.users = []
            }
            return {...state, users: [...state.users, action.payload]};
        case 'ADD_USER_FAILURE':
            return {...state, error: action.payload};

        case 'UPDATE_USER':
            const updatedUsers = state.users.map((user) => {
                return user.id === action.payload.id ? action.payload : user
            });
            return {...state, users: updatedUsers, error: null};
        case 'UPDATE_USER_FAILURE':
            return {...state, error: action.payload};

        case "DELETE_USER":
            return {...state, users: state.users.filter((user) => user.id !== action.payload)}
        case "DELETE_USER_FAILURE":
            return {...state, error: action.payload};

        default:
            return state;
    }
};

export default userReducer;

