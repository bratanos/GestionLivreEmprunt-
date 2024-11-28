import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UserListPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);
  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:8080/api/users/delete/${userId}`);
      alert('User deleted successfully!');
      
      // Refresh the user list after deletion
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (error) {
      alert('Error deleting user');
      console.error(error);
    }
  };

  const fetchUsers = async () => {
    try {
      // Assuming your backend returns a simplified list of users (UserDTO)
      const response = await axios.get('http://localhost:8080/api/users');
      setUsers(response.data); // response.data is now an array of UserDTO objects
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>User List</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Username</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.role}</td>
                <td>
                  {/* Add your action buttons (modify, delete, etc.) here */}
                  <Link to={`/admin/users/modify/${user.id}`} className="btn btn-info">
                    Modify
                  </Link>
                  <button className="btn btn-danger" onClick={() => deleteUser(user.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No users found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserListPage;
