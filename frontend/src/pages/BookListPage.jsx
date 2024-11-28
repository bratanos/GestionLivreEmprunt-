import { useEffect, useState } from "react";
import axios from "axios";
import AddBookForm from "./AddBookForm";
import DeleteBookButton from "./DeleteBookButton";
import UpdateBookForm from "./UpdateBookForm";

// BookListPage.jsx: Display books and modify them
const BookListPage = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  // Fetch books
  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/books/all");
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books", error);
    }
  };
  const deleteBook = async (bookId) => {
    try {
      await axios.delete(`http://localhost:8080/api/books/delete/${bookId}`);
      alert('Book deleted successfully!');
      fetchBooks();  // Refresh the book list after deletion
    } catch (error) {
      alert('Error deleting book');
      console.error(error);
    }
  };

  return (
    <div className="container mt-5">
      <h3>Books List</h3>
      <AddBookForm fetchBooks={fetchBooks} />
      
      <table className="table table-striped mt-4">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>
                <button
                  className="btn btn-info"
                  onClick={() => setSelectedBook(book.id)} // Modify book
                >
                  Update
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteBook(book.id)}> delete
                  </button>
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Update Book Form */}
      {selectedBook && <UpdateBookForm bookId={selectedBook} fetchBooks={fetchBooks} />}
    </div>
  );
};

export default BookListPage;
