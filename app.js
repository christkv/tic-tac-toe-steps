var env                               = require('./env')
  , main_controller                   = require('./lib/controllers/main_controller');

var register_handler                  = require('./lib/handlers/login_handler').register_handler
  , login_handler                     = require('./lib/handlers/login_handler').login_handler
  , find_all_available_gamers         = require('./lib/handlers/gamer_handler').find_all_available_gamers
  , invite_gamer                      = require('./lib/handlers/gamer_handler').invite_gamer
  , decline_game                      = require('./lib/handlers/gamer_handler').decline_game
  , accept_game                       = require('./lib/handlers/gamer_handler').accept_game
  , place_marker                      = require('./lib/handlers/gamer_handler').place_marker
  , send_message                      = require('./lib/handlers/chat_handler').send_message
  , disconnected                      = require('./lib/handlers/user_handler').disconnected; 

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
    
    // The game invite and play methods
    socket.on('find_all_available_gamers', find_all_available_gamers(io, socket, session_store, db));  
    socket.on('invite_gamer', invite_gamer(io, socket, session_store, db));
    socket.on('decline_game', decline_game(io, socket, session_store, db));
    socket.on('accept_game', accept_game(io, socket, session_store, db));
    socket.on('place_marker', place_marker(io, socket, session_store, db));

    // Accepts chat messages
    socket.on('send_message', send_message(io, socket, session_store, db));

    // On disconnect
    socket.on('disconnect', disconnected(io, socket, session_store, db));

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