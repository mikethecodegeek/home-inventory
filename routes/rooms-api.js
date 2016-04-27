var mysql = require('mysql');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var connection = mysql.createConnection(
    {
        host     : 'localhost',
        user     : 'root',
        password : 'password',
        database : 'inventory'
    }
);

connection.connect();




module.exports = (function() {
    'use strict';
    var router = require('express').Router();

    router.get('/rooms', function(req, res) {
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
        connection.end();
    });
    router.post('/rooms', function(req, res) {
        //res.json('items-api');
        //require('../models/items');
        console.log(req.body);
        var roomname = req.body.roomname;
        var queryString = 'insert into rooms (roomame) values (?)',roomname;

    connection.query(queryString, function(err, rows, fields) {
        if (err) throw err;
        res.send(rows);

        for (var i in rows){
            console.log('Post Titles: ', rows[i].post_title);
        };
    });
    connection.end();
});
router.put('/rooms', function(req, res) {
    //res.json('items-api');
    //require('../models/items');
    var thisid = req.body.id;
    console.log('Put statement: ' +req.body.assignment);
    db.run('update rooms set roomname=? where id='+thisid,req.body.roomname);
    res.send('updated');

    connection.query(queryString, function(err, rows, fields) {
        if (err) throw err;

        for (var i in rows) {
            console.log('Post Titles: ', rows[i].post_title);
        }
    });
    connection.end();
});
router.delete('/items', function(req, res) {
    //res.json('items-api');
    //require('../models/items');
    var queryString = 'delete from rooms where id ='+req.body.id;
    connection.query(queryString, function(err, rows, fields) {
        if (err) throw err;

        for (var i in rows) {
            console.log('Post Titles: ', rows[i].post_title);
        }
    });
    connection.end();
});

return router;
})();