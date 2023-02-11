import jwtDecode from 'jwt-decode'
import { destroyCookie, parseCookies } from 'nookies'
import { useNavigate } from 'react-router-dom'
import TodoLogo from '../assets/rocket.svg'

interface PayloadToken {
  userId: string
  name: string
}

export function Header() {
  const navigate = useNavigate()
  const { '@todo:token': token } = parseCookies()
  let payload: any
  if (token) {
    payload = jwtDecode<PayloadToken>(token)
  }
  console.log(typeof payload)
  function handleLogout() {
    destroyCookie(null, '@todo:token')
    navigate('/')
  }
  return (
    <div className="h-[200px] bg-gray-700 flex items-center justify-center">
      <img className="w-[1.375rem] h-9 " src={TodoLogo} alt="" />
      <span className=" text-blue-base font-black text-[2.5rem] ml-3">to</span>
      <span className=" text-blue-dark font-black text-[2.5rem]">do</span>
      <div className="absolute top-4 right-4 flex items-center gap-4">
        {payload?.name && (
          <>
            <p className="text-gray-100">{`Olá ${payload.name}`}</p>
            <button
              onClick={handleLogout}
              className=" bg-blue-dark p-2 rounded-lg flex items-center justify-center text-gray-100 text-sm font-bold gap-2 hover:bg-blue-base transition-colors"
            >
              Sair
            </button>
          </>
        )}
      </div>
    </div>
  )
}
