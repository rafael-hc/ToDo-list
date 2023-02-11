import { Trash } from 'phosphor-react'
import { useState } from 'react'
import classNames from 'classnames'

interface TaskProps {
  id: string
  content: string
  isChecked: boolean
  handleDeleteTask: (id: string) => void
  onComplete: (id: string, complete: boolean) => void
}

export function Task({
  id,
  content,
  handleDeleteTask,
  onComplete,
  isChecked,
}: TaskProps) {
  const [isComplete, setIsComplete] = useState(isChecked)

  function handleIsComplete() {
    setIsComplete((state) => (state = !isComplete))
    !isComplete ? onComplete(id, true) : onComplete(id, false)
  }

  return (
    <div className="grid grid-cols-[24px,_1fr,_24px] gap-3 rounded-lg bg-gray-500 p-4 items-start group">
      <div className="flex items-center justify-center check">
        <input type="checkbox" name="" id={id} className="invisible  w-0 h-0" />
        <button
          aria-checked
          role="checkbox"
          title={isComplete ? 'Retomar tarefa' : 'Concluir tarefa'}
          onClick={handleIsComplete}
          className={classNames(
            'w-[1.1rem] h-[1.1rem] rounded-full border-2 cursor-pointer transition-colors',
            {
              'bg-purple-dark border-purple-dark bg-checked bg-no-repeat bg-center text-gray-100 hover:bg-purple-base hover:border-purple-base':
                isComplete,
              'hover:bg-blue-dark border-blue-base hover:bg-opacity-20 hover:border-blue-dark':
                !isComplete,
            },
          )}
        ></button>
      </div>
      <div
        className={classNames(
          'flex items-center justify-start text-sm leading-5',
          {
            'line-through text-gray-300': isComplete,
            'text-gray-100': !isComplete,
          },
        )}
      >
        {content}
      </div>
      <button
        onClick={() => handleDeleteTask(id)}
        className="flex h-6 items-center justify-center text-gray-300 hover:text-red-300 cursor-pointer transition-colors"
      >
        <Trash size={20} />
      </button>
    </div>
  )
}
