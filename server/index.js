const express = require('express');
const app = express();

/* Here is creating a web server */
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


/* this set a Html */
app.use(express.static('client'));

/* route */

let message = [{
    id: 1,
    text: 'welcome Chat private of Guti...',
    username: 'emanleand'
}];
/* This method receive the conexion of client */
io.on("connection", function (socket) {
    console.log('Client with ip' + socket.handshake.address + ' is connected..');
    socket.emit('message', message);
    
    /* This method receive the message of client */
    socket.on('add-message', function (data) {
        message.push(data);
        io.sockets.emit('message', message);
    });
});


server.listen(6677, function() {
    console.log('server run in http://localhost:6677');
});