import { Routes, Route } from 'react-router-dom'
import { Signup } from './components/Signup'
import { Login } from './components/Login'
import { Homepage } from './components/Homepage.js'
function App() {
  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="homepage" element={<Homepage />} />
      </Routes>
  )
}

export default App
