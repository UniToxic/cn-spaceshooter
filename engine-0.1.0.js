// Create the space object in the global scope
// All other game related objects should be a
// child of this object.
window.ENGINE = {};
// sprite constructor function
ENGINE.Canvas = function(options) {

	this.dataType = "canvas";
	this.element = document.createElement("canvas");
	this.context = this.element.getContext("2d");
	document.getElementsByTagName("body")[0].appendChild(this.element);

	options = options || {};
	this.color = options.color || "#9ea7b8";
	this.width = options.width || 0;
	this.height = options.height || 0;
	this.fps = options.fps || 60;
	this.paused = options.pause || false;

	this.element.style.cursor = "none";

	this.ready = false;
	this.drawList = new Array();

	this.resize();
	this.drawLoop();

	return this;

};

ENGINE.Canvas.prototype.constructor = ENGINE.Canvas;

ENGINE.Canvas.prototype.resize = function() {

	if (this.width !== 0 && this.height !== 0) {

		this.element.width = this.width;
		this.element.height = this.height;
		this.ready = true;
		return;
	} else {

		this.element.width = window.innerWidth;
		this.element.height = window.innerHeight;
		this.width = window.innerWidth;
		this.height = window.innerHeight;

		this.ready = true;

		window.onresize = function(event) {

			this.ready = false;
			this.element.width = window.innerWidth;
			this.element.height = window.innerHeight;
			this.width = window.innerWidth;
			this.height = window.innerHeight;
			this.ready = true;

		}.bind(this);
	}

};

ENGINE.Canvas.prototype.drawLoop = function(){

	setInterval((function() {
		if(!this.paused && this.ready){
			this.draw();
		}
	}.bind(this)), 1000 / this.fps);

};

ENGINE.Canvas.prototype.draw = function(){

    this.refresh();

	this.context.fillStyle = this.color;
	this.context.fillRect (0, 0, this.element.width, this.element.height);

	this.context.beginPath();
	this.context.moveTo(100, 150);
	this.context.lineTo(450, 50);
	this.context.stroke();

	this.context.fillStyle = "rgb(200,0,0)";
	this.context.fillRect (10, 10, 55, 50);

	this.context.fillStyle = "rgba(0, 0, 200, 0.5)";
	this.context.fillRect (30, 30, 55, 50);

	if(this.drawList.length > 0){
		for (var i = this.drawList.length - 1; i >= 0; i-=1) {
			this.context.save();
			this.context.translate( this.drawList[i].x, this.drawList[i].y);
			this.context.translate( this.drawList[i].width / 2, this.drawList[i].height / 2);
			this.context.rotate(this.drawList[i].rotation);

			this.drawList[i].applyVelocity();
			this.context.drawImage(this.drawList[i].texture, -this.drawList[i].width / 2, -this.drawList[i].height / 2);
			
			this.context.restore();
		}
	}

};

ENGINE.Canvas.prototype.refresh = function(){
	this.context.clearRect(0, 0, this.width, this.height);
};
ENGINE.Mouse = function(element) {


	this.element = element || window;
	this.getBounds();

    this.x = 0;
    this.y = 0;

    this.allowContext = false;
    this.context();

    return this;
    
};

ENGINE.Mouse.prototype.constructor = ENGINE.Mouse;


ENGINE.Mouse.prototype.getBounds = function(){

	this.bounds = this.element.getBoundingClientRect();

};

ENGINE.Mouse.prototype.getMousePosition = function(event){

	this.x = event.clientX - this.bounds.left;
	this.y = event.clientY - this.bounds.top;

};

ENGINE.Mouse.prototype.mouseMove = function(callback){

	this.element.addEventListener('mousemove', function(event) {

		this.getMousePosition(event);
		callback({x: this.x, y: this.y});

	}.bind(this), false);

};

ENGINE.Mouse.prototype.mouseClick = function(callback){

	this.element.addEventListener('click', function(event) {

		callback();

	}.bind(this), false);

};

ENGINE.Mouse.prototype.mouseDown = function(callback,interval,click){

	this.element.addEventListener('mousedown', function(event) {

    switch (event.which) {
        case 1:
        	if(click === "left")
            this.mouseDownTimer = setInterval(callback, interval);
            break;
        case 2:
        	if(click === "middle")
            this.mouseDownTimer = setInterval(callback, interval);
            break;
        case 3:
        	if(click === "right")
            this.mouseDownTimer = setInterval(callback, interval);
            break;
        default:
            alert('Are you using a wacom?!');
    }


		

	}.bind(this), false);

	this.mouseUp();
};

ENGINE.Mouse.prototype.mouseUp = function(callback){

	this.element.addEventListener('mouseup', function(event) {

		clearInterval(this.mouseDownTimer);

		if(callback)
			callback();

	}.bind(this), false);

};

ENGINE.Mouse.prototype.context = function(){

	this.element.oncontextmenu = function() {
	     return this.allowContext;  
	}.bind(this);

};
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