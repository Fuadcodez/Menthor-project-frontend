import React from 'react'

const BottomOverlay = ({data, edit, editRef, sendComment, setNewComment, newComment, saveEditComment}) => {
  const image = data?.currentUser?.image?.png
  const username = data?.currentUser?.username
  return (
     <div className='bg-white px-4 py-6 rounded-lg flex flex-col gap-5 sticky w-full z-50 bottom-2'>
        <div>
            <textarea name="comment-section" id="comment" placeholder='Add a comment...' className='border w-full p-4 rounded-lg outline-none' ref={editRef} onChange={(e)=>setNewComment(e.target.value)} value={newComment}/>
        </div>
        <div className='flex justify-between items-center'>
            <img src={data?.currentUser?.image?.png} alt={`${data?.currentUser?.username}-image`}  className='w-10'/>
            {edit? <button type='button' className=' py-3 px-5 bg-blue-900 text-white rounded-lg' onClick={()=>saveEditComment()}>UPDATE</button>: <button type='button' className=' py-3 px-5 bg-blue-900 text-white rounded-lg' onClick={()=>sendComment(image, username)}> SEND</button>}
        </div>
    </div>
  )
}

export default BottomOverlay