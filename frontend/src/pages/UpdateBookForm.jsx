import  { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function UpdateBookForm({ bookId }) {
  const [book, setBook] = useState({
    title: "",
    author: "",
    borrowed: false,
  });
  const { id } = useParams();

  useEffect(() => {
    // Fetch book details for the given bookId
    axios
      .get(`http://localhost:8080/api/books/${bookId}`)
      .then((response) => {
        setBook(response.data);
      })
      .catch((error) => console.error("Error fetching book data", error));
  }, [bookId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8080/api/books/update/${bookId}`, book);
      alert("Book updated successfully!");
      console.log(response.data);
    } catch (error) {
      alert("Error updating book");
      console.error(error);
    }
  };


  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Update Book</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              id="title"
              className="form-control"
              name="title"
              value={book.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="author" className="form-label">
              Author
            </label>
            <input
              type="text"
              id="author"
              className="form-control"
              name="author"
              value={book.author}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-warning">Update Book</button>
        </form>

      </div>
    </div>
  );
}

export default UpdateBookForm;
