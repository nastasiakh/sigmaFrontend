import React, {useEffect, useState} from 'react';
import {useSelector,} from 'react-redux';
import {deleteUser, fetchUsers, updateUser,} from '../../store/actions/user.action';
import {User} from "../../models/user";
import {UsersSelector} from "../../store/selectors/user.selector";
import {useAppDispatch} from "../../store/store";
import {Button} from "react-bootstrap";

const UserList = () => {
    const users = useSelector(UsersSelector);
    const dispatch = useAppDispatch()

    const [isUpdateUser, setIsUpdateUser] = useState<boolean>(false);
    const [selectedUserId, setSelectedUserId] = useState<number>();
    const [updatedUser, setUser] = useState<User>({
        firstName: '',
        lastName: '',
        email: '',
    });
    const [validationErrors, setValidationErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
    });
    const [isSaveDisabled, setIsSaveDisabled] = useState(false);

    const updateUserValue = (field: string, value: string) => {
        setUser((prevState) => {
            return {...prevState, [field]: value};
        });
        if ((field === 'firstName' || field === 'lastName') && (value.length < 3 || value.length > 20)) {
            setValidationErrors((prevErrors) => ({
                ...prevErrors,
                [field]: 'Please enter between 3 and 20 characters.',
            }));
            setIsSaveDisabled(true);

        } else {
            setValidationErrors((prevErrors) => ({
                ...prevErrors,
                [field]: '',
            }));
            setIsSaveDisabled(false);
        }
    };

    const handleSubmit = (e: any, userId: number | undefined, user: User) => {
        e.preventDefault()
        if (
            !user.firstName ||
            !user.lastName ||
            !user.email ||
            validationErrors.firstName ||
            validationErrors.lastName
        ) {
            console.error("Please fill in all fields correctly.");
            return;
        }
        if (userId) {
            dispatch(updateUser(userId, user));
        }
        setUser({
            firstName: '',
            lastName: '',
            email: '',
        });
        setIsUpdateUser(false)
        setIsSaveDisabled(false);

    };

    const handleDelete = (userId: number | undefined) => {
        if (userId) {
            dispatch(deleteUser(userId));
        }
    };

    const handleEdit = (user: User) => {
        if (user.id) {
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
        dispatch(fetchUsers());
    }, []);

    return (
        <div className={"d-flex flex-column col-5 py-4"}>
            <h2>User List</h2>
            <ol>
                {Array.isArray(users) && users.length && users.map((user: User) => (

                    <li key={user.id}>
                        <div className={"d-flex flex-column mb-2"}>
                            <span>Name: {user.firstName}</span>
                            <span>Lastname: {user.lastName}</span>
                            <span>Email: {user.email}</span>
                        </div>
                        <div className={"d-flex mb-2 col-4 justify-content-between"}>
                            <Button variant={"outline-danger"} onClick={() => handleDelete(user.id)}>Delete</Button>
                            <Button variant={"outline-secondary"} onClick={() => handleEdit(user)}>Edit</Button>
                        </div>

                        {isUpdateUser && user.id === selectedUserId && (
                            <form onSubmit={(e) => handleSubmit(e, selectedUserId, updatedUser)}>
                                <label className={"d-block mb-2"}>
                                    First Name:
                                    <input
                                        className={`input-group ${validationErrors.firstName ? 'is-invalid' : ''}`}
                                        type="text"
                                        value={updatedUser.firstName}
                                        onChange={(e) => updateUserValue("firstName", e.target.value)}
                                    />
                                    {validationErrors.firstName && (
                                        <div className="invalid-feedback">{validationErrors.firstName}</div>
                                    )}
                                </label>
                                <label className={"d-block mb-2"}>
                                    Last Name:
                                    <input
                                        className={`input-group ${validationErrors.lastName ? 'is-invalid' : ''}`}
                                        type="text"
                                        value={updatedUser.lastName}
                                        onChange={(e) => updateUserValue("lastName", e.target.value)}
                                    />
                                    {validationErrors.lastName && (
                                        <div className="invalid-feedback">{validationErrors.lastName}</div>
                                    )}
                                </label>
                                <label className={"d-block mb-2"}>
                                    Email:
                                    <input
                                        className={"input-group"}
                                        type="email"
                                        value={updatedUser.email}
                                        onChange={(e) => updateUserValue("email", e.target.value)}
                                    />
                                </label>
                                <div  className={"d-flex w-100 justify-content-between align-items-baseline"} >
                                    <Button type="submit" variant={"primary"} disabled={isSaveDisabled}>Save Changes</Button>
                                    <Button variant={"light"} onClick={() => setIsUpdateUser(false)}>Cancel</Button>
                                </div>

                            </form>
                        )}
                    </li>
                ))}
            </ol>
        </div>
    )
};

export default UserList;
