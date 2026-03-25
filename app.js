import express from 'express';
import {Server} from 'socket.io';
import http from 'http';
import cors from 'cors';


const app=express();


app.use(express.json());
app.use(express.urlencoded({extended:true}));
const server=http.createServer(app);



const io=new Server(server,{       
    cors:{
        origin:"http://localhost:5173",
        methods:['GET','POST'],
        credentials:true
    }
});
io.on("connection",(socket)=>{
    console.log("client connected",socket.id)
    socket.on("disconnect",()=>{
        console.log("connection closed",socket.id)
    })

    socket.on("message",(data)=>{
        console.log("message sent to client",data)
        socket.emit("takemsg",data)
        
    })
   
    socket.emit("message","hello from the server")
    
})





server.listen(3000,()=>{
    console.log("server started on the port 3000")
})
