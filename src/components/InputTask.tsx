import { PlusCircle } from 'phosphor-react'
import { ChangeEvent, FormEvent } from 'react'

interface InputTaskProps {
  handleCreateNewTask: (event: FormEvent) => void
  handleNewTaskChanged: (event: ChangeEvent<HTMLInputElement>) => void
  taskTitleContent: string
}

export function InputTask({
  handleCreateNewTask,
  handleNewTaskChanged,
  taskTitleContent,
}: InputTaskProps) {
  return (
    <div className="w-full -mt-[1.6875rem]">
      <form
        onSubmit={handleCreateNewTask}
        className="grid grid-cols-[_1fr_5.625rem] gap-2 items-center"
      >
        <input
          type="text"
          onChange={handleNewTaskChanged}
          value={taskTitleContent}
          placeholder="Adicione uma nova tarefa"
          className="w-full h-[3.375rem] rounded-lg bg-gray-500 text-gray-100 placeholder:text-gray-300 p-4 border border-gray-700 leading-snug"
        />
        <button
          type="submit"
          className="bg-blue-dark w-[5.625rem] h-[3.25rem] rounded-lg flex items-center justify-center text-gray-100 text-sm font-bold gap-2 hover:bg-blue-base transition-colors"
        >
          Criar
          <PlusCircle />
        </button>
      </form>
    </div>
  )
}
