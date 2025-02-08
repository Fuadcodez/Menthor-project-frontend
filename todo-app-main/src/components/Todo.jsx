import React ,{useState, useCallback}from 'react'
import { RxCross1 } from "react-icons/rx";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
  useSortable
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
const TodoItem = ({id, children, task})=>{
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: id.toString() });
  const styleClass = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
<div className='py-2 border-b dark:border-white/70 border-[hsl(235,21%,11%)] text-wrap'  ref={setNodeRef} style={styleClass} {...attributes} {...listeners}>
{children}
</div>
  )
}
const AllTasks = ({tasks, category, setCategory, removeTasks, toggleTaskCompletion, clearCompleted, setTasks}) => {
  
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );

  const handleDragEnd = useCallback((e) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    const oldIndex = tasks.findIndex(todo => todo.id.toString() === active.id);
    const newIndex = tasks.findIndex(todo => todo.id.toString() === over.id);
    setTasks(items => arrayMove(items, oldIndex, newIndex));
  }, [tasks]);

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={tasks.map((todo) => todo.id.toString())}
          strategy={verticalListSortingStrategy}
        >
    <div className=' dark:bg-[hsl(235,21%,11%)] rounded-md pb-2 bg-white text-[hsl(234,11%,52%)] dark:text-[hsl(236,33%,92%)] font-semibold dark:hover:text-'>
     {tasks?.map((task)=>(
      <TodoItem id={task.id} task={task} key={task.id} >
          <div className='flex items-center justify-between px-3 py-2 rounded-lg group ' > 
            <div className='flex items-center gap-4'>
            <input type="checkbox" className='hidden peer' checked={task.completedTask}  onChange={()=>toggleTaskCompletion(task.id)} id={`task-${task.id}`}/>
            <label
                      htmlFor={`task-${task.id}`}>
            {task.completedTask ? (
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="10" cy="10" r="9.5" fill="white" stroke="#E3E4F1" />
                          <circle cx="10" cy="10" r="10" fill="url(#paint0_linear_0_42)" />
                          <path d="M6.66675 10.2534L8.91333 12.5L13.9133 7.5" stroke="white" strokeWidth="2" />
                          <defs>
                            <linearGradient id="paint0_linear_0_42" x1="-10" y1="10" x2="10" y2="30" gradientUnits="userSpaceOnUse">
                              <stop stopColor="#55DDFF" />
                              <stop offset="1" stopColor="#C058F3" />
                            </linearGradient>
                          </defs>
                        </svg>
                      ) : (
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <defs>
                            <linearGradient id="hoverGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#55DDFF" />
                              <stop offset="100%" stopColor="#C058F3" />
                            </linearGradient>
                          </defs>
                          <circle
                            cx="10"
                            cy="10"
                            r="9.5"
                            className="stroke-[#393A4B] transition-all duration-300 group-hover:stroke-[url(#hoverGradient)]"
                          />
                        </svg>
                      )}
                      </label>
            <h2 className={` capitalize ${task.completedTask ? "line-through dark:text-[#4D5067] text-[#D1D2DA]" : "dark:text-white text-[#494C6B]"}`}>{task.inputTask}</h2>
            </div>
            <RxCross1 className='hidden group-hover:block' onClick={()=>removeTasks(task.id)}/>
          </div>
          </TodoItem>
            ))
            }
              
             <div className='flex items-center justify-between p-2'>
               <div className='text-xs'>
                 {`${tasks.length} items left`}
               </div>
               <div className='hidden sm:block'>
               <div className='flex justify-center gap-2 dark:hover:text-[#E3E4F1] hover:text-[#494C6B]'>
                     <button className={`${category === 'all'? "text-blue-500": '' } text-xs `}  onClick={()=>setCategory('all')} >All</button>
                     <button className={`${category === 'activeTasks'? "text-blue-500": '' } text-xs`} onClick={()=>setCategory('activeTasks')}>Active</button>
                     <button className={`${category === 'completed'? "text-blue-500": '' } text-xs`}onClick={()=>setCategory('completed')}>Completed</button>
               </div>

               </div>
               <button className={`text-xs `} onClick={clearCompleted}>Clear completed</button>
             </div>
             </div>
             </SortableContext>
      </DndContext>
  
  )
}


export  {AllTasks,}