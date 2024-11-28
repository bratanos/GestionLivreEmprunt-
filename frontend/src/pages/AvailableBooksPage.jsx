import { useState, useEffect } from 'react';
import axios from 'axios';

const AvailableBooksPage = () => {
  const [books, setBooks] = useState([]);



  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/books/all');
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const borrowBook = async (bookId) => {
    try {

      const userId = localStorage.getItem('userId');
      if (!userId) {
        alert("User ID not found. Please log in again.");
        return;
      }
                                                            // Assuming userId is stored in localStorage
      const response = await axios.put(`http://localhost:8080/api/books/borrow/${bookId}?userId=${userId}`);
      alert('Book borrowed successfully!');
      fetchBooks();  // Refresh the book list after borrowing
    } catch (error) {
      alert('Error borrowing the book');
      console.error(error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Available Books</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.borrowed ? 'Not Available' : 'Available'}</td>
              <td>
                {!book.borrowed && (
                  <button className="btn btn-success" onClick={() => borrowBook(book.id)}>Borrow</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AvailableBooksPage;
