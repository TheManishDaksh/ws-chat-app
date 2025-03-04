import React, { useEffect, useRef, useState } from 'react'

//@ts-ignore
function Chat({socket, messages, setMessages}) {

    const messageRef = useRef(null)
      
    if(socket && socket.readyState === WebSocket.OPEN){
      console.log("reach on socket message");
      
    useEffect(()=>{
      //@ts-ignore
      socket.onmessage=(event)=>{
        console.log("setmessage");
        
        //@ts-ignore
        setMessages((message)=>[...message, event.data])
      }
    },[socket, setMessages, messages])
  }else{
    console.log("connection lost");
    
  }
  
      function sendMessage(){
        console.log("sendmessage");
        
         //@ts-ignore
      const message = messageRef.current.value
        //@ts-ignore
        socket.send(JSON.stringify({
          type : "chat",
          payload : {
            message : message
          }
        }))
      }  
    
    
  return (
   <div className='bg-black w-screen h-screen flex justify-center items-center'>
     <div className='text-white border-2 border-slate-700 rounded-lg w-96 h-[36rem]'> 
        <div className='h-[33.5rem] p-4'>
           <div>
           { //@ts-ignore
           messages.map((message, index)=>{
            <span key={index} className='bg-slate-600 p-2 rounded-lg'>
              {message}
            </span>
           })}
           </div>
        </div>
        <div>
            <div className='flex flex-row '>
                <input ref={messageRef}
                onKeyDown={(e)=> e.key == "Enter" && sendMessage()}
                type="text" placeholder='write your message' 
                className='w-80 px-2' />
                <button onClick={sendMessage}
                className='bg-slate-500 px-2 py-1 text-lg rounded-lg cursor-pointer hover:bg-slate-600'
                >Send</button>
            </div>
        </div>
    </div>
   </div>
  )
}

export default Chat