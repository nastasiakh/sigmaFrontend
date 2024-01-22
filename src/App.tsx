import React from 'react';
import './App.css';
import EntityForm from "./components/userForm/EntityForm";
import UserList from "./components/userList/UserList";

function App() {
  return (
   <div>
       <UserList/>
       <EntityForm />
   </div>
  );
}

export default App;
