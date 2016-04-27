/**
 * Created by Admin on 4/26/16.
 */
$(document).ready(function() {
    init()
});

function init() {
    "use strict";
    var nextRow =$('table tr:last')[0].id;
    var rooms = [];
    $.get( "/rooms", function( data ) {
       // console.log(data[0].roomname);
        var option ='';
        for (var a=0; a<data.length; a++){
           // rooms.push(data[a].roomname);
            option += '<option value="'+ data[a].id + '">' + data[a].roomname + '</option>';
          //  console.log(data);
        };
        $('#rooms').append(option);
    })



   // $('.delete').on("click",function() {
     //   console.log($(this).parent().parent()[0].id);
    //});
    $('.delete').click(function() {
        var button = $(this).parent().parent()[0];
     //   console.log(button.id);
        delrow(button);
     
    });
    function delrow(row){
      //  console.log(row);
        $.ajax({
            type: "DELETE",
            url: "/items",
            data: {
                "id": row.id
            },
            success: function(){
                row.remove();
            },
            dataType: null
        });
    }
    $('#post').click(function(event) {
        event.preventDefault();
        var name = $('#item').val();
        var description = $('#desc').val();
        var value = $('#value').val();
        var room = $('#rooms').val();
        var roomname = $('#rooms :selected').text()
        $.ajax({
            type: "POST",
            url: "/items",
            data: {
                "name": name,
                "description": description,
                "value": value,
                "room": room
            },
            success: function(){
                nextRow++;
                $('table').append('<tr id='+nextRow+'><td>'+name+'</td><td>'+description+'</td><td>'+value+'</td>' +
                    '<td>'+roomname+'</td><td><button class="delete">Delete</button></td><td><button class="update">Update</button></td></tr>');
                $('.delete').click(function(){
                    var button = $(this).parent().parent()[0];
                    delrow(button);
                });
                $('.update').click(function() {
                    var button = $(this).parent().parent()[0];
                    updaterow(button);
                })
            },
            dataType: null
        });
    });
 
    $('#makeroom').click(function(event) {
        event.preventDefault();
        var name = $('#roomname').val();
        $.ajax({
            type: "POST",
            url: "/rooms",
            data: {
                "roomname": name
            },
            success: function(){
                var option = '';
                option += '<option value="'+ name + '">' + name + '</option>';
                $('#rooms').append(option);
                $('#roomname').val('');
                $('#addRoomModal').modal('hide');
            },
            dataType: null
        });
    });
    
    $('#addroom').click(function() {
        $('#addRoomModal').modal('show');
    });
    $('#delroom').click(function() {
        $.get( "/rooms", function( data ) {
            // console.log(data[0].roomname);
            var option ='';
            for (var a=0; a<data.length; a++){
                // rooms.push(data[a].roomname);
                option += '<option value="'+ data[a].id + '">' + data[a].roomname + '</option>';
                //  console.log(data);
            };
            $('#delrooms').append(option);
            $('#delRoomModal').modal('show');
        })
    });

    $('#remove').click(function(ev) {
        ev.preventDefault();
        $.ajax({
            type: "DELETE",
            url: "/rooms",
            data: {
                "id":$('#delrooms :selected').val(),
                "roomname": $('#delrooms :selected').text()
            },
            success: function(){
                $('#delRoomModal').modal('hide');
            },
            dataType: null
        });

    });
        
        
}
