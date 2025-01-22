import { Link } from 'react-router';

export const Home = () => {
  return (
    <div className="container">
      <h2>Home</h2>
      <div>
        <div>
          <Link to="/login">Admin Login</Link>
        </div>
        <div>
          <Link to="/game/join">Guest Login</Link>
        </div>
      </div>
    </div>
  );
};
