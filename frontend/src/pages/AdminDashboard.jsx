import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// AdminDashboard.jsx: This component will show navigation links to book list and user list
const AdminDashboard = () => {
  return (
    <div className="container mt-5">
      <h1>Admin Dashboard</h1>

      {/* Navigation to manage books and users */}
      <div className="mt-4">
        <Link to="/admin/users" className="btn btn-primary mr-2">Manage Users</Link>
        <Link to="/admin/books" className="btn btn-secondary">Manage Books</Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
