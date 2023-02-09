import { Header } from '../components/Header'
import { TaskList } from '../components/TaskList'

export function Todo() {
  return (
    <div>
      <Header />
      <main className="max-w-[47.5rem] my-0 mx-auto px-3">
        <TaskList />
      </main>
    </div>
  )
}
