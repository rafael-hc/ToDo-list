import { Routes, Route } from 'react-router-dom'
import { Login } from './pages/Login'
import { Todo } from './pages/Todo'
export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/todo" element={<Todo />} />
    </Routes>
  )
}
