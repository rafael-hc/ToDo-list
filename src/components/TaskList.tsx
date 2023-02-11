import { parseCookies } from 'nookies'
import { ClipboardText } from 'phosphor-react'
import { ChangeEvent, FormEvent, useState } from 'react'
import { useQuery } from 'react-query'
import { v4 as uuidv4 } from 'uuid'
import { api } from '../lib/axios'
import { InputTask } from './InputTask'
import { Task } from './Task'

interface ContentTask {
  id: string
  task: string
  isChecked: boolean
}

export function TaskList() {
  const [tasks, setTasks] = useState<ContentTask[]>([])
  const [taskTitleContent, setTaskTitleContent] = useState('')
  const [numberOfTask, setNumberOfTask] = useState(0)
  const [numberOfTaskComplete, setNumberOfTaskComplete] = useState(0)
  const { '@todo:token': token } = parseCookies()

  const { isLoading, error } = useQuery('todos', async () => {
    const response = await api.get('/todos', {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    const todos = JSON.parse(response.data).todos as ContentTask[]
    const todosCompleted = todos.filter((todo) => todo.isChecked === true)
    setTasks(todos)
    setNumberOfTask(todos.length)
    setNumberOfTaskComplete(todosCompleted.length)
    return JSON.parse(response.data)
  })

  console.log('estado task: ', tasks)
  console.log(error)

  function handleNewTaskChanged(event: ChangeEvent<HTMLInputElement>) {
    setTaskTitleContent(event.target.value)
  }

  async function handleCreateNewTask(event: FormEvent) {
    event.preventDefault()

    setTasks([
      ...tasks,
      { id: uuidv4(), task: taskTitleContent, isChecked: false },
    ])

    setNumberOfTask((state) => state + 1)

    const body = JSON.stringify({ task: taskTitleContent, isChecked: false })

    await api.post('/todos', body, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })

    setTaskTitleContent('')
  }

  async function handleDeleteTask(id: string) {
    // eslint-disable-next-line array-callback-return
    const tasksWithoutDeleteOne = tasks.filter((task) => {
      if (task.id !== id) {
        return task
      }
    })
    setTasks((state) => (state = tasksWithoutDeleteOne))

    setNumberOfTask((state) => state - 1)

    setNumberOfTaskComplete(
      tasksWithoutDeleteOne.filter((task) => task.isChecked === true).length,
    )

    await api.delete(`/todos/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
  }

  async function onComplete(id: string, complete: boolean) {
    const taskRefreshedComplete = tasks.map((task) => {
      if (task.id === id) task.isChecked = complete
      return task
    })

    setTasks((state) => (state = taskRefreshedComplete))

    setNumberOfTaskComplete(
      taskRefreshedComplete.filter((task) => task.isChecked === true).length,
    )

    const body = JSON.stringify({ isChecked: complete })

    await api.patch(`/todos/${id}`, body, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
  }

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  return (
    <div>
      <InputTask
        handleNewTaskChanged={handleNewTaskChanged}
        handleCreateNewTask={handleCreateNewTask}
        taskTitleContent={taskTitleContent}
      />
      <div>
        <header className="flex justify-between mt-16 ">
          <div className="flex gap-2 items-center justify-center">
            <span className="text-blue-base text-sm font-bold leading-4">
              Tarefas Criadas
            </span>
            <span className="bg-gray-400 px-2 py-[0.125rem] rounded-full text-gray-200 leading-[15px]">
              {numberOfTask}
            </span>
          </div>
          <div className="flex gap-2 items-center justify-center">
            <span className="text-purple-base text-sm font-bold leading-4">
              Concluídas
            </span>
            <span className="bg-gray-400 px-2 py-[0.125rem] rounded-full text-gray-200 leading-[15px]">
              {`${numberOfTaskComplete} de ${numberOfTask}`}
            </span>
          </div>
        </header>
        <div className="rounded-lg border-t border-gray-400 mt-8 mb-4 overflow-hidden">
          {numberOfTask !== 0 ? (
            <div className="flex flex-col gap-3">
              {tasks.map((task) => {
                return (
                  <Task
                    key={task.id}
                    id={task.id}
                    content={task.task}
                    handleDeleteTask={handleDeleteTask}
                    onComplete={onComplete}
                    isChecked={task.isChecked}
                  />
                )
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-gray-400 py-16 leading-relaxed">
              <ClipboardText size={56} />
              <strong className="text-gray-300">
                Você ainda não tem tarefas cadastradas
              </strong>
              <p className="text-gray-300">
                Crie tarefas e organize seus itens a fazer
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
