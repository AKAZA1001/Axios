

import React, { useState, useEffect } from "react";
import { getUsers, addUser, editUser, deleteUser } from "../api";
import "./User.css"; 

function User() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: "",
    username: "",
    email: "",
  });
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    getUsers().then((data) => setUsers(data));
  }, []);

  const handleAddUser = () => {
    addUser(newUser).then((user) => {
      setUsers([...users, user]);
      setNewUser({ name: "", username: "", email: "" });
    });
  };

  const handleEditUser = () => {
    if (!editingUser) return;

    editUser(editingUser).then((user) => {
      const updatedUsers = users.map((u) => (u.id === user.id ? user : u));
      setUsers(updatedUsers);
      setEditingUser(null);
    });
  };

  const handleDeleteUser = (userId) => {
    deleteUser(userId).then((deletedId) => {
      const updatedUsers = users.filter((u) => u.id !== deletedId);
      setUsers(updatedUsers);
    });
  };

  return (
    <div className="user-container">
      <h1>User CRUD App</h1>

      <h2>Add User</h2>
      <div className="user-form">
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Username"
          value={newUser.username}
          onChange={(e) =>
            setNewUser({ ...newUser, username: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <button onClick={handleAddUser}>Add</button>
      </div>

      <h2>Edit User</h2>
      {editingUser && (
        <div className="user-form">
          <input
            type="text"
            placeholder="Name"
            value={editingUser.name}
            onChange={(e) =>
              setEditingUser({ ...editingUser, name: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Username"
            value={editingUser.username}
            onChange={(e) =>
              setEditingUser({ ...editingUser, username: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Email"
            value={editingUser.email}
            onChange={(e) =>
              setEditingUser({ ...editingUser, email: e.target.value })
            }
          />
          <button onClick={handleEditUser}>Save</button>
        </div>
      )}

      <h2>User List</h2>
      <ul className="user-list">
        {users.map((user) => (
          <li key={user.id} className="user-item">
            <div>
              {user.name} ({user.username})
            </div>
            <div>
              <button onClick={() => setEditingUser(user)}>Edit</button>
              <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default User;
