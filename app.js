'use strict';
const PORT = process.env.PORT || 3006;
var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var routes = require('./routes/routes.js');
app.use(express.static('public'));
app.use('/', routes);
app.set('view engine','ejs');
var connection = mysql.createConnection(
    {
        host     : 'localhost',
        user     : 'root',
        password : 'password',
        database : 'inventory'
    }
);

connection.connect();
app.get('/rooms', function(req, res) {
   // connection.connect();
    //res.json('items-api');
    //require('../models/items');
    var queryString = 'SELECT * FROM rooms';

    connection.query(queryString, function(err, rows, fields) {
        if (err) throw err;
        res.send(rows);
        for (var i in rows) {
            //    res.send(rows);
        }
    });
    //connection.end();
});

app.post('/rooms', function(req, res) {
    //res.json('items-api');
    //require('../models/items');
    console.log(req.body.roomname);
    var roomname = req.body.roomname;
    var queryString = 'insert into rooms (roomname) values ("'+roomname+'")';

    connection.query(queryString, function(err, rows, fields) {
        if (err) throw err;
        res.send(rows);

        for (var i in rows){
           // console.log('Post Titles: ', rows[i].post_title);
        };
    });
  //  connection.end();
});
app.put('/rooms', function(req, res) {
    //res.json('items-api');
    //require('../models/items');
    var id = req.body.id;
    var roomname = req.body.roomname;
    var queryString = 'update rooms set roomname="'+roomname+'" where id='+id,roomname;
  //  'update student set assignment=? where id='+thisid,req.body.assignment);
    connection.query(queryString, function(err, rows, fields) {
        if (err) throw err;
        res.send(rows);

        for (var i in rows){
            // console.log('Post Titles: ', rows[i].post_title);
        };
    });
   // connection.end();
});
app.delete('/rooms', function(req, res) {
    //res.json('items-api');
    //require('../models/items');
    var id = req.body.id;
    var roomname = req.body.roomname;
    var queryString = 'delete from rooms where id='+id;
    //  'update student set assignment=? where id='+thisid,req.body.assignment);
    connection.query(queryString, function(err, rows, fields) {
        if (err) throw err;
        res.send(rows);

        for (var i in rows){
            // console.log('Post Titles: ', rows[i].post_title);
        };
    });
  //  connection.end();
});

app.listen(PORT, err => {
    console.log( err || `Server listening on port ${PORT}` );
});
