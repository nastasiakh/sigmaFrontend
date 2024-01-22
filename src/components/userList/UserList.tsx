import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector,} from 'react-redux';
import {deleteUser, fetchUsers, updateUser} from '../../store/actions/user.action';
import {User} from "../../models/user";
import {UserState} from "../../store/reducers/user.reducer";

const UserList = () => {
    const {users, error, user} = useSelector((state: UserState) => state)
    const [isUpdateUser, setIsUpdateUser] = useState<boolean>(false);
    const [selectedUserId, setSelectedUserId] = useState<number>();
    const [updatedUser, setUser] = useState<User>({
        firstName: '',
        lastName: '',
        email: '',
    });
    const dispatch = useDispatch();

    const updateUserValue = (field: string, value: string) => {
        setUser((prevState) => {
            return { ...prevState, [field]: value };
        });
    }
    const handleSubmit = (e: any, userId: number|undefined, user: User) => {
        e.preventDefault()
        if(userId){
            dispatch(updateUser(userId, user));
        }
        setUser({
            firstName: '',
            lastName: '',
            email: '',
        });
    };
    const handleDelete = (userId: number | undefined) => {
        if (userId) {
            dispatch(deleteUser(userId));
        }
    };
    const handleEdit = (user: User) => {
        if(user.id){
            setSelectedUserId(user.id)
            setIsUpdateUser(true)
        }
        setUser({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        });
    };

    useEffect(() => {
        const loadUsers = async () => {
            // @ts-ignore
            await dispatch(fetchUsers());
        };
        loadUsers();
    }, [dispatch]);
    return (
        <div>
            <h2>User List</h2>
            {users && users.length && users.map((user: User) => (
                <ul>
                    <li key={user.id}>
                        {user.firstName} {user.firstName}
                        <button onClick={() => handleDelete(user.id)}>Delete</button>
                        <button onClick={() => handleEdit(user)}>Edit</button>
                    </li>
                    { isUpdateUser && user.id === selectedUserId && (
                        <form onSubmit={(e) => handleSubmit(e, selectedUserId, updatedUser)}>
                            <label style={{display: "block", marginBottom: "10px"}}>
                                First Name:
                                <input
                                    type="text"
                                    value={updatedUser.firstName}
                                    onChange={(e) => updateUserValue("firstName", e.target.value)}
                                />
                            </label>
                            <label style={{display: "block"}}>
                                Last Name:
                                <input
                                    type="text"
                                    value={updatedUser.lastName}
                                    onChange={(e) => updateUserValue("lastName", e.target.value)}
                                />
                            </label>
                            <label style={{display: "block"}}>
                                Email:
                                <input
                                    type="email"
                                    value={updatedUser.email}
                                    onChange={(e) => updateUserValue("email", e.target.value)}
                                />
                            </label>

                            <button type="submit">Save Changes</button>
                        </form>
                    )}
                </ul>
            ))}

        </div>
    )
};

export default UserList;
