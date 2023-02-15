import { zodResolver } from '@hookform/resolvers/zod'
import { setCookie } from 'nookies'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { api } from '../lib/axios'

interface FormLoginProps {
  changeStepForm: () => void
}

interface ResponseLoginProps {
  email: string
  password: string
}

const loginFormSchema = z.object({
  email: z.string().email({ message: 'Digite um email válido' }),
  password: z
    .string()
    .min(8, { message: 'A senha deve ter pelo menos 8 caracteres' }),
})

type LoginFormData = z.infer<typeof loginFormSchema>

export function FormLogin({ changeStepForm }: FormLoginProps) {
  const [response, setResponse] = useState<ResponseLoginProps>({
    email: '',
    password: '',
  })
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    mode: 'onBlur',
  })

  async function handleLogin(data: LoginFormData) {
    const body = JSON.stringify(data)
    setResponse({ email: '', password: '' })
    try {
      const response = await api.post('/users/login', body)
      const { token, email, password } = JSON.parse(response.data)

      if (token) {
        setCookie(null, '@todo:token', token, {
          maxAge: 60 * 60 * 24 * 15, // 15 days
          path: '/',
        })
        navigate('/todo')
      } else {
        password && setResponse((state) => ({ ...state, password }))
        email && setResponse((state) => ({ ...state, email }))
      }
    } catch (err: any) {
      alert(err.message)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleLogin)}
      className="max-w-sm w-full flex flex-col gap-4 bg-gray-400 p-4 rounded-md"
    >
      <h1 className="text-3xl text-gray-200">Login</h1>
      <label className="flex flex-col justify-center text-base text-gray-300">
        <div className="flex items-center">
          <p>E-mail:</p>
          <input
            type="text"
            placeholder="Seu e-mail"
            className="bg-gray-600 placeholder:text-gray-400 px-2 py-2 rounded-md flex-1 ml-3"
            {...register('email')}
          />
        </div>
        <p className="text-red-300 text-sm mt-2 text-right">
          {errors.email?.message && String(errors.email.message)}
          {response.email && String(response.email)}
        </p>
      </label>
      <label className="flex flex-col justify-center text-base text-gray-300">
        <div className="flex items-center">
          <p>Senha:</p>
          <input
            type="password"
            placeholder="Seu senha"
            className="bg-gray-600 placeholder:text-gray-400 px-2 py-2 rounded-md flex-1 ml-3"
            {...register('password')}
          />
        </div>
        <p className="text-red-300 text-sm mt-2 text-right">
          {errors.password?.message && String(errors.password.message)}
          {response.password && String(response.password)}
        </p>
      </label>
      <button
        disabled={isSubmitting}
        className="bg-blue-dark w-full h-[3.25rem] rounded-lg flex items-center justify-center text-gray-100 text-sm font-bold gap-2 hover:bg-blue-base transition-colors"
      >
        Entrar
      </button>
      <div className="flex gap-1 text-gray-700">
        <p>Não tem cadastro,</p>
        <button
          type="button"
          className="text-gray-300 underline"
          onClick={changeStepForm}
        >
          cadastre-se.
        </button>
      </div>
    </form>
  )
}
