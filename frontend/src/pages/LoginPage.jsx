import  { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook for redirecting
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // Hook to navigate programmatically
  

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send login request to the backend
    axios
      .post("http://localhost:8080/api/users/login", { username:username, password:password })
      .then((response) => {
        // Assuming the response contains user data with a role
        const userRole = response.data;
        console.log("Login Response:", response.data);
        localStorage.setItem('userId', response.data.id);


        // Store the role and token in localStorage (optional)
        localStorage.setItem("role", userRole);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem('userId', response.data.id);
        console.log(localStorage.getItem("role"))
        console.log(localStorage.getItem("id"))

        // Redirect based on role
        if (userRole === "admin") {
          navigate("/admin-dashboard"); // Redirect to Admin Dashboard
        } else {
          navigate(`/user-dashboard/${response.data.id}`); // Redirect to User Dashboard
        }
      })
      .catch((error) => {
        setErrorMessage("Invalid username or password.");
        console.error("Login failed:", error);
      });
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
      {errorMessage && <div className="text-danger mt-3">{errorMessage}</div>}
      <p>Don't have an account? <Link to="/signup">Create one</Link></p> {/* Signup link */}
    </div>
  );
};

export default LoginPage;
