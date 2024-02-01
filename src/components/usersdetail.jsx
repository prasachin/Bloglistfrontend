import { useState, useEffect } from "react";
import blogService from "../services/blogs";

const Users = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    blogService.getallusers().then((users) => setUsers(users));
  }, []);

  return (
    <div>
      <h1>Users of this App</h1>
      {users.map((user) => (
        <p key={user.id}>
          {user.name} created {user.blogs.length} blogs.
        </p>
      ))}
    </div>
  );
};
export default Users;
