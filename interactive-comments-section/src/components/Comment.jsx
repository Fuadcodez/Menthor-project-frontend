import {useState, useEffect, useRef} from 'react'
import datas from '../data.json'
import ReplyTemplate from './ReplyTemplate';
import AddCommentTemplate from './AddCommentTemplate';
import BottomOverlay from './BottomOverlay';
import UserComment from './UserComment';
const Comment = () => {
    const [data, setData] = useState({})
    const [replying, setReply] = useState('')
    const [newComment, setNewComment] = useState("")
    const [overlay, setOverlay] = useState(false)
    const [deleteId, setDeleteId] = useState(null)
    // const [edit, setEdit] = useState(null)
    const [dataUpdate, setDataUpdate] = useState([])
    const editRef = useRef(null)

useEffect(() => {
  const getData = async () => {
    try {
      const storedData = localStorage.getItem("chats");
      
      if (storedData) {
        setData(JSON.parse(storedData));
      } else {
        const response = await fetch("/data.json");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const fetchedData = await response.json();
        
        localStorage.setItem("chats", JSON.stringify(fetchedData));
        setData(fetchedData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      localStorage.setItem("chats", JSON.stringify(datas));
      setData(datas);
    }
  };

  getData();
}, [dataUpdate]);
 const postReply = (id, replyTo,image,username)=>{
        const localData = JSON.parse(localStorage.getItem("chats"))
        const newReply = {
            "id": new Date().getTime(),
            "content": newComment,
            "createdAt": "today",
            "score": Math.floor(Math.random() * 9 + 1),
            "replyingTo": replyTo,
            "user": {
            "image": { 
                "png": image,
                "webp": image
            },
            "username": username
        }
    }
    const updatedeData = localData.comments.map((comment)=>{
        if (comment.id === id){
            return {...comment, "replies": [...comment.replies, newReply]}
        }
        return comment
    })
    const newData = {"currentUser": localData.currentUser, "comments": updatedeData}
    console.log(newData)
    localStorage.setItem("chats", JSON.stringify(newData))
    setDataUpdate([newData])
    setNewComment('')
    setReply("")
    
    
 }
 const DeleteComment = ()=>{
    console.log(deleteId)
        const localData = JSON.parse(localStorage.getItem("chats"))
        console.log(localData)
        const allData = localData.comments.map((data)=>{
        const filteredData = data.replies.filter((d)=>{
            return d.id !== deleteId
        })
        return {...data, "replies": filteredData}
        })
        console.log(allData)
        const newData = {"currentUser": localData.currentUser, "comments": allData}
        localStorage.setItem("chats", JSON.stringify(newData))
        setDataUpdate([newData])
        setDeleteId(null)
        setOverlay(false)
 }
//  const editComment = (id, reply)=>{
//     // const data = reply.content
//     // editRef.current.value = data
//     // setNewComment(data)
    
//  }
 const saveEditComment = ()=>{
//    const localData = JSON.parse(localStorage.getItem("chats"))
//       const updatedeData = localData.comments.map((comment)=>{
//         if (comment.id === id){
//             return {...comment, "replies": [...comment.replies, newReply]}
//         }
//         return comment
//     })
 }
 const sendComment = (image, username)=>{
     const localData = JSON.parse(localStorage.getItem("chats"))
    const newComments = {
            "id": new Date().getTime(),
            "content": newComment,
            "createdAt": "today",
            "score": Math.floor(Math.random() * 9 + 1),
            "user": {
            "image": { 
                "png": image,
                "webp": image
            },
            "username": username,
            
            },
            "replies": []

    }
    const updatedData =  {"currentUser": localData.currentUser, "comments": [...localData.comments, newComments]}
    localStorage.setItem("chats", JSON.stringify(updatedData))
    console.log(editRef.current.value)
    setDataUpdate([updatedData])
    setNewComment("")
    editRef.current.value = ""
 }
  return (
    <main className='bg-gray-400 h-full min-h-svh p-4 relative'>
        <div className='flex flex-col gap-5 mb-5'>
            {data?.comments?.map((comment, )=>(
            <div key={comment.id} className='flex flex-col gap-3'>
                <UserComment comment={comment} setReply={setReply}/>
                {replying === `${comment.user.username}` &&
                <ReplyTemplate data={data} newComment={newComment} setNewComment={setNewComment} postReply={postReply} comment={comment}/>
                }
                <div className=''>
                {comment?.replies?.length > 0 && (<div className='flex gap-5'>
                    <div className='w-1 bg-gray-300'>
                        
                    </div>
                    <div className='flex flex-col gap-4 w-full'>
                        {comment.replies.map((reply,)=>(
                            <div key={reply.id} className='flex flex-col gap-3'>
                            <AddCommentTemplate  reply={reply} data={data} setReply={setReply} setOverlay={setOverlay} setDeleteId={setDeleteId}  />
                            {replying === `${reply.user.username}` && 
                            <ReplyTemplate data={data} newComment={newComment} setNewComment={setNewComment} postReply={postReply} comment={reply}/>
                        }
                            </div>
                        ))
                        
                        }
                    </div>
                     
                </div>)}
                </div>
            </div>))}
        </div> 
         <BottomOverlay data={data}  editRef={editRef} setNewComment={setNewComment} comment={newComment} sendComment={sendComment} saveEditComment={saveEditComment}/>
         {overlay && <div className='bg-gray-700/60 bg-opacity-50 w-full h-full fixed top-0 left-0 z-[100] flex justify-center items-center'>
            <div className='bg-white w-[350px] p-4 rounded-lg'>
                <h2 className='font-bold text-xl text-[hsl(212,24%,26%)] mb-3'>Delete comment</h2>
                <p className='text-lg mb-3'>Are you sure you want to delete this comment? This will remove the comment and can&apos;t be undone.</p>
                <div className='flex items-center uppercase gap-4'>
                    <button className='uppercase bg-[hsl(211,10%,45%)] text-white px-4 py-1 rounded-lg' onClick={()=>setOverlay(false)}>No cancel</button>
                    <button className='uppercase bg-[hsl(358,79%,66%)] text-white px-4 py-1 rounded-lg' onClick={ DeleteComment}>YES DELETE</button>
                </div>
            </div>
            </div>}
    </main>
  )
}

export default Comment