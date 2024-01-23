import React from 'react';
import './App.css';
import UserList from "./components/userList/UserList";
import EntityForm from "./components/userForm/EntityForm";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import FullCrud from "./components/fullCrud/FullCrud";
import Home from "./components/home/Home";

function App() {
    return (
        <div className={"container py-4"}>
            <Router>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/users" element={<UserList/>}/>
                    <Route path="/createUser" element={<EntityForm/>}/>
                    <Route path="/crudInOnePage" element={<FullCrud/>}/>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
