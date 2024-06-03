// index.js
const app = require('./app'); // Giả sử app.js cấu hình Express
const http = require('http');
const { Server } = require('socket.io');

const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('New client connected');

  // Xử lý các sự kiện từ client
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });

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
