import axios from "axios";

function DeleteUserButton({ userId, fetchUsers }) {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/users/${userId}`);
      alert("User deleted successfully!");
      fetchUsers(); // Refresh the user list after deletion
    } catch (error) {
      alert("Error deleting user");
      console.error(error);
    }
  };

  return (
    <button className="btn btn-danger" onClick={handleDelete}>
      Delete
    </button>
  );
}

export default DeleteUserButton;
