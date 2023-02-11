import { Header } from '../components/Header'
import { useState } from 'react'
import { FormLogin } from '../components/FormLogin'
import { FormRegister } from '../components/FormRegister'
import { parseCookies } from 'nookies'
import { Navigate } from 'react-router-dom'

export function Login() {
  const [isRegistered, setIsRegistered] = useState(true)
  const { '@todo:token': token } = parseCookies()
  function handleChangeStepForm() {
    setIsRegistered((state) => !state)
  }
  if (token) {
    return <Navigate to="/todo" />
  }
  return (
    <div>
      <Header />
      <main className="w-full h-[calc(100vh-200px)] flex items-center justify-center gap-10">
        {isRegistered ? (
          <FormLogin changeStepForm={handleChangeStepForm} />
        ) : (
          <FormRegister changeStepForm={handleChangeStepForm} />
        )}
      </main>
    </div>
  )
}
