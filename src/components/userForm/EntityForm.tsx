import React, { useState } from 'react';
import {useDispatch} from "react-redux";
import {addUser} from "../../store/actions/user.action";
import {User} from "../../models/user";

const EntityForm = () => {
    const dispatch = useDispatch();
    const [user, setUser] = useState<User>({
        firstName: '',
        lastName: '',
        email: '',
    });

    const updateUser = (field: string, value: string) => {
        setUser((prevState) => {
            return { ...prevState, [field]: value };
        });
    }
    const handleSubmit = (e: any, user: User) => {
        e.preventDefault()
        dispatch(addUser(user));
        setUser({
            firstName: '',
            lastName: '',
            email: '',
        });
    };

    return (
        <div>
            <h2>Add New User</h2>
            <form onSubmit={(e) => handleSubmit(e, user)}>
                <label style={{display: "block"}}>
                    First Name:
                    <input
                        type="text"
                        value={user.firstName}
                        onChange={(e) => updateUser("firstName", e.target.value)}
                    />
                </label>
                <label style={{display: "block"}}>
                    Last Name:
                    <input
                        type="text"
                        value={user.lastName}
                        onChange={(e) => updateUser("lastName", e.target.value)}
                    />
                </label>
                <label style={{display: "block"}}>
                    Email:
                    <input
                        type="email"
                        value={user.email}
                        onChange={(e) => updateUser("email", e.target.value)}
                    />
                </label>

                <button type="submit">Add User</button>
            </form>
        </div>
    );
};
export default EntityForm;
