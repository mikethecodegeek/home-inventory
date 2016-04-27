/**
 * Created by Admin on 4/25/16.
 */
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

    router.get('/items', function(req, res) {
        //res.json('items-api');
        //require('../models/items');
        var queryString = 'SELECT * FROM items';

        connection.query(queryString, function(err, rows, fields) {
            if (err) throw err;

            for (var i in rows) {
                console.log('Post Titles: ', rows[i].post_title);
            }
        });
        connection.end();
    });
    router.post('/items', function(req, res) {
        //res.json('items-api');
        //require('../models/items');
        var queryString = 'insert into items (itemname, location, value,category,description) values (?,?,?,?,?)',assignment,grade,total,letter;

        connection.query(queryString, function(err, rows, fields) {
            if (err) throw err;

            for (var i in rows) {
                console.log('Post Titles: ', rows[i].post_title);
            }
        });
        connection.end();
    });
    router.put('/items', function(req, res) {
        //res.json('items-api');
        //require('../models/items');
        var thisid = req.body.id;
        console.log('Put statement: ' +req.body.assignment);
        db.run('update items set itemname=? where id='+thisid,req.body.itemname);
        db.run('update items set location=? where id='+thisid,req.body.location);
        db.run('update items set value=? where id='+thisid,req.body.value);
        db.run('update items set category=? where id='+thisid,req.body.category);
        db.run('update items set description=? where id='+thisid,req.body.description);
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
        var queryString = 'delete from items where id ='+req.body.id;
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