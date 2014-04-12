// sprite constructor function
ENGINE.Sprite = function(width, height) {

	this.dataType = "sprite";

    this.x = 0;
    this.y = 0;

    this.width = width;
    this.height = height;

    return this;
    
};

ENGINE.Sprite.prototype.constructor = ENGINE.Sprite;

ENGINE.Sprite.prototype.position = function(x,y){

	this.x = x;
	this.y = y;

};