import { useState, useEffect } from 'react';
import axios from 'axios';

const BorrowedBooksPage = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  useEffect(() => {
    fetchBorrowedBooks();
  }, []);

  const fetchBorrowedBooks = async () => {
    try {
      const userId = localStorage.getItem('userId'); // Assuming userId is stored in localStorage
      const response = await axios.get(`http://localhost:8080/api/users/${userId}/borrowed-books`);
      setBorrowedBooks(response.data);
    } catch (error) {
      console.error("Error fetching borrowed books:", error);
    }
  };

  const returnBook = async (bookId) => {
    try {
      await axios.put(`http://localhost:8080/api/books/return/${bookId}`);
      alert('Book returned successfully!');
      fetchBorrowedBooks();  // Refresh the list after returning the book
    } catch (error) {
      alert('Error returning the book');
      console.error(error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>My Borrowed Books</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {borrowedBooks.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>
                <button className="btn btn-warning" onClick={() => returnBook(book.id)}>Return Book</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BorrowedBooksPage;
