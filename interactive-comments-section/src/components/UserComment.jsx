import React from 'react'

import { FaReply } from 'react-icons/fa6'
import { HiMiniMinusSmall } from 'react-icons/hi2'
import { IoIosAdd } from 'react-icons/io'

const UserComment = ({comment, setReply}) => {
  return (
   <div  className='w-full py-3 px-5 flex flex-col bg-white text-gray-500 rounded-lg gap-3 md:flex-row-reverse relative md:gap-6 md:items-start'>
        <div className='flex flex-col gap-2 flex-1'>
        <div className='flex items-center gap-3'>
            <img src={comment?.user?.image.png} alt={`${comment?.user.username}-image`} className='w-10'/>
            <h2 className='text-blue-950 font-bold text-lg'>{comment.user.username}</h2>
            <h2>{comment.createdAt}</h2>
        </div>
        <div className='md:flex-1'>
            <p className='text-lg font-semibold'>{comment.content}</p>
        </div>
        </div>
        <div className='flex items-center justify-between md:justify-start'>
            <div className='flex items-center gap-2 bg-gray-200 py-1 px-3 border-none rounded-lg md:flex-col'>
                <IoIosAdd />
                <p className='font-bold text-blue-900'>{comment.score}</p>
                <HiMiniMinusSmall />
            </div>
            <button className='text-blue-900 flex items-center gap-2 cursor-pointer md:absolute right-8 top-5' onClick={()=>setReply(`${comment.user.username}`)}>
            <FaReply size={14} />
            <h3 className='text-lg font-bold'>Reply</h3>
            </button>
        </div>
    </div>
  )
}

export default UserComment