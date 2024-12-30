/* eslint-disable react/prop-types */
import { HiMiniMinusSmall } from "react-icons/hi2"
import { IoIosAdd } from "react-icons/io";
import { FaReply } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
const AddCommentTemplate = ({reply, data, setReply, setOverlay, setDeleteId, setEdit, editComment}) => {
    
  return (
     <div>
        <div  className='w-full py-3 px-5 flex flex-col bg-white text-gray-500 rounded-lg gap-3 md:flex-row-reverse relative md:gap-6 md:items-start'>
            <div className='flex flex-col gap-2'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                <img src={reply?.user?.image.png} alt={`${reply?.username}-image`} className='w-10'/>
                <h2 className='text-blue-950 font-bold text-lg'>{reply.user.username}</h2>
                <h2>{reply.createdAt}</h2>

                </div>
                  {reply.user.username === data.currentUser.username && (
                    <div className=' hidden md:block'>
                        <div className='flex items-center gap-4  pr-2'>
                    <button className='flex items-center gap-1 text-red-600' onClick={()=> (setDeleteId(reply.id), setOverlay(true))}><MdDelete />
                    <h3 className='text-lg font-bold' >Delete</h3></button>
                    <button className='flex items-center gap-1 text-blue-900'  onClick={()=>(setEdit(reply.id), editComment(reply.id))}><MdOutlineEdit />
                    <h3 className='text-lg font-bold' >Edi</h3></button>
                        </div>
                    </div>
                )}
            </div>
            <div>
                <p className='text-lg font-semibold'><span className='text-lg font-bold text-blue-950 '> {`@${reply.replyingTo}`}</span> {reply.content}</p>
            </div>

            </div>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2 bg-gray-200 py-1 px-3 border-none rounded-lg md:flex-col'>
                    <IoIosAdd />
                    <p className='font-bold text-blue-900'>{reply.score}</p>
                    <HiMiniMinusSmall />
                </div>
                {reply.user.username === data.currentUser.username ? (
                    <div className='flex items-center gap-4 md:hidden'>
                    <button className='flex items-center gap-1 text-red-600'  onClick={()=> (setDeleteId(reply.id), setOverlay(true))}><MdDelete />
                    <h3 className='text-lg font-bold'>Delete</h3></button>
                    <button className='flex items-center gap-1 text-blue-900' onClick={()=>(setEdit(reply.id), editComment(reply.id, reply))}><MdOutlineEdit />
                    <h3 className='text-lg font-bold'>Edit</h3></button>
                    </div>
                ):(
                        <button className='text-blue-900 flex items-center gap-2 cursor-pointer md:absolute right-8 top-5' onClick={()=>setReply(`${reply.user.username}`)}>
                    <FaReply size={14} />
                    <h3 className='text-lg font-bold'>Reply</h3>
                    </button>

                )
                }
            </div>
        </div>
                                        
    </div>
  )
}

export default AddCommentTemplate