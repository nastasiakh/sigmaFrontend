import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <h2>Welcome to the Home Page!</h2>
            <p>Explore the following pages:</p>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/users">User List</Link>
                </li>
                <li>
                    <Link to="/createUser">Create User</Link>
                </li>
                <li>
                    <Link to="/crudInOnePage">CRUD in One Page</Link>
                </li>
            </ul>
        </div>
    );
};

export default Home;
