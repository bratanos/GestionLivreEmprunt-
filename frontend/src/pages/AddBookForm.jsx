import  { useState } from "react";
import axios from "axios";

function AddBookForm() {
  const [book, setBook] = useState({
    title: "",
    author: "",
    borrowed: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put("http://localhost:8080/api/books/add", book);
      alert("Book added successfully!");
      console.log(response.data); // Handle the response data as needed
    } catch (error) {
      alert("Error adding book");
      console.error(error);
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Add New Book</h5>
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
          <button type="submit" className="btn btn-primary">Add Book</button>
        </form>
      </div>
    </div>
  );
}

export default AddBookForm;
