import { zodResolver } from '@hookform/resolvers/zod'
import { setCookie } from 'nookies'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { api } from '../lib/axios'

interface FormLoginProps {
  changeStepForm: () => void
}

const loginFormSchema = z.object({
  email: z.string().email({ message: 'Digite um email válido' }),
  password: z
    .string()
    .min(8, { message: 'A senha deve ter pelo menos 8 caracteres' }),
})

type LoginFormData = z.infer<typeof loginFormSchema>

export function FormLogin({ changeStepForm }: FormLoginProps) {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
  })

  async function handleLogin(data: LoginFormData) {
    const body = JSON.stringify(data)
    try {
      const response = await api.post('/users/login', body)
      const dataUser = JSON.parse(response.data)

      if (!dataUser.token) {
        return alert(dataUser.message)
      }

      setCookie(null, '@todo:token', dataUser.token, {
        maxAge: 60 * 60 * 24 * 15, // 15 days
        path: '/',
      })
      navigate('/todo')
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
      <label className="flex items-center justify-between text-base text-gray-300">
        <p>E-mail:</p>
        <input
          type="text"
          placeholder="Seu e-mail"
          className="bg-gray-600 placeholder:text-gray-400 px-2 py-2 rounded-md flex-1 ml-3"
          {...register('email')}
        />
        {errors.email?.message && <p>{String(errors.email.message)}</p>}
      </label>
      <label className="flex items-center justify-between text-base text-gray-300">
        <p>Senha:</p>
        <input
          type="password"
          placeholder="Seu senha"
          className="bg-gray-600 placeholder:text-gray-400 px-2 py-2 rounded-md flex-1 ml-3"
          {...register('password')}
        />
        {errors.password?.message && <p>{String(errors.password.message)}</p>}
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
