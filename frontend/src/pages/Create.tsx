import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
//@ts-ignore

function Create({socket,setSocket}) {
 
  const navigate = useNavigate()
  const inputRef = useRef(null)

  function generateRoom(){
    console.log("btn clicked");
    
    if(!socket){
      alert("connection not established")
    }
    //@ts-ignore
    const roomId = inputRef.current?.value

    socket?.send(JSON.stringify({
      type: "join",
      payload : {  
      roomId : roomId
      }
      
    }) )
    //@ts-ignore
    socket.onmessage=(event)=>{
      if(event.data == "Room created successfully"){
        console.log("room clicked");
        navigate('/chat');
        alert("Room created successfully");
      }
    }
  }

  
return(
  <div className="bg-black w-screen h-screen ">
    <div className="text-2xl text-white p-4 font-bold">ChatStation</div>
    <div className=" flex justify-center items-center">
    <div className="flex flex-col text-white justify-center items-center h-52 w-72 bg-slate-800 gap-4 rounded-lg">
      <div className="font-semibold">Enter or Generate your chat room</div>

      <input ref={inputRef}
      type="text" placeholder="Enter Room Name or Id" 
      className="w-48 h-12 text-center border-slate-500  border-2 rounded-lg" />
      <button onClick={generateRoom}
        className="font-semibold bg-slate-500 p-2 rounded-lg hover:bg-slate-600 cursor-pointer"
      >Generate/Enter Room</button>
    </div>
  </div>
  </div>
)
}
export default Create;