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
    console.log('connected to db');
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

var menu =  {"menu":[{"name":"Hakka Noodles","type":"Chinese","id":1,"price":100,"imageurl":"http://images.mapsofindia.com/my-india/Chinese-Hakka-Noodles.jpg","cookingtime":"5 min","rating":"90%"},
{"name":"Manchurian","type":"Chinese","id":2,"price":180,"imageurl":"http://www.indiegoboston.com/wp/wp-content/uploads/2015/10/veg-manchurian.jpg","cookingtime":"10 min","rating":"80%"},
{"name":"Momo","type":"Chinese","id":3,"price":40,"imageurl":"http://www.royalnepalese.com/wp-content/uploads/2016/02/f98ef-momo.jpg","cookingtime":"25 min","rating":"50%"},
{"name":"Spring roll","type":"Chinese","id":4,"price":60,"imageurl":"http://myspicetraildotcom.files.wordpress.com/2011/10/shutterstock_84569656.jpg","cookingtime":"10 min","rating":"80%"},
{"name":"Dosa","type":"South Indian","id":5,"price":80,"imageurl":"http://www.foodguruz.in/wp-content/uploads/2015/12/paper-dosa_foodguruz.in_.jpg","cookingtime":"5 min","rating":"90%"},
{"name":"Idli Sambhar","type":"South Indian","id":6,"price":250,"imageurl":"http://media.santabanta.com/rec/idli-sambar.jpg","cookingtime":"10 min","rating":"40%"},
{"name":"Uttapam","type":"South Indian","id":7,"price":100,"imageurl":"http://2.bp.blogspot.com/-uW_itttibns/Ve3_XdH0jRI/AAAAAAAAMeI/UINeoPjyCUw/s1600/II1A2367.JPG","cookingtime":"2 min","rating":"70%"},
{"name":"Chicken Caesar Salad","type":"Continental","id":8,"price":350,"imageurl":"http://www.taste.com.au/images/recipes/tas/2016/02/chicken-caesar-pasta-salad-34146_l.jpeg","cookingtime":"15 min","rating":"20%"},
{"name":"Devilled eggs","type":"Continental","id":9,"price":250,"imageurl":"http://foodnetwork.sndimg.com/content/dam/images/food/fullset/2012/2/9/0/SH1403_Straight-Up-Deviled-Eggs_s4x3.jpg","cookingtime":"10 min","rating":"70%"},
{"name":"Yorkshire Patties","type":"Continental","id":10,"price":100,"imageurl":"http://i1.birminghammail.co.uk/whats-on/food-drink-news/article9898708.ece/ALTERNATES/s615b/Welsh-Lamb-Apricot-Burger.jpg","cookingtime":"5 min","rating":"10%"},
{"name":"Khao Soi","type":"Continental","id":11,"price":250,"imageurl":"https://upload.wikimedia.org/wikipedia/commons/b/b0/Khao_soi_Mae_Sai.JPG","cookingtime":"7 min","rating":"20%"},
{"name":"Coffee","type":"Beverage","id":12,"price":297,"imageurl":"http://kahaniexpress.com/wp-content/uploads/2012/12/cup-of-coffee-236808.jpg","cookingtime":"9 min","rating":"80%"},
{"name":"Tea","type":"Beverage","id":13,"price":200,"imageurl":"http://spydersalejacket.net/wp-content/uploads/2016/01/hot-drinks-4.jpg","cookingtime":"12 min","rating":"90%"},
{"name":"Coke","type":"Beverage","id":14,"price":169,"imageurl":"http://www.mcdonaldsindia.net/images/large/Coke-Pet-Bottle.png","cookingtime":"5 min","rating":"95%"},
{"name":"Milk Shake","type":"Beverage","id":15,"price":96,"imageurl":"http://i.huffpost.com/gen/1347436/thumbs/o-CHOCOLATE-MILKSHAKE-facebook.jpg","cookingtime":"5 min","rating":"70%"},
{"name":"Quick Cherry Crisp","type":"Beverage","id":16,"price":89,"imageurl":"http://images.midwestliving.mdpcdn.com/sites/midwestliving.com/files/styles/slide/public/Quick-Cherry-Crisp-R163952.jpg","cookingtime":"3 min","rating":"80%"},
{"name":"Blackberry-Banana Lemon Trifle ","type":"Beverage","id":17,"price":100,"imageurl":"http://images.midwestliving.mdpcdn.com/sites/midwestliving.com/files/styles/slide/public/Blackberry-Banana-Trifle-RU221806.jpg","cookingtime":"7 min","rating":"70%"},
{"name":"Spiked Chocolate Fondue ","type":"Beverage","id":18,"price":100,"imageurl":"http://images.midwestliving.mdpcdn.com/sites/midwestliving.com/files/styles/slide/public/Spiked-Chocolate-Fondue-RU218781.jpg","cookingtime":"4 min","rating":"100%"},
{"name":"Brie Apple Quesadillas ","type":"Beverage","id":19,"price":500,"imageurl":"http://images.midwestliving.mdpcdn.com/sites/midwestliving.com/files/styles/slide/public/Brie-Apple-quesadillas-RU272817.jpg","cookingtime":"4 min","rating":"40%"}


]};

io.on('connection',function (socket) {

    socket.on('update',function (data) {
        console.log(data);
        socket.emit('info','Hey You Have to take a right....');
    });

    socket.on('send_message',function(data){
        console.log(data);
        socket.emit('receive_message','hello');
    });

    socket.on('menu_request',function (data) {
        console.log('table number ',data,'requested for menu...');
        socket.emit('menu_response',menu);
    });

    socket.on('send_order',function (data) {
        io.emit('new_order',data);
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
