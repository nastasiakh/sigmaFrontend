import React, {useState} from 'react';
import {addUser} from "../../store/actions/user.action";
import {User} from "../../models/user";
import {useAppDispatch} from "../../store/store";
import {Button} from "react-bootstrap";

const EntityForm = () => {
    const dispatch = useAppDispatch();

    const [user, setUser] = useState<User>({
        firstName: '',
        lastName: '',
        email: '',
    });
    const [validationErrors, setValidationErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
    });
    const [isSaveDisabled, setIsSaveDisabled] = useState(true);


    const updateUser = (field: string, value: string) => {
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

    const handleSubmit = (e: any, user: User) => {
        e.preventDefault()
        if (!user.firstName || !user.lastName || !user.email || validationErrors.firstName || validationErrors.lastName) {
            console.error('Please fill in all fields correctly.');
            return;
        }
        dispatch(addUser(user));
        setUser({
            firstName: '',
            lastName: '',
            email: '',
        });
        setIsSaveDisabled(true);
    };

    return (
        <div className={"d-flex flex-column col-4 py-4"}>
            <h2>Add New User</h2>
            <form onSubmit={(e) => handleSubmit(e, user)}>
                <label className={"d-block mb-2"}>
                    First Name:
                    <input
                        className={`input-group ${validationErrors.firstName ? 'is-invalid' : ''}`}
                        type="text"
                        value={user.firstName}
                        onChange={(e) => updateUser("firstName", e.target.value)}
                    />
                    {validationErrors.firstName && <div className='invalid-feedback'>{validationErrors.firstName}</div>}
                </label>
                <label className={"d-block mb-2"}>
                    Last Name:
                    <input
                        className={`input-group ${validationErrors.lastName ? 'is-invalid' : ''}`}
                        type="text"
                        value={user.lastName}
                        onChange={(e) => updateUser("lastName", e.target.value)}
                    />
                    {validationErrors.lastName && <div className='invalid-feedback'>{validationErrors.lastName}</div>}
                </label>
                <label className={"d-block mb-2"}>
                    Email:
                    <input
                        className={"input-group"}
                        type="email"
                        value={user.email}
                        onChange={(e) => updateUser("email", e.target.value)}
                    />
                </label>

                <Button type="submit" variant="primary" disabled={isSaveDisabled}>Add User</Button>
            </form>
        </div>
    );
};
export default EntityForm;
