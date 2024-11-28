import  { useState, useEffect } from "react";
import axios from "axios";

const ProfilePage = () => {
  const [user, setUser] = useState({ username: "", email: "" });
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch user data (use appropriate endpoint)
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/users/profile");
        setUser(response.data);
      } catch (err) {
        setError("Failed to fetch user data");
      }
    };
    fetchUser();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update the user profile (you need to implement this functionality)
    axios
      .put("http://localhost:8080/api/users/profile", user)
      .then(() => alert("Profile updated successfully"))
      .catch((err) => setError("Failed to update profile"));
  };

  return (
    <div className="container mt-5">
      <h2>Edit Profile</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="form-control"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
