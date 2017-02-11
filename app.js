/**
 * Created by Brekkishhh on 11-08-2016.
 */

var http = require('http').createServer(serverHandler);
var io = require('socket.io')(http);
var fs = require('fs');
var sql = require('mysql');

var connection = sql.createConnection({
    host: 'localhost',
    user: 'rahulyadav574',
    password: '',
    database: 'nodedb'
});

connection.connect(function (err) {
    if(err){console.log('error in db');}
    else {
        console.log('connected to db');
    }
});

http.listen(process.env.PORT ||3000);



function serverHandler(req,res) {


    if (req.url == '/') {
        filePath = "public/index.html";
    }

    

    fs.readFile('index.html',function (err, data){
        res.writeHead(200, {'Content-Type': 'text/html','Content-Length':data.length});
        res.write(data);
        res.end();
    });

}



io.on('connection',function (socket) {

    socket.on('newp',function (data) {
        io.emit('new_order','hello');
    });

    
    console.log('hiii');

    socket.on('update',function (data) {
        console.log(data);
        socket.emit('info','Hey You Have to take a right....');
    });



    socket.on('send_order',function (data) {
        
        console.log(data);
        console.log('data');
      
        //here,we have got a new order process it...
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
