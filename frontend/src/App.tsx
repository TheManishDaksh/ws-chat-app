import "./App.css";
import {Route, Routes} from "react-router-dom"
import Create from "./pages/Create";
import Chat from "./pages/Chat";
import { useState, useEffect } from "react";

function App(){

  const [socket, setSocket] = useState<WebSocket>()
  const [messages, setMessages] = useState<String[]>([])
       
  useEffect(()=>{
    const ws = new WebSocket("ws://localhost:8000")

    ws.onopen=()=>{
      console.log("server is ready to connect");
    }
    ws.onmessage =(event)=>{
      if(event.data == "connected to server"){
        alert("connected to server")
      }
    }
     setSocket(ws)
  },[])
  
  return(
    <div> 
        <Routes>
          <Route path="/" element={<Create socket={socket} setSocket={setSocket}/>} />
          <Route path="/chat" element={<Chat socket={socket} messages={messages} setMessages={setMessages}/>} />
        </Routes>
    </div>
  )
}
export default App
