import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { RxCross1 } from "react-icons/rx";
import { AllTasks, AllActiveTasks, AllCompletedTasks } from './components/Todo';
import ThemeToggle from './components/ThemeToggle';
function App() {
    const [tasks, setTasks] = useState([])
    const [completedTasks , setCompletedTasks ] = useState([])
    const [activeTasks, setActiveTasks ] = useState([])
    const [inputedTask, setInputedTask] = useState('')
    const [category, setCategory] = useState('all')
    const handleFormSubmit = (e) => {
      e.preventDefault();
      const trimInput = inputedTask.trim();
      const newTasks = {inputTask:trimInput, id: Date.now(), completedTask:false 
      }

      setTasks([ newTasks, ...tasks])
      setActiveTasks([ newTasks, ...activeTasks]); 
      localStorage.setItem('todo', JSON.stringify([...tasks, newTasks]))
      setInputedTask('')

      // console.log(newTasks, newDates, newMonth, Date.now() )
  }
  const toggleTaskCompletion = (id) => {
    const updatedTasks = tasks.map(task => 
        task.id === id ? { ...task, completedTask: !task.completedTask } : task
    );
    const completed = tasks.find((task)=> task.id === id)
    const active = activeTasks.filter((activeTask)=> activeTask.id !== id)
    console.log(completed)
    console.log(active)
    setActiveTasks(active)
    setCompletedTasks([completed, ...completedTasks])
    setTasks(updatedTasks);
    localStorage.setItem('todo', JSON.stringify(updatedTasks));
}

  const removeTasks = (id) =>{
    const newTasks = tasks.filter((task) => task.id !== id)
    const newActive = activeTasks.filter((activeTask) => activeTask.id !== id)
    const newCompleted = completedTasks.filter((completedTasks) => completedTasks.id !== id)
    setTasks(newTasks)
    setActiveTasks(newActive)
    setCompletedTasks(newCompleted)
    localStorage.setItem('todo', JSON.stringify(newTasks))
    
  }
  const clearCompleted = ()=>{
    const newCompleted = tasks.filter((task)=>task.completedTask === false)
   setTasks(newCompleted)
    setCompletedTasks([])
  }
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
          <input type="radio" name="" id="" className='w-5 outline-none cursor-pointer' checked/>
          <input type="text" placeholder='Create a new todo...' className='flex-1 bg-transparent outline-none text-[hsl(235,24%,19%)] dark:text-[hsl(236,33%,92%)]' value={inputedTask} onChange={(e)=>setInputedTask(e.target.value)}/>
          </div>
          <button className='bg-[hsl(234,39%,85%)] hover:bg-[hsl(236,33%,92%)] text-lg rounded-lg py-2 transition-all duration-300 ease-linear text-black' onClick={handleFormSubmit}>Create a todo</button>
        </form>
        {tasks.length > 0 && category === "all" && (
          <AllTasks tasks={tasks} category={category} setCategory={setCategory} removeTasks={removeTasks} toggleTaskCompletion={toggleTaskCompletion} clearCompleted={clearCompleted}/>
        )}
        {tasks.length > 0 && category === 'activeTasks' && (
         <AllActiveTasks activeTasks={activeTasks} category={category} setCategory={setCategory} removeTasks={removeTasks} clearCompleted={clearCompleted}/>
          )
        }
        {tasks.length > 0 && category === 'completed' && (
         <AllCompletedTasks completedTasks={completedTasks} removeTasks={removeTasks} category={category} setCategory={setCategory} clearCompleted={clearCompleted}/>
          )
        }

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
