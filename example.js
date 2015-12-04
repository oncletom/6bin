'use strict';

var BinServer = require('./js/server/main.js').BinServer;

var server = new BinServer();

server.start(3000);

server.on('measurementRequest', function(request){
    var self = this;

    console.log('msg received', request);
    setTimeout(function(){
        console.log('emitting');
        self.emit('6bin', {
            index: request.index,
            isSuccessful: true
        });
    }, 1000);

});

server.on('binsRequest', function(request){
    var self = this;

    console.log('msg received', request);
    setTimeout(function(){
        console.log('emitting');
        self.emit('6bin', {
            index: request.index,
            isSuccessful: true,
            bins: request.bins
        });
    }, 1000);
});