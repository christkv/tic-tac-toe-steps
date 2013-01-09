var env                               = require('./env')
  , main_controller                   = require('./lib/controllers/main_controller');

var register_handler                  = require('./lib/handlers/login_handler').register_handler
  , login_handler                     = require('./lib/handlers/login_handler').login_handler


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
    socket.on('register', register_handler(io, socket, session_store, db));
    socket.on('login', login_handler(io, socket, session_store, db));
    
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