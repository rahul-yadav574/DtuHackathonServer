/**
 * Created by Brekkishhh on 11-08-2016.
 */

var http = require('http').createServer(serverHandler);
var io = require('socket.io')(http);
var fs = require('fs');
var sql = require('mysql');

var connection = sql.createConnection({
    host: 'localhost',
    user: 'qwerty',
    password: 'pawanyadav',
    database: 'dtuapp'
});

connection.connect(function (err) {
    if(err){console.log('error in db');}
    console.log('connected to db');
});

http.listen(process.env.PORT ||3000);



function serverHandler(req,res) {
    var filePath = 'index.html';

    if (req.url == '/') {
        filePath = 'index.html';
    } else if (req.url == '/patient.html') {
        filePath = "patient.html";
    }
    else if (req.url == '/details1.html') {
        filePath = "details1.html"
        }


    fs.readFile(filePath,function (err, data){
        res.writeHead(200, {'Content-Type': 'text/html','Content-Length':data.length});
        res.write(data);
        res.end();
    });

}


io.on('connection',function (socket) {

    socket.on('update',function (data) {
        console.log(data);
        socket.emit('info','Hey You Have to take a right....');
    });

    socket.on('your_turn',function (data) {
        console.log('new turn');
        io.emit('your_call','hiii');
    });

    socket.on('send_message',function(data){
        console.log(data);
        io.emit('your_call');
    });

    socket.on('menu_request',function (data) {
        console.log('table number ',data,'requested for menu...');
        socket.emit('menu_response',menu);
    });

    socket.on('newp',function (data) {
        io.emit('new_order',data);

        //here,we have got a new order process it...
    });

    socket.on('final_call',function (data) {
        console.log(data);
        io.emit('finally',data);
    });

    socket.on('user_payment_request',function (data) {
        io.emit('payment_request',data);
        console.log(data);
    });

    socket.on('order_completed',function (data) {
        io.emit('order_done',data);
        console.log(data);
    });
});
