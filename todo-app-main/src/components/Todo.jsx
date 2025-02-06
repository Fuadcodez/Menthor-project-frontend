import React from 'react'
import { RxCross1 } from "react-icons/rx";
const AllTasks = ({tasks, category, setCategory, removeTasks, toggleTaskCompletion, clearCompleted}) => {
  return (
    <div className=' dark:bg-[hsl(235,21%,11%)] rounded-md pb-2 bg-white text-[hsl(234,11%,52%)] dark:text-[hsl(236,33%,92%)] font-semibold'>
     {tasks?.map((task)=>(
                 <div className='py-2 border-b dark:border-white/70 border-[hsl(235,21%,11%)] text-wrap' key={task.id}>
                 <div className='flex items-center justify-between px-3 py-2 rounded-lg group ' > 
                   <div className='flex items-center gap-4'>
                   <input type="radio" className='w-3' checked={task.completedTask} disabled={task.completedTask} onChange={()=>toggleTaskCompletion(task.id)}/>
                   <h2 className={` capitalize ${task.completedTask? "line-through": ""}`}>{task.inputTask}</h2>
                   </div>
                   <RxCross1 className=' group-hover:opacity-50' onClick={()=>removeTasks(task.id)}/>
                 </div>
                 </div>
                 ))
               }
              
             <div className='flex items-center justify-between p-2'>
               <div className='text-xs'>
                 {`${tasks.length} items left`}
               </div>
               <div className='hidden sm:block'>
               <div className='flex justify-center gap-2'>
                     <button className={`${category === 'all'? "text-blue-500": '' } text-xs `}  onClick={()=>setCategory('all')} >All</button>
                     <button className={`${category === 'activeTasks'? "text-blue-500": '' } text-xs`} onClick={()=>setCategory('activeTasks')}>Active</button>
                     <button className={`${category === 'completed'? "text-blue-500": '' } text-xs`}onClick={()=>setCategory('completed')}>Completed</button>
               </div>

               </div>
               <button className={`text-xs`} onClick={clearCompleted}>Clear completed</button>
             </div>
             </div>
  
  )
}
const AllActiveTasks = ({activeTasks, category, setCategory, removeTasks, clearCompleted}) => (
    <div className=' dark:bg-[hsl(235,21%,11%)] rounded-md pb-2 bg-white text-[hsl(234,11%,52%)] dark:text-[hsl(236,33%,92%)] font-semibold'>
    {activeTasks?.map((task)=>(
        <div className='py-2 border-b dark:border-white/70 border-[hsl(235,21%,11%)]' key={task.id}>
        <div className='flex items-center justify-between px-3 py-2 rounded-lg group ' > 
          <div className='flex items-center gap-4 text-clip'>
          <input type="radio" className='w-3' disabled={true}/>
          <h2 className={` capitalize ${task.completedTask? "line-through": ""}`}>{task.inputTask}</h2>
          </div>
          <RxCross1 className=' group-hover:opacity-50' onClick={()=>removeTasks(task.id)}/>
        </div>
        </div>
        
      ))
    }

    <div className='flex items-center justify-between p-2'>
        <div className='text-xs'>
            {`${activeTasks.length} items left`}
        </div>
        <div className='hidden sm:block'>
            <div className='flex justify-center gap-2'>
                    <button className={`${category === 'all'? "text-blue-500": '' } text-xs`}  onClick={()=>setCategory('all')} >All</button>
                    <button className={`${category === 'activeTasks'? "text-blue-500": '' } text-xs`} onClick={()=>setCategory('activeTasks')}>Active</button>
                    <button className={`${category === 'completed'? "text-blue-500": '' } text-xs`}onClick={()=>setCategory('completed')}>Completed</button>
            </div>
        </div>
        <button className={`text-xs`} onClick={clearCompleted}>Clear completed</button>
    </div>
</div> 
)
const AllCompletedTasks = ({completedTasks, category, setCategory, removeTasks, clearCompleted})=>(
    <div className=' dark:bg-[hsl(235,21%,11%)] rounded-md pb-2 bg-white text-[hsl(234,11%,52%)] dark:text-[hsl(236,33%,92%)] font-semibold'>
    {completedTasks?.map((task)=>(
        <div className='py-2 border-b dark:border-white/70 border-[hsl(235,21%,11%)]' key={task.id}>
        <div className='flex items-center justify-between px-3 py-2 rounded-lg group ' > 
          <div className='flex items-center gap-4 text-clip'>
          <input type="radio" className='w-3' defaultChecked={true} disabled={true}/>
          <h2 className={`capitalize line-through`}>{task.inputTask}</h2>
          </div>
          <RxCross1 className=' group-hover:opacity-50' onClick={()=>removeTasks(task.id)}/>
        </div>
        </div>
        
      ))
    }

    <div className='flex items-center justify-between p-2 '>
      <div className='text-xs'>
        {`${completedTasks.length} items completed`}
      </div>
        <div className='hidden sm:block'>
            <div className='flex justify-center gap-2'>
                <button className={`${category === 'all'? "text-blue-500": '' } text-xs`}  onClick={()=>setCategory('all')} >All</button>
                <button className={`${category === 'activeTasks'? "text-blue-500": '' } text-xs`} onClick={()=>setCategory('activeTasks')}>Active</button>
                <button className={`${category === 'completed'? "text-blue-500": '' } text-xs`}onClick={()=>setCategory('completed')}>Completed</button>
            </div>
        </div>
      <button className={`text-xs`} onClick={clearCompleted} >Clear completed</button>
    </div>
</div> 
)

export  {AllTasks, AllActiveTasks, AllCompletedTasks}