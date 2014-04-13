// sprite constructor function
ENGINE.Sprite = function(canvas, textureURL) {

	this.dataType = "sprite";

	this.canvas = canvas;

    this.x = 0;
    this.y = 0;
    this.offsetX = 0;
    this.offsetY = 0;
    this.rotation = 0;

    this.texture = new Image();
    this.texture.src = textureURL;
    this.setupTexture();

    return this;
    
};

ENGINE.Sprite.prototype.constructor = ENGINE.Sprite;

ENGINE.Sprite.prototype.setupTexture = function(){

	this.texture.onload = function(){
		this.width = this.texture.width;
		this.height = this.texture.height;
		this.offsetX = this.width / 2;
		this.offsetY = this.height / 2;
		this.canvas.drawList.push(this);
	}.bind(this);

};

ENGINE.Sprite.prototype.setPosition = function(x,y){

	this.x = x - this.offsetX;
	this.y = y - this.offsetY;

};

ENGINE.Sprite.prototype.rotate = function(){
	this.rotation += 1 * (Math.PI/180);
};