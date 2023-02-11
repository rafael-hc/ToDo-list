import { parseCookies } from 'nookies'
import { Navigate } from 'react-router-dom'

interface PrivateRouteProps {
  // eslint-disable-next-line no-undef
  children: JSX.Element
}
export function PrivateRoute({ children }: PrivateRouteProps) {
  const { '@todo:token': token } = parseCookies()

  return !token ? <Navigate to="/" /> : children
}
