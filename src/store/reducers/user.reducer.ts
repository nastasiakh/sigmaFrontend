import { User } from "../../models/user";


export type UserState = {
    users: User[];
    user: User | null;
    error: null | string;
};
const initialState: UserState = {
    users: [],
    user: null,
    error: null,
};

export type UserAction =
    | { type: 'FETCH_USERS_SUCCESS'; payload: User[] }
    | { type: 'FETCH_USERS_FAILURE'; payload: string }
    | { type: 'FETCH_USER_BY_ID_SUCCESS'; payload: User }
    | { type: 'FETCH_USER_BY_ID_FAILURE'; payload: string }
    | { type: 'ADD_USER_SUCCESS'; payload: User }
    | { type: 'ADD_USER_FAILURE'; payload: string }
    | { type: 'UPDATE_USER_SUCCESS'; payload: User }
    | { type: 'UPDATE_USER_FAILURE'; payload: string }
    | { type: 'DELETE_USER_SUCCESS'; payload: number }
    | { type: 'DELETE_USER_FAILURE'; payload: string };
const userReducer = (state = initialState, action: UserAction): UserState => {
    switch (action.type) {
        case 'FETCH_USERS_SUCCESS':
            return { ...state, users: action.payload, error: null };

        case 'FETCH_USERS_FAILURE':
            return { ...state, users: [], error: action.payload };

        case 'FETCH_USER_BY_ID_SUCCESS':
            return { ...state, user: action.payload, error: null };

        case 'ADD_USER_SUCCESS':
            return { ...state, users: [...state.users, action.payload], error: null };

        case 'ADD_USER_FAILURE':
            return { ...state, error: action.payload };

        case 'UPDATE_USER_SUCCESS':
            const updatedUsers = state.users.map((user) =>
                user.id === action.payload.id ? action.payload : user
            );
            return { ...state, users: updatedUsers, error: null };

        case 'UPDATE_USER_FAILURE':
            return { ...state, error: action.payload };

        case 'DELETE_USER_SUCCESS':
            return { ...state, users: state.users.filter((user) => user.id !== action.payload), error: null };

        case 'DELETE_USER_FAILURE':
            return { ...state, error: action.payload };

        default:
            return state;
    }
};

export default userReducer;

