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