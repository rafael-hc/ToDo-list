import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { api } from '../lib/axios'
import { useNavigate } from 'react-router-dom'

interface FormRegisterProps {
  changeStepForm: () => void
}

const registerFormSchema = z.object({
  name: z.string().min(3, { message: 'Nome inválido' }),
  email: z.string().email({ message: 'Digite um email válido' }),
  password: z
    .string()
    .min(8, { message: 'A senha deve ter pelo menos 8 caracteres' }),
})

type RegisterFormData = z.infer<typeof registerFormSchema>

export function FormRegister({ changeStepForm }: FormRegisterProps) {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({ resolver: zodResolver(registerFormSchema) })

  async function handleRegister(data: RegisterFormData) {
    const jsonData = JSON.stringify(data)
    const response = await api.post('/users', jsonData)
    const dataUser = JSON.parse(response.data)

    if (!dataUser.savedUser) {
      return alert(dataUser.message)
    }

    navigate('/')
  }

  return (
    <form
      onSubmit={handleSubmit(handleRegister)}
      className="max-w-sm w-full flex flex-col gap-4 bg-gray-400 p-4 rounded-md"
    >
      <h1 className="text-3xl text-gray-200">Cadastre-se</h1>
      <label className="flex items-center justify-between text-base text-gray-300">
        <p>Nome:</p>
        <input
          type="text"
          placeholder="Seu nome"
          className="bg-gray-600 text-gray-200 placeholder:text-gray-400 px-2 py-2 rounded-md flex-1 ml-3"
          {...register('name')}
        />
        {errors.name?.message && <p>{String(errors.name.message)}</p>}
      </label>
      <label className="flex items-center justify-between text-base text-gray-300">
        <p>E-mail:</p>
        <input
          type="email"
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
        Enviar
      </button>
      <div className="flex gap-1 text-gray-700">
        <p>Já é cadastrado?</p>
        <button
          type="button"
          className="text-gray-300 underline"
          onClick={changeStepForm}
        >
          Faça login.
        </button>
      </div>
    </form>
  )
}
