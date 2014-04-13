var spaceGame = {};

spaceGame.canvas = new ENGINE.Canvas();

spaceGame.sprite = new ENGINE.Sprite(spaceGame.canvas, 'image/sprites/ship.png');

spaceGame.mouse = new ENGINE.Mouse(spaceGame.canvas.element, function(mouse){
	spaceGame.sprite.setPosition(mouse.x,mouse.y);
});