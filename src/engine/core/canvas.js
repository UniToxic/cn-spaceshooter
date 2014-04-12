// sprite constructor function
ENGINE.Canvas = function(options) {

	this.element = document.createElement("canvas");
	this.context = this.element.getContext("2d");

	var options = options || {};
	this.color = options.color || "#9ea7b8";
	this.width = options.width || 0;
	this.height = options.height || 0;
	this.fps = options.fps || 30;

	document.getElementsByTagName("body")[0].appendChild(this.element);

	this.resize();
	this.draw();

	return this;

};

ENGINE.Canvas.prototype.constructor = ENGINE.Canvas;

ENGINE.Canvas.prototype.resize = function() {

	if (this.width !== 0 && this.height !== 0) {

		this.element.width = this.width;
		this.element.height = this.height;

		return;
	} else {

		this.element.width = window.innerWidth;
		this.element.height = window.innerHeight;
			
		window.onresize = function(event) {

			this.element.width = window.innerWidth;
			this.element.height = window.innerHeight;
			this.draw();

		}.bind(this);
	}

};

ENGINE.Canvas.prototype.draw = function(){

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

};