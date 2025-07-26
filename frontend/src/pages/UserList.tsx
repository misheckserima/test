import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { User, getUsers, deleteUser } from '../services/api'

const UserList = () => {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')
  const [success, setSuccess] = useState<string>('')

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const data = await getUsers()
      setUsers(data)
      setLoading(false)
    } catch (err) {
      setLoading(false)
      setError('Failed to fetch users')
      console.error(err)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(id)
        setSuccess('User deleted successfully')
        // Refresh the user list
        fetchUsers()
        
        // Clear success message after 3 seconds
        setTimeout(() => {
          setSuccess('')
        }, 3000)
      } catch (err) {
        setError('Failed to delete user')
        console.error(err)
        
        // Clear error message after 3 seconds
        setTimeout(() => {
          setError('')
        }, 3000)
      }
    }
  }

  return (
    <div className="user-list card">
      <h2>Users</h2>
      
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
      
      {loading ? (
        <p>Loading users...</p>
      ) : users.length === 0 ? (
        <div>
          <p>No users found.</p>
          <Link to="/add-user">
            <button className="btn" style={{ marginTop: '10px' }}>Add User</button>
          </Link>
        </div>
      ) : (
        <div>
          {users.map((user) => (
            <div key={user._id} className="user-item">
              <div className="user-info">
                <h3>{user.name}</h3>
                <p><strong>Age:</strong> {user.age}</p>
                <p><strong>Text:</strong> {user.text}</p>
                <p><strong>Created:</strong> {new Date(user.createdAt as Date).toLocaleString()}</p>
              </div>
              <div className="user-actions">
                <Link to={`/edit-user/${user._id}`}>
                  <button className="btn">Edit</button>
                </Link>
                <button 
                  className="btn btn-danger" 
                  onClick={() => user._id && handleDelete(user._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default UserList