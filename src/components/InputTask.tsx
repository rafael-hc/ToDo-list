import { zodResolver } from '@hookform/resolvers/zod'
import { PlusCircle } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const inputTaskSchema = z.object({
  task: z
    .string()
    .min(3, { message: 'A tarefa deve conter ao menos 3 caracteres' }),
})

type InputTaskData = z.infer<typeof inputTaskSchema>

interface InputTaskProps {
  handleCreateNewTask: (task: string) => void
}

export function InputTask({ handleCreateNewTask }: InputTaskProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InputTaskData>({
    resolver: zodResolver(inputTaskSchema),
    mode: 'onChange',
  })

  async function handleSendTask(data: InputTaskData) {
    await handleCreateNewTask(data.task)
    reset()
  }

  return (
    <div className="w-full -mt-[1.6875rem]">
      <form
        onSubmit={handleSubmit(handleSendTask)}
        className="grid grid-cols-[_1fr_5.625rem] gap-2 items-center"
      >
        <input
          type="text"
          // onChange={handleNewTaskChanged}
          placeholder="Adicione uma nova tarefa"
          className="w-full h-[3.375rem] rounded-lg bg-gray-500 text-gray-100 placeholder:text-gray-300 p-4 border border-gray-700 leading-snug"
          {...register('task')}
        />
        <button
          disabled={isSubmitting}
          type="submit"
          className="bg-blue-dark w-[5.625rem] h-[3.25rem] rounded-lg flex items-center justify-center text-gray-100 text-sm font-bold gap-2 hover:bg-blue-base transition-colors"
        >
          Criar
          <PlusCircle />
        </button>
        <p className="text-red-300 text-sm mt-2 text-right min-h-[20px]">
          {errors.task?.message ? String(errors.task.message) : ''}
        </p>
      </form>
    </div>
  )
}
