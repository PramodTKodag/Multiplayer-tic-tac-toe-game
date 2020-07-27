const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const port = 4001;

const app = express();

const server = http.createServer(app);

const io = socketIO(server)

io.on('connection', socket =>{
    console.log("user connected");
    socket.on('update_grid', (grid) => {
        console.log('update_grid value ', grid)
        io.sockets.emit('update_grid', grid)
    })

    socket.on('update_symbol', (symbol) => {
        console.log('update_symbol value ', symbol)
        io.sockets.emit('update_symbol', symbol)
    })

    socket.on('user_ready', (uuid) => {
        console.log('user_ready value ', uuid)
        io.sockets.emit('user_ready', uuid)
    })

    socket.on('player_turn', (uuid) => {
        console.log('player_turn value ', uuid)
        io.sockets.emit('player_turn', uuid)
    })

    socket.on('winner', (user) => {
        console.log('winner value ', user)
        io.sockets.emit('winner', user)
    })

    socket.on('disconnect', () => {
        console.log("User disconnected");
    })
})

server.listen(port, () => {
    console.log(`Listening on port ${port}`);
})