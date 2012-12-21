var env                               = require('./env')
  , main_controller                   = require('./lib/controllers/main_controller');

env.initialize(function(err, app, io, session_store, db) {  
  if(err) throw err;

  //
  // http routes
  //
  app.get('/', main_controller.index());

  //
  // websocket api end point handlers (our API)
  //
  io.sockets.on('connection', function (socket) {
    
    // Fire the init message to setup the game
    socket.emit('data', {event:'init', ok:true, result: socket.handshake.sessionID});
  });

  //
  // fire up the server
  //  
  env.run(function(err) {
    if(err) throw err;
    
    //
    // nothing to do
    //
  });
});