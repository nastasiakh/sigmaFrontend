import UserList from "../userList/UserList";
import EntityForm from "../userForm/EntityForm";

const FullCrud = () => {
  return (
      <div className={"d-flex container justify-content-between align-items-baseline"}>
          <UserList/>
          <EntityForm/>
      </div>
  )
}

export default FullCrud;