

import axios from "axios";

function DeleteBookButton({ bookId, onDelete }) {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/books/delete/${bookId}`);
      alert("Book deleted successfully!");
      onDelete(); // Refresh the book list after deletion
    } catch (error) {
      alert("Error deleting book");
      console.error(error);
    }
  };

  return (
    <button className="btn btn-danger" onClick={handleDelete}>
      Delete
    </button>
  );
}

export default DeleteBookButton;
