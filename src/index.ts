import { on, WebSocketServer } from "ws";

const wss = new WebSocketServer({port: 8000});

wss.on("connection", function(socket){
    console.log("connected");
    socket.on("message", (event)=>{
       if(event.toString() === "ping"){       
        socket.send("pong")
       }
    })  
})
