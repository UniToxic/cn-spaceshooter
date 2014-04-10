// Create the space object in the global scope
// All other game related objects should be a
// child of this object.
window.space = {};

$(window).load(function() {
game.init();
});

var game = {
  // Start initializing objects, preloading assets and display start screen
  init: function(){
	// Hide all game layers and display the start screen
	$('.gamelayer').hide();
	$('#gamestartscreen').show();
	
	//Get handler for game canvas and context
	game.canvas = $('#gamecanvas')[0];
	game.context = game.canvas.getContext('2d');
  },
}