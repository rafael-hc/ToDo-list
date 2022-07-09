import { Header } from './components/Header'
import { TaskList } from './components/TaskList'
import './style/global.css'

export function App() {
  return (
    <div>
      <Header />
      <main className='max-w-[47.5rem] my-0 mx-auto px-3'>      
      <TaskList />
      </main>
    </div>
    
  )
}


