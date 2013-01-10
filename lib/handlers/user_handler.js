var emit_message = require("../models/shared").emit_message
  , is_authenticated = require("../models/shared").is_authenticated
  , locate_connection_with_session = require("../models/shared").locate_connection_with_session
  , emit_error = require("../models/shared").emit_error;

var user = require('../models/user')
  , gamer = require('../models/gamer')
  , game = require('../models/game');

/**
 * Locate all the available gamers by their session ids. We do this by introspecting
 * all available connections for SocketIO. However note that if we wanted to use
 * the cluster functionality in Node.JS we would probably have to rewrite this as
 * a lot of the users might be living in different processes and by default SocketIO
 * is only single process aware.
 */
var disconnected = function(io, socket, session_store, db) {
  // Easier to keep track of where we emitting messages
  var calling_method_name = "disconnected";

  // Function we return that accepts the data from SocketIO
  return function(data) {
    // Grab our session id
    var our_sid = socket.handshake.sessionID;
    // Locate any games we are in
    

  } 
}

exports.disconnected              = disconnected;