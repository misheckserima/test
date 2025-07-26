import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import UserForm from './pages/UserForm'
import UserList from './pages/UserList'

function App() {
  return (
    <div className="app">
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/add-user" element={<UserForm />} />
          <Route path="/edit-user/:id" element={<UserForm />} />
        </Routes>
      </div>
    </div>
  )
}

export default App