import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../store/authContext';

const Header = () => {
  const { isAuth, logout } = useContext(AuthContext);
  const handleLogout = () => {
    logout();
  };
  return (
    <header className="bg-purple-900 text-white">
      <div className="container mx-auto flex justify-between items-center py-4">
        <div className="text-4xl font-semibold">
          <Link to="/">React Auth</Link>
        </div>
        <div className="flex items-center gap-7">
          {!isAuth && (
            <Link to="/Login">
              <div className="text-xl font-medium">Login</div>
            </Link>
          )}
          {isAuth && (
            <Link to="/Profile">
              <div className="text-xl font-medium">Profile</div>
            </Link>
          )}
          {isAuth && (
            <div
              onClick={handleLogout}
              className="cursor-pointer text-xl font-medium px-5 py-2 border rounded-lg hover:text-purple-900 hover:bg-purple-300">
              Logout
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
