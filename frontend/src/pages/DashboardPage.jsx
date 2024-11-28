import { Link } from 'react-router-dom';

const UserDashboard = () => {
    const id = window.location.href;
    const idBook=id.substring(id.lastIndexOf("/")+1);
    console.log(idBook);
  return (
    <div className="container mt-5">
      <h1>User Dashboard</h1>
      
      <div className="mt-4">
        <Link to={`/available-books/${idBook}`} className="btn btn-primary mr-3">View Available Books</Link>
        <Link to="/borrowed-books" className="btn btn-secondary">Manage My Borrowed Books</Link>
      </div>
    </div>
  );
};

export default UserDashboard;
