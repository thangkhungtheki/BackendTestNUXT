// index.js
const app = require('./app'); // Giả sử app.js cấu hình Express
const http = require('http');
const { Server } = require('socket.io');

const server = http.createServer(app);
const io = new Server(5000,{
  cors: {
    origin: ["http://192.168.2.134:3000","http://127.0.0.1:3000"],
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});

io.on('connection', (socket) => {
  socket.emit('User connected', socket.id)
  console.log('New client connected: ',socket.id);

  // Xử lý các sự kiện từ client
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });

  socket.on('chat',(data)=>{
    console.log('Client id: %s : %s', socket.id, data)
  })

  
  // Example: Khi database được cập nhật, phát sự kiện tới tất cả các client
//   function broadcastUpdate(data) {
//     io.emit('update', data);
//   }

  // Export function để sử dụng khi database được cập nhật
//   module.exports.broadcastUpdate = broadcastUpdate;
});

server.listen(4000, () => {
  console.log('Server is listening on port 4000');
})
