// Contains the application state
var application_state = {
  session_id: null
}

// Create an instance of the API class
var api = new API();

// Create a template handler with all the templates
// used in the application
var template_handler = new TemplateHandler({
    "main": "/templates/main.ms"
  , "dashboard": "/templates/dashboard.ms"
});

// Load all the templates and once it's done
// register up all the initial button handlers
template_handler.start(function(err) {

  // Render the main view in the #view div
  template_handler.setTemplate("#view", "main", {});

  // Wire up the buttons for the main view
  $('#register_button').click(register_button_handler(application_state, api, template_handler));
  $('#login_button').click(login_button_handler(application_state, api, template_handler));
})

/*********************************************************************************************
 * Application events we listen to
 ********************************************************************************************/

/**
 * The init event, the server has set up everything an assigned us
 * a session id that we can use in the application
 */
api.on("init", function(err, data) {
  application_state.session_id = data;
});

/**
 * A new gamer logged on, display the new user in the list of available gamers
 * to play
 */
api.on('gamer_joined', function(err, data) {
  if(err) return;
});

/*********************************************************************************************
 * Handlers
 ********************************************************************************************/
/**
 * Handles the attempt to register a new user
 */
var register_button_handler = function(application_state, api, template_handler) {
  return function() {    
    // Lets get the values for the registration
    var full_name = $('#inputFullNameRegister').val();
    var user_name = $('#inputUserNameRegister').val();
    var password = $('#inputPasswordRegister').val();

    // Attempt to register a new user
    api.register(full_name, user_name, password, function(err, data) {
      // If we have an error show the error message to the user
      if(err) return error_box_show(err.error);

      // Show the main dashboard view and render with all the available players
      template_handler.setTemplate("#view", "dashboard", {gamers: []});
    });
  }
}

/**
 * Handles the attempt to login
 */
var login_button_handler = function(application_state, api, template_handler) {
  return function() {
    // Lets get the values for the login
    var user_name = $('#inputUserNameLogin').val();
    var password = $('#inputPasswordLogin').val();

    // Attempt to login the user
    api.login(user_name, password, function(err, data) {
      // If we have an error show the error message to the user
      if(err) return error_box_show(err.error);

      // Show the main dashboard view and render with all the available players
      template_handler.setTemplate("#view", "dashboard", {gamers: []});
    });
  }
}

/*********************************************************************************************
 * Helper methods
 ********************************************************************************************/

/**
 * Show an error message box
 */ 
var error_box_show = function(error) {
  // Set fields for the error
  $('#status_box_header').html("Registration Error");
  $('#status_box_body').html(error);
  // Show the modal box
  $('#status_box').modal({backdrop:true, show:true})    
}