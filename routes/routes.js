/**
 * Created by Admin on 4/25/16.
 */
var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.use(express.static('public'));
//app.use('/rooms',routes);
var connection = mysql.createConnection(
    {
        host     : 'localhost',
        user     : 'root',
        password : 'password',
        database : 'inventory'
    }
);

//connection.connect();
module.exports = (function() {
    'use strict';
    var router = require('express').Router();

    router.get('/', function(req, res) {
        var queryString = 'SELECT * FROM items3 inner join rooms on items3.room=rooms.id';
        connection.query(queryString, function (err, rows, fields) {
            if (err) throw err;
            console.log(rows);
            res.render('../views/index.ejs',{items: rows});

            return router;
        });
    });
   // router.get('/rooms',require('./rooms-api'));
    router.get('/items',  function(req, res) {
       // connection.connect();
        //res.json('items-api');
        //require('../models/items');
      //  console.log('itemstest');
        var queryString = 'SELECT * FROM items3';
        connection.query(queryString, function (err, rows, fields) {
            if (err) throw err;
        //    connection.end();
            res.send(rows);

            return router;
        });
      //  connection.end();

    });
    router.post('/items', function(req, res) {
    //    connection.connect();
        var name = req.body.name;
        var description = req.body.description;
        var value = req.body.value;
        var room = req.body.room;
        var queryString = 'insert into items3 (name, description, value, room) values ("'+name+'","'+description+'","'+value+'","'+room+'")';

      //  var queryString = 'insert into items (name) values ("gibson")';

        connection.query(queryString, function(err, rows, fields) {

            res.send(rows);
          //  connection.end();
            return router;
        });


    });
    router.delete('/items', function(req, res) {
        //res.json('items-api');
        //require('../models/items');
        var id = req.body.id;
        var queryString = 'delete from items3 where itemsid='+id;
        //  'update student set assignment=? where id='+thisid,req.body.assignment);
        connection.query(queryString, function(err, rows, fields) {
            if (err) throw err;

            res.send(rows);
         ///   connection.end();
            return router;
        });

    });
    router.put('/items', function(req, res) {
        //res.json('items-api');
        //require('../models/items');
        var id = req.body.id;
        var name = req.body.name;
        var description = req.body.description;
        var value = req.body.value;
        var room = req.body.room;
        var queryString = 'update items3 set name="'+name+'" where itemsid='+id;
        //  'update student set assignment=? where id='+thisid,req.body.assignment);
        connection.query(queryString, function(err, rows, fields) {
            if (err) throw err;
            //res.send(rows);
      //      connection.end();
        });
        var queryString = 'update items3 set description="'+description+'" where itemsid='+id;
        //  'update student set assignment=? where id='+thisid,req.body.assignment);
        connection.query(queryString, function(err, rows, fields) {
            if (err) throw err;
           // res.send(rows);
            //      connection.end()
        });
        var queryString = 'update items3 set value="'+value+'" where itemsid='+id;
        //  'update student set assignment=? where id='+thisid,req.body.assignment);
        connection.query(queryString, function(err, rows, fields) {
            if (err) throw err;
            //res.send(rows);

        });
        var queryString = 'update items3 set room="'+room+'" where itemsid='+id;
        //  'update student set assignment=? where id='+thisid,req.body.assignment);
        connection.query(queryString, function(err, rows, fields) {
            if (err) throw err;
            res.send(rows);
            //      connection.end();
            return router;
        });

    });
    return router;
})();

