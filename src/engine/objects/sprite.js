// sprite constructor function
ENGINE.Sprite = function(canvas, textureURL) {

	this.dataType = "sprite";

	this.canvas = canvas;

    this.x = -canvas.width;
    this.y = -canvas.height;
    this.offsetX = 0;
    this.offsetY = 0;
    this.rotation = 0;

    this.texture = new Image();
    this.texture.src = textureURL;
    this.setupTexture();


    this.velocity = {
    	x : 0,
    	y : 0,
    	apply : false
    };

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

	this.x = x;
	this.y = y;

};

ENGINE.Sprite.prototype.rotate = function(){

	this.rotation += 1 * (Math.PI/180);

};

ENGINE.Sprite.prototype.move = function(x,y){

	this.velocity.apply = true;
	this.velocity.x = x;
	this.velocity.y = y;

};

ENGINE.Sprite.prototype.applyVelocity = function(x,y){
	
	if(!this.velocity.apply){
		return;
	}

	if(this.x > this.canvas.width + this.width || this.x < 0 - this.width){
		return;
	}

	if(this.y > this.canvas.height + this.height || this.y < 0 - this.height){
		return;
	}

	this.setPosition(this.x + this.velocity.x, this.y + this.velocity.y);

};