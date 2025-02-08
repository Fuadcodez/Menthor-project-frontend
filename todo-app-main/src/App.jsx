import { useEffect, useState } from 'react'
import './App.css'
import { AllTasks, } from './components/Todo';
import ThemeToggle from './components/ThemeToggle';
function App() {
    const [tasks, setTasks] = useState([])
    const [inputedTask, setInputedTask] = useState('')
    const [category, setCategory] = useState('all')
    const [filteredTasks, setFilteredTasks] = useState([])
    const handleFormSubmit = (e) => {
      e.preventDefault();
      const trimInput = inputedTask.trim();
      const newTasks = {inputTask:trimInput, id: Date.now(), completedTask:false 
      }
      setTasks([ newTasks, ...tasks])
      setInputedTask('')

  }
  const toggleTaskCompletion = (id) => {
    const updatedTasks = tasks.map(task => 
        task.id === id ? { ...task, completedTask: !task.completedTask } : task
    );
    setTasks(updatedTasks);
  
}

  const removeTasks = (id) =>{
    const newTasks = tasks.filter((task) => task.id !== id)
    setTasks(newTasks)
    
  }
  const clearCompleted = ()=>{
    const completed = tasks.filter((task) =>task.completedTask === true)
    if (completed.length > 0){
      const newCompleted = tasks.filter((task)=> task.completedTask === false)
      setTasks(newCompleted)
      return
    }
  }
  useEffect(()=>{
    const filteredTodos = tasks.filter(todo => {
      if (category === "all") return true;
      return category === "activeTasks" ? !todo.completedTask : todo.completedTask;
    });
    setFilteredTasks(filteredTodos)
  }, [tasks, category])
  return (
  <div className='min-h-[100vh] h-full overflow-hidden dark:bg-black bg-[hsl(236,33%,92%)] bg-no-repeat px-8 py-16 bg-contain dark:bg-[url(/images/bg-mobile-dark.jpg)] bg-[url(/images/bg-mobile-light.jpg)] dark:md:bg-[url(/images/bg-desktop-dark.jpg)] md:bg-[url(/images/bg-desktop-light.jpg)]' >
    <div className='flex flex-col max-w-md gap-10 mx-auto '>
      <div className='flex items-center justify-between w-full'>
        <h1 className='text-2xl font-semibold text-white'>TODO</h1>
        <div className='flex items-center'>
        <ThemeToggle />
        </div>
      </div>
      <div className='flex flex-col gap-4 text-[hsl(234,11%,52%)] dark:text-[hsl(236,33%,92%)] '>
        <form className='flex flex-col gap-4'>
          <div className='flex items-center gap-5 p-4 text-white rounded-md bg-white dark:bg-[hsl(235,21%,11%)] '>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="10" cy="10" r="9.5" stroke="#393A4B" />
        </svg>
          <input type="text" placeholder='Create a new todo...' className='flex-1 bg-transparent outline-none text-[hsl(235,24%,19%)] dark:text-[hsl(236,33%,92%)]' value={inputedTask} onChange={(e)=>setInputedTask(e.target.value)}/>
          </div>
          <button className='bg-[hsl(234,39%,85%)] hover:bg-[hsl(236,33%,92%)] text-lg rounded-lg py-2 transition-all duration-300 ease-linear text-black' onClick={handleFormSubmit}>Create a todo</button>
        </form>
        {tasks.length > 0 && (
          <AllTasks tasks={filteredTasks} category={category} setCategory={setCategory} removeTasks={removeTasks} toggleTaskCompletion={toggleTaskCompletion} clearCompleted={clearCompleted} setTasks={setFilteredTasks}/>
        )}
          {tasks.length > 0 && <div className='flex items-center justify-center p-2 py-3 sm:hidden dark:bg-[hsl(235,21%,11%)] rounded-md bg-white'>

            <div className='flex items-center justify-center gap-2'>
                  <button className={`${category === 'all'? "text-blue-500": '' } text-sm font-semibold`}  onClick={()=>setCategory('all')} >All</button>
                  <button className={`${category === 'activeTasks'? "text-blue-500": '' } text-sm font-semibold`} onClick={()=>setCategory('activeTasks')}>Active</button>
                  <button className={`${category === 'completed'? "text-blue-500": '' } text-sm font-semibold`}onClick={()=>setCategory('completed')}>Completed</button>
            </div>
          </div>}     
          
      </div>
    </div>
  </div>
  )
}

export default App
