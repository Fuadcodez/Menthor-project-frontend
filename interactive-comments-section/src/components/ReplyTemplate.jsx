import React from 'react'

const ReplyTemplate = ({data, newComment, setNewComment, postReply, comment}) => {
  return (
   <div className='bg-white px-4 py-6 rounded-lg flex justify-between items-start gap-3'>
    <div className=''>
        <img src={data?.currentUser?.image?.png} alt={`${data?.currentUser?.username}-image`}  className='w-10'/>
    </div>
    <div className='flex-1'>
            <textarea type='text' name="comment-section" id="comment" placeholder='Add a comment...' className='border w-full p-4 rounded-lg outline-none' value={newComment} onChange={(e)=>setNewComment(e.target.value)} />
        
    </div>
        <button type='button' className=' py-3 px-5 bg-blue-900 text-white rounded-lg' onClick={()=>postReply(comment.id, comment.user.username,data.currentUser.image.png, data.currentUser.username)}>REPLY</button>
    </div>
  )
}

export default ReplyTemplate