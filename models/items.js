/**
 * Created by Admin on 4/25/16.
 */
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    console.log('Stuff');
    res.send('items get function');
});

router.post('/items', function(req,res){
   // Message.create( req.body, (err, messages)=> {
        // res.send(messages);
        // res.render(path.join(__dirname + '/views/messages.jade'), {message1: messages})
    res.send('items post');
    });
router.put('/', function(req,res){
    //Message.edit(req.body, (err, messages) => {
        //res.send(messages);
        //res.render(path.join(__dirname + '/views/messages.jade'), {message1: err})
    res.send('items put')
    });
router.delete('/messages', function(req,res){
   // Message.delete(req.body.id, (err,messages) => {
        //res.send(messages);
        // res.render(path.join(__dirname + '/views/messages.jade'), {message1: messages})
    res.send('items delete')
    });


module.exports=router;