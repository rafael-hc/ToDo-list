import { ClipboardText } from 'phosphor-react';
import { ChangeEvent, FormEvent, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { InputTask } from './InputTask';
import { Task } from './Task';

interface ContentTask {
    id: string,
    title: string,
    isComplete: boolean,
}

export function TaskList() {
    const [Tasks, setTasks] = useState<ContentTask[]>([]);
    const [taskTitleContent, setTaskTitleContent] = useState('');
    const [numberOfTask, setNumberOfTask] = useState(0);
    const [numberOfTaskComplete, setNumberOfTaskComplete] = useState(0);

    function handleNewTaskChanged(event: ChangeEvent<HTMLInputElement>) {
        setTaskTitleContent(event.target.value)
    }

    function handleCreateNewTask(event: FormEvent) {
        event.preventDefault()

        setTasks([...Tasks, { id: uuidv4(), title: taskTitleContent, isComplete: false }])

        setNumberOfTask(state => state + 1)
        
        setTaskTitleContent('')
    }


    function handleDeleteTask(id: string) {
        const tasksWithoutDeleteOne = Tasks.filter(task => {
            if (task.id !== id)
                return task
        })
        setTasks(state => state = tasksWithoutDeleteOne)

        setNumberOfTask(state => state - 1)

        setNumberOfTaskComplete(tasksWithoutDeleteOne.filter(task => task.isComplete === true).length)
    }

    function onComplete(id: string, complete: boolean) {
        const taskRefreshedComplete = Tasks.map(
            task => {
                if (task.id === id)
                    task.isComplete = complete;
                return task
            });

        setTasks(state => state = taskRefreshedComplete)

        setNumberOfTaskComplete(taskRefreshedComplete.filter(task => task.isComplete === true).length)
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
                    {numberOfTask !== 0
                        ? <div className="flex flex-col gap-3">
                            {Tasks.map(task => {
                                return (
                                    <Task
                                        key={task.id}
                                        id={task.id}
                                        content={task.title}
                                        handleDeleteTask={handleDeleteTask}
                                        onComplete={onComplete}
                                    />
                                )
                            })}
                        </div>
                        : <div className="flex flex-col items-center justify-center text-gray-400 py-16 leading-relaxed">
                            <ClipboardText size={56} />
                            <strong className="text-gray-300">Você ainda não tem tarefas cadastradas</strong>
                            <p className="text-gray-300">Crie tarefas e organize seus itens a fazer</p>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}