import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage'; 
import DashboardPage from './pages/DashboardPage'; 
import ProfilePage from './pages/ProfilePage'; 
import SignUpPage from './pages/SignupPage';
import AdminDashboard from './pages/AdminDashboard';
import UserListPage from './pages/UserListPage';
import BookListPage from './pages/BookListPage';
import UpdateUserForm from './pages/UpdateUserForm'; // New route for user modification
import AddUserForm from './pages/AddUserForm'; // New route for adding user
import UpdateBookForm from './pages/UpdateBookForm'; // New route for book modification
import AddBookForm from './pages/AddBookForm'; // New route for adding book
import AvailableBooksPage from './pages/AvailableBooksPage';
import BorrowedBooksPage from './pages/BorrowedBooksPage';

function App() {
  return (
    <Router>
      <div className="container">
        <h1 className="text-center mt-5">Gestion des Livres Empruntés</h1>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />

          {/* User Routes */}
          <Route path="/user-dashboard/:id" element={<DashboardPage />} />
          <Route path="/profile" element={<ProfilePage />} />

          {/* Admin Routes */}
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<UserListPage/>} />
          <Route path="/admin/books" element={<BookListPage />} />
          
          {/* Modify Routes */}
          <Route path="/admin/users/modify/:id" element={<UpdateUserForm />} />
          <Route path="/admin/users/add" element={<AddUserForm />} />
          <Route path="/admin/books/modify/:id" element={<UpdateBookForm />} />
          <Route path="/admin/books/add" element={<AddBookForm />} />

          {/* Borrowing Routes */}
          <Route path="/available-books/:id" element={<AvailableBooksPage />} />
          <Route path="/borrowed-books" element={<BorrowedBooksPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
