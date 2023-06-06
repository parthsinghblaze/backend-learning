const express = require('express');

const app = express();


const port = process.env.PORT || 3000;

app.use(express.static('public'));

const server = app.listen(port, () => {
    console.log("I am running in ", port);
})

let io = require('socket.io')(server)

io.on('connection', (socket) => {
    console.log(`New connection: ${socket.id}`)
    //  Recieve event
    socket.on('comment', (data) => {
        data.time = Date()
        console.log('data', data);
        socket.broadcast.emit('comment', data);
    })

    socket.on('typing', (data) => {
        console.log(`Typing: ${socket.id}`)
        socket.broadcast.emit('typing', data)
    })

})