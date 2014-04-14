var spaceGame = {};

spaceGame.canvas = new ENGINE.Canvas();

spaceGame.ship = new ENGINE.Sprite(spaceGame.canvas, 'image/sprites/ship.png');

spaceGame.mouse = new ENGINE.Mouse(spaceGame.canvas.element);


spaceGame.mouse.mouseMove(function(mouse){

	spaceGame.ship.setPosition(mouse.x - spaceGame.ship.offsetX, mouse.y - spaceGame.ship.offsetY);
	spaceGame.ship.rotate();

});

spaceGame.mouse.mouseClick(function(){

	var bullet = new ENGINE.Sprite(spaceGame.canvas, 'image/sprites/bullet.png');
	bullet.setPosition(spaceGame.ship.x, spaceGame.ship.y);
	bullet.move(0, -10);

});

spaceGame.mouse.mouseDown(function(){

	var bullet = new ENGINE.Sprite(spaceGame.canvas, 'image/sprites/bullet.png');
	bullet.setPosition(spaceGame.ship.x, spaceGame.ship.y);
	bullet.move(0, -10);

}, 200, "left");