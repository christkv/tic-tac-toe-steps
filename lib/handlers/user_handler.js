var emit_message = require("../models/shared").emit_message
  , is_authenticated = require("../models/shared").is_authenticated
  , emit_message_all = require("../models/shared").emit_message_all;

var user = require('../models/user')
  , gamer = require('../models/gamer')
  , game = require('../models/game');

/**
 * Handle the disconnect event from ``SocketIO``
 */
var disconnected = function(io, socket, session_store, db) {
  // Easier to keep track of where we emitting messages
  var event_name = "disconnected";

  // Function we return that accepts the data from SocketIO
  return function(data) {
    // If we are not authenticated we don't care about signaling anyone
    if(!is_authenticated(socket, session_store)) return;
    // Grab our session id
    var our_sid = socket.handshake.sessionID;

    // Locate any games we are in that are not finalized
    game(db).finalize_all_boards_as_draws(our_sid, function(err, result) {

      // Emit disconnect message to everyone
      return emit_message_all(io, session_store, event_name, {
          ok: true
        , result: our_sid
      }, our_sid);
    });
  } 
}

exports.disconnected              = disconnected;