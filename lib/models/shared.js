/**
 * Emit the standard error message across the SocketIO connection
 */
var emit_error = function(event, err, socket) {
  if(Array.isArray(socket)) {
    for(var i = 0; i < socket.length; i++) {
      socket[i].emit("data", {
          event: event
        , ok: false
        , is_error:true
        , error: err
      });          
    }
  } else {
    socket.emit("data", {
        event: event
      , ok: false
      , is_error:true
      , error: err
    });    
  }
}

/**
 * Emit the standard message across the SocketIO connection
 */
var emit_message = function(event, message, socket) {
  // Add event
  message.event = event;
  // Emit
  socket.emit("data", message);
}

/**
 * Emit a message to all clients minus the excluded session id connection
 */
var emit_message_all = function(io, event, message, exclude_sid) {
  var clients = io.sockets.clients();

  // Locate our session id
  for(var i = 0; i < clients.length; i++) {
    if(clients[i].handshake.sessionID != exclude_sid) {
      emit_message(event, message, clients[i]);
    }
  }
} 

exports.emit_error                      = emit_error;
exports.emit_message                    = emit_message;
exports.emit_message_all                = emit_message_all;
