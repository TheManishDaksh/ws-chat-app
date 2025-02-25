import { on, WebSocketServer } from "ws";

const wss = new WebSocketServer({port: 8000});

interface user{
    socket: WebSocket
    room: string
}
let allUser = 0;
let allSocket:user[] = [];

wss.on("connection", function(socket){
    console.log("user connected " + allUser);
    
    socket.on("message", (message:string)=>{
        const parsedMessage = JSON.parse(message)
       if(parsedMessage.type == "join"){
            allUser = allUser+1;
            console.log( allUser +" has joined to "+ parsedMessage.payload.roomId );
            allSocket.push({
                //@ts-ignore
                socket,
                roomId : parsedMessage.payload.roomId
            })
       }
       if(parsedMessage.type == "chat"){
        //@ts-ignore
        const currentUserRoom = allSocket.find((x)=>x.socket === socket)?.room;

        const userInRoom = allSocket.filter((x)=>x.room === currentUserRoom)

        if(userInRoom){
            userInRoom.forEach((sandesh)=>{
                sandesh.socket.send(parsedMessage.payload.message)
            })
        }
       }
        
    })
})  
