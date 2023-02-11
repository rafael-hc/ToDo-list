import { Routes, Route } from 'react-router-dom'
import { Login } from '../pages/Login'
import { Todo } from '../pages/Todo'
import { PrivateRoute } from './privateRoute'
export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/todo"
        element={
          <PrivateRoute>
            <Todo />
          </PrivateRoute>
        }
      />
    </Routes>
  )
}
