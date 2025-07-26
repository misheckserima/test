import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="card">
      <h2>Welcome to User Management App</h2>
      <p style={{ margin: '20px 0' }}>
        This is a simple application that demonstrates CRUD operations using React, TypeScript, Express, and MongoDB.
      </p>
      <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
        <Link to="/users">
          <button className="btn">View Users</button>
        </Link>
        <Link to="/add-user">
          <button className="btn">Add New User</button>
        </Link>
      </div>
    </div>
  )
}

export default Home