import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <h1>User Management App</h1>
        <nav style={{ marginTop: '10px', display: 'flex', justifyContent: 'center', gap: '20px' }}>
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
          <Link to="/users" style={{ color: 'white', textDecoration: 'none' }}>Users</Link>
          <Link to="/add-user" style={{ color: 'white', textDecoration: 'none' }}>Add User</Link>
        </nav>
      </div>
    </header>
  )
}

export default Header