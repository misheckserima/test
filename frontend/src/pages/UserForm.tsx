import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { User, createUser, getUserById, updateUser } from '../services/api'

const UserForm = () => {
  const [formData, setFormData] = useState<User>({
    name: '',
    text: '',
    age: 0
  })
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [isEdit, setIsEdit] = useState<boolean>(false)

  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    if (id) {
      setIsEdit(true)
      const fetchUser = async () => {
        try {
          setLoading(true)
          const userData = await getUserById(id)
          setFormData(userData)
          setLoading(false)
        } catch (err) {
          setLoading(false)
          setError('Failed to fetch user data')
          console.error(err)
        }
      }

      fetchUser()
    }
  }, [id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'age' ? parseInt(value) || 0 : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    // Validate form data
    if (!formData.name.trim() || !formData.text.trim() || formData.age <= 0) {
      setError('Please fill all fields with valid data')
      return
    }

    try {
      setLoading(true)
      setError('')

      if (isEdit && id) {
        await updateUser(id, formData)
      } else {
        await createUser(formData)
      }

      setLoading(false)
      navigate('/users')
    } catch (err) {
      setLoading(false)
      setError('Failed to save user data')
      console.error(err)
    }
  }

  return (
    <div className="card">
      <h2>{isEdit ? 'Edit User' : 'Add New User'}</h2>
      
      {error && <div className="error">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter name"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="text">Text</label>
          <textarea
            id="text"
            name="text"
            value={formData.text}
            onChange={handleChange}
            placeholder="Enter text"
            rows={4}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Enter age"
            min="1"
            required
          />
        </div>
        
        <button type="submit" className="btn" disabled={loading}>
          {loading ? 'Saving...' : isEdit ? 'Update User' : 'Add User'}
        </button>
      </form>
    </div>
  )
}

export default UserForm